'use client';
import { motion } from 'framer-motion';
import { TMenu } from '@/types/MenuType';
import { useRouter } from 'next/navigation';

interface Props {
  onClick: () => void;
  menuItems: TMenu[];
  children?: React.ReactNode;
}
const MenuBar = ({ onClick, menuItems }: Props) => {
  const router = useRouter();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-[300px] min-h-[200px]"
      >
        {/* メニュー項目 */}
        <div className="mt-6 w-full">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full text-xl py-4 border-t border-gray-300 bg-gray-100 hover:bg-gray-200"
              onClick={() => {
                if (item.onClick) {
                  item.onClick(); // カスタム関数を実行）
                } else if (item.url) {
                  router.push(item.url); // ページ遷移
                }
                onClick(); // メニューを閉じる
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MenuBar;
