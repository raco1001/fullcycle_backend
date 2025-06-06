// src/settings.ts
import dotenv from 'dotenv'
dotenv.config()

// Server configuration
const NODE_ENV = process.env.NODE_ENV

let PORT: string | number
let DB_HOST: string | undefined
let DB_PORT: number
let DB_USER: string | undefined
let DB_PASSWORD: string | undefined
let DB_NAME: string | undefined

if (NODE_ENV === 'production') {
  PORT = process.env.PROD_PORT || 3000
  DB_HOST = process.env.PROD_DB_HOST
  DB_PORT = parseInt(process.env.PROD_DB_PORT || '3306', 10)
  DB_USER = process.env.PROD_DB_USER
  DB_PASSWORD = process.env.PROD_DB_PASSWORD
  DB_NAME = process.env.PROD_DB_NAME
} else {
  PORT = process.env.DEV_PORT || 3031
  DB_HOST = process.env.DEV_DB_HOST || 'localhost'
  DB_PORT = parseInt(process.env.DEV_DB_PORT || '3306', 10)
  DB_USER = process.env.DEV_DB_USER || 'prgms'
  DB_PASSWORD = process.env.DEV_DB_PASSWORD || 'prgms'
  DB_NAME = process.env.DEV_DB_NAME || 'prgms_notes'
}

export { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, PORT }

// Environment variables and settings
export const JWT_SECRET = process.env.JWT_SECRET
