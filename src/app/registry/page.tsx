'use client';

import RegistrationButton from "@/components/buttons/RegistrationButton";
import LoginButton from "@/components/buttons/LoginButton";
import TopButton from "@/components/buttons/TopButton";

const Registry = () => {

return (
  <div className="flex flex-col items-center justify-center w-full h-screen transform translate-y-[-60px]">
    <div className="flex flex-col items-center justify-center w-full max-h-full overflow-y-auto sm:mt-0 md:mt-0">
      <h1 className="mt-4 mb-4 font-bold">新規会員登録はこちら</h1>
      <RegistrationButton />
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className="mt-4 mb-4 font-bold">アカウントをお持ちの方はこちら</h1>
        <LoginButton />
        <TopButton/>
      </div>
    </div>
  </div>
  );
}

export default Registry;
