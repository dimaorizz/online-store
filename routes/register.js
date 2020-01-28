const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({ username: req.body.username, email: req.body.email, password: hashedPassword })
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