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
exports.login = exports.register = void 0;
const service_1 = __importDefault(require("../service/service"));
const http_errors_1 = __importDefault(require("http-errors"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, email, senha } = req.body;
    try {
        const user = yield service_1.default.register({ nome, email, senha });
        res.status(201).json(user);
    }
    catch (error) {
        next((0, http_errors_1.default)(400, error.message));
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = req.body;
    try {
        const token = yield service_1.default.login(email, senha);
        res.status(200).json({ token });
    }
    catch (error) {
        next((0, http_errors_1.default)(401, error.message));
    }
});
exports.login = login;
