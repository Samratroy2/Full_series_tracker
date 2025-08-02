// frontend\src\contexts\ClubContext.jsx

import React, { createContext, useContext, useState } from 'react';

const ClubContext = createContext();

export const useClubs = () => useContext(ClubContext);

export const ClubProvider = ({ children }) => {
  const [clubs, setClubs] = useState([
    {
      id: '1',
      name: 'Anime Fans',
      members: ['You', 'Munna', 'King'],
      messages: [],
      polls: []
    }
  ]);

  const createClub = (name) => {
    const newClub = {
      id: Date.now().toString(),
      name,
      members: [],
      messages: [],
      polls: [],
    };
    setClubs(prevClubs => [...prevClubs, newClub]);
  };

  const deleteClub = (clubId) => {
    setClubs(prevClubs => prevClubs.filter(club => club.id !== clubId));
  };

  const addMessage = (clubId, user, text) => {
    setClubs(prevClubs => prevClubs.map(club => {
      if (club.id === clubId) {
        return {
          ...club,
          messages: [...club.messages, { user, text }]
        };
      }
      return club;
    }));
  };

  const addPoll = (clubId, question, options) => {
    setClubs(prevClubs => prevClubs.map(club => {
      if (club.id === clubId) {
        return {
          ...club,
          polls: [
            ...club.polls,
            {
              id: Date.now().toString(),
              question,
              options
            }
          ]
        };
      }
      return club;
    }));
  };

  const votePollOption = (clubId, pollId, optionIndex) => {
    setClubs(prevClubs => prevClubs.map(club => {
      if (club.id === clubId) {
        return {
          ...club,
          polls: club.polls.map(poll => {
            if (poll.id === pollId) {
              const updatedOptions = poll.options.map((opt, idx) =>
                idx === optionIndex
                  ? { ...opt, votes: (opt.votes || 0) + 1 }
                  : opt
              );
              return { ...poll, options: updatedOptions };
            }
            return poll;
          })
        };
      }
      return club;
    }));
  };

  return (
    <ClubContext.Provider value={{ clubs, createClub, deleteClub, addMessage, addPoll, votePollOption }}>
      {children}
    </ClubContext.Provider>
  );
};
