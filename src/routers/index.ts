import express from 'express'

import ordersRouter from './orders'
import tablesRouter from './tables'
import authRouter from './auth'
import menuRouter from './menu'
import staffRouter from './staff'

const router = express.Router()

router.use(ordersRouter)
router.use(tablesRouter)
router.use(authRouter)
router.use(menuRouter)
router.use(staffRouter)

export default router