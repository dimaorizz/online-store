const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    name: String,
    surname: String,
    adress: String,
    phone: String,
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
    status: {
        type: String,
        default: 'processing'
    }
})

module.exports = mongoose.model('orders', OrderSchema)