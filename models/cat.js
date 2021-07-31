const mongoose = require('mongoose')
const Joi = require('joi') //validate client 

const catSchema = new mongoose.Schema({

    name: { type: String, required: true },
    desc: { type: String },
    image: { type: String }
})


const Cat = mongoose.model('cats', catSchema)

const catValidate = (cat) => {

    const schema = {
        name: Joi.string().required(),
        desc: Joi.string(),
        image: Joi.string()
    }

    return Joi.validate(cat, schema)
}

module.exports = { Cat, catSchema, catValidate }