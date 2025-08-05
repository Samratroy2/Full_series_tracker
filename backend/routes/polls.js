// backend/routes/polls.js

const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Add poll to a club
router.post('/:clubId', async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !Array.isArray(options) || options.length === 0) {
      return res.status(400).json({ error: 'Invalid poll data' });
    }

    const poll = {
      question,
      options: options.map((opt) => ({ text: opt, votes: 0 })),
      voters: [],
    };

    const club = await Club.findByIdAndUpdate(
      req.params.clubId,
      { $push: { polls: poll } },
      { new: true }
    );

    if (!club) return res.status(404).json({ error: 'Club not found' });

    res.json(club);
  } catch (err) {
    console.error('Error in /polls/:clubId POST:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Vote on a poll
router.post('/:clubId/vote', async (req, res) => {
  try {
    const { pollId, optionIndex, voter } = req.body;

    const club = await Club.findById(req.params.clubId);
    if (!club) return res.status(404).json({ error: 'Club not found' });

    const poll = club.polls.id(pollId);
    if (!poll) return res.status(404).json({ error: 'Poll not found' });

    if (poll.voters.includes(voter)) {
      return res.status(400).json({ error: 'You have already voted' });
    }

    if (!poll.options[optionIndex]) {
      return res.status(400).json({ error: 'Invalid option index' });
    }

    poll.options[optionIndex].votes += 1;
    poll.voters.push(voter);

    await club.save();
    res.json(club);
  } catch (err) {
    console.error('Error in /polls/:clubId/vote POST:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
