import { router, publicProcedure, protectedProcedure } from "../trpc";
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
  create: protectedProcedure.input(schema).mutation(async ({ input, ctx }) => {
    const hasPostedToday = await ctx.prisma.entry.findFirst({
      where: {
        createdAt: {
          lte: new Date(),
        },
      },
    });

    if (hasPostedToday) {
      throw new Error("Cannot post on the same day twice");
    }

    return ctx.prisma.entry.create({
      data: {
        userId: ctx?.session?.user?.id,
        rating: input.rating,
        til: input.til,
        tiwo: input.tiwo,
      },
    });
  }),
  hasPostedToday: protectedProcedure.query(async ({ ctx }) => {
    const hasPostedToday = await ctx.prisma.entry.findFirst({
      where: {
        createdAt: {
          lte: new Date(),
        },
      },
    });
    return hasPostedToday ? true : false;
  }),

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.entry.findMany({
      where: {
        userId: ctx.session?.user?.id,
      },
    });
  }),
  summary: protectedProcedure.query(async ({ ctx }) => {
    const userId = await ctx.session?.user?.id;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    function getLastDayOfMonth(year: number, month: number) {
      return new Date(year, month + 1, 0);
    }

    const allEntries = await ctx.prisma.entry.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(`${currentYear}-01-01`),
          lte: new Date(`${currentYear}-12-31`),
        },
      },
    });

    const monthEntries = await ctx.prisma.entry.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(currentYear, currentMonth, 1),
          lte: getLastDayOfMonth(currentYear, currentMonth),
        },
      },
    });

    const entriesLength = allEntries.length;
    const monthEntriesLength = monthEntries.length;

    type score<ScoreType> = {
      BAD: ScoreType;
      VERY_BAD: ScoreType;
      NORMAL: ScoreType;
      GOOD: ScoreType;
      VERY_GOOD: ScoreType;
    };

    const scoreDictionary: score<number> = {
      BAD: 0,
      VERY_BAD: 0,
      NORMAL: 0,
      GOOD: 0,
      VERY_GOOD: 0,
    };

    allEntries.forEach((entry) => {
      scoreDictionary[entry.rating] += 1;
    });

    function getEntryRatingAverage(score: number) {
      return (score / entriesLength) * 100;
    }

    function daysWithEntriesAverage() {
      return Math.round((entriesLength / 365) * 100);
    }

    return {
      monthEntries: monthEntriesLength,
      totalEntries: entriesLength,
      daysWithEntriesAverage: daysWithEntriesAverage(),
      scoreAverage: {
        BAD: getEntryRatingAverage(scoreDictionary.BAD),
        VERY_BAD: getEntryRatingAverage(scoreDictionary.VERY_BAD),
        GOOD: getEntryRatingAverage(scoreDictionary.GOOD),
        NORMAL: getEntryRatingAverage(scoreDictionary.NORMAL),
        VERY_GOOD: getEntryRatingAverage(scoreDictionary.VERY_GOOD),
      },
    };
  }),
});
