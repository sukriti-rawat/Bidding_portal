"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var authentication_model_1 = require("../models/authentication.model");
var product_model_1 = require("../models/product.model");
var send_1 = require("../util/send");
var JWT_SECRET = process.env.JWT_SECRET;
exports.addProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, data, payload, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                userId = req.body.userId;
                delete req.body._id;
                return [4 /*yield*/, authentication_model_1.authModel.findOne({ _id: userId }).lean()];
            case 1:
                data = _a.sent();
                if (data === null) {
                    return [2 /*return*/, send_1.send(res, {}, "User not Found", 400)];
                }
                payload = {
                    productName: req.body.productName,
                    productDescription: req.body.productDescription,
                    price: req.body.Price,
                    bids: [],
                    sold: false
                };
                if (!(data.role === "Admin")) return [3 /*break*/, 3];
                return [4 /*yield*/, new product_model_1.productModel(payload).save()];
            case 2:
                _a.sent();
                return [2 /*return*/, send_1.send(res, { payload: payload }, "Product Added")];
            case 3: return [2 /*return*/, next({ msg: "Trader cannot create product", httpStatusCode: 400 })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.acceptBid = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId_1, productId, foundProduct, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, userId_1 = _a.userId, productId = _a.productId;
                return [4 /*yield*/, product_model_1.productModel.findOne({ _id: productId }).lean()];
            case 1:
                foundProduct = _b.sent();
                if (foundProduct === null) {
                    return [2 /*return*/, next({ msg: "Product not found" })];
                }
                foundProduct.bids.map(function (bid) {
                    if (bid.userId === userId_1) {
                        bid.status = true;
                    }
                });
                return [4 /*yield*/, product_model_1.productModel.updateOne({ _id: foundProduct._id }, foundProduct)];
            case 2:
                _b.sent();
                send_1.send(res, {}, "Bid accepted");
                return [3 /*break*/, 4];
            case 3:
                error_2 = _b.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.placeBid = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, productId, price, data, bidPayload, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = req.body, userId = _a.userId, productId = _a.productId, price = _a.price;
                return [4 /*yield*/, authentication_model_1.authModel.findOne({ _id: userId })];
            case 1:
                data = _b.sent();
                if (data === null) {
                    return [2 /*return*/, send_1.send(res, {}, "User not Found", 400)];
                }
                bidPayload = {
                    userId: userId,
                    price: price,
                    status: false
                };
                if (!(data.role === "Trader")) return [3 /*break*/, 3];
                return [4 /*yield*/, product_model_1.productModel.findByIdAndUpdate({ _id: productId }, { $push: { bids: bidPayload } })];
            case 2:
                _b.sent();
                return [2 /*return*/, send_1.send(res, {}, "Bid placed")];
            case 3: return [2 /*return*/, next({ msg: "Trader not found" })];
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                next(error_3);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.getProduct = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var productId, result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                productId = req.query.productId;
                result = null;
                if (!productId) return [3 /*break*/, 2];
                return [4 /*yield*/, product_model_1.productModel.find({ _id: productId })];
            case 1:
                result = _a.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, product_model_1.productModel.find()];
            case 3:
                result = _a.sent();
                _a.label = 4;
            case 4:
                send_1.send(res, { result: result }, "");
                return [3 /*break*/, 6];
            case 5:
                error_4 = _a.sent();
                next(error_4);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
