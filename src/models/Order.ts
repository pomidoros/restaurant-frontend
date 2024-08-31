import { Schema, Types, model } from 'mongoose'


type TStatus = 'on_hold' | 'in_process' | 'ready' | 'completed'

interface IOrder {
    status: TStatus,
    tableId: Types.ObjectId,
    menuId: Types.ObjectId
}

const orderSchema = new Schema<IOrder>({
    tableId: { type: Schema.Types.ObjectId, required: true, ref: 'Tables' },
    menuId: { type: Schema.Types.ObjectId, required: true, ref: 'Menu' },
    status: { type: String, required: true }
})

const orderModel = model<IOrder>('Order', orderSchema)

export { orderModel }