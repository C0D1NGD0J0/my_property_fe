"use client";
import Navbar from "@components/navigation/Navbar";
import Sidebar from "@components/navigation/Sidebar";
import PageTransition from "@utils/PageTransition";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Sidebar />
      <main className="main">
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
