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

router.get('/test', (req, res) => {
    res.json({message : "hello world"})
})




module.exports = router