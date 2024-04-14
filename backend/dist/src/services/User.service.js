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
const Users_model_1 = __importDefault(require("../database/models/Users.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const SALT_ROUNDS = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, password, role }) {
    try {
        const hashedPassword = bcryptjs_1.default.hashSync(password, SALT_ROUNDS);
        const newUser = yield Users_model_1.default.create({ name, email, password: hashedPassword, role });
        return { status: 'CREATED', data: newUser.dataValues };
    }
    catch (error) {
        return { status: 'ERROR', data: { message: 'Falha ao criar o usuário' } };
    }
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield Users_model_1.default.findOne({ where: { email } });
        if (!userExists)
            return { status: 'NOT_FOUND', data: { message: 'Usuário não encontrado' } };
        return { status: 'SUCCESSFUL', data: userExists.dataValues };
    }
    catch (error) {
        console.log(error);
        return { status: 'ERROR', data: { message: error } };
    }
});
exports.default = { createUser, findByEmail };
