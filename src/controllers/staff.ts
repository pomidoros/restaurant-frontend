import { Request, Response } from 'express'
import {staffModel} from "../models/Staff";
import {tableModel} from "../models/Table";
import {orderModel} from "../models/Order";

export class Staff {
    static async getStaffInfo(req: Request, res: Response) {
        try {
            const staff = await staffModel.find({}, ['username', 'serviced', 'role'])
            return res.json(staff)
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async hasTable(req: Request, res: Response) {
        return res.json({ answer: res.locals.staff.table != undefined })
    }

    static async waiterTable(req: Request, res: Response) {
        const tableId = res.locals.staff.table
        if (!tableId)
            return res.json('')
        return res.json(tableId)
    }

    static async acceptTable(req: Request, res: Response) {
        try {
            await staffModel.updateOne({username: res.locals.staff.username}, {
                table: req.body.table
            })
            await tableModel.updateOne({_id: req.body.table}, {
                occupied: true
            })
            return res.json({ error: false })
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async acceptOrder(req: Request, res: Response) {
        try {
            await staffModel.updateOne({username: res.locals.staff.username}, {
                order: req.body.order,
            })
            await orderModel.updateOne({_id: req.body.order}, {
                status: 'in_process'
            })
            return res.json({ error: false })
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async getOwnOrder(req: Request, res: Response) {
        try {
            if (!res.locals.staff.order) return res.json('')
            return res.json(res.locals.staff.order)
        } catch (e) {
            return res.status(400).json({error: true})
        }
    }

    static async doneOrder(req: Request, res: Response) {
        try {
            await staffModel.updateOne({username: res.locals.staff.username}, {
                order: null,
                $inc: {
                    serviced: 1
                }
            })
            await orderModel.updateOne({_id: req.body.order}, {
                status: 'ready'
            })
            return res.json({ error: false })
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async completeOrder(req: Request, res: Response) {
        try {
            await tableModel.updateOne({_id: res.locals.staff.table}, {
                $inc: {
                    completedOrders: 1
                }
            })
            await orderModel.updateOne({_id: req.body.order}, {
                status: 'completed'
            })
            return res.json({error: false})
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async completeTable(req: Request, res: Response) {
        try {
            const orders = await orderModel.find({ tableId: res.locals.staff.table}).populate('menuId')
            const income = orders.reduce((summ, order) => {

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return summ + order.menuId.price.eur * 100 + order.menuId.price.cents
            }, 0)
            await tableModel.updateOne({ _id: res.locals.staff.table }, {
                orders: 0,
                completedOrders: 0,
                occupied: false,
                $inc: {
                    income: income
                }
            })
            await staffModel.updateOne({ _id: res.locals.staff._id }, {
                table: null,
                $inc: {
                    serviced: 1
                }
            })
            await orderModel.deleteMany({tableId: res.locals.staff.table})
            return res.json({ error: false })
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }
}
