// Frameworks / libs
const express = require('express')
// Methods
const router = express.Router()
//Models
const Goods = require('../models/Goods')
const User = require('../models/User')
// Middlewares
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')

// GET: localhost:3000/admin
router.get('/', isAuth, isAdmin, async (req, res) => {
    try {
        const goods = await Goods.find()
        const user = await User.findById(req.session.passport.user)
        if(goods.length !== 0) {
            res.render('adminPage', { items: goods, msg: '' , isLogged: req.user !== undefined,  userInfo: user})
        } else {
            res.render('adminPage', { msg: 'No goods on your website' , isLogged: req.user !== undefined,  userInfo: user})
        }
    } catch (error) {
        
    }
})

// POST: localhost:3000/admin
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

// DELETE: localhost:3000/admin
router.delete('/:id', isAdmin, (req, res) => {
    Goods.findByIdAndDelete(req.params.id)
    .then((res.redirect('/admin')))
    .catch(e => console.log(e))
})

module.exports = router