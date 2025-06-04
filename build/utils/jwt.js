"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = sign;
exports.verify = verify;
const crypto_1 = __importDefault(require("crypto"));
const settings_1 = require("../settings");
function sign(payload, expiresInSeconds) {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
    const payloadStr = Buffer.from(JSON.stringify({ ...payload, exp })).toString('base64url');
    const data = `${header}.${payloadStr}`;
    const signature = crypto_1.default
        .createHmac('sha256', settings_1.JWT_SECRET)
        .update(data)
        .digest('base64url');
    return `${data}.${signature}`;
}
function verify(token) {
    const parts = token.split('.');
    if (parts.length !== 3)
        return null;
    const [headerB64, payloadB64, signature] = parts;
    const data = `${headerB64}.${payloadB64}`;
    const expectedSig = crypto_1.default
        .createHmac('sha256', settings_1.JWT_SECRET)
        .update(data)
        .digest('base64url');
    if (!crypto_1.default.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig)))
        return null;
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString());
    if (payload.exp < Math.floor(Date.now() / 1000))
        return null;
    return payload;
}
