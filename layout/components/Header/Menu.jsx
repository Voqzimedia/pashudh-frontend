import React, { useState, useContext } from "react";
import { Nav, NavItem, Dropdown, DropdownMenu } from "reactstrap";

import Link from "next/link";

import AppContext from "../../../context/AppContext";

export default function Menu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleA = (e) => {
    e.preventDefault();
    setDropdownOpen((prevState) => !prevState);
  };

  const { deviceWidth, setMenuOpen, isMenuOpen } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const closeMenu = (e) => {
    let activeMenu = e.target;

    document
      ? document.querySelectorAll(".menu-link").forEach((menu) => {
          menu.classList.remove("active");
        })
      : null;

    activeMenu.classList.add("active");
    isMenuOpen ? setMenuOpen(false) : null;
  };

  return (
    <Nav className={isMobile ? "mobile-menu menu-block" : ""}>
      <NavItem>
        <Link href={`/`}>
          <a className={`nav-link menu-link`} onClick={closeMenu}>
            Home
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={`/about`}>
          <a className={`nav-link menu-link`} onClick={closeMenu}>
            About
          </a>
        </Link>
      </NavItem>

      {isMobile ? (
        <>
          <NavItem>
            <a
              onClick={toggleA}
              className={`nav-link menu-link dropdown-toggle`}
            >
              Shop
            </a>
          </NavItem>
          {dropdownOpen ? (
            <Nav className={isMobile ? "mobile-menu sub-menu" : ""}>
              <NavItem>
                <Link href={`/shop`}>
                  <a className="dropdown-item" onClick={closeMenu}>
                    Yards of Couture
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/shop`}>
                  <a className="dropdown-item" onClick={closeMenu}>
                    Yards of Eminence
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/shop`}>
                  <a className="dropdown-item" onClick={closeMenu}>
                    Yards of Luxury
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/shop`}>
                  <a className="dropdown-item" onClick={closeMenu}>
                    Yards of Elegance
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/shop`}>
                  <a className="dropdown-item" onClick={closeMenu}>
                    The Shri Collection
                  </a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href={`/shop`}>
                  <a className="dropdown-item" onClick={closeMenu}>
                    Whole Six Yards
                  </a>
                </Link>
              </NavItem>
            </Nav>
          ) : null}
        </>
      ) : (
        <Dropdown nav inNavbar>
          <Link href={`/shop`}>
            <a
              className={`nav-link dropdown-toggle menu-link has-subMenu ${
                dropdownOpen ? "active" : ""
              }`}
            >
              Shop
              <DropdownMenu className={`subMenu`}>
                <Link href={`/shop`}>
                  <a className="dropdown-item">Yards of Couture</a>
                </Link>

                <Link href={`/shop`}>
                  <a className="dropdown-item">Yards of Eminence</a>
                </Link>
                <Link href={`/shop`}>
                  <a className="dropdown-item">Yards of Luxury</a>
                </Link>
                <Link href={`/shop`}>
                  <a className="dropdown-item">Yards of Elegance</a>
                </Link>
                <Link href={`/shop`}>
                  <a className="dropdown-item">The Shri Collection</a>
                </Link>

                <Link href={`/shop`}>
                  <a className="dropdown-item">Whole Six Yards</a>
                </Link>
              </DropdownMenu>
            </a>
          </Link>
        </Dropdown>
      )}
      <NavItem>
        <Link href={`/blog`}>
          <a className={`nav-link menu-link `} onClick={closeMenu}>
            Blog
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={`/gift-cards`}>
          <a className={`nav-link menu-link `} onClick={closeMenu}>
            Gift Cards
          </a>
        </Link>
      </NavItem>
      <NavItem>
        <Link href={`/contact`}>
          <a className={`nav-link menu-link `} onClick={closeMenu}>
            Contact
          </a>
        </Link>
      </NavItem>
    </Nav>
  );
}
