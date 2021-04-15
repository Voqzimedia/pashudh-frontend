import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faTimesCircle,
} from "@fortawesome/free-regular-svg-icons";

import Menu from "./Menu";

import AppContext from "../../../context/AppContext";

import {
  faCartPlus,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SlidingPane from "react-sliding-pane";

export default function UserAction({ isMobile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const {
    isCartOpen,
    isWishlistOpen,
    isMenuOpen,
    setCartOpen,
    setWishlistOpen,
    setMenuOpen,
  } = useContext(AppContext);

  const openCart = (event) => {
    event.preventDefault();
    setWishlistOpen(false);
    setMenuOpen(false);
    isCartOpen ? setCartOpen(false) : setCartOpen(true);
  };

  const openWishlist = (event) => {
    event.preventDefault();
    setCartOpen(false);
    setMenuOpen(false);
    isWishlistOpen ? setWishlistOpen(false) : setWishlistOpen(true);
  };

  const openMenu = (event) => {
    event.preventDefault();
    setWishlistOpen(false);
    setCartOpen(false);
    isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <div className="icon-wrapper">
        {isMobile ? (
          <a
            href=""
            onClick={(e) => openWishlist(e)}
            className="icon-item icon"
          >
            <FontAwesomeIcon icon={faSearch} />
          </a>
        ) : null}

        {isMobile ? (
          <a
            href=""
            onClick={(e) => openWishlist(e)}
            className="icon-item icon"
          >
            <FontAwesomeIcon icon={faUser} />
          </a>
        ) : (
          <Dropdown
            nav
            inNavbar
            isOpen={dropdownOpen}
            toggle={toggle}
            onMouseEnter={!dropdownOpen ? toggle : null}
          >
            <DropdownToggle nav caret className={`icon-item icon`}>
              <FontAwesomeIcon icon={faUser} />
            </DropdownToggle>
            <DropdownMenu>
              <a href="#" className="dropdown-item">
                Login
              </a>
              <a href="#" className="dropdown-item">
                Signup
              </a>
            </DropdownMenu>
          </Dropdown>
        )}

        <a onClick={(e) => openCart(e)} href="" className="icon-item icon">
          {isMobile ? (
            isCartOpen ? (
              <FontAwesomeIcon icon={faTimesCircle} />
            ) : (
              <FontAwesomeIcon icon={faCartPlus} />
            )
          ) : (
            <FontAwesomeIcon icon={faCartPlus} />
          )}
        </a>
        <a href="" onClick={(e) => openWishlist(e)} className="icon-item icon">
          {isMobile ? (
            isWishlistOpen ? (
              <FontAwesomeIcon icon={faTimesCircle} />
            ) : (
              <FontAwesomeIcon icon={faHeart} />
            )
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )}
        </a>
        {isMobile ? (
          <a href="" onClick={(e) => openMenu(e)} className="icon-item icon">
            {isMenuOpen ? (
              <FontAwesomeIcon icon={faTimesCircle} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </a>
        ) : null}
      </div>
      <SlidingPane
        className="side-pane-wrapper"
        overlayClassName="side-pane-overlay"
        isOpen={isCartOpen}
        title="Your Cart"
        width={`${isMobile ? "100vw" : "500px"}`}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setCartOpen(false);
        }}
      >
        <div>Cart pane</div>
      </SlidingPane>
      <SlidingPane
        className="side-pane-wrapper"
        overlayClassName="side-pane-overlay"
        isOpen={isWishlistOpen}
        title="Your Wishlists"
        width={`${isMobile ? "100vw" : "500px"}`}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setWishlistOpen(false);
        }}
      >
        <div>Wishlists pane</div>
      </SlidingPane>
      <SlidingPane
        className="side-pane-wrapper nav-menu"
        overlayClassName="side-pane-overlay"
        isOpen={isMenuOpen}
        title="Menu"
        width={`${isMobile ? "100vw" : "500px"}`}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setMenuOpen(false);
        }}
      >
        <Menu />
      </SlidingPane>
    </>
  );
}
