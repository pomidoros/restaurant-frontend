"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = __importDefault(require("./orders"));
const tables_1 = __importDefault(require("./tables"));
const auth_1 = __importDefault(require("./auth"));
const menu_1 = __importDefault(require("./menu"));
const staff_1 = __importDefault(require("./staff"));
const router = express_1.default.Router();
router.use(orders_1.default);
router.use(tables_1.default);
router.use(auth_1.default);
router.use(menu_1.default);
router.use(staff_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map