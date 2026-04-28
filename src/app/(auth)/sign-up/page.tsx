// app/(auth)/sign-in/page.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  const { userId } = useAuth();
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 border rounded-2xl overflow-hidden">
        {/* Left */}
        <div className="p-6 md:p-8">
          <SignUp
            appearance={{
              elements: {
                card: "shadow-none border-0 p-0",
                formButtonPrimary:
                  "bg-purple-700 hover:bg-purple-800 text-white",
              },
            }}
          />
        </div>

        {/* Right */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 text-white">
          <img src="/logo.svg" className="h-[90px] w-[90px]" />
          <p className="text-2xl font-semibold mt-4">AgentMeet</p>
        </div>
      </div>
    </div>
  );
}
