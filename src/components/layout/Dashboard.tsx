import React from "react";

import Navbar from "./Navbar";

interface IDashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: IDashboardProps) {
  return (
    <div>
      <Navbar />

      <main className="container prose-lg mx-auto p-8">{children}</main>
    </div>
  );
}
