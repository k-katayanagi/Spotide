'use client';

import Button from '@components/Button';

const SubmitButton = () => {
  return (
    <Button
      className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full 
        bg-[#FF5722] border-4 border-[#FF5722] px-9 font-medium text-white transition-all duration-300 
        hover:bg-gradient-to-r hover:from-[#FF7043] hover:via-[#FF5722] hover:to-[#F4511E]  w-full lg:w-1/4"
      type="submit"
      text={
        <>
          <span
            className="absolute z-0 h-0 w-0 rounded-full bg-[#FF8A65] transition-all duration-300  group-hover:h-56 group-hover:w-[400px]
            lg:group-hover:h-56 lg:group-hover:w-40"
          ></span>
          <span className="relative z-10">作成</span>
        </>
      }
    />
  );
};

export default SubmitButton;
