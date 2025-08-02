//frontend\src\Spoiler.js
import React, { useState } from 'react';

const Spoiler = ({ text }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <span
      className={`spoiler ${revealed ? 'revealed' : ''}`}
      onClick={() => setRevealed(!revealed)}
      title={revealed ? 'Click to hide spoiler' : 'Click to reveal spoiler'}
    >
      {text}
    </span>
  );
};

export default Spoiler;
