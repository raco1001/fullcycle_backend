// MySQL (MariaDB) Pool instance
// 역할: DB SQL 쿼리를 위한 연결 Pool 제공
// src/utils/mysql.ts

// MySQL (MariaDB) Pool instance
// 역할: DB SQL 쿼리를 위한 연결 Pool 제공

import mysql from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../settings'

export const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
  dateStrings: true, // To ensure dates are returned as strings
})

// Optional: Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log('Successfully connected to the database.')
    connection.release()
  } catch (error) {
    console.error('Error connecting to the database:', error)
    // Exit the process if the database connection fails during startup in a real scenario
    // process.exit(1);
  }
}

// Call testConnection if you want to verify on app startup
// testConnection();
