"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
exports.router = (0, express_1.Router)();
const user_js_1 = __importDefault(require("../controller/user.js"));
exports.router.use((req, res, next) => {
    res.setHeader("content-type", "application/json");
    next();
});
exports.router.get(`/`, user_js_1.default.getAll);
exports.router.get(`/:id`, user_js_1.default.get);
exports.router.post(`/`, user_js_1.default.create);
exports.router.put(`/:id`, user_js_1.default.update);
exports.router.delete(`/:id`, user_js_1.default.delete);
