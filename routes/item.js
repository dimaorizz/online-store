// Frameworks/libs
const express = require('express')
// Methods
const router = express.Router()
// Models
const Goods = require('../models/Goods')
const User = require('../models/User')

router.get('/?', async (req, res) => {
    try{
        const item = await Goods.findById(req.query.id)
        const user = await User.findById(req.session.passport.user)
        res.render('item', { item, isLogged: req.user !== undefined,  userInfo: user })
    } catch(err) {
        res.status(500).send(err)
    }
})

module.exports = router