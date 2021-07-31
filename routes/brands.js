const express = require('express');
const { Brand, brandSchema, brandValidate } = require('../models/brand');
const _ = require('lodash')
const route = express.Router()

route.post('/', async(req, res) => {
    const { error } = brandValidate(req.body)
    if (error) return res.status(400).json({
        success: false,
        message: error.details[0].message
    })
    let brand = new Brand(_.pick(req.body, ['name', 'desc', 'image']))
    brand = await brand.save()
    return res.json({
        success: true,
        message: _.pick(brand, ['name', 'desc'])
    })
})

route.get('/', async(req, res) => {

    const brand = await Brand.find().select("name")
    return res.json({ success: true, message: brand })
})

module.exports = route