const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    description: {
        type: String,
        trim: true,
        required: true,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    genre : {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
});

const Products = mongoose.model("Product", productSchema);

module.exports = Products;