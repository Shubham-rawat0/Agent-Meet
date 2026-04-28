"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b bg-white">
      <Link href="/" className="text-green-900  text-2xl font-semibold tracking-tight">
        Agentmeet
      </Link>

      <div className="flex items-center gap-4">
        {!userId ? (
          <>
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-black transition"
            >
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="text-sm font-medium bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <UserButton />
        )}
      </div>
    </header>
  );
}
