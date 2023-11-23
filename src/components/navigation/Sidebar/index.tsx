import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Index = () => {
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
            <a href="#!" className="active">
              <i className="bx bxs-dashboard icon"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="properties.html">
              <i className="bx bx-building-house"></i>
              <span>Properties</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#!">
              <i className="bx bxs-report icon"></i>
              <span>Leases</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#!">
              <i className="bx bx-wrench"></i>
              <span>Maintenance</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#!">
              <i className="bx bx-user-plus"></i>
              <span>Tenants</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#!">
              <i className="bx bx-cog"></i>
              <span>Account</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#!">
              <i className="bx bx-wallet icon"></i>
              <span>Wallet</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#!">
              <i className="bx bx-glasses icon"></i>
              <span>Viewings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Index;
