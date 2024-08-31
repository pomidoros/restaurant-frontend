"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuModel = void 0;
const mongoose_1 = require("mongoose");
const menuSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: { eur: Number, cents: Number }, required: true },
    type: { type: String, required: true }
});
exports.menuModel = (0, mongoose_1.model)('Menu', menuSchema);
//# sourceMappingURL=Menu.js.map