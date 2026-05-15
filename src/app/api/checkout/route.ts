import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { polarClient } from "@/lib/polar";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const body = await req.json();

    const { productId } = body;

    if (!productId) {
      return new NextResponse("Missing productId", {
        status: 400,
      });
    }

    const clerk = await clerkClient();

    const currentUser = await clerk.users.getUser(userId);

    const email = currentUser.emailAddresses[0]?.emailAddress;

    if (!email) {
      return new NextResponse("No email found", {
        status: 400,
      });
    }

    const checkout = await polarClient.checkouts.create({
      products: [productId],

      customerEmail: email,

      externalCustomerId: userId,

      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/upgrade?success=true`,
    });

    return NextResponse.json({
      url: checkout.url,
    });
  } catch (error) {
    console.error(error);

    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
