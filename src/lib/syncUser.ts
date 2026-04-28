import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/db";
import { user } from "@/db/schema";

export async function syncUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return;

  await db
    .insert(user)
    .values({
      id: clerkUser.id,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      email: clerkUser.emailAddresses[0].emailAddress,
      emailVerified:
        clerkUser.emailAddresses[0].verification?.status === "verified",
      image: clerkUser.imageUrl,
    })
    .onConflictDoUpdate({
      target: user.id,
      set: {
        name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
        email: clerkUser.emailAddresses[0].emailAddress,
        image: clerkUser.imageUrl,
        updatedAt: new Date(),
      },
    });
}
