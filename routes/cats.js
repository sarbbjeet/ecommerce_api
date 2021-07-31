const express = require('express');
const { Cat, catSchema, catValidate } = require('../models/cat');
const _ = require('lodash');
const route = express.Router()

route.post('/', async(req, res) => {
    const { error } = catValidate(req.body)
    if (error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    })
    let cat = new Cat(_.pick(req.body, ['name', 'desc', 'image'])) //categories
    cat = await cat.save()
    return res.json({
        success: true,
        message: _.pick(cat, ['name', 'desc'])
    })
})

route.get('/', async(req, res) => {

    const cat = await Cat.find().select("name")
    return res.json({ success: true, message: cat })
})

module.exports = route