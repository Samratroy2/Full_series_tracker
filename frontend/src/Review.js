//frontend\src\Review.js
import React from 'react';
import Spoiler from './Spoiler';

const Review = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>User Reviews</h2>
      <p>
        This show is amazing! <Spoiler text="I couldn't believe that Eren was the villain all along!" />
      </p>
    </div>
  );
};

export default Review;
