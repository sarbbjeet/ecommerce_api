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
    const keyWords = ["product_id", "numberOfItems"] //check which key or parameter user want to update
    keyWords.forEach(k => {
            if (!(req.body[k] == undefined))
                cart[k] = req.body[k]
        })
        //check entered product_id is valid or not 
    const product = await Product.findById(cart.product_id)
    if (!product) return res.status(400).json({ success: false, messgae: 'wrong product id' })
    cart.itemsPrice = product.price //get single product price
    if (cart.numberOfItems == 0) { //if numberOfItems equal to 0 remove product from the cart
        await Cart.findByIdAndDelete(req.params.id)
        return res.send({ succes: false, message: "product is removed from cart" })
    }
    // console.log(product.itemsAvailable)
    // console.log(cart.numberOfItems)
    if (cart.numberOfItems > product.itemsAvailable)
        return res.status(400).json({ success: false, message: `only ${product.itemsAvailable} products are available in the stock` })

    cart = await cart.save()
    return res.json(cart)
})

module.exports = route