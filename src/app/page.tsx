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
      <div className="relative w-full h-[10000px] overflow-x-hidden overflow-y-auto">
        <div className="absolute inset-0 w-full h-[10000px]">
          <NextImage
            src="/images/top/background.webp"
            alt="background"
            fill
            priority
            onLoadingComplete={handleBackgroundLoad}
            style={{ objectFit: 'cover' }}
            className="z-0"
          />
        </div>

        {/* 背景ロード後に中身表示 */}
        {isBackgroundLoaded && (
          <div className="relative z-10">
            {/* ロゴエリア */}
            <div className="relative w-full h-[400px] lg:h-[800px] overflow-visible">
              {/* ロゴアニメーション */}
              <div className="relative w-[80vw] lg:w-[50vw] h-[400px] mx-auto">
                <NextImage
                  src="/images/top/logo_animetion.gif"
                  alt="logo animation"
                  layout="responsive"
                  objectFit="contain"
                  width={705}
                  height={705}
                  className="absolute top-[15%] left-[1%] lg:left-[-2%] lg:top-[-20%]  z-0"
                />
              </div>

              {/* メインロゴ */}
              <div className="absolute top-[40%] left-[11%] w-[80vw] lg:top-[20%] lg:left-[25%] lg:w-[55vw] z-10">
                <NextImage
                  src="/images/spotideLogo.svg"
                  alt="main logo"
                  layout="responsive"
                  width={705}
                  height={705}
                  unoptimized
                  className="w-full h-auto"
                />
              </div>

              {/* 左の絵具（ロゴの左下あたりに絶対配置） */}
              <motion.div
                className="absolute top-[50%] left-[-40%] w-[80vw] lg:top-[10%] lg:left-[-20%] lg:w-[55vw] z-0"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.2, 0.9, 1] }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                <NextImage
                  src="/images/top/enogu1.svg"
                  alt="paint left"
                  layout="responsive"
                  width={930}
                  height={330}
                  priority
                />
              </motion.div>

              {/* 右の絵具（ロゴの右上あたりに絶対配置） */}
              <motion.div
                className="absolute top-[-25%] right-[-46%] w-[80vw]  lg:top-[-50%] lg:right-[-20%] lg:w-[55vw] z-0"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: [0, 1.2, 0.9, 1] }}
                transition={{ duration: 0.8, ease: 'backOut', delay: 0.5 }}
              >
                <NextImage
                  src="/images/top/enogu2.svg"
                  alt="paint right"
                  layout="responsive"
                  width={930}
                  height={330}
                />
              </motion.div>
            </div>

            {/* それ以下のテキストとかロゴたち */}
            <div className="relative mt-[50px]">
              <div className="w-[90vw] mx-auto">
                <NextImage
                  src="/images/top/text.svg"
                  alt="text"
                  layout="responsive"
                  width={850}
                  height={191}
                  unoptimized
                />
              </div>

              <motion.div
                className="w-[90vw] mx-auto"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <NextImage
                  src="/images/top/logo1.svg"
                  alt="logo 1"
                  layout="responsive"
                  width={850}
                  height={191}
                  unoptimized
                />
              </motion.div>

              <motion.div
                className="w-[90vw] mx-auto"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: [0, 1.5, 0.9, 1] }}
                transition={{ duration: 1, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <NextImage
                  src="/images/top/logo2.svg"
                  alt="logo 2"
                  layout="responsive"
                  width={850}
                  height={191}
                  unoptimized
                />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Top;
