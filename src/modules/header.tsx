"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const { userId, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return (
    <header className="flex items-center justify-between  h-16 bg-[#061a15]/90 border-b">
      <Link href="/" className="flex items-center gap-2 px-2 pt-2">
        <Image src="/logo.svg" height={36} width={36} alt="logo" />
        <p className="text-2xl text-white font-semibold">AgentMeet</p>
      </Link>

      <div className="flex items-center gap-4 pr-10">
        {!userId ? (
          <>
            <Link href="/sign-in" className="text-sm font-medium text-white ">
              Sign In
            </Link>

            <Link
              href="/sign-up"
              className="text-sm font-medium bg-black text-white px-4 py-2 rounded-full "
            >
              Sign Up
            </Link>
          </>
        ) : (
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: "text-white",
                userButtonOuterIdentifier: "text-white",
              },
            }}
          />
        )}
      </div>
    </header>
  );
}
