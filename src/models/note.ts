import { RowDataPacket, ResultSetHeader } from 'mysql2/promise'
import { pool } from '../utils/mysql'

export interface Note {
  id: number
  userId: number
  title: string
  content: string
}

export async function createNote(userId: number, title: string, content: string): Promise<Note> {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content],
  )
  const id = (result as ResultSetHeader).insertId
  return { id, userId, title, content }
}

export async function findNotesByUser(userId: number): Promise<Note[]> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, user_id as userId, title, content FROM notes WHERE user_id = ?',
    [userId],
  )
  return rows.map(row => ({
    id: row.id,
    userId: row.userId,
    title: row.title,
    content: row.content,
  }))
}

export async function findNoteById(id: number): Promise<Note | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    'SELECT id, user_id as userId, title, content FROM notes WHERE id = ? LIMIT 1',
    [id],
  )
  if (rows.length === 0) return null
  const row = rows[0]
  return { id: row.id, userId: row.userId, title: row.title, content: row.content }
}

export async function updateNote(id: number, title: string, content: string): Promise<Note | null> {
  await pool.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id])
  return findNoteById(id)
}

export async function deleteNote(id: number): Promise<void> {
  await pool.query('DELETE FROM notes WHERE id = ?', [id])
}
