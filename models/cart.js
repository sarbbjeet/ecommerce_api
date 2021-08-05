const mongoose = require('mongoose')
const Joi = require('joi') //validate client 
const joi_objectId = require('joi-objectid')(Joi)

const cartSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    numberOfItems: { type: Number, default: 1 },
    itemsPrice: {
        type: Number,
        required: true,
        set: function(p) { //add functionaly on the schema side 
            return p * this.numberOfItems
        }
    }
})

const Cart = mongoose.model('carts', cartSchema)
const cartValidate = (cart) => {
    const schema = {
        product_id: joi_objectId().required(),
        numberOfItems: Joi.number(),
        // itemsPrice: Joi.number().required()
    }

    return Joi.validate(cart, schema)
}

module.exports = { Cart, cartSchema, cartValidate }