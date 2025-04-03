'use client';

import { useState, useEffect } from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getRandomColor = () => {
  const colors = [
    'bg-red-100',
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-pink-100',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const [buttonColor, setButtonColor] = useState('');

  useEffect(() => {
    setButtonColor(getRandomColor());
  }, []);

  return (
    <div className="flex justify-center items-center mt-6 space-x-3">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 ${buttonColor} rounded-lg disabled:opacity-50 hover:opacity-80`}
      >
        前へ
      </button>

      <span className="text-lg font-bold">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 ${buttonColor} rounded-lg disabled:opacity-50 hover:opacity-80`}
      >
        次へ
      </button>
    </div>
  );
};

export default Pagination;
