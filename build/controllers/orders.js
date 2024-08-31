"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const Order_1 = require("../models/Order");
const constants_1 = require("../constants");
const Table_1 = require("../models/Table");
class Orders {
    static getActiveOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.orderModel.find({ status: { $ne: 'completed' } }).populate(['menuId', 'tableId']);
                return res.json(orders);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Order_1.orderModel.create({
                    status: constants_1.STATUS_ON_HOLD,
                    tableId: req.body.table,
                    menuId: req.body.menu
                });
                yield Table_1.tableModel.updateOne({ _id: req.body.table }, {
                    $inc: {
                        orders: 1
                    }
                });
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
}
exports.Orders = Orders;
//# sourceMappingURL=orders.js.map