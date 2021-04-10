import React, { useState } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

export default function Menu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Nav>
      <NavItem>
        <a href="#" className={`nav-link menu-link active`}>
          Home
        </a>
      </NavItem>
      <NavItem>
        <a href="#" className={`nav-link menu-link`}>
          About
        </a>
      </NavItem>

      <Dropdown
        nav
        inNavbar
        isOpen={dropdownOpen}
        toggle={toggle}
        onMouseEnter={!dropdownOpen ? toggle : null}
      >
        <DropdownToggle
          nav
          caret
          className={`nav-link menu-link ${dropdownOpen ? "active" : null}`}
        >
          Shop
        </DropdownToggle>
        <DropdownMenu>
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
      </Dropdown>
      <NavItem>
        <a href="#" className={`nav-link menu-link`}>
          Blog
        </a>
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
