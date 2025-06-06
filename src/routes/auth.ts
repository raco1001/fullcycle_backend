import { Router } from 'express'
import { findUserByEmail, verifyPassword } from '../models/user'
import { sign } from '../utils/jwt'

const router = Router()

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

export { router as authRouter }
