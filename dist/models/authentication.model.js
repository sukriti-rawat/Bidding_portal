"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var authSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
});
exports.authModel = mongoose_1.model('authModel', authSchema);
