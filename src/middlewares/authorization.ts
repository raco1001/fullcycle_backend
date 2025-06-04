import { RequestHandler } from 'express'
import { findNoteById, Note } from '../models/note'

export const authorizeNote: RequestHandler = async (req, res, next) => {
  const id = Number(req.params.id)
  if (Number.isNaN(id)) {
    res.sendStatus(400)
    return
  }
  const note = await findNoteById(id)
  if (!note) {
    res.sendStatus(404)
    return
  }
  if (!req.user || note.userId !== req.user.id) {
    res.sendStatus(403)
    return
  }
  req.note = note
  next()
}

declare global {
  namespace Express {
    interface Request {
      note?: Note
    }
  }
}
