// frontend\src\ReviewForm.js
import React, { useState, useEffect } from 'react';

const ReviewForm = ({ showId }) => {
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const fetchReviews = async () => {
    const res = await fetch(`http://localhost:5000/api/shows/${showId}/reviews`);
    const data = await res.json();
    setReviews(data);
  };

  useEffect(() => {
    fetchReviews();
  }, [showId]);

  const submitReview = async () => {
    await fetch(`http://localhost:5000/api/shows/${showId}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, content })
    });
    setUsername('');
    setContent('');
    fetchReviews();
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Reviews</h3>
      <input
        placeholder="Your name"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <textarea
        placeholder="Write your review..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={submitReview}>Submit</button>
      {reviews.map((r, i) => (
        <div key={i} style={{ marginTop: '1rem' }}>
          <strong>{r.username}</strong>
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewForm;
