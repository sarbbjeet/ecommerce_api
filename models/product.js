const mongoose = require('mongoose')
const Joi = require('joi') //validate client 
const object_id = require('joi-objectid')
const joiObjectid = require('joi-objectid')(Joi)
const { productDetailsSchema } = require('../models/product_details')

const productSchema = new mongoose.Schema({

    name: { type: String, required: true },
    desc: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    number: { type: Number, default: 1 },
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cats'
    },
    cat_name: { type: String, required: true },
    brand_name: { type: String, required: true },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'
    },
    product_details: { type: productDetailsSchema } //nested schema (Embedded Schema)
})

const Product = mongoose.model('products', productSchema)

const productValidate = (product) => {

    const schema = {
        name: Joi.string().required(),
        desc: Joi.string(),
        image: Joi.string(),
        price: Joi.number().required(),
        number: Joi.number(),
        cat_id: joiObjectid().required(),
        brand_id: joiObjectid().required(),
        product_details: Joi.object()
    }

    return Joi.validate(product, schema)
}

module.exports = { Product, productSchema, productValidate }