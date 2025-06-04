"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNote = createNote;
exports.findNotesByUser = findNotesByUser;
exports.findNoteById = findNoteById;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
const mysql_1 = require("../utils/mysql");
async function createNote(userId, title, content) {
    const [result] = await mysql_1.pool.query('INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)', [userId, title, content]);
    const id = result.insertId;
    return { id, userId, title, content };
}
async function findNotesByUser(userId) {
    const [rows] = await mysql_1.pool.query('SELECT id, user_id as userId, title, content FROM notes WHERE user_id = ?', [userId]);
    return rows.map(row => ({
        id: row.id,
        userId: row.userId,
        title: row.title,
        content: row.content,
    }));
}
async function findNoteById(id) {
    const [rows] = await mysql_1.pool.query('SELECT id, user_id as userId, title, content FROM notes WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0)
        return null;
    const row = rows[0];
    return { id: row.id, userId: row.userId, title: row.title, content: row.content };
}
async function updateNote(id, title, content) {
    await mysql_1.pool.query('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    return findNoteById(id);
}
async function deleteNote(id) {
    await mysql_1.pool.query('DELETE FROM notes WHERE id = ?', [id]);
}
