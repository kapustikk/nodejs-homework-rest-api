
// const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')
require('dotenv').config()
const uriDb = process.env.URI_DB

// const db = MongoClient.connect(uriDb, {
//     useUnifiedTopology: true,
//     poolSize: 5,
// })

const db = mongoose.connect(uriDb, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection to db')
})

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err.message}`)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnection')
})


process.on('SIGINT', async () => {
    // const client = await db
    // client.close()
    await mongoose.connection.close()
        console.log('Connection for db closed and app termination');
        process.exit(1)
})

module.exports = db
