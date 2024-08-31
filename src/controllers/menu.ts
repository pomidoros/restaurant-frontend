import { Request, Response } from 'express'
import {IMenuItem, menuModel} from "../models/Menu";

export class Menu {
    static async getAll(req: Request, res: Response) {
        try {
            const data: IMenuItem[] = await menuModel.find({})
            return res.json(data)
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async getBeverages(req: Request, res: Response) {
        try {
            const data: IMenuItem[] = await menuModel.find({ type: 'beverage' })
            return res.json(data)
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async getDishes(req: Request, res: Response) {
        try {
            const data: IMenuItem[] = await menuModel.find({ type: 'dish' })
            return res.json(data)
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }

    static async setItem(req: Request<any, any, any, any, IMenuItem>, res: Response) {
        try {
            console.log(req.body)
            await menuModel.create({
                ...req.body
            })
            return res.json({ error: false })
        } catch (e) {
            return res.status(400).json({ error: true })
        }
    }
}