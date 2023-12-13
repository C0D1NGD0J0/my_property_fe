"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Index = () => {
  const urlPath = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="logo">
          <img src="./img/logo.png" alt="Logo" className="logo-img" />
          <h2>
            Something<span className="danger">Weird</span>
          </h2>
        </div>
        <div className="close" id="close-btn">
          <span>X</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="navbar">
          <li className="navbar-item">
            <Link
              href="/dashboard"
              className={urlPath === "/dashboard" ? "active" : ""}
            >
              <i className="bx bxs-dashboard icon"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              href="/dashboard/properties"
              className={urlPath === "/dashboard/properties" ? "active" : ""}
            >
              <i className="bx bx-building-house"></i>
              <span>Properties</span>
            </Link>
          </li>

          <li className="navbar-item">
            <Link
              href="/dashboard/leases"
              className={urlPath === "/dashboard/leases" ? "active" : ""}
            >
              <i className="bx bxs-report icon"></i>
              <span>Leases</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              href="/dashboard/service_requests"
              className={
                urlPath === "/dashboard/service_requests" ? "active" : ""
              }
            >
              <i className="bx bx-wrench"></i>
              <span>Maintenance</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              href="/dashboard/tenants"
              className={urlPath === "/dashboard/tenants" ? "active" : ""}
            >
              <i className="bx bx-user-plus"></i>
              <span>Tenants</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              href="/dashboard/account_settings"
              className={
                urlPath === "/dashboard/account_settings" ? "active" : ""
              }
            >
              <i className="bx bx-cog"></i>
              <span>Account</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              href="/dashboard/wallet"
              className={urlPath === "/dashboard/wallet" ? "active" : ""}
            >
              <i className="bx bx-wallet icon"></i>
              <span>Wallet</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              href="/dashboard/schedule_viewing"
              className={
                urlPath === "/dashboard/schedule_viewing" ? "active" : ""
              }
            >
              <i className="bx bx-glasses icon"></i>
              <span>Viewings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Index;
