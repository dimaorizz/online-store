// Frameworks/libs
const express = require('express')
// Methods
const router = express.Router()
// Middlewares
const isAuth = require('../middlewares/isAuth')
// Models
const Cart = require('../models/Cart')
const Goods = require('../models/Goods')
const User = require('../models/User')

// GET: localhost:3000/cart
router.get('/', isAuth, async (req, res) => {
    let total = 0
    const cart = await Cart.findOne({ userID: req.session.passport.user })
    const user = await User.findById(req.session.passport.user)
    if(cart === null) {
        res.render('cart', { cart })
    } else {
        const items = await (await cart.populate('items.item').execPopulate()).toObject().items
        for(let i = 0; i < items.length; i++){
            total += items[i].quantity * items[i].item.cost
        }
        res.render('cart', { cart, items, isLogged: req.user !== undefined,  userInfo: user, total })
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

router.delete('/:id', async (req, res) => {
    const itemID = req.params.id
    const cart = await Cart.findOne({ userID: req.session.passport.user })
    let items = cart.items.filter(el => el._id.toString() !== itemID)
    Cart.updateOne({ userID: req.session.passport.user }, { items }, (err) => {})

})

module.exports = router