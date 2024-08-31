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
exports.Tables = void 0;
const Table_1 = require("../models/Table");
const Order_1 = require("../models/Order");
class Tables {
    static getTables(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield Table_1.tableModel.find({});
                return res.json(result);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static createTable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Table_1.tableModel.create({
                    seats: req.body.seats,
                    name: req.body.name
                });
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static getOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tableOrders = yield Order_1.orderModel.find({ tableId: req.body.table }).populate('menuId');
                return res.json(tableOrders);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static getTablesIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tables = yield Table_1.tableModel.find({}, ['name', 'income']);
                return res.json(tables);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
}
exports.Tables = Tables;
//# sourceMappingURL=tables.js.map