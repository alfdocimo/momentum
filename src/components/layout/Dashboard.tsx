import React from "react";
import Navbar from "./Navbar";

interface IDashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: IDashboardProps) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
