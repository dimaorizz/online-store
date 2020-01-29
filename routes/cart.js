const express = require('express')
const router = express.Router()
const isAuth = require('../utils/isAuth')
const Cart = require('../models/Cart')

router.get('/', isAuth, (req, res) => {
    res.render('cart', { })
})

router.post('/:id', async (req, res) => {
    const itemID = req.params.id
    const cart = await Cart.findOne({ userID: req.session.user_id })
    if(cart === null) {
        const newCart = new Cart({ userID: req.session.user_id, items: [ itemID ] })
        newCart.save((err) => {
            if(err) {
                console.log(err)
            } else {
                console.log(`New cart created`)
            }
        })
    } else {
        let items = cart.items
        items.push(itemID)
        Cart.findOneAndUpdate({ userID: req.session.user_id }, {items: items} , (err) => {
            if(err) {
                console.log(err)
            }
        })
    }
})

//TODO: finish cart

module.exports = router