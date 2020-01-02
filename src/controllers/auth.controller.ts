import { Request, Response, NextFunction } from 'express'
import md5 from 'md5'
import { Auth } from '../interface/auth'
import { authModel } from '../models/authentication.model'
import { send } from '../util/send'
import jwt from 'jsonwebtoken'
const { JWT_SECRET } = process.env

function hashPassword(password: string) {
    // DEV_NOTES To make things simple, using md5 for hashing passwords
    return md5(password)
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth: Auth = req.body
        auth.password = hashPassword(auth.password)
        const result = await authModel.findOne(auth) // DEV_NOTES null if not found else object
        if (!result) {
            return next({ message: `Bad Request`, httpStatusCode: 400 })
        }
        const payloadForJwtCreation = {
            user: auth.userName
        }
        const token = await jwt.sign(payloadForJwtCreation, JWT_SECRET, { expiresIn: "1h" }) // DEV_NOTES jwt token expires in one hour
        send(res, { token }, "Jwt token generated")
    } catch (error) {
        next(error)
    }
}
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth: Auth = req.body
        auth.password = hashPassword(auth.password)
        await new authModel(auth).save()
        send(res, {user: auth.userName}, "User registered!")
    } catch (error) {
        next(error)
    }
}
export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    send(res, {}, "valid token")
}


