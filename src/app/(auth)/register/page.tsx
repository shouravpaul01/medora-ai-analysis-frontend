import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/shared/Logo";
import AuthVisualSide from "@/components/auth/AuthVisualSide";

export default function RegisterPage() {
  return (
    <div className="w-full h-screen overflow-hidden grid lg:grid-cols-2">
      {/* LEFT SIDE: Fixed Visual Panel with full background color, Lottie & animated medical icons (Non-scrollable) */}
      <div className="hidden lg:flex h-full w-full overflow-hidden sticky top-0">
        <AuthVisualSide
          borderSide="right"
          srcPaths={[
            "/lottie/signup.json",
            "/lottie/register.json",
            "/animations/signup.json",
            "/signup.json",
            "/animations/register.json",
            "/register.json",
          ]}
        />
      </div>

      {/* RIGHT SIDE: Scrollable Form Panel (Only this side is scrollable) */}
      <div className="h-full w-full overflow-y-auto flex flex-col justify-center items-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto my-auto">
          <div className="mb-8 sm:mb-10">
            <Logo width={180} height={50} priority />
          </div>

          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Sign up
            </h1>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
