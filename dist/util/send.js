"use strict";
exports.__esModule = true;
function send(res, data, msg, httpStatusCode) {
    if (httpStatusCode === void 0) { httpStatusCode = 200; }
    var responsePattern = {
        data: data,
        message: msg
    };
    res.status(httpStatusCode).send(responsePattern);
}
exports.send = send;
