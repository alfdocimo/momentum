import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Dashboard from "../../../../components/layout/Dashboard";
import { trpc } from "../../../../utils/trpc";
import { useRouter } from "next/router";
import { prisma } from "../../../../server/db/client";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

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

type IEntry = z.infer<typeof schema>;

export default function NewEntry({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const createEntryMutation = trpc.entry.create.useMutation();
  const { data: getHaveWorkedOnData } = trpc.entry.getHaveWorkedOn.useQuery();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEntry>({
    resolver: zodResolver(schema),
    defaultValues: {
      rating: "NORMAL",
    },
  });

  const onSubmit = async (data: IEntry) => {
    console.log({ data });
    await createEntryMutation.mutateAsync({
      rating: data.rating,
      til: data.til,
      tiwo: data.tiwo,
    });
    router.push("/app");
  };

  return (
    <Dashboard>
      <h1>New entry</h1>

      <div className="h-100 bg-base-900 card w-full shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>How are you feeling today?</h2>
            <div className="rating rating-lg gap-1">
              <input
                {...register("rating")}
                value={RATING_VALUES_ENUM.Enum.VERY_BAD}
                type="radio"
                className="mask mask-heart bg-red-400"
              />
              <input
                {...register("rating")}
                value={RATING_VALUES_ENUM.Enum.BAD}
                type="radio"
                className="mask mask-heart bg-orange-400"
              />
              <input
                {...register("rating")}
                value={RATING_VALUES_ENUM.Enum.NORMAL}
                type="radio"
                className="mask mask-heart bg-yellow-400"
              />
              <input
                {...register("rating")}
                value={RATING_VALUES_ENUM.Enum.GOOD}
                type="radio"
                className="mask mask-heart bg-lime-400"
              />
              <input
                {...register("rating")}
                value={RATING_VALUES_ENUM.Enum.VERY_GOOD}
                type="radio"
                className="mask mask-heart bg-green-400"
              />
            </div>
            <h2>Today I learned...</h2>
            <input
              {...register("til")}
              type="text"
              placeholder="Reflect on one thing you learned today"
              className="input-bordered input input-lg w-full"
            />
            <h2>Today I worked on...</h2>
            <input
              placeholder="Reflect on one thing you worked on today"
              className="input-bordered input input-lg w-full"
              {...register("tiwo")}
              list="suggestions"
            />
            <datalist id="suggestions">
              {getHaveWorkedOnData?.haveWorkedOnSuggest.map((option) => (
                <option key={option.id} value={option.tiwo} />
              ))}
            </datalist>
            <div className="card-actions flex justify-center pt-4">
              <input type="submit" className="btn-outline btn" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const getDate = (givenDate = new Date()): string => {
    const offset = givenDate.getTimezoneOffset();
    givenDate = new Date(givenDate.getTime() - offset * 60 * 1000);
    const parsedDate = givenDate.toISOString().split("T");
    if (!parsedDate[0]) return "";
    return parsedDate[0];
  };

  const hasPostedToday = await prisma.entry.findFirst({
    where: {
      createdAt: {
        gte: new Date(getDate()),
      },
    },
  });

  if (hasPostedToday) {
    return {
      redirect: {
        permanent: false,
        destination: "/app",
      },
      props: {},
    };
  } else {
    return {
      props: {},
    };
  }
}
