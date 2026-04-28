// app/(auth)/sign-in/page.tsx
"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && userId) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) return null;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-4xl grid md:grid-cols-2 border rounded-2xl overflow-hidden">
        {/* Left */}
        <div className="p-6 md:p-8">
          <SignIn
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
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-green-900 to-green-700 text-white">
          <img src="/logo.svg" className="h-[90px] w-[90px]" />
          <p className="text-2xl font-semibold mt-4">Meet.AI</p>
        </div>
      </div>
    </div>
  );
}
