const router = require('express').Router();

// Import of modular router for /notes
const notesRouter = require('./notes.js');

router.use('/api/notes', notesRouter);

module.exports = router;