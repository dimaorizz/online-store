const express = require('express')
const router = express.Router()
const Goods = require('../models/Goods')

router.get('/', (req, res) => {
    res.render('adminPage')
})

router.post('/', (req, res) => {
    const newItem = new Goods({ itemName: req.body.itemName, description: req.body.description, cost: req.body.cost })
    newItem.save((err) => {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/admin')
            console.log('Item saved')
        }
    })
})

module.exports = router