"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../controllers/orders");
const auth_1 = require("../controllers/auth");
const ordersRouter = express_1.default.Router();
ordersRouter.get('/orders/active', auth_1.Auth.verify, orders_1.Orders.getActiveOrders);
ordersRouter.put('/orders/create', auth_1.Auth.verify, auth_1.Auth.isWaiter, orders_1.Orders.createOrder);
exports.default = ordersRouter;
//# sourceMappingURL=orders.js.map