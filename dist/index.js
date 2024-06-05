"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_js_1 = require("./router/users.js");
const app = (0, express_1.default)();
const PORT = 3000;
app.use('/api/users', users_js_1.router);
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
