// src/settings.ts
import dotenv from 'dotenv'
dotenv.config()

console.log('NODE_ENV from settings:', process.env.NODE_ENV) // Added for debugging
console.log(
  'DEV_DB_PASSWORD length from settings:',
  process.env.DEV_DB_PASSWORD?.length,
) // Added for debugging
console.log('DEV_DB_USER from settings:', process.env.DEV_DB_USER) // Added for debugging

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
  // Defaults to development settings if NODE_ENV is not 'production'
  PORT = process.env.DEV_PORT || 3031
  DB_HOST = process.env.DEV_DB_HOST
  DB_PORT = parseInt(process.env.DEV_DB_PORT || '3306', 10)
  DB_USER = process.env.DEV_DB_USER
  DB_PASSWORD = process.env.DEV_DB_PASSWORD
  DB_NAME = process.env.DEV_DB_NAME
}

export { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, PORT }

// Environment variables and settings
export const JWT_SECRET = process.env.JWT_SECRET
