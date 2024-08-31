"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authRouter = express_1.default.Router();
authRouter.post('/auth/signup', auth_1.Auth.signup);
authRouter.post('/auth/login', auth_1.Auth.login);
authRouter.post('/auth/verify', auth_1.Auth.verify);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map