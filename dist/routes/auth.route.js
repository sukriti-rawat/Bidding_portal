"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var auth_controller_1 = require("./../controllers/auth.controller");
var express_1 = __importDefault(require("express"));
var validateToken_1 = require("../util/validateToken");
exports.authRouter = express_1["default"].Router();
exports.authRouter.post('/register', auth_controller_1.registerUser);
exports.authRouter.post('/login', auth_controller_1.login);
exports.authRouter.get('/validateToken', validateToken_1.validateTokenMiddleWare, auth_controller_1.validateToken);
