import { trpc } from "../../utils/trpc";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Dashboard from "../../components/layout/Dashboard";

const schema = z.object({
  exampleName: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
});

type IData = z.infer<typeof schema>;

export default function App() {
  const { data: exampleData, isLoading } = trpc.example.getAll.useQuery();
  const mutation = trpc.example.insert.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IData> = (things) => {
    mutation.mutate({ exampleName: things.exampleName });
  };

  return (
    <div>
      <Dashboard>
        <>
          <div className="flex flex-wrap justify-center gap-4">
            {(isLoading && "loading examples") ||
              exampleData?.map((example) => {
                return (
                  <div
                    key={example.id}
                    className="card w-96 bg-base-100 shadow-xl"
                  >
                    <div className="card-body">
                      <h2 className="card-title">Epa</h2>
                      <p>{example.exampleName}</p>
                      <div className="card-actions justify-end">
                        <button className="btn-primary btn">Buy Now</button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("exampleName")} />
            {errors.exampleName?.message && (
              <p>{`${errors.exampleName?.message}`}</p>
            )}
            <input
              type="number"
              {...register("age", { valueAsNumber: true })}
            />
            {errors.age?.message && <p>{`${errors.age?.message}`}</p>}
            <input type="submit" />
            {mutation.error && (
              <p>Something went wrong! {mutation.error.message}</p>
            )}
          </form>
        </>
      </Dashboard>
    </div>
  );
}
