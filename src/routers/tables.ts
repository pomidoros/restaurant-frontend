import express from 'express'
import { Tables } from '../controllers/tables'
import { Auth } from '../controllers/auth'

const tablesRouter = express.Router()

tablesRouter.get('/tables', Auth.verify, Tables.getTables)
tablesRouter.put('/tables/create', Auth.verify, Auth.isWaiter, Tables.createTable)
tablesRouter.post('/tables/orders', Auth.verify, Auth.isWaiter, Tables.getOrders)
tablesRouter.get('/tables/income', Auth.verify, Auth.isCashier, Tables.getTablesIncome)

export default tablesRouter
