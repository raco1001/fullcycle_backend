// Healthcheck route
// Base Path: /healthcheck
// GET / : Docker 헬스체크를 위한 204 응답
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.sendStatus(204)
})

export { router as healthcheckRouter }
