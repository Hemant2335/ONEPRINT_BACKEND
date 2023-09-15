const product = require("../models/Products");
const express = require("express");
const Category = require("../models/Category");
const Genre = require("../models/Genre");

const router = express.Router();

router.get("/products", async(req, res) => {

    try {
        const products = await product.find();
        res.json(products);
    } catch (error) {
        console.log("Some Error Occuered");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/products/:productname", async(req, res) => {

    try {
        const products = await product.find({name: req.params.productname});
        const category = await Category.find({id : products.category});
        const genre = await Genre.find({id : products.genre});
        res.json(products , category , genre);
    } catch (error) {
        console.log("Some Error Occuered");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/:cat", async(req, res) => {

    try {
        const cat = await Category.findOne({ name: req.params.cat });
        const products = await product.find({ category: cat });
        res.json(products);
    } catch (error) {
        console.log("Some Error Occuered");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/category", async(req, res) => {

    try {
        const category = await Category.find();
        res.json(category);
    } catch (error) {
        console.log("Some Error Occuered");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/genre", async(req, res) => {

    try {
        const genre = await Genre.find();
        res.json(genre);
    } catch (error) {
        console.log("Some Error Occuered");
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;    