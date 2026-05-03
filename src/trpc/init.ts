import { db } from "@/db";
import { agents, meetings } from "@/db/schema";

import { initTRPC, TRPCError } from "@trpc/server";

type Context = {
  userId: string | null;
};

const t = initTRPC.context<Context>().create();


import { auth } from "@clerk/nextjs/server";

export const createTRPCContext = async (): Promise<Context> => {
  const { userId } = await auth();

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
