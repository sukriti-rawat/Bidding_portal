"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// Sets environment for application using .env file on root (default)
var dotenv_1 = require("dotenv");
dotenv_1.config();
var express_1 = __importDefault(require("express"));
var app = express_1["default"]();
var _a = process.env, PORT = _a.PORT, MONGODB_URL = _a.MONGODB_URL;
console.log(MONGODB_URL);
var body_parser_1 = require("body-parser");
var auth_route_1 = require("./routes/auth.route");
var product_route_1 = require("./routes/product.route");
var mongoose_1 = require("mongoose");
var send_1 = require("./util/send");
var validateToken_1 = require("./util/validateToken");
mongoose_1.connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true })
    .then(function () { return console.log("connected"); })["catch"](function (err) { return console.log("Db not connected", err); });
app.use(body_parser_1.json());
app.use("/auth", auth_route_1.authRouter);
app.use("/crud", validateToken_1.validateTokenMiddleWare, product_route_1.productRouter);
app.get("/", function (req, res) {
    send_1.send(res, {}, "Bidding  Portal is awesome");
});
app.use(function (err, req, res, next) {
    var errorResponsePatter = {
        message: err.message || "Internal Server Error"
    };
    res.status(err.httpStatusCode || 500).send(errorResponsePatter);
});
app.get("*", function (req, res) {
    res.status(401).send("unauthorized");
});
app.listen(PORT, function () { return console.log("server on port : " + PORT); });
