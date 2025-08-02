// frontend\src\pages\ClubPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClubs } from '../contexts/ClubContext';
import './ClubList.css'; // Same CSS

const ClubPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clubs, addMessage, addPoll, votePollOption } = useClubs();
  const club = clubs.find(c => c.id === id);

  const [messageText, setMessageText] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState('');
  const [votedPolls, setVotedPolls] = useState({});

  if (!club) return <div className="error-page">❌ Club not found!</div>;

  const handleSendMessage = () => {
    if (messageText.trim()) {
      addMessage(id, 'You', messageText.trim());
      setMessageText('');
    }
  };

  const handleCreatePoll = () => {
    if (pollQuestion.trim() && pollOptions.trim()) {
      const optionsArray = pollOptions.split(',').map(opt => ({
        text: opt.trim(),
        votes: 0,
      }));
      addPoll(id, pollQuestion.trim(), optionsArray);
      setPollQuestion('');
      setPollOptions('');
    }
  };

  const handleVote = (pollId, optionIndex) => {
    if (votedPolls[pollId]) return; // Already voted
    votePollOption(id, pollId, optionIndex);
    setVotedPolls(prev => ({ ...prev, [pollId]: optionIndex }));
  };

  return (
    <div className="club-page-container">
      <button className="back-btn" onClick={() => navigate('/clubs')}>⬅ Back to Clubs</button>

      <h2>{club.name}</h2>

      {/* Members Section */}
      <div className="club-section">
        <h3>Members</h3>
        {club.members.length > 0 ? (
          <ul>
            {club.members.map((member, idx) => (
              <li key={idx}>{member}</li>
            ))}
          </ul>
        ) : (
          <p>No members yet.</p>
        )}
      </div>

      {/* Polls Section */}
      <div className="club-section">
        <h3>Polls</h3>
        {club.polls && club.polls.length > 0 ? (
          club.polls.map(poll => (
            <div key={poll.id} className="poll-box">
              <strong>{poll.question}</strong>
              <ul>
                {poll.options.map((option, idx) => (
                  <li
                    key={idx}
                    className="poll-option"
                    onClick={() => handleVote(poll.id, idx)}
                    style={{
                      cursor: votedPolls[poll.id] != null ? 'not-allowed' : 'pointer',
                      backgroundColor: votedPolls[poll.id] === idx ? '#d1e7dd' : '#fff',
                      border: '1px solid #ccc',
                      padding: '8px',
                      margin: '5px 0',
                      borderRadius: '8px'
                    }}
                  >
                    {option.text} — {option.votes} votes
                  </li>
                ))}
              </ul>
              {votedPolls[poll.id] != null && (
                <p style={{ color: 'green', marginTop: '5px' }}>✅ You have voted!</p>
              )}
            </div>
          ))
        ) : (
          <p>No polls created yet.</p>
        )}

        {/* Create New Poll */}
        <div className="create-poll">
          <input
            type="text"
            placeholder="Poll question..."
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Options (comma separated)"
            value={pollOptions}
            onChange={(e) => setPollOptions(e.target.value)}
          />
          <button onClick={handleCreatePoll}>Create Poll</button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="club-section">
        <h3>Chat</h3>
        <div className="chat-box">
          {club.messages && club.messages.length > 0 ? (
            club.messages.map((msg, idx) => (
              <div key={idx} className="chat-message">
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </div>

        {/* Send New Message */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ClubPage;
