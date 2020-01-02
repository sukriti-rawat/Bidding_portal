"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var product_controller_1 = require("../controllers/product.controller");
var express_1 = __importDefault(require("express"));
exports.productRouter = express_1["default"].Router();
exports.productRouter
    .route("/product")
    .get(product_controller_1.getProduct)
    .post(product_controller_1.addProduct);
// productRouter.route("/product/all").get(getAllProduct);
exports.productRouter.route("/bid").post(product_controller_1.placeBid);
exports.productRouter.route("/acceptBid").post(product_controller_1.acceptBid);
