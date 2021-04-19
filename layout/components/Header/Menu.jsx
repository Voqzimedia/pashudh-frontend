import React, { useState, useContext } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

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
              href="#"
              onClick={toggleA}
              className={`nav-link menu-link dropdown-toggle`}
            >
              Shop
            </a>
          </NavItem>
          {dropdownOpen ? (
            <Nav className={isMobile ? "mobile-menu sub-menu" : ""}>
              <NavItem>
                <a href="#" className="dropdown-item">
                  Yards of Couture
                </a>
              </NavItem>
              <NavItem>
                <a href="#" className="dropdown-item">
                  Yards of Eminence
                </a>
              </NavItem>
              <NavItem>
                <a href="#" className="dropdown-item">
                  Yards of Luxury
                </a>
              </NavItem>
              <NavItem>
                <a href="#" className="dropdown-item">
                  Yards of Elegance
                </a>
              </NavItem>
              <NavItem>
                <a href="#" className="dropdown-item">
                  The Shri Collection
                </a>
              </NavItem>
              <NavItem>
                <a href="#" className="dropdown-item">
                  Whole Six Yards
                </a>
              </NavItem>
            </Nav>
          ) : null}
        </>
      ) : (
        <Dropdown nav inNavbar>
          <a
            href="#"
            className={`nav-link dropdown-toggle menu-link has-subMenu ${
              dropdownOpen ? "active" : ""
            }`}
          >
            Shop
            <DropdownMenu className={`subMenu`}>
              <a href="#" className="dropdown-item">
                Yards of Couture
              </a>
              <a href="#" className="dropdown-item">
                Yards of Eminence
              </a>
              <a href="#" className="dropdown-item">
                Yards of Luxury
              </a>
              <a href="#" className="dropdown-item">
                Yards of Elegance
              </a>
              <a href="#" className="dropdown-item">
                The Shri Collection
              </a>
              <a href="#" className="dropdown-item">
                Whole Six Yards
              </a>
            </DropdownMenu>
          </a>
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
        <a href="#" className={`nav-link menu-link`}>
          Gift Cards
        </a>
      </NavItem>
      <NavItem>
        <a href="#" className={`nav-link menu-link`}>
          Contact
        </a>
      </NavItem>
    </Nav>
  );
}
