// Frameworks / libs
const express = require('express')
// Methods
const router = express.Router()
// Models
const Goods = require('../models/Goods')
const User = require('../models/User')

// GET: localhost:3000/
router.get('/' , async (req, res) => {
    let user
    if(req.session.passport !== undefined){
        if(req.session.passport.user !== undefined) {
            user = await User.findById(req.session.passport.user)
        }
    }
    
    const items = await Goods.find() // get all goods from database
    
    res.render('mainPage', { items, isLogged: req.user !== undefined,  userInfo: user })
})

module.exports = router