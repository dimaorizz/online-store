const express = require('express')
const router = express.Router()
const Goods = require('../models/Goods')
const isAuth = require('../utils/isAuth')

router.get('/' , async (req, res) => {
    const items = await Goods.find()
    res.render('mainPage', { items })
})

module.exports = router