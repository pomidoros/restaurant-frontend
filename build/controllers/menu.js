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
exports.Menu = void 0;
const Menu_1 = require("../models/Menu");
class Menu {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Menu_1.menuModel.find({});
                return res.json(data);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static getBeverages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Menu_1.menuModel.find({ type: 'beverage' });
                return res.json(data);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static getDishes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield Menu_1.menuModel.find({ type: 'dish' });
                return res.json(data);
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
    static setItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield Menu_1.menuModel.create(Object.assign({}, req.body));
                return res.json({ error: false });
            }
            catch (e) {
                return res.status(400).json({ error: true });
            }
        });
    }
}
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map