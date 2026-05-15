import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { polarClient } from "@/lib/polar";

export async function POST() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
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

    const customers = await polarClient.customers.list({
      email,
    });

    const customer = customers.result.items[0];

    if (!customer) {
      return new NextResponse("Customer not found", {
        status: 404,
      });
    }

    const portal = await polarClient.customerSessions.create({
      customerId: customer.id,
    });

    return NextResponse.json({
      url: portal.customerPortalUrl,
    });

  } catch (error) {
    console.error(error);

    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
