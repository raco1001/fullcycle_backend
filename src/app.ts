// Express app setup

import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-error'
import { authRouter } from './routes/auth'
import { healthcheckRouter } from './routes/healthcheck'
import { notesRouter } from './routes/notes'
import { usersRouter } from './routes/users'

const app = express()

app.use(cookieParser())

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(err)
  res.sendStatus(500)
})

app.use('/healthcheck', healthcheckRouter)
app.use('/users', usersRouter)
app.use('/notes', notesRouter)
app.use('/auth', authRouter)

export { app }
