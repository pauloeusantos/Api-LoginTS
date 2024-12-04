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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongo_connection_1 = __importDefault(require("../db/mongo-connection"));
class UserService {
    static getCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield mongo_connection_1.default.getInstance();
            return client.db('db').collection('users');
        });
    }
    static register(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const hashedPassword = yield bcrypt_1.default.hash(user.senha, 10);
            const newUser = Object.assign(Object.assign({}, user), { senha: hashedPassword });
            const result = yield collection.insertOne(newUser);
            return Object.assign({ id: result.insertedId }, newUser);
        });
    }
    static login(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            const user = yield collection.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(senha, user.senha);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = jsonwebtoken_1.default.sign({ id: user._id }, '', { expiresIn: '1h' });
            return token;
        });
    }
}
exports.default = UserService;
