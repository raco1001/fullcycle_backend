// MySQL (MariaDB) Pool instance
// 역할: DB SQL 쿼리를 위한 연결 Pool 제공
// src/utils/mysql.ts

// MySQL (MariaDB) Pool instance
// 역할: DB SQL 쿼리를 위한 연결 Pool 제공

import mysql from 'mysql2/promise'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../settings'

/**
 * Creates a MySQL pool when database credentials are provided. When the
 * credentials are missing, a mock pool is exported that rejects all queries.
 */

function createMockPool() {
  return {
    async query() {
      throw new Error('Database is not configured')
    },
    async getConnection() {
      throw new Error('Database is not configured')
    },
  } as unknown as mysql.Pool
}

export const pool: mysql.Pool =
  DB_HOST && DB_USER && DB_PASSWORD && DB_NAME
    ? mysql.createPool({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        dateStrings: true,
      })
    : createMockPool()
