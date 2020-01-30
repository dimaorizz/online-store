// Frameworks / libs
const express = require('express')
// Methods
const router = express.Router()
//Models
const Goods = require('../models/Goods')
// Middlewares
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

// GET: localhost:3000/admin
router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const goods = await Goods.find()
        if(goods.length !== 0) {
            res.render('adminPage', { items: goods, msg: '' })
        } else {
            res.render('adminPage', { msg: 'No goods on your website' })
        }
    } catch (error) {
        
    }
})

//POST: localhost:3000/admin
router.post('/', isAdmin, (req, res) => {
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