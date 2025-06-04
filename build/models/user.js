"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.verifyPassword = verifyPassword;
const crypto_1 = __importDefault(require("crypto"));
const mysql_1 = require("../utils/mysql");
function hashPassword(password) {
    const salt = crypto_1.default.randomBytes(16).toString('hex');
    const hash = crypto_1.default
        .createHash('sha256')
        .update(password + salt)
        .digest('hex');
    return `${salt}:${hash}`;
}
function comparePassword(password, hashed) {
    const [salt, originalHash] = hashed.split(':');
    const hash = crypto_1.default
        .createHash('sha256')
        .update(password + salt)
        .digest('hex');
    return hash === originalHash;
}
async function createUser(email, password) {
    const encrypted_password = hashPassword(password);
    const [result] = await mysql_1.pool.query('INSERT INTO users (email, encrypted_password) VALUES (?, ?)', [email, encrypted_password]);
    const id = result.insertId;
    return { id, email, password: encrypted_password };
}
async function queryUser(sql, param) {
    const [rows] = await mysql_1.pool.query(sql, param);
    if (rows.length === 0)
        return null;
    const row = rows[0];
    return { id: row.id, email: row.email, password: row.password };
}
function findUserByEmail(email) {
    return queryUser('SELECT id, email, encrypted_password AS password FROM users WHERE email = ? LIMIT 1', [email]);
}
function findUserById(id) {
    return queryUser('SELECT id, email, encrypted_password AS password FROM users WHERE id = ? LIMIT 1', [id]);
}
function verifyPassword(password, hashed) {
    return Promise.resolve(comparePassword(password, hashed));
}
