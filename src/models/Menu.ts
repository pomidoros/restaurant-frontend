import { Schema, model } from 'mongoose'

type TMenuItemType = 'beverage' | 'dish'


type TPrice = {
    eur: number,
    cents: number
}

export interface IMenuItem {
    type: TMenuItemType,
    name: string,
    price: TPrice
}

const menuSchema = new Schema<IMenuItem>({
    name: { type: String, required: true, unique: true },
    price: { type: { eur: Number, cents: Number }, required: true },
    type: { type: String, required: true }
})

export const menuModel = model<IMenuItem>('Menu', menuSchema)
