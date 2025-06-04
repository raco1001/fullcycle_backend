"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const user_1 = require("../models/user");
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('login', email, password);
    if (!email || !password) {
        res.sendStatus(400);
        return;
    }
    const user = await (0, user_1.findUserByEmail)(email);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const valid = await (0, user_1.verifyPassword)(password, user.password);
    if (!valid) {
        res.sendStatus(401);
        return;
    }
    const token = (0, jwt_1.sign)({ userId: user.id }, 3600);
    console.log('token', token);
    res.cookie('token', token, { httpOnly: true });
    res.json({ id: user.id, email: user.email });
    console.log('respose status', res.statusCode);
});
router.post('/logout', (_req, res) => {
    res.clearCookie('token');
    res.sendStatus(204);
});
