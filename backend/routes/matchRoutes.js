const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');
const { calculateMatchScore } = require('../utils/matchLogic');

// @desc    Match candidates based on criteria
// @route   POST /api/match
router.post('/', async (req, res) => {
  try {
    const candidates = await Candidate.find();
    
    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ error: 'No candidates found' });
    }

    const matches = candidates.map(candidate => {
      const matchDetails = calculateMatchScore(candidate, req.body);
      return {
        candidateId: candidate._id,
        candidateName: candidate.name,
        candidateEmail: candidate.email,
        experience: candidate.experience,
        ...matchDetails
      };
    });

    // Sort by match score descending
    matches.sort((a, b) => b.matchScore - a.matchScore);

    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
