var Product = require('../models/product_model');
var mongoose = require('mongoose');

//add product
const add_product = async (req, res) => {

    var new_product = new Product();
    console.log(req.body)
    new_product.price = req.body.price
    new_product.description = req.body.description
    new_product.name = req.body.name
    new_product.date = req.body.date
    new_product.image = req.body.image
    try {
        //save model to database
        await new_product.save();
        console.log("add_product, product added succesfuly: \n" + new_product);
        res.status(200).send("product added successfuly!");
    } catch (error) {
        console.log("Error add product" + new_product + "\n" + error);
        res.status(400).send(error);
    }




}

//update product
const update_product = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params["productID"], req.body, { new: true });
        console.log("update_product, product: \n" + req.body + " \nupdated successfuly!");
        res.status(200).send("product with id: " + req.params["productID"] + " updated successfuly!");
    } catch (error) {
        console.log("Error update product: \n" + req.body + " \n" + err);
        res.status(500).send(err);
    }


}

//get products list
const get_products_list = async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("get_products_list, found: " + products.length + " products");
        res.status(200).send(products);
    } catch (error) {
        console.log("error in getting the products list" + error);
        res.status(400).send(error);
    }

}

//get last products (returns a list of products created in the last week)
const get_last_products = async (req, res) => {
    try {
        const products = await Product.find({ //query today up to tonight
            date: {
                $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
            }
        });
        console.log("get_last_products, success in searching last week new products");
        res.status(200).send(products);
    } catch (error) {
        console.log("Error in searching last week new products" + error);
        res.status(500).send(err);
    }

}

//get_product
const get_product = async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params["productId"] });
        console.log("get_product, success in searching product with id:\n" + product);
        res.status(200).send(product);
    } catch (error) {
        console.log("Error in searching product with id:" + req.params["productId"] + error);
        res.status(500).send(error);
    }


}

module.exports = {
    add_product,
    update_product,
    get_products_list,
    get_last_products,
    get_product
}
