import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const urlPath = usePathname();

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

        <li className="header-menu_item hasSubmenu">
          <a href="#!" className="username">
            Johnson
          </a>
          <div className="submenu-box">
            <ul className="submenu">
              <li>
                <Link
                  href="/profile"
                  className={urlPath === "/profile" ? "active" : ""}
                >
                  <i className="bx bx-user"></i>Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={urlPath === "/settings" ? "active" : ""}
                >
                  <i className="bx bx-cog"></i>Settings
                </Link>
              </li>
              <hr />
              <li className="danger-color">
                <Link href="!#">
                  <i className="bx bx-log-out"></i>Logout
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Index;