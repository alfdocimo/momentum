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
    defaultValues: {
      rating: "NORMAL",
    },
  });

  const onSubmit = (data: IEntry) => {};

  return (
    <Dashboard>
      <h1>New entry</h1>

      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Card title!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn-primary btn">Buy Now</button>
          </div>
        </div>
      </div>
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
          type="text"
          placeholder="Type here"
          className="input-bordered input input-lg w-full max-w-xs"
        />
        <h2>Today I worked on...</h2>
        <input
          type="text"
          placeholder="Type here"
          className="input-bordered input input-lg w-full max-w-xs"
        />
        <input type="submit" className="btn-outline btn" value="Send" />
      </form>
    </Dashboard>
  );
}
