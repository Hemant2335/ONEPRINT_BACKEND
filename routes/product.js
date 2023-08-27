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