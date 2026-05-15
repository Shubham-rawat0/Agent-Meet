import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import { polarClient } from "@/lib/polar";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headerPayload = await headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);

  let evt: any;

  try {
    evt = wh.verify(body, svixHeaders);
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

  if (evt.type === "user.created") {
    const user = evt.data;

    console.log("New user:", user.id);

    try {
      const customer = await polarClient.customers.create({
        email: user.email_addresses[0].email_address,
        externalId: user.id,
        name: [user.first_name, user.last_name].filter(Boolean).join(" "),
      });

      console.log("Polar customer created:", customer);
    } catch (error) {
      console.error("POLAR ERROR:", error);

      return new Response("Polar failed", {
        status: 500,
      });
    }
  }

  return new Response("OK", { status: 200 });
}
