const express = require('express');
const cors = require('cors');
require('dotenv').config(); // This loads the environment variables from .env
const Connecttomongo = require('./db');

// Connecting to the mongodb server
Connecttomongo();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));


app.listen(3000, () => {

    console.log('Server is running on port 3000');
});