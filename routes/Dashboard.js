const express = require("express");
const fetchuser = require("../middlewares/fetchuser");

const router = express.Router();


router.post("/upload/:uid", fetchuser ,async (req, res) => {
    try {
        console.log("I am upload")
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;