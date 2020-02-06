const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    items:[{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'goods',
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
})

module.exports = mongoose.model('cart', CartSchema)