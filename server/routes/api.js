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

router.get('/recette', (req, res) => {
    res.json({message : "TODO"})
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

router.post('/recette', (req, res) => {
    res.json({message : "TODO"})
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