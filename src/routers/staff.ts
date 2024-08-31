import express from 'express'
import {Auth} from '../controllers/auth'
import {Staff} from '../controllers/staff'

const staffRouter = express.Router()

staffRouter.get('/staff/waiter/has-table', Auth.verify, Staff.hasTable)
staffRouter.put('/staff/waiter/accept-table', Auth.verify, Auth.isWaiter, Staff.acceptTable)
staffRouter.get('/staff/waiter/table', Auth.verify, Auth.isWaiter, Staff.waiterTable)
staffRouter.put('/staff/waiter/complete', Auth.verify, Auth.isWaiter, Staff.completeOrder)
staffRouter.put('/staff/waiter/complete-table', Auth.verify, Auth.isWaiter, Staff.completeTable)

staffRouter.put('/staff/maker/accept-order', Auth.verify, Auth.isMaker, Staff.acceptOrder)
staffRouter.get('/staff/maker/order', Auth.verify, Auth.isMaker, Staff.getOwnOrder)
staffRouter.put('/staff/maker/done', Auth.verify, Auth.isMaker, Staff.doneOrder)

staffRouter.get('/staff/cashier/staff-info', Auth.verify, Auth.isCashier, Staff.getStaffInfo)
export default staffRouter