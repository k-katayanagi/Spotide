"use client";

import Button from "@components/Button";

interface Props {
  onClick?: () => void; // ← クリック時の関数を受け取る
}

const UserAddButton = ({ onClick }: Props) => {
  return (
    <Button
      className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-full 
                 bg-white border-4 border-[#FF5722] px-9 font-medium text-black transition-all duration-300 
                 hover:bg-gradient-to-r hover:from-[#FF7043] hover:via-[#FF5722] hover:to-[#F4511E] 
                 hover:shadow-2xl transform hover:scale-[1.02] mt-5"
      text={
        <>
          <span className="absolute h-0 w-0 rounded-full bg-[#FF8A65] transition-all duration-300 group-hover:h-40 group-hover:w-140"></span>
          <span>ユーザー追加</span>
        </>
      }
      type="submit"
      onClick={onClick}
    />
  );
};

export default UserAddButton;
