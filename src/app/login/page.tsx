
'use client';

import LoginButton from "@/components/buttons/LoginButton";

const handleLogin = () => {
  alert("ログイン")
}

const Login = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      ログインページです
      <LoginButton onClick={handleLogin}/>
    </div>
  );
}

export default Login;
