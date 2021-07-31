const mongoose = require('mongoose');


const productDetailsSchema = new mongoose.Schema({
    color: String,
    size: String,
    shape: String,
    weight: String,

    //further more specification can be added 

})

module.exports = { productDetailsSchema }