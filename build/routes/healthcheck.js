"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthcheckRouter = void 0;
// Healthcheck route
// Base Path: /healthcheck
// GET / : Docker 헬스체크를 위한 204 응답
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.healthcheckRouter = router;
router.get('/', (req, res) => {
    res.sendStatus(204);
});
