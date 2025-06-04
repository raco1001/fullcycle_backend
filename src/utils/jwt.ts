import crypto from 'crypto'
import { JWT_SECRET } from '../settings'

interface Payload {
  userId: number
  exp: number
}

export function sign(payload: Omit<Payload, 'exp'>, expiresInSeconds: number): string {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url')
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
  const payloadStr = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url')
  const data = `${header}.${payloadStr}`
  const signature = crypto
    .createHmac('sha256', JWT_SECRET as string)
    .update(data)
    .digest('base64url')
  return `${data}.${signature}`
}

export function verify(token: string): Payload | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [headerB64, payloadB64, signature] = parts
  const data = `${headerB64}.${payloadB64}`
  const expectedSig = crypto
    .createHmac('sha256', JWT_SECRET as string)
    .update(data)
    .digest('base64url')
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return null
  const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString()) as Payload
  if (payload.exp < Math.floor(Date.now() / 1000)) return null
  return payload
}
