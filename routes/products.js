const express = require('express')
const _ = require('lodash') //select items from a object 
const config = require("config")

const { Product, productSchema, productValidate } = require('../models/product')
const { Cat } = require('../models/cat')
const { Brand } = require('../models/brand')
const { productDetailsSchema } = require('../models/product_details')
const product_details = require('../models/product_details')

const route = express.Router()

route.get('/', async(req, res) => {

    // const product = await Product.find().populate('brand_id')
    const product = await Product.find()
    res.json(product)
})

route.post('/', async(req, res) => {
    const { error } = productValidate(req.body)
    if (error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    })
    const cat = await Cat.findById(req.body.cat_id)
    const brand = await Brand.findById(req.body.brand_id)
    if (!cat) return res.status(400).json({
        success: false,
        message: 'wrong category is selected'
    })
    if (!brand) return res.status(400).json({
        success: false,
        message: 'wrong brand is selected'
    })

    let product = new Product({
        name: req.body.name,
        desc: req.body.desc,
        image: req.body.image,
        price: req.body.price,
        itemsAvailable: req.body.itemsAvailable,
        brand_id: req.body.brand_id,
        cat_id: req.body.cat_id,
        brand_name: brand.name,
        cat_name: cat.name,
        product_details: req.body.product_details //object
            // product_details: {
            //     color: req.body.product_details.color,
            //     size: req.body.product_details.size
            // }
    })
    product = await product.save()
    return res.json({ success: true, message: _.pick(product, ['name', 'price', 'cat_name', 'brand_name']) })
})

module.exports = route