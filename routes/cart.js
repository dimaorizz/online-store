// Frameworks/libs
const express = require('express')
// Methods
const router = express.Router()
// Utils
const isAuth = require('../utils/isAuth')
const Cart = require('../models/Cart')

// GET: localhost:3000/cart
router.get('/', isAuth, (req, res) => {
    res.render('cart', { })
})

// POST: localhost:3000/cart/:id
router.post('/:id', async (req, res) => {
    const itemID = req.params.id // get :id value
    try {
        const cart = await Cart.findOne({ userID: req.session.user_id })
        if(cart === null) { // if user has no cart
            const newCart = new Cart({ userID: req.session.user_id, items: [ itemID ] }) // creating new cart
            newCart.save((err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log(`New cart created`)
                }
            })
        } else { // if user has a cart
            let items = cart.items // get an array of items id
            items.push(itemID)  // add one item
            Cart.findOneAndUpdate({ userID: req.session.user_id }, {items: items}) // update items in cart
            .then(() => {
                res.status(200).send()
            })
            .catch(() => {
                res.status(500).send()
            })
        }
    } catch (error) {
        return res.status(500).send()
    }
})

module.exports = router