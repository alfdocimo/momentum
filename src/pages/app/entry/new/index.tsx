import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Dashboard from "../../../../components/layout/Dashboard";
import { trpc } from "../../../../utils/trpc";
import { useRouter } from "next/router";

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

export default function NewEntry() {
  const createEntryMutation = trpc.entry.create.useMutation();
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
              {...register("tiwo")}
              type="text"
              placeholder="Reflect on one thing you worked on today"
              className="input-bordered input input-lg w-full"
            />
            <div className="card-actions flex justify-center pt-4">
              <input type="submit" className="btn-outline btn" value="Send" />
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}
