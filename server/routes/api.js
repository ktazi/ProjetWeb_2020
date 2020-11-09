const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'project_user',
    host: 'localhost',
    password: 'test',
    database: 'projet'
})

client.connect()

/**
 * sign up route
 */
//Inscription//

router.post('/signin', async(req, res) => {
    const nam = req.body.name
    const mett = req.body.metier
    const email = req.body.email
    const psw = req.body.password
    const pic = req.body.pic
    console.log( nam, mett, email, psw, pic)
    let sql = 'SELECT * FROM public.users'
    const users = await client.query({
        text : sql
})
    if (users.rows.length !== 0){
        for (let i = 0; i < users.rows.length; i++){
            console.log(users.rows[i])
            if(users.rows[i].email === email){
                res.status(400).json({message : "User already in database"});
                return
            }
            else{
                res.status(200).json({ message: 'Succès, vous pouvez vous connecter !' })
                return
            }
        }
    }
    const id = users.rows.length
    let hash = await bcrypt.hash(psw,10);
    const sml = 'INSERT INTO public.users (id,nam,mett,email,psw, pic)VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
    const result = await client.query({
        text: sml,
            values: [id, nam, mett, email, hash, pic]
        })
    })


/**
 * sign in route: CONNEXION
 */

async function checkuser(email){
    const sql = "SELECT count(*) FROM public.users WHERE email=$1"
    const res = await client.query({
        text : sql,
        values:[email]
    })
    return parseInt(res.rows[0].count)
}
async function verifMDP(email, psw){
    const sql = "SELECT psw FROM public.users WHERE email=$1"
    const res = await client.query({
        text : sql,
        values:[email]
    })
    if (await bcrypt.compare(psw, res.rows[0].mdp)) {
        return 1
    } else {
        return 0
    }
}
async function returnID(email){
    const sql = "SELECT id FROM public.users WHERE email=$1"
    const res = await client.query({
        text : sql,
        values:[email]
    })
    return parseInt(res.rows[0].id)
}
async function createUser(id){
    const sql = "SELECT * FROM public.users WHERE id=$1"
    const res = await client.query({
        text: sql,
        values: [id]
    })
    return res.rows
}
// Connexion
router.post('/signup', async (req, res) => {
    let email = req.body.email
    let psw = req.body.password
    checkuser(email).then(function(result){
        if( result === 1){
            verifMDP(email, psw).then(function(result){
                if(result === 1){
                    returnID(email).then(function(result){
                        if(result === req.session.userId){
                            createUser(req.session.userId).then(function (result){
                                req.session.User.user.push(result[0])
                                user.push(result[0])
                                res.json({user: req.session.User.user, message: 'Vous êtes déjà connecté'}).status(401)
                            })
                        }
                        else{
                            req.session.userId = result
                            createUser(req.session.userId).then(function (result){
                                user.push(result[0])
                                req.session.User.user.push(result[0])
                                res.json({user: req.session.User.user, message: 'Connecté'}).status(401)
                            })
                        }
                    })
                }
                else
                    res.json({ message: 'Mot de passe incorrect' }).status(401)
            })
        }
        else
            res.json({ message: 'Email incorrect' }).status(401)
    })
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
        text :sql,
        values : [id]
    });
    console.log(result.rows[0].note,'ma note') ;
    res.json(result.rows)
})

/**
 * route that modify a particular recipe
 */

router.put('/recette', async (req, res) => {
    let input = {title : req.body.title,
        picture : req.body.picture,
        userid : req.body.userid,//temporaire
        steps : ["etape 1", "etape2", "etape3"],//temporaire, juste pour les tests
        mat:["mat1", "mat2"],//temporaire
        ing:["ing1","ing2","ing3"],//temporaire
        tag:["tag1","tag2"],
        rid: req.body.rid}//temporaire
    let exists = await client.query({
        text : "SELECT * FROM recette WHERE rid=$1",
        values : [input.rid]
    })
    if (exists.rows.length < 1){
        res.json(null)
        return
    }
    let sql ="UPDATE recette SET picture = $1 WHERE rid=$2"
    await client.query({
        text :sql,
        values : [input.picture,input.rid]
    });
    sql ="UPDATE recette SET title = $1 WHERE rid=$2"
    await client.query({
        text :sql,
        values : [input.title,input.rid]
    });
    await client.query({
            text : "UPDATE recette SET steps = '{}' WHERE rid=$1",
            values : [input.rid]
        }
    )
    let sql2 = "UPDATE recette SET steps = array_append(steps, $1) WHERE rid=$2;"
    for (let i = 0; i < input.steps.length; i++)
    {
        await client.query({
            text :sql2,
            values : [input.steps[i],input.rid]
        });
    }
    await client.query({
            text : "UPDATE recette SET mat = '{}' WHERE rid=$1",
            values : [input.rid]
        }
    )
    let sql3 = "UPDATE recette SET mat = array_append(mat, $1) WHERE rid=$2;"
    for (let i = 0; i < input.mat.length; i++)
    {
        await client.query({
            text :sql3,
            values : [input.mat[i],input.rid]
        });
    }
    await client.query({
            text : "UPDATE recette SET ing = '{}' WHERE rid=$1",
            values : [input.rid]
        }
    )
    let sql4 = "UPDATE recette SET ing = array_append(ing, $1) WHERE rid=$2;"
    for (let i = 0; i < input.ing.length; i++)
    {
        await client.query({
            text :sql4,
            values : [input.ing[i],input.rid]
        });
    }

    await client.query({
            text : "UPDATE recette SET tag = '{}' WHERE rid=$1",
            values : [input.rid]
        }
    )
    let sql5 = "UPDATE recette SET tag = array_append(tag, $1) WHERE rid=$2;"
    for (let i = 0; i < input.tag.length; i++)
    {
        await client.query({
            text :sql5,
            values : [input.tag[i],input.rid]
        });
    }
    let result = await client.query({
        text :"SELECT * FROM recette WHERE rid=$1",
        values : [input.rid]
    });
    res.json(result.rows)
})

/**
 * route that creates a recipe
 */

router.post('/recette', async (req, res) => {
    let input = {title : req.body.title,
        picture : req.body.picture,
        userid : req.body.userid,//temporaire
        steps : ["etape 1", "etape2", "etape3"],//temporaire, juste pour les tests
        mat:["mat1", "mat2"],//temporaire
        ing:["ing1","ing2","ing3"],//temporaire
        tag:["tag1","tag2"]}//temporaire
    let sql = "INSERT INTO recette (title, picture, userid, nb_not, note) VALUES ( $1, $2, $3,0,0) RETURNING*";
    let rid = await client.query({
        text :sql,
        values : [input.title, input.picture, input.userid]
    });
    rid = rid.rows[0].rid;
    let sql2 = "UPDATE recette SET steps = array_append(steps, $1) WHERE rid=$2;"
    for (let i = 0; i < input.steps.length; i++)
    {
        await client.query({
            text :sql2,
            values : [input.steps[i],rid]
        });
    }
    let sql3 = "UPDATE recette SET mat = array_append(mat, $1) WHERE rid=$2;"
    for (let i = 0; i < input.mat.length; i++)
    {
        await client.query({
            text :sql3,
            values : [input.mat[i],rid]
        });
    }
    let sql4 = "UPDATE recette SET ing = array_append(ing, $1) WHERE rid=$2;"
    for (let i = 0; i < input.ing.length; i++)
    {
        await client.query({
            text :sql4,
            values : [input.ing[i],rid]
        });
    }
    let sql5 = "UPDATE recette SET tag = array_append(tag, $1) WHERE rid=$2;"
    for (let i = 0; i < input.tag.length; i++)
    {
        await client.query({
            text :sql5,
            values : [input.tag[i],rid]
        });
    }
    let result = await client.query({
        text :"SELECT * FROM recette WHERE rid=$1",
        values : [rid]
    });
    res.json(result.rows)
})

/**
 * a route that deletes a recipe
 */

router.delete('/recette',async (req, res) => {
    let rid = req.body.rid;
    let sql = 'DELETE FROM recette WHERE rid=$1'
    let result = await client.query({
        text:sql,
        values :[rid]
    })
    res.json(result)
})

/**
 * route that fetches all current user's recipes
 */

router.get('/myrecettes', (req, res) => {

    res.json({message : "TODO"})
})

/**
 * route that allows one to post a review
 */

router.put('/review', async (req, res) => {
    if(req.session.userid ==='undefined'){
        res.send(401).json({message : 'user is not connected'})
    }
    else{
        let note = req.body.note
        const id = req.body.rid;
        const sql2 ="UPDATE recette set note=$1 WHERE rid=$2"

        await client.query({
            text: sql2,
            values: [note, id]
        })

        const sql ="SELECT * FROM recette WHERE rid=$1"
        let result =  await client.query({
            text: sql,
            values:[id]
        });
        res.json(result.rows)
    }
})

router.get('/acc', (req, res) => {

    res.json({message : "TODO"})
})

module.exports = router