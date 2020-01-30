// Frameworks / libs
const express = require('express')
// Methods
const router = express.Router()
//Models
const Goods = require('../models/Goods')
// Utils
const isAuth = require('../utils/isAuth')
const isAdmin = require('../utils/isAdmin')

// GET: localhost:3000/admin
router.get('/', isAuth, isAdmin, (req, res) => {
    res.render('adminPage')
})

//POST: localhost:3000/admin
router.post('/', (req, res) => {
    const newItem = new Goods({ itemName: req.body.itemName, description: req.body.description, cost: req.body.cost })
    newItem.save()
    .then(() => {
        res.status(200).send()
        res.redirect('/admin')
    })
    .catch(() => {
        res.status(500).send()
    })
})

module.exports = router