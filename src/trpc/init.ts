import { db } from "@/db";
import { agents, meetings } from "@/db/schema";

import { initTRPC, TRPCError } from "@trpc/server";
import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { cache } from "react";

type Context = {
  userId: string | null;
};

const t = initTRPC.context<Context>().create();

import { getAuth } from "@clerk/nextjs/server";

export const createContext = async ({ req }: { req: any }) => {
  const { userId } = getAuth(req);
  return {
    userId,
  };
};

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized",
    });
  }

  return next({
    ctx: {
      ...ctx,
      userId: ctx.userId,
    },
  });
});
