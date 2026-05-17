const express = require('express');
const router = express.Router();
const { shortlistCandidates } = require('../controllers/aiController');

router.post('/shortlist', shortlistCandidates);

module.exports = router;
