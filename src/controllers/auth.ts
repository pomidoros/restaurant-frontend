import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { staffModel } from '../models/Staff'

const SECRET = 'restaurant'

interface ITokenPayload {
    username: string
    role: string
}

interface IRegBody {
    username: string
    password: string
    role: string
}

interface ILogin {
    username: string
    password: string
}

class Auth {
    static generateAccessToken(data: ITokenPayload): string {
        return jwt.sign(data, SECRET, { expiresIn: '2h' })
    }

    private static getToken(req: Request) {
        const authHeader = req.headers['authorization'] || ''

        return authHeader && authHeader.split(' ')[0] == 'Bearer' ?
            authHeader.split(" ")[1] :
            false;
    }

    static async isWaiter(req: Request, res: Response, next: NextFunction) {
        const role = res.locals.staff.role
        if (role != 'waiter')
            return res.status(401).json({ msg: 'Access denied' })
        return next()
    }

    static async isMaker(req: Request, res: Response, next: NextFunction) {
        const role = res.locals.staff.role
        if (role != 'cooker' && role != 'bartender')
            return res.status(401).json({ msg: 'Access denied' })
        return next()
    }

    static async isCashier(req: Request, res: Response, next: NextFunction) {
        const role = res.locals.staff.role
        if (role != 'cashier')
            return res.status(401).json({ msg: 'Access denied' })
        return next()
    }

    static async verify(req: Request, res: Response, next: NextFunction) {
        const token = Auth.getToken(req)

        if (token == false)
            return res.status(401).json({ verify: false })

        try {
            const data = jwt.verify(token, SECRET) as ITokenPayload
            const users = await staffModel.find({
                username: data.username,
                role: data.role
            })

            if (users.length == 0)
                return res.status(403).json({ verify: false })

            res.locals.staff = users[0]
            return next()
        } catch (err) {
            return res.status(403).json({ verify: false, msg: 'Access denied' })
        }
    }

    static async login(req: Request<any, any, any, ILogin>, res: Response) {
        try {
            const users = await staffModel.find({username: req.body.username})
            if (users.length == 0)
                return res.json({isAuth: false, msg: 'Doesn\'t exists'})
            if (!bcrypt.compareSync(req.body.password, users[0].pwd))
                return res.json({isAuth: false, msg: 'Doesn\'t correct password'})
            const token = Auth.generateAccessToken({
                role: users[0].role,
                username: req.body.username
            })

            return res.json({ isAuth: true, token: token, username: users[0].username, role: users[0].role })
        } catch (err) {
            return res.status(300).json({ isAuth: false, msg: 'Something went wrong' })
        }
    }

    static async signup(req: Request<any, any, any, IRegBody>, res: Response) {
        try {
            const usernames = await staffModel.find({ username: req.body.username })
            if (usernames.length == 0) {
                const hashPassword = bcrypt.hashSync(req.body.password, 8)
                await staffModel.create({
                    role: req.body.role,
                    username: req.body.username,
                    pwd: hashPassword
                })

                return res.json({ status: true })
            }
            return res.status(400).json({ status: false, msg: 'Already exists' })
        } catch (e) {
            console.log(e)
            return res.status(400).json({ status: false })
        }
    }
}

export { Auth }