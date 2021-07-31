const mongoose = require('mongoose')
const winston = require('winston')
const url = "mongodb://localhost/ecommerceCart"
module.exports = () => {
    mongoose.connect(url)
        .then(() => winston.info("connected with mongodb database"))
        .catch((err) => winston.error(err))
}