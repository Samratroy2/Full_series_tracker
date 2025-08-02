//frontend\src\Polls.js
import React, { useEffect, useState } from 'react';

const Polls = ({ clubId }) => {
  const [polls, setPolls] = useState([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState('');

  const fetchPolls = async () => {
    const res = await fetch(`http://localhost:5000/api/clubs/${clubId}/polls`);
    const data = await res.json();
    setPolls(data);
  };

  useEffect(() => {
    fetchPolls();
  }, [clubId]);

  const createPoll = async () => {
    await fetch(`http://localhost:5000/api/clubs/${clubId}/polls`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question,
        options: options.split(',').map(opt => opt.trim())
      })
    });
    setQuestion('');
    setOptions('');
    fetchPolls();
  };

  const vote = async (question, option) => {
    await fetch(`http://localhost:5000/api/clubs/${clubId}/polls/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, option })
    });
    fetchPolls();
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Polls</h3>
      <input
        placeholder="Poll question"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      <input
        placeholder="Options (comma separated)"
        value={options}
        onChange={e => setOptions(e.target.value)}
      />
      <button onClick={createPoll}>Create Poll</button>
      {polls.map((poll, index) => (
        <div key={index} style={{ marginTop: '1rem' }}>
          <strong>{poll.question}</strong>
          <ul>
            {poll.options.map((opt, i) => (
              <li key={i}>
                <button onClick={() => vote(poll.question, opt.text)}>
                  {opt.text} ({opt.votes})
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Polls;
