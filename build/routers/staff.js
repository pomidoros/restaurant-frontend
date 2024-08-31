"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const staff_1 = require("../controllers/staff");
const staffRouter = express_1.default.Router();
staffRouter.get('/staff/waiter/has-table', auth_1.Auth.verify, staff_1.Staff.hasTable);
staffRouter.put('/staff/waiter/accept-table', auth_1.Auth.verify, auth_1.Auth.isWaiter, staff_1.Staff.acceptTable);
staffRouter.get('/staff/waiter/table', auth_1.Auth.verify, auth_1.Auth.isWaiter, staff_1.Staff.waiterTable);
staffRouter.put('/staff/waiter/complete', auth_1.Auth.verify, auth_1.Auth.isWaiter, staff_1.Staff.completeOrder);
staffRouter.put('/staff/waiter/complete-table', auth_1.Auth.verify, auth_1.Auth.isWaiter, staff_1.Staff.completeTable);
staffRouter.put('/staff/maker/accept-order', auth_1.Auth.verify, auth_1.Auth.isMaker, staff_1.Staff.acceptOrder);
staffRouter.get('/staff/maker/order', auth_1.Auth.verify, auth_1.Auth.isMaker, staff_1.Staff.getOwnOrder);
staffRouter.put('/staff/maker/done', auth_1.Auth.verify, auth_1.Auth.isMaker, staff_1.Staff.doneOrder);
staffRouter.get('/staff/cashier/staff-info', auth_1.Auth.verify, auth_1.Auth.isCashier, staff_1.Staff.getStaffInfo);
exports.default = staffRouter;
//# sourceMappingURL=staff.js.map