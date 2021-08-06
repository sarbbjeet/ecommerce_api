# ecommerce_api
Create an e-commerce API with node js, express, and mongodb.

# Features 
- create product,brand and categories of product 
- manage product cart (GET, POST, PUT)

# access api routes
- GET /api/brands result ex: { name: "nike", desc: "xyz", image: "img.com"}
- POST /api/brands add brand to database ex: {name: "abc", desc: "", image: "ad.com"}
- GET/ POST /api/cats cateoriges added to database 
- GET POST AND PUT /api/carts 
  example: {product_id: "", numberOfItems: 12}
  
  # logic to copy .json file data to database
  - copyProductToDB.js file
  
 ````
  const { Product, productValidate } = require('../models/product')
  const { Cat } = require('../models/cat') 
  const { Brand } = require('../models/brand')
  const _ = require('lodash')
  require('./db')() //connect to mongodb database
  let errors = []
  const fs = require('fs')
  const path = require('path')
  const filePath = path.join(__dirname, 'products.json')

const copyProductToDB = () => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err.message)
        } else {
            const jsondata = JSON.parse(data)
                //before writing data to database validate complete .json file
            jsondata.forEach(element => {
                const { error } = productValidate(element)
                if (error) errors.push(error.details[0].message)
            });
            if (errors.length > 0) {
                console.log(".json file has wrong data entries")
                errors = [] //make array empty 
            } else {
                jsondata.forEach(async function(e1) {
                    try {
                        const cat = await Cat.findById(e1.cat_id)
                        const brand = await Brand.findById(e1.brand_id)
                            // console.log('cat == ', cat)
                        if (!cat) return console.error("cat not found")
                        if (!brand) return console.error("brand not found")
                        const object1 = _.pick(e1, ['name', 'desc', 'image', 'itemsAvailable', 'cat_id', 'brand_id', 'price'])
                        let product = new Product({...object1, brand_name: brand.name, cat_name: cat.name })
                        return console.info(await product.save())
                            // console.log(product)
                    } catch (err) {
                        console.error(err.message)
                        return err.message
                    }
                })
            }
        }
        //  mongoose.disconnect() //disconnect mongodb server
    })
}


copyProductToDB()
````
  

