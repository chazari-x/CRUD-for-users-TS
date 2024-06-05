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
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDataSource = exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DB_HOST = (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : 'localhost';
const DB_PORT = parseInt((_b = process.env.DB_PORT) !== null && _b !== void 0 ? _b : '5432');
const DB_USER = (_c = process.env.DB_USER) !== null && _c !== void 0 ? _c : 'postgres';
const DB_PASS = (_d = process.env.DB_PASS) !== null && _d !== void 0 ? _d : 'postgrespw';
const DB_NAME = (_e = process.env.DB_NAME) !== null && _e !== void 0 ? _e : 'postgres';
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    entities: [Users_1.Users],
    synchronize: true
});
const initDataSource = () => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.AppDataSource.initialize();
    console.log('Data source initialized');
});
exports.initDataSource = initDataSource;
(0, exports.initDataSource)().catch((err) => console.error(err));
