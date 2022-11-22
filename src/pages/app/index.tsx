import { trpc } from "../../utils/trpc";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Dashboard from "../../components/layout/Dashboard";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({
  percentageYearCompleted,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSession();
  const router = useRouter();
  const { data: listEntryData } = trpc.entry.list.useQuery();

  return (
    <Dashboard>
      {percentageYearCompleted}
      <h1>Hello, {data?.user?.name}</h1>
      <div className="flex justify-center">
        <button
          onClick={() => {
            router.push("/app/entry/new");
          }}
          className="btn-outline btn-lg btn"
        >
          New entry ✏️
        </button>
      </div>
      {/* <section>
        <progress
          className="progress w-56"
          value={percentageYearCompleted}
          max="100"
        ></progress>
      </section> */}
      {JSON.stringify(listEntryData)}
    </Dashboard>
  );
}

// Keeping this here for reference - Not really needed
// InferGetServerSidePropsType<typeof getServerSideProps>

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const session = await getServerAuthSession(ctx);

//   return {
//     props: {
//       userName: session?.user?.name,
//       userImage: session?.user?.image,
//     },
//   };
// }

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const now = new Date();

  const yearStart = new Date(now.getFullYear(), 0, 1);

  const yearEnd = new Date(now.getFullYear() + 1, 0, 1);

  const totalDuration = yearEnd.getTime() - yearStart.getTime();
  const currentDuration = now.getTime() - yearStart.getTime();

  const percentageYearCompleted = (currentDuration / totalDuration) * 100;

  return {
    props: {
      percentageYearCompleted,
    },
  };
}
