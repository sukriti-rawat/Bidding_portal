import jwt from 'jsonwebtoken';
const { JWT_SECRET } = process.env

export async function validateTokenMiddleWare(req, res, next) {
    try {
        const token = req.header("token")
        await jwt.verify(token, JWT_SECRET)
        next()
    } catch (error) {
        next({ message: "Unauthorized", httpStatusCode: 401 })
    }
}
