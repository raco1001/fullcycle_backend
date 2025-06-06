import { Router } from 'express'
import { authenticateUser } from '../middlewares/authentication'
import { createUser, findUserByEmail, findUserById } from '../models/user'

const router = Router()

router.post('/', async (req, res) => {
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

router.get('/me', authenticateUser, (req, res) => {
  res.json({ id: req.user!.id, email: req.user!.email })
})

router.post('/join', async (req, res) => {
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

router.get('/:id', authenticateUser, async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  if (isNaN(userId)) {
    res.status(400).send('Invalid user ID')
    return
  }

  const user = await findUserById(userId)

  if (user) {
    res.json({ id: user.id, email: user.email })
  } else {
    res.status(404).send('User not found')
  }
})

export { router as usersRouter }
