import { Response } from "express";

export function send(res: Response, data, msg, httpStatusCode = 200) {
    const responsePattern = {
        data: data,
        message: msg,
    }
    res.status(httpStatusCode).send(responsePattern)
}