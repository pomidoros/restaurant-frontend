import express from 'express'
import { Orders } from '../controllers/orders'
import { Auth } from '../controllers/auth'

const ordersRouter = express.Router()

ordersRouter.get('/orders/active', Auth.verify, Orders.getActiveOrders)
ordersRouter.put('/orders/create', Auth.verify, Auth.isWaiter, Orders.createOrder)

export default ordersRouter