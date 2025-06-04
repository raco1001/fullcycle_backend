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
// Added for debugging
console.log('[mysql.ts] Attempting to create pool with:', {
    host: settings_1.DB_HOST,
    port: settings_1.DB_PORT,
    user: settings_1.DB_USER,
    password_length: settings_1.DB_PASSWORD?.length, // Log password length for security
    database: settings_1.DB_NAME,
});
exports.pool = promise_1.default.createPool({
    host: settings_1.DB_HOST,
    port: settings_1.DB_PORT,
    user: settings_1.DB_USER,
    password: settings_1.DB_PASSWORD,
    database: settings_1.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Adjust as needed
    queueLimit: 0,
    dateStrings: true, // To ensure dates are returned as strings
});
// Optional: Test the connection
async function testConnection() {
    try {
        const connection = await exports.pool.getConnection();
        console.log('Successfully connected to the database.');
        connection.release();
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        // Exit the process if the database connection fails during startup in a real scenario
        // process.exit(1);
    }
}
// Call testConnection if you want to verify on app startup
// testConnection();
