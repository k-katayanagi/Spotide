'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';

const Top = () => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  const handleBackgroundLoad = () => {
    setIsBackgroundLoaded(true);
  };

  return (
    <>
      {/* 背景 */}
      <div className="absolute top-0 left-0 w-full h-full -z-20">
        <NextImage
          src="/images/top/background.svg"
          alt="background"
          fill
          priority
          onLoadingComplete={handleBackgroundLoad}
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* 背景ロード完了後だけ全部表示 */}
      {isBackgroundLoaded && (
        <>
          <div className="absolute top-[-40px] left-[400px] translate-x-[0%] z-10">
            <NextImage
              src="/images/top/logo_animetion.gif"
              alt="logo"
              width={705}
              height={191}
            />
          </div>
          {/* ロゴ */}
          <div className="absolute top-[190px] left-[430px] translate-x-[0%] z-20">
            <NextImage
              src="/images/spotideLogo.svg"
              alt="logo"
              width={705}
              height={191}
              unoptimized
            />
          </div>

          {/* 絵具 左側 */}
          <motion.div
            className="absolute top-[-140px] left-[-450px] z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: [0, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
            }}
          >
            <NextImage
              src="/images/top/enogu1.svg"
              alt="logo"
              width={930}
              height={330}
            />
          </motion.div>

          {/* 絵具 右側 */}
          <motion.div
            className="absolute top-[-450px] right-[-450px] z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: [0, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 0.8,
              ease: 'backOut',
              delay: 0.5,
            }}
          >
            <NextImage
              src="/images/top/enogu2.svg"
              alt="logo"
              width={930}
              height={330}
            />
          </motion.div>

          <div className="absolute top-[860px] left-[350px] translate-x-[0%] z-20">
            <NextImage
              src="/images/top/text.svg"
              alt="logo"
              width={850}
              height={191}
              unoptimized
            />
          </div>

          <motion.div
            className="absolute top-[1030px] left-[350px] translate-x-[0%] z-20"
            initial={{ opacity: 0, y: 100 }} // 最初ちょっと下&透明
            whileInView={{ opacity: 1, y: 0 }} // 見えたら上にシュッと
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }} // 1回だけアニメする
          >
            <NextImage
              src="/images/top/logo1.svg"
              alt="logo"
              width={850}
              height={191}
              unoptimized
            />
          </motion.div>

          <motion.div
            className="absolute top-[1050px] left-[350px] translate-x-[0%] z-20"
            initial={{ opacity: 0, scale: 0 }} // 最初は透明で小さい
            whileInView={{
              opacity: 1,
              scale: [0, 1.5, 0.9, 1], // ぽよん！大きくなって戻る
            }}
            transition={{
              duration: 1, // アニメーションの時間
              ease: 'easeOut', // イージングで滑らかに
            }}
            viewport={{ once: true }} // 1回だけアニメーション
          >
            <NextImage
              src="/images/top/logo2.svg"
              alt="logo"
              width={850}
              height={191}
              unoptimized
            />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Top;
