// Frameworks / libs
const express = require('express')
// Methods
const router = express.Router()
// Models
const Goods = require('../models/Goods')

// GET: localhost:3000/
router.get('/' , async (req, res) => {
    const items = await Goods.find() // get all goods from database
    res.render('mainPage', { items, user: req.user !== undefined })
})

module.exports = router