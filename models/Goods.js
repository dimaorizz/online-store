const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GoodsSchema = new Schema({
    itemName: {
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    regDate: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('goods', GoodsSchema);