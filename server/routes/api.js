const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'test',
    database: 'TP5'
})

client.connect()

router.get('/test', (req, res) => {
    res.json({message : "hello world"})
})


module.exports = router