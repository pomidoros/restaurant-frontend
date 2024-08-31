import { Request, Response } from "express";

import { tableModel } from "../models/Table";
import {orderModel} from "../models/Order";

interface IAllTablesBody {
    seats: number,
    name: string
}


class Tables {
    static async getTables(req: Request, res: Response) {
        try {
            const result = await tableModel.find({})
            return res.json(result)
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async createTable(req: Request<any, any, any, any, IAllTablesBody>, res: Response) {
        try {
            await tableModel.create({
                seats: req.body.seats,
                name: req.body.name
            })
            return res.json({ error: false })
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async getOrders(req: Request, res: Response) {
        try {
            const tableOrders = await orderModel.find({tableId: req.body.table}).populate('menuId')
            return res.json(tableOrders)
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async getTablesIncome(req: Request, res: Response) {
        try {
            const tables = await tableModel.find({}, ['name', 'income'])
            return res.json(tables)
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }
}

export { Tables }