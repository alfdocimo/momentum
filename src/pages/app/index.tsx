import { trpc } from "../../utils/trpc";

import Dashboard from "../../components/layout/Dashboard";
import { useSession } from "next-auth/react";

import { useRouter } from "next/router";

export default function App() {
  const { data } = useSession();
  const router = useRouter();

  const { data: summaryData } = trpc.entry.summary.useQuery();
  const { data: hasPostedToday } = trpc.entry.hasPostedToday.useQuery();

  return (
    <Dashboard>
      <h1>Hello, {data?.user?.name?.split(" ")[0]}!</h1>
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
      <div className="stats stats-vertical mt-8 w-full shadow-md lg:stats-horizontal">
        <div className="stat">
          <div className="stat-figure text-primary">
            <span className="text-5xl">📕</span>
          </div>
          <div className="stat-value text-primary">
            {summaryData?.totalEntries}
          </div>
          <div className="stat-title">Total entries</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <span className="text-5xl">🗓</span>
          </div>
          <div className="stat-value text-secondary">
            {summaryData?.monthEntries}
          </div>
          <div className="stat-title">This month entries</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-primary">
            <span className="text-5xl">🔎</span>
          </div>
          <div className="stat-value">
            {summaryData?.daysWithEntriesAverage}%
          </div>
          <div className="stat-title">Yearly entries</div>
        </div>
      </div>
      <div className="card mt-8 bg-base-100 shadow-md">
        <div className="card-body">
          <h2>Overall you have felt...</h2>
          <h3>Very bad 😞</h3>
          <progress
            className="progress progress-error"
            value={summaryData?.scoreAverage.VERY_BAD}
            max="100"
          ></progress>
          <h3>Bad 😕</h3>
          <progress
            className="progress progress-warning"
            value={summaryData?.scoreAverage.BAD}
            max="100"
          ></progress>
          <h3>Normal 😐</h3>
          <progress
            className="progress progress-info"
            value={summaryData?.scoreAverage.NORMAL}
            max="100"
          ></progress>
          <h3>Good 🙂</h3>
          <progress
            className="progress progress-success"
            value={summaryData?.scoreAverage.GOOD}
            max="100"
          ></progress>
          <h3>Very good 😄</h3>
          <progress
            className="progress progress-success"
            value={summaryData?.scoreAverage.VERY_GOOD}
            max="100"
          ></progress>
        </div>
      </div>
      <div className="card mt-8 bg-base-100 shadow-md">
        <div className="card-body">
          <h2>This month you have learned...</h2>
          {summaryData?.learnedThisMonth.map((learned) => (
            <h3 key={learned}>🚀 {learned}</h3>
          ))}
        </div>
      </div>
      <div className="card mt-8 bg-base-100 shadow-md">
        <div className="card-body">
          <h2>This month you have worked on...</h2>
          {summaryData?.workedOnThisMonth.map((worked) => (
            <h3 key={worked}>✅ {worked}</h3>
          ))}
        </div>
      </div>
    </Dashboard>
  );
}

// Keeping this here for reference - Not really needed
// InferGetServerSidePropsType<typeof getServerSideProps>

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   const session = await getServerAuthSession(ctx);

//   if (!session?.user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/",
//       },
//       props: {},
//     };
//   } else {
//     return {
//       props: {},
//     };
//   }
// }
