"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = exports.DB_USER = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_NAME = exports.DB_HOST = void 0;
// src/settings.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('NODE_ENV from settings:', process.env.NODE_ENV); // Added for debugging
console.log('DEV_DB_PASSWORD length from settings:', process.env.DEV_DB_PASSWORD?.length); // Added for debugging
console.log('DEV_DB_USER from settings:', process.env.DEV_DB_USER); // Added for debugging
// Server configuration
const NODE_ENV = process.env.NODE_ENV;
let PORT;
let DB_HOST;
let DB_PORT;
let DB_USER;
let DB_PASSWORD;
let DB_NAME;
if (NODE_ENV === 'production') {
    exports.PORT = PORT = process.env.PROD_PORT || 3000;
    exports.DB_HOST = DB_HOST = process.env.PROD_DB_HOST;
    exports.DB_PORT = DB_PORT = parseInt(process.env.PROD_DB_PORT || '3306', 10);
    exports.DB_USER = DB_USER = process.env.PROD_DB_USER;
    exports.DB_PASSWORD = DB_PASSWORD = process.env.PROD_DB_PASSWORD;
    exports.DB_NAME = DB_NAME = process.env.PROD_DB_NAME;
}
else {
    // Defaults to development settings if NODE_ENV is not 'production'
    exports.PORT = PORT = process.env.DEV_PORT || 3031;
    exports.DB_HOST = DB_HOST = process.env.DEV_DB_HOST;
    exports.DB_PORT = DB_PORT = parseInt(process.env.DEV_DB_PORT || '3306', 10);
    exports.DB_USER = DB_USER = process.env.DEV_DB_USER;
    exports.DB_PASSWORD = DB_PASSWORD = process.env.DEV_DB_PASSWORD;
    exports.DB_NAME = DB_NAME = process.env.DEV_DB_NAME;
}
// Environment variables and settings
exports.JWT_SECRET = process.env.JWT_SECRET;
