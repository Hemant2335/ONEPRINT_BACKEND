const express = require('express');
const cors = require('cors');
require('dotenv').config(); // This loads the environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));


app.listen(3000, () => {

    console.log('Server is running on port 3000');
});