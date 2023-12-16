const router = require('express').Router();

// Import of modular router for /notes
const notesRouter = require('./notes');

router.use('/notes', notesRouter);

module.exports = router;