import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Dashboard from "../../../../components/layout/Dashboard";

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
});

type IEntry = z.infer<typeof schema>;

export default function NewEntry() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEntry>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: IEntry) => console.log({ data });

  return (
    <Dashboard>
      <h1>New entry</h1>
      <h2>How are you feeling today?</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rating gap-1">
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

        <input type="submit" className="btn-outline btn" value="Send" />
      </form>
    </Dashboard>
  );
}
