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

router.get('/signup', (req, res) => {
    res.json({message : "TODO"})
})

/**
 * sign in route
 */

router.post('/signin', (req, res) => {
    res.json({message : "TODO"})
})

/**
 * route that gets all recipes
 */

router.get('/recettes', (req, res) => {
    res.json({message : "TODO"})
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

router.put('/recette', (req, res) => {
    res.json({message : "TODO"})
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
    await client.query({
        text :sql,
        values : [input.title, input.picture, input.userid]
    });
    let sql2 = "UPDATE recette SET steps = array_append(steps, $1);"
    for (let i = 0; i < input.steps.length; i++)
    {
        await client.query({
            text :sql2,
            values : [input.steps[i]]
        });
    }
    let sql3 = "UPDATE recette SET mat = array_append(mat, $1);"
    for (let i = 0; i < input.mat.length; i++)
    {
        await client.query({
            text :sql3,
            values : [input.mat[i]]
        });
    }
    let sql4 = "UPDATE recette SET ing = array_append(ing, $1);"
    for (let i = 0; i < input.ing.length; i++)
    {
        await client.query({
            text :sql4,
            values : [input.ing[i]]
        });
    }
    let sql5 = "UPDATE recette SET tag = array_append(tag, $1);"
    for (let i = 0; i < input.tag.length; i++)
    {
        await client.query({
            text :sql5,
            values : [input.tag[i]]
        });
    }
    let result = await client.query({
        text :"SELECT * FROM recette WHERE rid=$1",
        values : [4]
    });
    res.json(result.rows)
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

router.put('/review', (req, res) => {
    res.json({message : "TODO"})
})

module.exports = router