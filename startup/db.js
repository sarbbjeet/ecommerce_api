//mongodb connection module 

const mongoose = require('mongoose')
const winston = require('winston')
let url = "" //default url
    //read environment variables 
const databaseName = process.env.DATABASE_NAME
const userId = process.env.DB_USERID
const password = process.env.DB_PASSWORD



module.exports = () => {
    console.log(process.env.PORT)
    if (process.env.NODE_ENV == 'development') //development mode //local pc
        url = `mongodb://localhost/${databaseName}`
    else //'production'  mode 
        url = `mongodb+srv://${userId}:${password}@cluster0.suij1.mongodb.net/${databaseName}?retryWrites=true&w=majority`
    mongoose.connect(url)
        .then(() => winston.info("connected with mongodb database"))
        .catch((err) => winston.error(err))
}