import { GetServerSidePropsContext } from "next";
import { signOut, useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { trpc } from "../../utils/trpc";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  exampleName: z.string().min(1, { message: "Required" }),
  age: z.number().min(10),
});

type IData = z.infer<typeof schema>;

export default function App() {
  const { data } = useSession();
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
      <>
        <p>epa {data?.user?.name}!</p>;
        <button className="btn" onClick={() => signOut()}>
          Log out
        </button>
        <div>
          {(isLoading && "loading examples") ||
            exampleData?.map((example) => {
              return <div key={example.id}>{JSON.stringify(example)}</div>;
            })}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("exampleName")} />
          {errors.exampleName?.message && (
            <p>{`${errors.exampleName?.message}`}</p>
          )}
          <input type="number" {...register("age", { valueAsNumber: true })} />
          {errors.age?.message && <p>{`${errors.age?.message}`}</p>}
          <input type="submit" />
          {mutation.error && (
            <p>Something went wrong! {mutation.error.message}</p>
          )}
        </form>
      </>
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const sesh = await getServerAuthSession(ctx);
  if (!sesh?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
