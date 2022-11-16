import React from "react";
import Navbar from "./Navbar";

interface IDashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: IDashboardProps) {
  return (
    <div>
      <Navbar />

      <main className="container mx-auto h-screen bg-neutral-focus pt-4 shadow-xl">
        {children}
      </main>
    </div>
  );
}
