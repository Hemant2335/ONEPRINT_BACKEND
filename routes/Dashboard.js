const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const cloudinary = require('cloudinary');

const router = express.Router();

cloudinary.v2.config({
  cloud_name: 'dt7uzawmf',
  api_key: '919963862632711',
  api_secret: 'agNtvWOz5AZRn70xD1F8O_la_0o',
  secure: true,
});

router.post("/upload", fetchuser ,async (req, res) => {
// Path to the image you want to upload
const imagePath = "C:\Users\knrt7\Downloads\poster.jpeg";
// Upload the image to Cloudinary
cloudinary.uploader.upload(imagePath, { folder: 'uploads' }, (error, result) => {
  if (error) {
    console.error('Upload error:', error);
    res.status(400).send("Some Error Occured")
  } else {
    res.status(200).send({status : 'Upload successful', result : result})
    console.log('Upload successful:', result);
    // You can access the uploaded image URL using result.url
  }
});

});

module.exports = router;