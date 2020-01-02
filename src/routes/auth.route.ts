import { login, registerUser, validateToken } from './../controllers/auth.controller';
import express from 'express'
import { validateTokenMiddleWare } from '../util/validateToken';

export const authRouter = express.Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', login)
authRouter.get('/validateToken', validateTokenMiddleWare, validateToken)






