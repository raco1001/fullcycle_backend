"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeNote = void 0;
const note_1 = require("../models/note");
const authorizeNote = async (req, res, next) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
        res.sendStatus(400);
        return;
    }
    const note = await (0, note_1.findNoteById)(id);
    if (!note) {
        res.sendStatus(404);
        return;
    }
    if (!req.user || note.userId !== req.user.id) {
        res.sendStatus(403);
        return;
    }
    req.note = note;
    next();
};
exports.authorizeNote = authorizeNote;
