import crypto from 'crypto'
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { pool } from '../utils/mysql'

export interface User {
  id: number
  email: string
  password: string
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex')
  return `${salt}:${hash}`
}

function comparePassword(password: string, hashed: string): boolean {
  const [salt, originalHash] = hashed.split(':')
  const hash = crypto.createHash('sha256').update(password + salt).digest('hex')
  return hash === originalHash
}

export async function createUser(email: string, password: string): Promise<User> {
  const hashed = hashPassword(password)
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashed],
  )
  const id = (result as ResultSetHeader).insertId
  return { id, email, password: hashed }
}

async function queryUser(sql: string, param: any): Promise<User | null> {
  const [rows] = await pool.query<RowDataPacket[]>(sql, param)
  if (rows.length === 0) return null
  const row = rows[0]
  return { id: row.id, email: row.email, password: row.password }
}

export function findUserByEmail(email: string): Promise<User | null> {
  return queryUser('SELECT id, email, password FROM users WHERE email = ? LIMIT 1', [email])
}

export function findUserById(id: number): Promise<User | null> {
  return queryUser('SELECT id, email, password FROM users WHERE id = ? LIMIT 1', [id])
}

export function verifyPassword(password: string, hashed: string): Promise<boolean> {
  return Promise.resolve(comparePassword(password, hashed))
}
