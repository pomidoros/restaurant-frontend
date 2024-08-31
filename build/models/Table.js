"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableModel = void 0;
const mongoose_1 = require("mongoose");
const tableSchema = new mongoose_1.Schema({
    occupied: { type: Boolean, required: true, default: false },
    seats: { type: Number, required: true },
    orders: { type: Number, required: true, default: 0 },
    completedOrders: { type: Number, required: true, default: 0 },
    name: { type: String, required: true, unique: true },
    income: { type: Number, required: true, default: 0 }
});
const tableModel = (0, mongoose_1.model)('Tables', tableSchema);
exports.tableModel = tableModel;
//# sourceMappingURL=Table.js.map