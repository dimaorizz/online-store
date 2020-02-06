// Frameworks/libs
const express = require('express')
// Methods
const router = express.Router()
// Middlewares
const isAuth = require('../middlewares/isAuth')
// Models
const Cart = require('../models/Cart')
const Goods = require('../models/Goods')

// GET: localhost:3000/cart
router.get('/', isAuth, async (req, res) => {
    const cart = await Cart.findOne({ userID: req.session.passport.user })
    if(cart === null) {
        res.render('cart', { cart })
    } else {
        const items = await (await cart.populate('items.item').execPopulate()).toObject().items
        res.render('cart', { cart, items })
    }
})

// POST: localhost:3000/cart/:id
router.post('/:id', async (req, res) => {
    const itemID = req.params.id // get :id value
    const item = await Goods.findById(itemID)
    try {
        const cart = await Cart.findOne({ userID: req.session.passport.user })
        if(cart === null) { // if user has no cart
            const newCart = new Cart({ userID: req.session.passport.user, items: [ { item } ] }) // creating new cart
            newCart.save((err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log(`New cart created`)
                }
            })
        } else { // if user has a cart
            let items = cart.items // get an array of items id
            
            if(!items.some(el => {
               if(el.item._id.toString() === item._id.toString()) {
                   ++el.quantity 
                   return true
               } else {
                   return false
               }
            })) {
                items.push({ item })
            }

            Cart.findOneAndUpdate({ userID: req.session.passport.user }, { items }) // update items in cart
            .then(() => {
                res.status(200).send()
            })
            .catch(() => {
                res.status(500).send()
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router