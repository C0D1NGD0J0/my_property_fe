"use client";
import Navbar from "@components/Navigation/Navbar";
import Sidebar from "@components/Navigation/Sidebar";
import PageTransition from "@utils/PageTransition";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      <div className="container">
        <Sidebar />
        <main className="main">
          <Navbar />
          <div className="main-content">{children}</div>
        </main>
      </div>
    </PageTransition>
  );
}
