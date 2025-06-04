"use strict";
// Express app setup
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
require("express-async-error");
const auth_1 = require("./routes/auth");
const healthcheck_1 = require("./routes/healthcheck");
const notes_1 = require("./routes/notes");
const users_1 = require("./routes/users");
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.error(err);
    res.sendStatus(500);
});
app.use('/healthcheck', healthcheck_1.healthcheckRouter);
app.use('/users', users_1.usersRouter);
app.use('/notes', notes_1.notesRouter);
app.use('/auth', auth_1.authRouter);
