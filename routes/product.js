const product = require("../models/Products");
const express = require("express");

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


module.exports = router;    