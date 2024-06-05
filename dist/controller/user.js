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
const sql_data_1 = require("../sql-data");
exports.default = new class User {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            sql_data_1.UserStorage.getAll().then((users) => {
                res.end(JSON.stringify(users));
            }).catch((err) => {
                res.writeHead(400);
                res.end(JSON.stringify({ message: err.message }));
            });
        });
    }
    ;
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            sql_data_1.UserStorage.get(req.params.id).then((user) => {
                res.end(JSON.stringify(user));
            }).catch(err => {
                switch (err.message) {
                    case 'User not found':
                        res.writeHead(404);
                        break;
                    default:
                        res.writeHead(400);
                        break;
                }
                res.end(JSON.stringify({ message: err.message }));
            });
        });
    }
    ;
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            sql_data_1.UserStorage.delete(req.params.id).then((user) => {
                res.end(JSON.stringify(user));
            }).catch((err) => {
                switch (err.message) {
                    case 'User not found':
                        res.writeHead(404);
                        break;
                    default:
                        res.writeHead(400);
                        break;
                }
                res.end(JSON.stringify({ message: err.message }));
            });
        });
    }
    ;
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                let user = {};
                for (const [key, value] of new URLSearchParams(body)) {
                    if (value) {
                        user[key] = value;
                    }
                }
                sql_data_1.UserStorage.create(user).then((user) => {
                    res.writeHead(201);
                    res.end(JSON.stringify(user));
                }).catch((err) => {
                    res.writeHead(400);
                    res.end(JSON.stringify({ message: err.message }));
                });
            }));
        });
    }
    ;
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => __awaiter(this, void 0, void 0, function* () {
                let user = {};
                for (const [key, value] of new URLSearchParams(body)) {
                    if (value) {
                        user[key] = value;
                    }
                }
                user['id'] = req.params.id;
                sql_data_1.UserStorage.update(user).then((user) => {
                    res.end(JSON.stringify(user));
                }).catch((err) => {
                    switch (err.message) {
                        case 'User not found':
                            res.writeHead(404);
                            break;
                        default:
                            res.writeHead(400);
                            break;
                    }
                    res.end(JSON.stringify({ message: err.message }));
                });
            }));
        });
    }
    ;
};
