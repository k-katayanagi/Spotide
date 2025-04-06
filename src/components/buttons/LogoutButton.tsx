"use client";

type Props = {
  onClick: () => void;
};

const LogoutButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold py-2 px-2 rounded-full  transition duration-300 w-[145px] h-[40px]"
    >
      ログアウト
    </button>
  );
};

export default LogoutButton;
