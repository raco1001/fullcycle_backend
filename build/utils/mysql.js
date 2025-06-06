"use strict";
// MySQL (MariaDB) Pool instance
// 역할: DB SQL 쿼리를 위한 연결 Pool 제공
// src/utils/mysql.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
// MySQL (MariaDB) Pool instance
// 역할: DB SQL 쿼리를 위한 연결 Pool 제공
const promise_1 = __importDefault(require("mysql2/promise"));
const settings_1 = require("../settings");
/**
 * Creates a MySQL pool when database credentials are provided. When the
 * credentials are missing, a mock pool is exported that rejects all queries.
 */
function createMockPool() {
    return {
        async query() {
            throw new Error('Database is not configured');
        },
        async getConnection() {
            throw new Error('Database is not configured');
        },
    };
}
exports.pool = settings_1.DB_HOST && settings_1.DB_USER && settings_1.DB_PASSWORD && settings_1.DB_NAME
    ? promise_1.default.createPool({
        host: settings_1.DB_HOST,
        port: settings_1.DB_PORT,
        user: settings_1.DB_USER,
        password: settings_1.DB_PASSWORD,
        database: settings_1.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        dateStrings: true,
    })
    : createMockPool();
