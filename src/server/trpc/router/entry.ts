import { router, publicProcedure } from "../trpc";
import { z } from "zod";

const RATING_VALUES = [
  "VERY_BAD",
  "BAD",
  "NORMAL",
  "GOOD",
  "VERY_GOOD",
] as const;

const RATING_VALUES_ENUM = z.enum(RATING_VALUES);

const schema = z.object({
  rating: RATING_VALUES_ENUM,
  til: z.string(),
  tiwo: z.string(),
});

export const entryRouter = router({
  create: publicProcedure.input(schema).mutation(({ input, ctx }) => {
    return ctx.prisma.entry.create({
      data: {
        userId: ctx?.session?.user?.id as string,
        rating: input.rating,
        til: input.til,
        tiwo: input.tiwo,
      },
    });
  }),
  list: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany({
      where: {
        userId: ctx.session?.user?.id as string,
      },
    });
  }),
});
