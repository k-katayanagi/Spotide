'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NextImage from 'next/image';
import { useToast } from '@chakra-ui/react';
import LoginButton from '@/components/buttons/LoginButton';
import { signIn } from 'next-auth/react';

const Top = () => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toast = useToast();

  // ログイン処理
  const handleLogin = async () => {
    console.log('Googleアカウントでログイン開始');

    const result = await signIn('google', {
      callbackUrl: '/user/mypage',
    });

    if (result?.error) {
      setErrorMessage(`ログインに失敗しました: ${result.error}`);
      toast({
        title: 'ログイン失敗',
        description: 'もう一度お試しください',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    toast({
      title: 'ログイン成功',
      description: 'マイページへ移動します',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  const stepTexts = [
    'リスト作成',
    'リスト一覧',
    '参加者の追加',
    '参加URLの認証',
    '行きたい場所の検索',
    '投票',
  ];

  const stepDescriptions = [
    '気になるお店を検索して、<br/>自分だけの行きたい場所<br/>リストを作成',
    '作成したリストを一目で<br/>確認・編集',
    'URLを共有して簡単招待。<br/>みんなで一緒に<br/>旅の計画がスタート',
    '共有URLから<br/>パスを入力して参加<br/>誰でもスムーズにアクセス可能',
    'ジャンルやエリアで検索<br/>気になるお店を<br/>どんどんリストに追加',
    '候補地に投票して、<br/>みんなの「行きたい！」を<br/>見える化',
    '投票結果を集計して、<br/>人気の行き先がすぐに決まる！',
  ];

  const steps = Array.from({ length: 7 }, (_, index) => {
    const stepNumber = index + 1;
    return {
      circle: `/images/top/circle${stepNumber}.svg`,
      laptop: `/images/top/pc${stepNumber}.svg`,
      title: stepTexts[index], // 見出し
      description: stepDescriptions[index], // 説明文
    };
  });

  const handleBackgroundLoad = () => {
    setIsBackgroundLoaded(true);
  };

  return (
    <>
      {/* 背景 */}
      <div className="relative w-full h-[6000px] lg:h-[10000px] overflow-x-hidden overflow-y-auto">
        <div className="absolute inset-0 w-full">
          <NextImage
            src="/images/top/background.webp"
            alt="background"
            fill
            priority
            onLoadingComplete={handleBackgroundLoad}
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
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
            <div className="relative mt-[310px] lg:mt-[200px]">
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
                className="w-[90vw] mx-auto mt-[-40px] lg:mt-[-130px]"
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
                  height={101}
                  unoptimized
                />
              </motion.div>

              <motion.div
                className="w-[90vw] mx-auto mt-[-90px] lg:mt-[-280px]"
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

            <div className="mt-[600px] lg:mt-[300px] space-y-[300px] lg:space-y-[400px]">
              {steps.map((step, index) => {
                const isOdd = index % 2 === 0;
                const isLast = index === steps.length - 1;

                return (
                  <div
                    key={index}
                    className={
                      isLast
                        ? 'flex flex-col items-center justify-center'
                        : `flex flex-row ${isOdd ? 'flex-row-reverse' : 'flex-row'} items-center justify-center gap-2 `
                    }
                  >
                    {/* Circle */}
                    <motion.div
                      initial={
                        isLast
                          ? { opacity: 0, y: 100 }
                          : { opacity: 0, x: isOdd ? 200 : -200 }
                      }
                      whileInView={
                        isLast ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }
                      }
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className={`relative w-[260px] lg:w-[600px] ${isLast ? 'mx-auto' : isOdd ? 'self-end' : 'self-start'}`}
                    >
                      {isLast && (
                        <>
                          <div className="absolute inset-0  top-[40%] z-0 pointer-events-none scale-[2]">
                            <NextImage
                              src="/images/top/kamihubuki.gif"
                              alt="confetti"
                              width={800}
                              height={800}
                              unoptimized
                            />
                          </div>
                          {/*pc7_logo */}
                          <div className="absolute top-[-10%] left-1/2 transform -translate-x-1/2 w-[60%] z-20">
                            <NextImage
                              src="/images/top/pc7_logo.svg"
                              alt="pc7 logo overlay"
                              layout="responsive"
                              width={800}
                              height={800}
                              unoptimized
                            />
                          </div>
                        </>
                      )}

                      <NextImage
                        src={step.circle}
                        alt={`Step ${index + 1}`}
                        layout="responsive"
                        width={800}
                        height={800}
                        className="relative z-10"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 gap-y-[25px] lg:gap-y-[50px] text-center z-20">
                        {/* 見出し */}
                        <h1 className="text-[#ffbcd9] text-3xl lg:text-6xl font-bold drop-shadow-md -mt-[10px] lg:mb-[5px]">
                          {step.title}
                        </h1>
                        {/* 説明文 */}
                        <p
                          className="text-[#f04f95] text-2xl lg:text-6xl font-bold drop-shadow-md leading-snug  lg:mb-[60px]"
                          dangerouslySetInnerHTML={{ __html: step.description }}
                        ></p>
                      </div>
                    </motion.div>

                    {/* Laptop */}

                    <div
                      className={` w-[240px]  lg:w-[500px] relative z-10 ${isLast ? '-mt-60' : 'self-end -mt-20 lg:-mt-40'} 
                      ${!isLast && (isOdd ? '-mr-[120px] lg:-mr-[200px]' : '-ml-[120px] lg:-ml-[200px]')}
                      transform ${isLast ? 'translate-y-[110px] lg:translate-y-[-40px]' : 'translate-y-[60px] lg:translate-y-[120px] '}
                      `}
                    >
                      <motion.div
                        initial={
                          isLast
                            ? { opacity: 0, y: 100 }
                            : { opacity: 0, x: isOdd ? -200 : 200 }
                        }
                        whileInView={
                          isLast ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }
                        }
                        transition={{
                          duration: 1,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true }}
                      >
                        <NextImage
                          src={step.laptop}
                          alt={`Laptop ${index + 1}`}
                          layout="responsive"
                          width={600}
                          height={400}
                        />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 最後の白文字テキスト */}
            <div className="relative z-30 mt-[200px] lg:mt-[50px] flex justify-center px-4">
              <div className="text-white text-center text-[20px] lg:text-[45px] font-extrabold leading-tight w-full max-w-[1600px] drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
                面倒な計画共有も、意見のすり合わせも、このアプリひとつで完結。
                <br />
                さあ、Spotideではじめよう。
                <br />
                「集める、シェアする、決める。」そのすべてを。
              </div>
            </div>

            {/* 👇この辺にログインボタン追加 */}
            <div className="relative z-30 mt-[120px] flex flex-col items-center justify-center">
              <h1 className="text-white text-xl5 bold ">ログインはこちら</h1>
              <LoginButton onClick={handleLogin} />
              {errorMessage && (
                <div className="text-red-500 mt-4 text-center">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Top;
