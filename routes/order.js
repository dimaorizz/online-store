// libs / frameworks
const express = require('express')
// Methods
const router = express.Router()
// Middlewares
const isAuth = require('../middlewares/isAuth')
const isAdmin = require('../middlewares/isAdmin')
// Models
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const User = require('../models/User')

router.get('/', isAuth, isAdmin, async (req, res) => {
    let total
    let user = await User.findById(req.session.passport.user);
    let orders = await Order.find()
    for(let i = 0; i < orders.length; i++) {
        total = 0
        orders[i].items = await (await orders[i].populate('items.item').execPopulate()).toObject().items
        for(let j = 0; j < orders[i].items.length; j++){
            total += orders[i].items[j].quantity * orders[i].items[j].item.cost
        }

        orders[i].total = total
    }

    orders = orders.filter((order) => order.status === 'processing')

    res.render('orders', { orders, isLogged: req.user !== undefined,  userInfo: user })
})

router.post('/', isAuth, async (req, res) => {
    const cart = await Cart.findOne({ userID: req.session.passport.user })
    const items = cart.items
    const order = new Order({
        name: req.body.name,
        surname: req.body.surname,
        adress: req.body.adress,
        phone: req.body.phone,
        items,
    })
    order.save().catch(e => console.log(e))
    res.redirect('/cart')
})

router.put('/?', isAdmin, async (req, res) => {
    Order.findByIdAndUpdate(req.query.id, { status: req.query.status }, (e) => {
        if(e) {
            console.log(e)
        }
    })
})

module.exports = router