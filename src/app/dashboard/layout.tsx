"use client";
import Navbar from "@components/navigation/Navbar";
import Sidebar from "@components/navigation/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Navbar />
        <div className="main-content">{children}</div>
      </main>
    </div>
  );
}
