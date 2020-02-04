// Frameworks/libs
const express = require('express')
// Methods
const router = express.Router()
// Models
const Goods = require('../models/Goods')

router.get('/?', async (req, res) => {
    try{
        const item = await Goods.findById(req.query.id)
        res.render('item', item)
    } catch(err) {
        res.status(500).send(err)
    }
})

module.exports = router