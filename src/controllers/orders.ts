import { Request, Response } from "express";
import {orderModel} from "../models/Order";
import {STATUS_ON_HOLD} from "../constants";
import {tableModel} from "../models/Table";

interface IOrderBody {
    table: string,
    menu: string
}


class Orders {
    static async getActiveOrders(req: Request, res: Response) {
        try {
            const orders = await orderModel.find({status: {$ne: 'completed'}}).populate(['menuId', 'tableId'])
            return res.json(orders)
        } catch(e) {
            return res.status(400).json({ error: true })
        }
    }

    static async createOrder(req: Request<any, any, any, any, IOrderBody>, res: Response) {
        try {
            await orderModel.create({
                status: STATUS_ON_HOLD,
                tableId: req.body.table,
                menuId: req.body.menu
            })
            await tableModel.updateOne({_id: req.body.table}, {
                $inc: {
                    orders: 1
                }
            })
            return res.json({ error: false })
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }
}

export { Orders }