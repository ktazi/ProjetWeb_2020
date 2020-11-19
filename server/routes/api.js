const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {Client} = require('pg')

const client = new Client({
    user: 'project_user',
    host: 'localhost',
    password: 'test',
    database: 'projet'
})

client.connect()

router.use((req, res, next) => {
    if (typeof req.session.userId === 'undefined') {
        req.session.userId = -1;
    }
    next()
})


router.get('/me', async (req, res) => {
    let user = await client.query({
        text: 'SELECT * FROM users WHERE id=$1',
        values: [req.session.userId]
    })
    res.json(user.rows)
})


router.get('/allusers', (async (req, res) => {
    let result = await client.query('SELECT * from users');
    res.json(result.rows);
}))


/**
 * sign up route
 */
//Inscription//

router.post('/SignUp', async (req, res) => {
    const nam = req.body.name
    const mett = req.body.metier
    const email = req.body.email
    const psw = req.body.password
    const pic = req.body.pic
    let sql = 'SELECT * FROM users'
    const users = await client.query({
        text: sql
    })
    if (nam === '' || mett === '' || email === '' || psw === '' || pic === '')
        res.json({message: "Champs incorrectement remplis", success: false});
    if (users.rows.length !== 0) {
        for (let i = 0; i < users.rows.length; i++) {
            if (users.rows[i].email === email) {
                res.json({message: "Adresse email deja utilisee", success: false});
                return
            }
        }
    }
    const id = users.rows.length
    let hash = await bcrypt.hash(psw, 10);
    const sml = 'INSERT INTO users (id,nam,mett,email,psw, pic)VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
    const result = await client.query({
        text: sml,
        values: [id, nam, mett, email, hash, pic]
    })
    res.json({message: "Inscription réussie !", success: true});
})

/*Connexion*/
router.post('/SignIn', async (req, res) => {
    const sql = 'SELECT * FROM users WHERE email=$1';
    let checkEmail = await client.query({
        text: sql,
        values: [req.body.email]
    });
    if (checkEmail.rows.length === 0) {
        res.json({message: "Email mauvais", connect: false})
        return
    }
    let hashedpassword = checkEmail.rows[0].psw;
    let gooduser = await bcrypt.compare(req.body.password, hashedpassword);
    if (!gooduser) {
        res.json({message: 'Mauvais mot de passe', connect: false})
        return
    } else {
        let id = checkEmail.rows[0].id;
        if (req.session.userId === id) {
            res.json({message: 'Utilisateur déjà authentifié', connect: false})
            return
        }
        req.session.userId = id;
        res.json({message: 'Succès de la connexion', connect: true})
        return
    }
})


router.post('/logout', (req, res) => {
    req.session.userId = -1;
    res.json({message: "Utilisateur déconnecté"})
})
/*
 * route that gets all recipes
 */
router.get('/recettes', async (req, res) => {
    let sql = 'SELECT * FROM recette'
    let result = await client.query({
        text: sql
    })
    res.json(result.rows)

})

/**
 * route that gets a particular recipe
 */

router.get('/recette', async (req, res) => {
    const sql = 'SELECT * FROM recette WHERE rid=$1';
    let id = req.body.rid;
    let result = await client.query({
        text: sql,
        values: [id]
    });
    res.json(result.rows)
})

/**
 * route that modify a particular recipe
 */

router.put('/recette', async (req, res) => {
    let input = {
        title: req.body.title,
        picture: req.body.picture,
        userid: req.session.userId,
        steps: req.body.steps,
        mat: req.body.mat,
        ing: req.body.ing,
        tag: req.body.tag,
        rid: req.body.rid
    }
    let exists = await client.query({
        text: "SELECT * FROM recette WHERE rid=$1",
        values: [input.rid]
    })
    if (exists.rows.length < 1) {
        res.json(null)
        return
    }
    let sql = "UPDATE recette SET picture = $1 WHERE rid=$2"
    await client.query({
        text: sql,
        values: [input.picture, input.rid]
    });
    sql = "UPDATE recette SET title = $1 WHERE rid=$2"
    await client.query({
        text: sql,
        values: [input.title, input.rid]
    });
    sql = "UPDATE recette SET userid = $1 WHERE rid=$2"
    await client.query({
        text: sql,
        values: [input.userid, input.rid]
    });
    await client.query({
            text: "UPDATE recette SET steps = '{}' WHERE rid=$1",
            values: [input.rid]
        }
    )
    let sql2 = "UPDATE recette SET steps = array_append(steps, $1) WHERE rid=$2;"
    for (let i = 0; i < input.steps.length; i++) {
        await client.query({
            text: sql2,
            values: [input.steps[i], input.rid]
        });
    }
    await client.query({
            text: "UPDATE recette SET mat = '{}' WHERE rid=$1",
            values: [input.rid]
        }
    )
    let sql3 = "UPDATE recette SET mat = array_append(mat, $1) WHERE rid=$2;"
    for (let i = 0; i < input.mat.length; i++) {
        await client.query({
            text: sql3,
            values: [input.mat[i], input.rid]
        });
    }
    await client.query({
            text: "UPDATE recette SET ing = '{}' WHERE rid=$1",
            values: [input.rid]
        }
    )
    let sql4 = "UPDATE recette SET ing = array_append(ing, $1) WHERE rid=$2;"
    for (let i = 0; i < input.ing.length; i++) {
        await client.query({
            text: sql4,
            values: [input.ing[i], input.rid]
        });
    }
    await client.query({
            text: "UPDATE recette SET tag = '{}' WHERE rid=$1",
            values: [input.rid]
        }
    )
    let sql5 = "UPDATE recette SET tag = array_append(tag, $1) WHERE rid=$2;"
    for (let i = 0; i < input.tag.length; i++) {
        await client.query({
            text: sql5,
            values: [input.tag[i], input.rid]
        });
    }
    let result = await client.query({
        text: "SELECT * FROM recette WHERE rid=$1",
        values: [input.rid]
    });
    res.json(result.rows)
})

/**
 * route that creates a recipe
 */

router.post('/recette', async (req, res) => {
    let input = {
        title: req.body.title,
        picture: req.body.picture,
        userid: req.session.userId,
        steps: req.body.steps,
        mat: req.body.mat,
        ing: req.body.ing,
        tag: req.body.tag
    }
    let sql = "INSERT INTO recette (title, picture, userid, nb_not, note) VALUES ( $1, $2, $3,0,0) RETURNING*";
    let rid = await client.query({
        text: sql,
        values: [input.title, input.picture, input.userid]
    });
    rid = rid.rows[0].rid;
    let sql2 = "UPDATE recette SET steps = array_append(steps, $1) WHERE rid=$2;"
    for (let i = 0; i < input.steps.length; i++) {
        await client.query({
            text: sql2,
            values: [input.steps[i], rid]
        });
    }
    sql = "UPDATE recette SET userid = $1 WHERE rid=$2"
    await client.query({
        text: sql,
        values: [input.userid, input.rid]
    });
    let sql3 = "UPDATE recette SET mat = array_append(mat, $1) WHERE rid=$2;"
    for (let i = 0; i < input.mat.length; i++) {
        await client.query({
            text: sql3,
            values: [input.mat[i], rid]
        });
    }
    let sql4 = "UPDATE recette SET ing = array_append(ing, $1) WHERE rid=$2;"
    for (let i = 0; i < input.ing.length; i++) {
        await client.query({
            text: sql4,
            values: [input.ing[i], rid]
        });
    }
    let sql5 = "UPDATE recette SET tag = array_append(tag, $1) WHERE rid=$2;"
    for (let i = 0; i < input.tag.length; i++) {
        await client.query({
            text: sql5,
            values: [input.tag[i], rid]
        });
    }
    let result = await client.query({
        text: "SELECT * FROM recette WHERE rid=$1",
        values: [rid]
    });
    res.json(result.rows)
})

/**
 * a route that deletes a recipe
 */

router.delete('/recette', async (req, res) => {
    let rid = req.body.rid;
    let sql = 'DELETE FROM recette WHERE rid=$1'
    let result = await client.query({
        text: sql,
        values: [rid]
    })
    res.json(result)
})

/**
 * route that fetches all current user's recipes
 */

router.get('/myrecettes', async (req, res) => {
    let rec = await client.query({
        text: 'SELECT * FROM recette WHERE userid=$1',
        values: [req.session.userId]
    })
    res.json(rec.rows)
})

/**
 * route that allows one to post a review
 */

router.post('/review', async (req, res) => {
    if (req.session.userId === -1) {
        res.json({message: "review non attribuée, besoin que l'utilisateur soit connecté", success: false})
        return
    }
    let input = {
        note: req.body.note,
        rid: req.body.rid,
        userid: req.session.userId
    }
    if (input.note < 0 || input.note > 5) {
        res.json({message: "note doit etre comprise entre 0 et 5", success: false})
        return
    }
    //utilisateur
    let user = await client.query({
        text: 'select * from users where id=$1',
        values: [input.userid]
    })
    //recette
    let recette = await client.query({
        text: 'select * from recette where rid=$1',
        values: [input.rid]
    })
    if (recette.rows.length === 0) {
        res.json({message: "Recette non existante", success: false})
        return
    }
    user = user.rows[0]
    if (user.revu === null) {
        await client.query({
            text: "update users set revu = '{}' where id=$1",
            values: [input.userid]
        })
    } else {
        if (user.revu.includes(parseInt(input.rid))) {
            res.json({message: "Vous avez deja noté cette recette", success: false})
            return
        }
    }
    await client.query({
        text: "update users set revu = array_append(revu, $1) where id=$2",
        values: [input.rid, input.userid]
    })
    await client.query({
        text: "update recette set nb_not = nb_not + 1 where rid=$1",
        values: [input.rid]
    })
    await client.query({
        text: "update recette set note = (note + $1)/nb_not where rid=$2",
        values: [input.note, input.rid]
    })
    res.json({message: "Note attribuee avec succès", success: true})
})

/**
 * Creates a comment
 * */

router.post('/com', async (req, res) => {
    if (req.session.userId === -1) {
        res.json({message: "commentaire non posté, besoin que l'utilisateur soit connecté", com: null})
        return
    }
    let user = await client.query({
        text: 'SELECT * FROM users WHERE id=$1',
        values: [req.session.userId]
    })
    user = user.rows[0]
    let input = {
        cont: req.body.cont,
        usernam: user.nam,
        rid: req.body.rid,
        dat: req.body.dat
    }
    let com = await client.query("SELECT count(*) FROM coms");
    const sml = 'INSERT INTO coms (usernam,cont,rid,dat,cid)VALUES($1,$2,$3,$4,$5) RETURNING *'
    let result = await client.query({
        text: sml,
        values: [input.usernam, input.cont, parseInt(input.rid), input.dat, parseInt(com.rows[0].count)]
    })
    res.json({message: "commentaire posté", com: result.rows})
})

router.get('/numberRecette', async (req, res) => {
    let recette = await client.query("SELECT count(*) FROM recette");
    res.json(parseInt(recette.rows[0].count))
})


router.post('/alpha', async (req, res) => {
    let input = {offset: req.body.offs}
    let resu = await client.query({
        text: 'select * from recette order by title asc limit 5 offset $1 * 5',
        values: [input.offset]
    })
    res.json(resu.rows)
})


router.post('/best', async (req, res) => {
    let input = {offset: req.body.offs}
    let resu = await client.query({
        text: 'select * from recette order by note desc limit 5 offset $1 * 5',
        values: [input.offset]
    })
    res.json(resu.rows)
})


router.post('/comments', async (req, res) => {
    let input = {
        rid: req.body.rid
    }
    let resu = await client.query({
        text: 'select * from coms where rid=$1',
        values: [input.rid]
    })
    res.json(resu.rows)
})

module.exports = router

