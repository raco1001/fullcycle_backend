import { Router } from 'express'

const router = Router()

router.post('/login', (req, res) => {
  res.send('로그인 성공')
})

router.post('/logout', (req, res) => {
  res.send('로그아웃 성공')
})

router.post('/users', (req, res) => {
  res.send('회원가입 성공')
})

router.get('/users/me', (req, res) => {
  res.send('사용자 자신의 정보 조회 (email)')
})

export { router as usersRouter }
