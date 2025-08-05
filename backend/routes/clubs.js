//backend\routes\clubs.js

const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// GET all clubs
router.get('/', async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
});

// Create a new club
router.post('/', async (req, res) => {
  const { name, createdBy, members } = req.body;
  try {
    const club = new Club({ name, createdBy, members });
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a club (creator only)
router.delete('/:id', async (req, res) => {
  const { email } = req.body;
  const club = await Club.findById(req.params.id);
  if (!club) return res.status(404).json({ error: 'Club not found' });
  if (club.createdBy !== email)
    return res.status(403).json({ error: 'Only the creator can delete the club.' });
  await club.deleteOne();
  res.json({ message: 'Club deleted' });
});

// Join club
router.post('/:id/join', async (req, res) => {
  const { email } = req.body;
  const club = await Club.findById(req.params.id);
  if (!club.members.includes(email)) {
    club.members.push(email);
    await club.save();
  }
  res.json(club);
});

// Post a message
router.post('/:id/message', async (req, res) => {
  const { user, text } = req.body;
  const club = await Club.findById(req.params.id);
  club.messages.push({ user, text });
  await club.save();
  res.json(club);
});

module.exports = router;
