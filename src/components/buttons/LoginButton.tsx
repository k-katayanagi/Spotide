'use client';

import Button from '@components/Button';
import { useToast } from '@chakra-ui/react';
// import { signIn } from 'next-auth/react';
import Image from 'next/image';

type Props = {
  imageWidth?: number;
  imageHeight?: number;
};

const LoginButton = (props: Props) => {
  const { imageWidth = 500, imageHeight = 500 } = props;
  const toast = useToast();

  const handleLogin = async () => {
    console.log("Attempting Google SignIn");

    // // Googleサインインを開始
    // await signIn('google');
    toast({
      title: "ログイン完了",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Button
      onClick={handleLogin}
      className="flex items-center justify-center w-full max-w-xs px-4 py-2 text-sm font-medium"
      text={
        <div className="flex items-center">
          <Image
            src="/images/web_light_rd_SI.svg"
            alt="Googleでログイン"
            width={imageWidth}
            height={imageHeight}
            className="mr-2 object-contain"
          />
        </div>
      }
    />
  );
};

export default LoginButton;
