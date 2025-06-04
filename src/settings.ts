// src/settings.ts
import dotenv from 'dotenv'
dotenv.config()

// Server configuration

export const PORT = process.env.PORT || 3031

// Environment variables and settings
export const DB_HOST = process.env.DB_HOST
export const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10)
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME

export const JWT_SECRET = process.env.JWT_SECRET
