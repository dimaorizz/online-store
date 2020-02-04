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
    const cart = await Cart.findOne({ userID: req.session.user_id })
    // let goods = []
    
    // for(let i = 0; i < cart.items.length; i++) {
    //     goods.push(await Goods.findById(cart.items[i]))
    // }

    const items = await (await cart.populate('items').execPopulate()).toObject().items

    console.log(items)

    res.render('cart', { cart, items })
})

// POST: localhost:3000/cart/:id
router.post('/:id', async (req, res) => {
    const itemID = req.params.id // get :id value
    const item = await Goods.findById(itemID)
    try {
        const cart = await Cart.findOne({ userID: req.session.user_id })
        if(cart === null) { // if user has no cart
            const newCart = new Cart({ userID: req.session.user_id, items: [ item ] }) // creating new cart
            newCart.save((err) => {
                if(err) {
                    console.log(err)
                } else {
                    console.log(`New cart created`)
                }
            })
        } else { // if user has a cart
            let items = cart.items // get an array of items id
            items.push(item)  // add one item
            Cart.findOneAndUpdate({ userID: req.session.user_id }, {items: items}) // update items in cart
            .then(() => {
                res.status(200).send()
            })
            .catch(() => {
                res.status(500).send()
            })
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = router