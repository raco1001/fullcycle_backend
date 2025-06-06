"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
exports.usersRouter = router;
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.sendStatus(400);
        return;
    }
    const existing = await (0, user_1.findUserByEmail)(email);
    if (existing) {
        res.status(409).send('Email already exists');
        return;
    }
    const user = await (0, user_1.createUser)(email, password);
    res.status(201).json({ id: user.id, email: user.email });
});
router.get('/me', authentication_1.authenticateUser, (req, res) => {
    res.json({ id: req.user.id, email: req.user.email });
});
router.post('/join', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.sendStatus(400);
        return;
    }
    const existing = await (0, user_1.findUserByEmail)(email);
    if (existing) {
        res.status(409).send('Email already exists');
        return;
    }
    const user = await (0, user_1.createUser)(email, password);
    res.status(201).json({ id: user.id, email: user.email });
});
router.get('/:id', authentication_1.authenticateUser, async (req, res) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        res.status(400).send('Invalid user ID');
        return;
    }
    const user = await (0, user_1.findUserById)(userId);
    if (user) {
        res.json({ id: user.id, email: user.email });
    }
    else {
        res.status(404).send('User not found');
    }
});
