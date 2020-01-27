require('dotenv').config()

const mongoose = require('mongoose')

const init = () => {
    mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('MongoDB connected')
        }
    })

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB Disconnected, reconnecting...')
        init()
    })
}

module.exports = init;