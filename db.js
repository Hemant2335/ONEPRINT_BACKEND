const mongoose = require("mongoose");
const username = encodeURIComponent("do_one");
const password = encodeURIComponent("Doone_456");

const mongoURI = `mongodb+srv://${username}:${password}@cluster0.j52p8jv.mongodb.net/stickerverse`;

const ConnectToMongo = async () => {
    try {
        // Connect to the MongoDB Atlas cluster
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,         // Use the new URL parser (required)
            useUnifiedTopology: true,     // Use the new unified topology engine (required)
        });
        console.log("The database has been connected");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        
    }
};

module.exports = ConnectToMongo;
