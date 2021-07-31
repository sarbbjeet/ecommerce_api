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
    if (error) return res.status(400).json({ success: false, message: error.details[0].message })
    const product = await Product.findById(req.body.product_id)
    if (!product) return res.status(400).json({ success: false, message: 'wrong product id' })
    let cart = new Cart({
        product_id: req.body.product_id,
        numberOfItems: req.body.numberOfItems,
        itemsPrice: product.price //pass product price here and schema will multiple price with numberOfItems 
            //  itemsPrice: (!req.body.numberOfItems) ? 1 * product.price : req.body.numberOfItems * product.price
    })

    cart = await cart.save()
    return res.json({ success: true, message: cart })
})

route.put('/:id', async(req, res) => {

    let cart = await Cart.findById(req.params.id)
    if (!cart) return res.status(400).json({ success: false, message: 'wrong cart id' })
        //update
    const keyWords = ['product_id', 'numberOfItems']
    keyWords.forEach(k => {
        if (!req.body.k == undefined)
            cart.k = req.body.k
    })

    console.log(cart)
        // console.log(req.body.product_id)
        // cart.product_id = req.body.product_id
        // cart.numberOfItems = req.body.numberOfItems
    const { error } = cartValidate(cart)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message })
        //update details 

    cart = await cart.save()
    return res.json(cart)

})

module.exports = route