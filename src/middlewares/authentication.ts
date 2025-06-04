import { RequestHandler } from 'express'
import { findUserById, User } from '../models/user'
import { verify } from '../utils/jwt'

export const authenticateUser: RequestHandler = async (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.slice(7)
      : null)
  if (!token) {
    res.sendStatus(401)
    return
  }
  const payload = verify(token)
  if (!payload) {
    res.sendStatus(401)
    return
  }
  const user = await findUserById(payload.userId)
  if (!user) {
    res.sendStatus(401)
    return
  }
  req.user = user
  next()
}

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}
