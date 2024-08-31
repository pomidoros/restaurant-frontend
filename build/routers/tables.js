"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tables_1 = require("../controllers/tables");
const auth_1 = require("../controllers/auth");
const tablesRouter = express_1.default.Router();
tablesRouter.get('/tables', auth_1.Auth.verify, tables_1.Tables.getTables);
tablesRouter.put('/tables/create', auth_1.Auth.verify, auth_1.Auth.isWaiter, tables_1.Tables.createTable);
tablesRouter.post('/tables/orders', auth_1.Auth.verify, auth_1.Auth.isWaiter, tables_1.Tables.getOrders);
tablesRouter.get('/tables/income', auth_1.Auth.verify, auth_1.Auth.isCashier, tables_1.Tables.getTablesIncome);
exports.default = tablesRouter;
//# sourceMappingURL=tables.js.map