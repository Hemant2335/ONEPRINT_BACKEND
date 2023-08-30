const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const multer = require('multer');
const cloudinary = require('cloudinary');

const router = express.Router();

cloudinary.v2.config({
  cloud_name: 'dt7uzawmf',
  api_key: '919963862632711',
  api_secret: 'agNtvWOz5AZRn70xD1F8O_la_0o',
  secure: true,
});

const storage = multer.memoryStorage(); // Stores file in memory as buffer
const upload = multer({ storage: storage });

router.post("/upload/:uid", fetchuser, upload.single('image'), async (req, res) => {
  try {
    // Access the uploaded file from req.file
    const fileBuffer = req.file.buffer;
    let Check = false;

    // Convert the buffer to a readable stream
    const readableStream = cloudinary.v2.uploader.upload_stream({ folder: 'uploads' }, (error, result) => {
      if (error) {
        console.error('Upload error:', error);
        res.status(400).send({ Check: Check, error: "Some Error Occurred" });
      } else {
        Check = true;
        const imageUrl = result.secure_url;
        res.status(200).send({ Check: Check, status: 'Upload successful', imageUrl: imageUrl });
      }
    });

    // Write the buffer to the readable stream
    readableStream.write(fileBuffer);
    readableStream.end();

  } catch (error) {
    console.error('Upload error:', error);
    res.status(400).send("Some Error Occurred");
  }
});

module.exports = router;
