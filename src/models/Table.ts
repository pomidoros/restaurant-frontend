import { Schema, model } from 'mongoose'


interface ITable {
    occupied: boolean
    seats: number,
    orders: number,
    completedOrders: number
    name: string,
    income: number
}

const tableSchema = new Schema<ITable>({
    occupied: { type: Boolean, required: true, default: false },
    seats: { type: Number, required: true },
    orders: { type: Number, required: true, default: 0 },
    completedOrders: { type: Number, required: true, default: 0 },
    name: { type: String, required: true, unique: true },
    income: { type: Number, required: true, default: 0 }
})

const tableModel = model<ITable>('Tables', tableSchema)

export { tableModel }
