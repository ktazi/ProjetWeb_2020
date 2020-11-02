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
 * phony routes, for debug sessions
 */

router.get('/test', (req, res) => {
    res.json({message : "hello world"})
})
/**
 * sign up route
 */
    //Inscription
    router.get('/signin', async(req, res) => {
    const sql = 'SELECT * FROM users WHERE email=$1';
    let result = await client.query({
        text :sql,
        values : [req.body.email]
    });
    if (result.rows.length !== 0)
    {
        res.status(400).json({message : "User already in database"});
        return
    }
    let sql2 = "INSERT INTO users (email, pswd) VALUES ( $1, $2) RETURNING *";

    result = result.rows;
    res.json(result);
    })
 /*
 * sign in route
 */
// Connexion
router.post('/signup', async (req, res) => {
    res.json({message : "TODO"})
    let sql = 'SELECT * FROM users WHERE email=$1'
    const users = await client.query({
        text : sql,
        values: [req.body.email]
    })

    if (users.rows.length === 0)
    {
        res.status(400).json({message : "User not registered"})
        return
    }
    let hashedpassword = checkEmail.rows[0].pswd;
    let gooduser = await bcrypt.compare(req.body.pswd, hashedpassword);
    if (!gooduser)
    {
        res.json({message : 'wrong password'})
        return
    }
    else
    {
        let id = checkEmail.rows[0].id;
        if (typeof req.session.userId === 'undefined') {
            req.session.userId = -1
        }
        if (req.session.userId === id)
        {
            res.status(401).json({message : 'User already authentified'})
            return
        }
        req.session.userId = id;
        res.json({message : 'User authentified'})
        return
    }
})


/**
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
    res.json(result.rows)
})

/**
 * route that modify a particular recipe
 */

router.put('/recette', async (req, res) => {
    let input = {title : req.body.title,
        picture : req.body.picture,
        userid : 0,//temporaire
        steps : req.body.steps,
        mat:req.body.mat,
        ing:req.body.ing,
        tag:req.body.tag,
        rid: req.body.rid}
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
                    userid : 0,//temporaire
                    steps : req.body.steps,
                    mat:req.body.mat,
                    ing:req.body.ing,
                    tag:req.body.tag}
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

module.exports = router