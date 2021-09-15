import React, { useState, useContext } from "react";
import { Nav, NavItem, Dropdown, DropdownMenu } from "reactstrap";
import { useQuery } from "@apollo/client";
import { getCategories } from "../../../helper/graphql/getCategories";

import Link from "next/link";

import AppContext from "../../../context/AppContext";

export default function Menu({ categories }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [cataList, setCataList] = useState(categories);

  // console.log(categories);

  // Get Categories Data.
  const {
    loading: categoriesLoading,
    error: categoriesError,
    data: categoriesData,
  } = useQuery(getCategories, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      setCataList(() =>
        categoriesData?.categories ? categoriesData.categories : []
      );
    },
  });

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
              {cataList.map((category, index) => (
                <NavItem key={index}>
                  <Link href={`/shop/${category.slug}`}>
                    <a className="dropdown-item" onClick={closeMenu}>
                      {category.title}
                    </a>
                  </Link>
                </NavItem>
              ))}
            </Nav>
          ) : null}
        </>
      ) : (
        <Dropdown nav inNavbar>
          <a
            className={`nav-link dropdown-toggle menu-link has-subMenu ${
              dropdownOpen ? "active" : ""
            }`}
          >
            Shop
            <DropdownMenu className={`subMenu`}>
              {cataList.map((category, index) => (
                <Link href={`/shop/${category.slug}`} key={index}>
                  <a className="dropdown-item">{category.title}</a>
                </Link>
              ))}
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
