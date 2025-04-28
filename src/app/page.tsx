

import Head from 'next/head';
import Top from './Top';

const TopPage = () => {
  return (
    <>
      <Head>
        <link rel="preload" href="/images/top/background.svg" as="fetch" />
      </Head>
      <div
        className="relative w-full h-[8000px] overflow-hidden"
        style={{
          backgroundImage: 'url(/images/top/background.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% auto',
        }}
      >
        <Top />
      </div>
    </>
  );
};

export default TopPage;
