"use client";
import { motion } from "framer-motion";

interface Props {
  onClick: () => void;
}

const MenuBar = ({ onClick }: Props) => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -30 }} 
        transition={{ duration: 0.3, ease: "easeOut" }} 
      >
        {/* メニュー項目 */}
        <div className="mt-6 w-full">
          {[
            "場所を検索",
            "共有ユーザー設定",
            "表示ラベル設定",
            "投票開始日設定",
          ].map((item, index) => (
            <button
              key={index}
              className="w-full text-xl py-4 border-t border-gray-300 bg-gray-100 hover:bg-gray-200"
              onClick={onClick}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MenuBar;
