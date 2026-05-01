"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Header } from "@/modules/header";
export default function Home() {
    const { userId } = useAuth();
    if (userId) {
      redirect("/dashboard");
    }
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center mt-30 px-6 text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight max-w-3xl">
          Meet your AI agent. Anytime.
        </h1>

        {/* Subtext */}
        <p className="mt-4 text-gray-600 max-w-xl text-base md:text-lg">
          Agentmeet is an AI-powered platform that lets you schedule and
          interact with intelligent agents as if you're in a real meeting. Get
          instant insights, automate conversations, and boost productivity.
        </p>

        <div className="mt-8 flex flex-col md:flex-row gap-4 text-sm text-gray-700">
          <span>⚡ Real-time AI conversations</span>
          <span>🎯 Smart task assistance</span>
          <span>🔒 Secure & private</span>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Start with a free trial. Upgrade anytime for advanced features.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/sign-up"
            className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition"
          >
            Get Started
          </Link>

          <Link
            href="/sign-in"
            className="px-6 py-3 rounded-full text-sm font-medium border hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
        </div>
      </main>
    </>
  );
}
