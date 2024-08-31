"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    tableId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Tables' },
    menuId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'Menu' },
    status: { type: String, required: true }
});
const orderModel = (0, mongoose_1.model)('Order', orderSchema);
exports.orderModel = orderModel;
//# sourceMappingURL=Order.js.map