import { Router } from 'express'
import { createUser, findUserByEmail, verifyPassword } from '../models/user'
import { authenticateUser } from '../middlewares/authentication'
import { sign } from '../utils/jwt'

const router = Router()

router.post('/users', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.sendStatus(400)
    return
  }
  const existing = await findUserByEmail(email)
  if (existing) {
    res.status(409).send('Email already exists')
    return
  }
  const user = await createUser(email, password)
  res.status(201).json({ id: user.id, email: user.email })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.sendStatus(400)
    return
  }
  const user = await findUserByEmail(email)
  if (!user) {
    res.sendStatus(401)
    return
  }
  const valid = await verifyPassword(password, user.password)
  if (!valid) {
    res.sendStatus(401)
    return
  }
  const token = sign({ userId: user.id }, 3600)
  res.cookie('token', token, { httpOnly: true })
  res.json({ id: user.id, email: user.email })
})

router.post('/logout', (_req, res) => {
  res.clearCookie('token')
  res.sendStatus(204)
})

router.get('/users/me', authenticateUser, (req, res) => {
  res.json({ id: req.user!.id, email: req.user!.email })
})

export { router as usersRouter }
