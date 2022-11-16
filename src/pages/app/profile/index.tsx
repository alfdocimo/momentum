import { useSession } from "next-auth/react";

import React from "react";
import Dashboard from "../../../components/layout/Dashboard";

export default function Profile() {
  const { data } = useSession();
  return (
    <Dashboard>
      <>
        <h1>Hello {data?.user?.name}!</h1>
      </>
    </Dashboard>
  );
}
