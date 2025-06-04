import { Router } from 'express'
import { authenticateUser } from '../middlewares/authentication'
import { authorizeNote } from '../middlewares/authorization'
import {
  createNote,
  deleteNote,
  findNotesByUser,
  updateNote,
} from '../models/note'

const router = Router()

router.use(authenticateUser)

router.get('/', async (req, res) => {
  const notes = await findNotesByUser(req.user!.id)
  res.json(notes)
})

router.get('/:id', authorizeNote, (req, res) => {
  res.json(req.note)
})

router.post('/', authenticateUser, async (req, res) => {
  const { title, content } = req.body
  console.log('createNote', req.user!.id, title, content)
  if (!title || !content) {
    res.sendStatus(400)
    return
  }
  console.log('createNote', req.user!.id, title, content)
  const note = await createNote(req.user!.id, title, content)
  res.status(201).json(note)
})

router.put('/:id', authorizeNote, async (req, res) => {
  const { title, content } = req.body
  if (!title || !content) {
    res.sendStatus(400)
    return
  }
  const note = await updateNote(Number(req.params.id), title, content)
  res.json(note)
})

router.delete('/:id', authorizeNote, async (req, res) => {
  await deleteNote(Number(req.params.id))
  res.sendStatus(204)
})

export { router as notesRouter }
