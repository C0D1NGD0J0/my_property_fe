"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import authService from "@services/auth";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@store/auth.store";

const links: {
  pathname: string;
  label: React.ReactNode;
  isSubMenu: boolean;
}[] = [
  {
    pathname: "/notifications",
    label: <i className="bx bx-notification"></i>,
    isSubMenu: false,
  },
  {
    pathname: "/messages",
    label: <i className="bx bx-envelope"></i>,
    isSubMenu: false,
  },
];

function Index() {
  const { push } = useRouter();
  const urlPath = usePathname();
  const { user, logout } = useAuthStore();

  const [isHovering, setIsHovering] = useState(false);
  const submenuRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleMouseOver = () => setIsHovering(true);
    const handleMouseOut = () => setIsHovering(false);

    // Attach event listeners to the element with the `hasSubmenu` class
    const submenuElement = submenuRef.current;
    if (submenuElement) {
      submenuElement?.addEventListener("mouseover", handleMouseOver);
      submenuElement.addEventListener("mouseout", handleMouseOut);

      // Cleanup function to remove event listeners
      return () => {
        submenuElement.removeEventListener("mouseover", handleMouseOver);
        submenuElement.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []);

  const handleLogout = async () => {
    try {
      logout(true);
      push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <ul className="header-menu">
        <li className="header-menu_item search">
          <input
            type="text"
            className="search-field"
            id="search"
            placeholder="Seach Here"
          />
          <button>
            <i className="bx bx-search"></i>
          </button>
        </li>

        {links.map((item) => {
          return (
            <li className="header-menu_item" key={item.pathname}>
              <Link
                href={item.pathname}
                className={item.pathname === urlPath ? "active" : ""}
              >
                {item.label}
              </Link>
            </li>
          );
        })}

        <li className="header-menu_item hasSubmenu" ref={submenuRef}>
          <a href="#!" className="username">
            {user?.fullname}
          </a>
          <div className={`submenu-box ${isHovering ? "show" : "hide"}`}>
            <ul className="submenu">
              {user?.linkedAccounts.map((item) => {
                if (item.cid !== user.cid) {
                  return <li key={item.cid}>{item.name}</li>;
                }

                return null;
              })}
              <li>
                <Link
                  href="/dashboard/profile"
                  className={urlPath === "/dashboard/profile" ? "active" : ""}
                >
                  <i className="bx bx-user"></i>Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/user_settings"
                  className={
                    urlPath === "/dashboard/user_settings" ? "active" : ""
                  }
                >
                  <i className="bx bx-cog"></i>Settings
                </Link>
              </li>
              <hr />
              <li className="danger">
                <span onClick={handleLogout}>
                  <i className="bx bx-log-out"></i>Logout
                </span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Index;
