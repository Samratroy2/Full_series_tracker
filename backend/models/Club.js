// backend/models/Club.js

const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  question: String,
  options: [pollOptionSchema],
  voters: [String], // email addresses of voters
});

const messageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const clubSchema = new mongoose.Schema({
  name: String,
  createdBy: String,
  members: [String],
  messages: [messageSchema],
  polls: [pollSchema],
});

module.exports = mongoose.model('Club', clubSchema);
