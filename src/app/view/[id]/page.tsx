'use client';

import { useState } from 'react';
import ListView from './ListView';
import ParticipationAuth from './ParticipationAuth';

const ListViewPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="relative">
      {!isAuthenticated ? (
        <ParticipationAuth setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50">
          <ListView />
        </div>
      )}
    </div>
  );
};

export default ListViewPage;
