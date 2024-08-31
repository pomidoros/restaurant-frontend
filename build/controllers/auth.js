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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Staff_1 = require("../models/Staff");
const SECRET = 'restaurant';
class Auth {
    static generateAccessToken(data) {
        return jsonwebtoken_1.default.sign(data, SECRET, { expiresIn: '2h' });
    }
    static getToken(req) {
        const authHeader = req.headers['authorization'] || '';
        return authHeader && authHeader.split(' ')[0] == 'Bearer' ?
            authHeader.split(" ")[1] :
            false;
    }
    static isWaiter(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = res.locals.staff.role;
            if (role != 'waiter')
                return res.status(401).json({ msg: 'Access denied' });
            return next();
        });
    }
    static isMaker(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = res.locals.staff.role;
            if (role != 'cooker' && role != 'bartender')
                return res.status(401).json({ msg: 'Access denied' });
            return next();
        });
    }
    static isCashier(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = res.locals.staff.role;
            if (role != 'cashier')
                return res.status(401).json({ msg: 'Access denied' });
            return next();
        });
    }
    static verify(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = Auth.getToken(req);
            if (token == false)
                return res.status(401).json({ verify: false });
            try {
                const data = jsonwebtoken_1.default.verify(token, SECRET);
                const users = yield Staff_1.staffModel.find({
                    username: data.username,
                    role: data.role
                });
                if (users.length == 0)
                    return res.status(403).json({ verify: false });
                res.locals.staff = users[0];
                return next();
            }
            catch (err) {
                return res.status(403).json({ verify: false, msg: 'Access denied' });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield Staff_1.staffModel.find({ username: req.body.username });
                if (users.length == 0)
                    return res.json({ isAuth: false, msg: 'Doesn\'t exists' });
                if (!bcrypt_1.default.compareSync(req.body.password, users[0].pwd))
                    return res.json({ isAuth: false, msg: 'Doesn\'t correct password' });
                const token = Auth.generateAccessToken({
                    role: users[0].role,
                    username: req.body.username
                });
                return res.json({ isAuth: true, token: token, username: users[0].username, role: users[0].role });
            }
            catch (err) {
                return res.status(300).json({ isAuth: false, msg: 'Something went wrong' });
            }
        });
    }
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usernames = yield Staff_1.staffModel.find({ username: req.body.username });
                if (usernames.length == 0) {
                    const hashPassword = bcrypt_1.default.hashSync(req.body.password, 8);
                    yield Staff_1.staffModel.create({
                        role: req.body.role,
                        username: req.body.username,
                        pwd: hashPassword
                    });
                    return res.json({ status: true });
                }
                return res.status(400).json({ status: false, msg: 'Already exists' });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ status: false });
            }
        });
    }
}
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map