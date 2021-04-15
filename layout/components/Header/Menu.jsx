import React, { useState, useContext } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import AppContext from "../../../context/AppContext";

export default function Menu() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const toggleA = (e) => {
    e.preventDefault();
    setDropdownOpen((prevState) => !prevState);
  };

  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  return (
    <Nav className={isMobile ? "mobile-menu menu-block" : ""}>
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
      )}
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
