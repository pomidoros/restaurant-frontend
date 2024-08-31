import { Schema, Types, model } from 'mongoose'

type TRole = 'admin' | 'waiter' | 'cooker' | 'bartender'

interface IStaff {
    role: TRole,
    username: string,
    pwd: string,
    table?: Types.ObjectId | null,
    order?: Types.ObjectId | null,
    serviced: number
}

const staffSchema = new Schema<IStaff>({
    role: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
    table: { type: Schema.Types.ObjectId, ref: 'Table' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    serviced: { type: Number, required: true, default: 0 }
})

const staffModel = model<IStaff>('Staff', staffSchema)

export { staffModel }