require('dotenv').config() //Getting an env variables

const mongoose = require('mongoose')

//function purpose: connect to mongodb
const init = () => {
    mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log('MongoDB connected')
        }
    })
    // auto reconnect
    mongoose.connection.on('disconnected', () => {  
        console.log('MongoDB Disconnected, reconnecting...')
        init()
    })
}

module.exports = init;