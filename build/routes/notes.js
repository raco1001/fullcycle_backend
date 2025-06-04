"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesRouter = void 0;
const express_1 = require("express");
const authentication_1 = require("../middlewares/authentication");
const authorization_1 = require("../middlewares/authorization");
const note_1 = require("../models/note");
const router = (0, express_1.Router)();
exports.notesRouter = router;
router.use(authentication_1.authenticateUser);
router.get('/', async (req, res) => {
    const notes = await (0, note_1.findNotesByUser)(req.user.id);
    res.json(notes);
});
router.get('/:id', authorization_1.authorizeNote, (req, res) => {
    res.json(req.note);
});
router.post('/', authentication_1.authenticateUser, async (req, res) => {
    const { title, content } = req.body;
    console.log('createNote', req.user.id, title, content);
    if (!title || !content) {
        res.sendStatus(400);
        return;
    }
    console.log('createNote', req.user.id, title, content);
    const note = await (0, note_1.createNote)(req.user.id, title, content);
    res.status(201).json(note);
});
router.put('/:id', authorization_1.authorizeNote, async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.sendStatus(400);
        return;
    }
    const note = await (0, note_1.updateNote)(Number(req.params.id), title, content);
    res.json(note);
});
router.delete('/:id', authorization_1.authorizeNote, async (req, res) => {
    await (0, note_1.deleteNote)(Number(req.params.id));
    res.sendStatus(204);
});
