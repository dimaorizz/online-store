// Frameworks/libs
const express = require('express')
const bcrypt = require('bcryptjs')
// Methods
const router = express.Router()
// Models
const User = require('../models/User')

// GET: localhost:3000/register
router.get('/', (req, res) => {
    res.render('register')
})

// POST: localhost:3000/register
router.post('/', async (req, res) => {
    const hashSalt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, hashSalt) // hash password
    const user = new User({ username: req.body.username, email: req.body.email, password: hashedPassword }) // create new user in database
    user.save((err) => {
        if(err){
            console.log(err)
        } else {
            console.log(`new user added`)
        }
    })
    return res.redirect('/login')
})

module.exports = router