const mongoose = require('../utils/mockMongoose');

const shortlistSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  requiredSkills: [{ type: String, required: true }],
  candidates: [{
    candidateId: { type: String },
    name: { type: String },
    ranking: { type: String },
    matchScore: { type: Number },
    explanation: { type: String },
    suggestedImprovements: [{ type: String }],
    interviewQuestions: [{ type: String }]
  }],
  aiSummary: { type: String }
}, { timestamps: true });

const Shortlist = mongoose.model('Shortlist', shortlistSchema);

module.exports = Shortlist;
