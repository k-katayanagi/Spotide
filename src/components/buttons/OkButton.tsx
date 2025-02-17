'use client';

import Button from '@components/Button';


const OkButton = () => {
  return (
    <Button
      className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-9 font-medium text-neutral-50 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-500 hover:to-blue-600 hover:shadow-2xl transform hover:scale-102 mt-5"
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-blue-300 transition-all duration-300 group-hover:h-56 group-hover:w-32"></span>
          <span>OK</span>
        </>
      }
    />
  );
};

export default OkButton;
