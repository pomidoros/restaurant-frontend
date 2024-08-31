"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffModel = void 0;
const mongoose_1 = require("mongoose");
const staffSchema = new mongoose_1.Schema({
    role: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
    table: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Table' },
    order: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order' },
    serviced: { type: Number, required: true, default: 0 }
});
const staffModel = (0, mongoose_1.model)('Staff', staffSchema);
exports.staffModel = staffModel;
//# sourceMappingURL=Staff.js.map