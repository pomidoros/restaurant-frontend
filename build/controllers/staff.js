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
exports.Staff = void 0;
const Staff_1 = require("../models/Staff");
const Table_1 = require("../models/Table");
const Order_1 = require("../models/Order");
class Staff {
    static getStaffInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const staff = yield Staff_1.staffModel.find({}, ['username', 'serviced', 'role']);
                return res.json(staff);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static hasTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json({ answer: res.locals.staff.table != undefined });
        });
    }
    static waiterTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const tableId = res.locals.staff.table;
            if (!tableId)
                return res.json('');
            return res.json(tableId);
        });
    }
    static acceptTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Staff_1.staffModel.updateOne({ username: res.locals.staff.username }, {
                    table: req.body.table
                });
                yield Table_1.tableModel.updateOne({ _id: req.body.table }, {
                    occupied: true
                });
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static acceptOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Staff_1.staffModel.updateOne({ username: res.locals.staff.username }, {
                    order: req.body.order,
                });
                yield Order_1.orderModel.updateOne({ _id: req.body.order }, {
                    status: 'in_process'
                });
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static getOwnOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!res.locals.staff.order)
                    return res.json('');
                return res.json(res.locals.staff.order);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static doneOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Staff_1.staffModel.updateOne({ username: res.locals.staff.username }, {
                    order: null,
                    $inc: {
                        serviced: 1
                    }
                });
                yield Order_1.orderModel.updateOne({ _id: req.body.order }, {
                    status: 'ready'
                });
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static completeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Table_1.tableModel.updateOne({ _id: res.locals.staff.table }, {
                    $inc: {
                        completedOrders: 1
                    }
                });
                yield Order_1.orderModel.updateOne({ _id: req.body.order }, {
                    status: 'completed'
                });
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static completeTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield Order_1.orderModel.find({ tableId: res.locals.staff.table }).populate('menuId');
                const income = orders.reduce((summ, order) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return summ + order.menuId.price.eur * 100 + order.menuId.price.cents;
                }, 0);
                yield Table_1.tableModel.updateOne({ _id: res.locals.staff.table }, {
                    orders: 0,
                    completedOrders: 0,
                    occupied: false,
                    $inc: {
                        income: income
                    }
                });
                yield Staff_1.staffModel.updateOne({ _id: res.locals.staff._id }, {
                    table: null,
                    $inc: {
                        serviced: 1
                    }
                });
                yield Order_1.orderModel.deleteMany({ tableId: res.locals.staff.table });
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
}
exports.Staff = Staff;
//# sourceMappingURL=staff.js.map