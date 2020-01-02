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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var md5_1 = __importDefault(require("md5"));
var authentication_model_1 = require("../models/authentication.model");
var send_1 = require("../util/send");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_SECRET = process.env.JWT_SECRET;
function hashPassword(password) {
    // DEV_NOTES To make things simple, using md5 for hashing passwords
    return md5_1["default"](password);
}
exports.login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, result, payloadForJwtCreation, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                auth = req.body;
                auth.password = hashPassword(auth.password);
                return [4 /*yield*/, authentication_model_1.authModel.findOne(auth)]; // DEV_NOTES null if not found else object
            case 1:
                result = _a.sent() // DEV_NOTES null if not found else object
                ;
                if (!result) {
                    return [2 /*return*/, next({ message: "Bad Request", httpStatusCode: 400 })];
                }
                payloadForJwtCreation = {
                    user: auth.userName
                };
                return [4 /*yield*/, jsonwebtoken_1["default"].sign(payloadForJwtCreation, JWT_SECRET, { expiresIn: "1h" })]; // DEV_NOTES jwt token expires in one hour
            case 2:
                token = _a.sent() // DEV_NOTES jwt token expires in one hour
                ;
                send_1.send(res, { token: token }, "Jwt token generated");
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.registerUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var auth, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                auth = req.body;
                auth.password = hashPassword(auth.password);
                return [4 /*yield*/, new authentication_model_1.authModel(auth).save()];
            case 1:
                _a.sent();
                send_1.send(res, { user: auth.userName }, "User registered!");
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                next(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.validateToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        send_1.send(res, {}, "valid token");
        return [2 /*return*/];
    });
}); };
