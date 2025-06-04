"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const user_1 = require("../models/user");
const jwt_1 = require("../utils/jwt");
const authenticateUser = async (req, res, next) => {
    const token = req.cookies?.token ||
        (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
            ? req.headers.authorization.slice(7)
            : null);
    if (!token) {
        res.sendStatus(401);
        return;
    }
    const payload = (0, jwt_1.verify)(token);
    if (!payload) {
        res.sendStatus(401);
        return;
    }
    const user = await (0, user_1.findUserById)(payload.userId);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    req.user = user;
    next();
};
exports.authenticateUser = authenticateUser;
