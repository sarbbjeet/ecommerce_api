const mongoose = require('mongoose')
const Joi = require('joi') //validate client 

const brandSchema = new mongoose.Schema({

    name: { type: String, required: true },
    desc: { type: String },
    image: { type: String }
})


const Brand = mongoose.model('brands', brandSchema)

const brandValidate = (brand) => {

    const schema = {
        name: Joi.string().required(),
        desc: Joi.string(),
        image: Joi.string()
    }

    return Joi.validate(brand, schema)
}

module.exports = { Brand, brandSchema, brandValidate }