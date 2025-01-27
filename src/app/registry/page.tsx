'use client';

import RegistrationButton from "@/components/buttons/RegistrationButton";
import LoginButton from "@/components/buttons/LoginButton";

const Registry = () => {
return (
    <div>
      <RegistrationButton/>
      <p>ログインアカウントをお持ちの方</p>
      <LoginButton/>
    </div>
  );
}

export default Registry;