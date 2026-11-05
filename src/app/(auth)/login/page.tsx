import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/shared/Logo";
import AuthVisualSide from "@/components/auth/AuthVisualSide";

export default function LoginPage() {
  return (
    <div className="w-full h-screen overflow-hidden grid lg:grid-cols-2">
      {/* LEFT SIDE: Fixed Visual Panel with full background color, Lottie & animated medical icons (Non-scrollable) */}
      <div className="hidden lg:flex h-full w-full overflow-hidden sticky top-0">
        <AuthVisualSide
          borderSide="right"
          srcPaths={[
            "/lottie/login.json",
            "/animations/login.json",
            "/animations/signin.json",
            "/login.json",
            "/signin.json",
          ]}
        />
      </div>

      {/* RIGHT SIDE: Scrollable Form Panel (Only this side is scrollable) */}
      <div className="h-full w-full overflow-y-auto flex flex-col justify-center items-center px-6 py-12 lg:px-16 xl:px-24">
        <div className="w-full max-w-md mx-auto my-auto">
          <div className="mb-8 sm:mb-12">
            <Logo width={180} height={50} priority />
          </div>

          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Portal Login
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
