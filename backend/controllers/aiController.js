const { getAiShortlist } = require('../services/aiService');
const Candidate = require('../models/Candidate');
const { calculateMatchScore } = require('../utils/matchLogic');

// @desc    Get AI Shortlist
// @route   POST /api/ai/shortlist
exports.shortlistCandidates = async (req, res) => {
  try {
    const { requiredSkills, preferredSkills, minExperience } = req.body;
    
    // First, get all candidates and calculate basic match scores
    const candidates = await Candidate.find();
    
    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ error: 'No candidates available to shortlist' });
    }

    const preScreenedCandidates = candidates.map(candidate => {
      const matchDetails = calculateMatchScore(candidate, req.body);
      return {
        ...candidate.toObject(),
        matchDetails
      };
    }).sort((a, b) => b.matchDetails.matchScore - a.matchDetails.matchScore).slice(0, 5); // Take top 5 for AI processing to save tokens

    // Call AI Service
    const aiResult = await getAiShortlist(preScreenedCandidates, req.body);

    res.status(200).json(aiResult);
  } catch (error) {
    console.error('AI Shortlist Error:', error);
    res.status(500).json({ error: 'Failed to generate AI shortlist. Please check your OpenRouter API key.' });
  }
};
