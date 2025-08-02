//frontend\src\Reminders.js
import React, { useEffect, useState } from 'react';

const Reminders = ({ userId }) => {
  const [reminders, setReminders] = useState([]);
  const [datetime, setDatetime] = useState('');
  const [note, setNote] = useState('');
  const [showId, setShowId] = useState('');

  const fetchReminders = async () => {
    const res = await fetch(\`http://localhost:5000/api/users/\${userId}/reminders\`);
    const data = await res.json();
    setReminders(data);
  };

  useEffect(() => {
    fetchReminders();
  }, [userId]);

  const addReminder = async () => {
    await fetch(\`http://localhost:5000/api/users/\${userId}/reminders\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ showId, datetime, note })
    });
    setDatetime('');
    setNote('');
    setShowId('');
    fetchReminders();
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Reminders</h3>
      <input
        placeholder="Show ID"
        value={showId}
        onChange={e => setShowId(e.target.value)}
      />
      <input
        type="datetime-local"
        value={datetime}
        onChange={e => setDatetime(e.target.value)}
      />
      <input
        placeholder="Reminder note"
        value={note}
        onChange={e => setNote(e.target.value)}
      />
      <button onClick={addReminder}>Add Reminder</button>
      <ul>
        {reminders.map((r, i) => (
          <li key={i}>
            Show #{r.showId} — {new Date(r.datetime).toLocaleString()} — {r.note}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reminders;
