const express = require('express');
const router = express.Router();
const Shortlist = require('../models/Shortlist');

// @desc    Save a shortlist
// @route   POST /api/shortlists
router.post('/', async (req, res) => {
  try {
    const shortlist = await Shortlist.create(req.body);
    res.status(201).json(shortlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc    Get all saved shortlists
// @route   GET /api/shortlists
router.get('/', async (req, res) => {
  try {
    const shortlists = await Shortlist.find().populate('shortlistedCandidates.candidate').sort({ createdAt: -1 });
    res.status(200).json(shortlists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @desc    Get single shortlist
// @route   GET /api/shortlists/:id
router.get('/:id', async (req, res) => {
  try {
    const shortlist = await Shortlist.findById(req.params.id).populate('shortlistedCandidates.candidate');
    if (!shortlist) {
      return res.status(404).json({ error: 'Shortlist not found' });
    }
    res.status(200).json(shortlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
