import { GetServerSidePropsContext } from "next";
import { signOut, useSession } from "next-auth/react";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

export default function App() {
  const { data } = useSession();

  return (
    <div>
      <p>epa {data?.user?.name}!</p>;
      <button className="btn" onClick={() => signOut()}>
        Log out
      </button>
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
