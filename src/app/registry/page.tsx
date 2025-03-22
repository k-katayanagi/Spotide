import { signIn } from "@/auth";
import LoginButton from "@/components/buttons/LoginButton";
import TopButton from "@/components/buttons/TopButton";

export default async function Registry() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen transform translate-y-[-60px] space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24">
      <form
        action={async () => {
          "use server"
          await signIn("google", { redirectTo: "/mypage" });
        }}
      >
        <LoginButton />
      </form>

      <div className="flex flex-col items-center justify-center mt-4 space-y-1">
        <TopButton />
      </div>
    </div>
  );
};
