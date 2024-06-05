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
exports.UserStorage = void 0;
const data_source_1 = require("./data-source");
const Users_1 = require("./Users");
const userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
exports.UserStorage = {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userRepository.find();
        });
    },
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepository.findOneBy({ id });
            if (!user) {
                throw new Error(`User not found`);
            }
            return user;
        });
    },
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.name || !user.email) {
                throw new Error('User name and email are required');
            }
            const c = userRepository.create(user);
            return yield userRepository.save(c);
        });
    },
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user.id) {
                throw new Error('User ID is required');
            }
            const u = yield userRepository.findOneBy({ id: user.id });
            if (!u) {
                throw new Error(`User not found`);
            }
            userRepository.merge(u, user);
            return yield userRepository.save(user);
        });
    },
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield userRepository.findOneBy({ id }))) {
                throw new Error(`User not found`);
            }
            return userRepository.delete(id);
        });
    }
};
