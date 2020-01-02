"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var productSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    bids: [{
            userId: { type: String, required: true, unique: true },
            price: { type: Number, required: true },
            status: Boolean
        }],
    sold: { type: Boolean }
});
exports.productModel = mongoose_1.model('productModel', productSchema);
