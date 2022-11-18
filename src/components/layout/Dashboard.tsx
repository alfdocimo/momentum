import React from "react";

import Navbar from "./Navbar";

interface IDashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: IDashboardProps) {
  return (
    <div>
      <Navbar />

      <main className="container prose mx-auto p-8">{children}</main>
    </div>
  );
}
