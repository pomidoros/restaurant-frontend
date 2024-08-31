import express from 'express'

import { Auth } from '../controllers/auth'

const authRouter = express.Router()

authRouter.post('/auth/signup', Auth.signup)
authRouter.post('/auth/login', Auth.login)
authRouter.post('/auth/verify', Auth.verify)

export default authRouter