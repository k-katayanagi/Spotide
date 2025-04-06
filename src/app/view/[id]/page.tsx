'use client';

import { useEffect, useState } from 'react';
import ListView from './ListView';
import ParticipationAuth from './ParticipationAuth';

const ListViewPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthSuccess = (id: number) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('participantId', id.toString());
    setIsAuthenticated(true);
  };

  return (
    <div className="relative">
      {!isAuthenticated ? (
        <ParticipationAuth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
          <ListView />
        </div>
      )}
    </div>
  );
};

export default ListViewPage;
