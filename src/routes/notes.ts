// Note routes
// Base Path: /notes
// GET    /         : 사용자가 작성한 노트 목록 조회 (id, title)
// GET    /:id      : 노트 상세 조회 (id, title, content)
// POST   /         : 주어진 title, content를 통한 노트 생성
// PUT    /:id      : 주어진 title, content로 노트 업데이트
// DELETE /:id      : 노트 삭제

import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.send('노트 목록 조회 성공')
})

router.get('/:id', (req, res) => {
  res.send('노트 상세 조회 성공')
})

router.post('/', (req, res) => {
  res.send('노트 생성 성공')
})

router.put('/:id', (req, res) => {
  res.send('노트 업데이트 성공')
})

router.delete('/:id', (req, res) => {
  res.send('노트 삭제 성공')
})

export { router as notesRouter }
