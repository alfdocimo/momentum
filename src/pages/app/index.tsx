import { trpc } from "../../utils/trpc";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Dashboard from "../../components/layout/Dashboard";
import { useSession } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { prisma } from "../../server/db/client";

export default function App({
  percentageYearCompleted,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSession();
  const router = useRouter();

  const { data: summaryData } = trpc.entry.summary.useQuery();
  const { data: hasPostedToday } = trpc.entry.hasPostedToday.useQuery();

  return (
    <Dashboard>
      {percentageYearCompleted}
      <h1>Hello, {data?.user?.name}</h1>
      <div className="flex justify-center">
        <div className="tooltip" data-tip="You can only post once per day">
          <button
            disabled={hasPostedToday}
            onClick={() => {
              router.push("/app/entry/new");
            }}
            className="btn-outline btn-lg btn"
          >
            New entry ✏️
          </button>
        </div>
      </div>
      {/* <section>
        <progress
          className="progress w-56"
          value={percentageYearCompleted}
          max="100"
        ></progress>
      </section> */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Overall you have felt...</h2>
          <h3>Very bad</h3>
          <progress
            className="progress progress-error"
            value={summaryData?.scoreAverage.VERY_BAD}
            max="100"
          ></progress>
          <h3>Bad</h3>
          <progress
            className="progress progress-warning"
            value={summaryData?.scoreAverage.BAD}
            max="100"
          ></progress>
          <h3>Normal</h3>
          <progress
            className="progress progress-info"
            value={summaryData?.scoreAverage.NORMAL}
            max="100"
          ></progress>
          <h3>Good</h3>
          <progress
            className="progress progress-success"
            value={summaryData?.scoreAverage.GOOD}
            max="100"
          ></progress>
          <h3>Very good</h3>
          <progress
            className="progress progress-success"
            value={summaryData?.scoreAverage.VERY_GOOD}
            max="100"
          ></progress>
        </div>
      </div>
      <div className="flex flex-col"></div>
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
