const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    items:[ {
        type: Schema.Types.ObjectId,
        ref: 'goods',
    }],
})

module.exports = mongoose.model('cart', CartSchema)