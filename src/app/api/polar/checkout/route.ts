import { polarClient } from "@/lib/polar";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkout = await polarClient.checkouts.create({
    products: [process.env.POLAR_PRODUCT_ID!],

    successUrl: "http://localhost:3000/upgrade/success",
  });

  return NextResponse.json({
    url: checkout.url,
  });
}
