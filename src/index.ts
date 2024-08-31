import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connect } from 'mongoose'

import router from './routers'

dotenv.config()

const port = process.env.PORT || 3000
const dbUser = process.env.MONGODB_USER
const dbPwd = process.env.MONGODB_PASSWORD
const dbHost = process.env.MONGODB_HOST || '127.0.0.1'
const dbPort = process.env.MOGNODB_PORT || 27017
const dbName = process.env.MONGODB_BASE || 'admin'

try {
    connect(`mongodb://${dbHost}:${dbPort}`, {
        user: dbUser,
        pass: dbPwd,
        dbName: dbName
    }).catch(err => {
        throw err
    })
    const app: Express = express()
    app.use(cors())
    app.use(express.json())
    app.use(router)

    app.listen(port)
} catch (e) {
    console.log("Ошибка")
   // console.log(e)
}