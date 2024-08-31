"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = require("mongoose");
const routers_1 = __importDefault(require("./routers"));
dotenv_1.default.config();
const port = process.env.PORT || 3000;
const dbUser = process.env.MONGODB_USER;
const dbPwd = process.env.MONGODB_PASSWORD;
const dbHost = process.env.MONGODB_HOST || '127.0.0.1';
const dbPort = process.env.MOGNODB_PORT || 27017;
const dbName = process.env.MONGODB_BASE || 'admin';
try {
    (0, mongoose_1.connect)(`mongodb://${dbHost}:${dbPort}`, {
        user: dbUser,
        pass: dbPwd,
        dbName: dbName
    }).catch(err => {
        throw err;
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(routers_1.default);
    app.listen(port);
}
catch (e) {
    console.log("Ошибка");
    // console.log(e)
}
//# sourceMappingURL=index.js.map