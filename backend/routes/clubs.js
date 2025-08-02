const express = require('express');
const router = express.Router();

let clubs = [
  {
    id: 1,
    name: 'Attack on Titan Fans',
    members: ['testuser@example.com'],
    discussions: [
      { user: 'testuser@example.com', message: 'Who else cried at the ending?' }
    ]
  }
];

let polls = [
  {
    clubId: 1,
    question: 'Best character in AOT?',
    options: [
      { text: 'Eren', votes: 3 },
      { text: 'Levi', votes: 5 },
      { text: 'Mikasa', votes: 2 }
    ]
  }
];

router.get('/', (req, res) => {
  res.json(clubs);
});

router.post('/', (req, res) => {
  const { name, user } = req.body;
  const newClub = {
    id: clubs.length + 1,
    name,
    members: [user],
    discussions: []
  };
  clubs.push(newClub);
  res.json(newClub);
});

router.post('/:id/join', (req, res) => {
  const { id } = req.params;
  const { user } = req.body;
  const club = clubs.find(c => c.id == id);
  if (club && !club.members.includes(user)) {
    club.members.push(user);
  }
  res.json(club);
});

router.post('/:id/discuss', (req, res) => {
  const { id } = req.params;
  const { user, message } = req.body;
  const club = clubs.find(c => c.id == id);
  if (club) {
    club.discussions.push({ user, message });
  }
  res.json(club);
});

router.get('/:id/polls', (req, res) => {
  const { id } = req.params;
  const clubPolls = polls.filter(p => p.clubId == id);
  res.json(clubPolls);
});

router.post('/:id/polls', (req, res) => {
  const { id } = req.params;
  const { question, options } = req.body;
  const newPoll = {
    clubId: parseInt(id),
    question,
    options: options.map(text => ({ text, votes: 0 }))
  };
  polls.push(newPoll);
  res.json(newPoll);
});

router.post('/:id/polls/vote', (req, res) => {
  const { id } = req.params;
  const { question, option } = req.body;
  const poll = polls.find(p => p.clubId == id && p.question === question);
  if (poll) {
    const opt = poll.options.find(o => o.text === option);
    if (opt) opt.votes += 1;
  }
  res.json(poll);
});

module.exports = router;
