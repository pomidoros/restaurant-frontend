"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_1 = require("../controllers/menu");
const menuRouter = express_1.default.Router();
menuRouter.post('/menu/set', menu_1.Menu.setItem);
menuRouter.get('/menu', menu_1.Menu.getAll);
menuRouter.get('/menu/beverages', menu_1.Menu.getBeverages);
menuRouter.get('/menu/dishes', menu_1.Menu.getDishes);
exports.default = menuRouter;
//# sourceMappingURL=menu.js.map