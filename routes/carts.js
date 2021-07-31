const express = require('express')
const route = express.Router()
const { Cart, cartValidate } = require('../models/cart')
const { Product } = require('../models/product')

//read items added in the cart
route.get('/', async(req, res) => {
    const cart = await Cart.find().populate('product_id') //product refererce id 
    return res.json(cart)
})

//add item in a cart
route.post('/', async(req, res) => {
    const { error } = cartValidate(req.body)
    if (error) return res.status(400).json({ success: true, message: error.details[0].message })
    const product = await Product.findById(req.body.product_id)
    if (!product) return res.status(400).json({ success: true, message: 'wrong product id' })
    let cart = new Cart({
        product_id: req.body.product_id,
        numberOfItems: req.body.numberOfItems,
        itemsPrice: (!req.body.numberOfItems) ? 1 * product.price : req.body.numberOfItems * product.price
    })

    cart = await cart.save()
    return res.json({ success: true, message: cart })
})

module.exports = route