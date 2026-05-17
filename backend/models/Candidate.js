const mongoose = require('../utils/mockMongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: [{ type: String }],
  experience: { type: Number, required: true },
  projects: [{ type: String }],
  bio: { type: String }
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;
