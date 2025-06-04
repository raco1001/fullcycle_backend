import { Router } from 'express'
import { findUserByEmail, verifyPassword } from '../models/user'
import { sign } from '../utils/jwt'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  console.log('login', email, password)
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
  console.log('token', token)
  res.cookie('token', token, { httpOnly: true })
  res.json({ id: user.id, email: user.email })
  console.log('respose status', res.statusCode)
})

router.post('/logout', (_req, res) => {
  res.clearCookie('token')
  res.sendStatus(204)
})

export { router as authRouter }
