import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

import Menu from "./Menu";
import SvgIcon from "../../../components/utils/SvgIcon";

import AppContext from "../../../context/AppContext";

import MenuIcon from "../../../images/icons/menu.svg";
import HeartIcon from "../../../images/icons/heart.svg";
import CartIcon from "../../../images/icons/cart.svg";
import UserIcon from "../../../images/icons/user.svg";
import SearchIcon from "../../../images/icons/search.svg";
import CloseIcon from "../../../images/icons/x.svg";

import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SlidingPane from "react-sliding-pane";

export default function UserAction({ isMobile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUserOpen, setUserOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

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
  const toggleUser = (e) => {
    e.preventDefault();
    setUserOpen((prevState) => !prevState);
  };
  const toggleSearch = (e) => {
    e.preventDefault();
    setSearchOpen((prevState) => !prevState);
  };

  return (
    <>
      <ul className="icon-wrapper">
        {isMobile ? (
          <a
            href="#"
            onClick={(e) => toggleSearch(e)}
            className="icon-item icon"
          >
            {isSearchOpen ? (
              <SvgIcon icon={CloseIcon} />
            ) : (
              // <FontAwesomeIcon icon={faSearch} />

              <SvgIcon icon={SearchIcon} />
            )}
          </a>
        ) : null}

        {isMobile ? (
          <a href="#" onClick={(e) => toggleUser(e)} className="icon-item icon">
            {isUserOpen ? (
              <SvgIcon icon={CloseIcon} />
            ) : (
              // <FontAwesomeIcon icon={faUser} />

              <SvgIcon icon={UserIcon} />
            )}
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
              {/* <FontAwesomeIcon icon={faUser} /> */}

              <SvgIcon icon={UserIcon} />
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

        <a
          onClick={(e) => openCart(e)}
          href="#"
          className="icon-item icon cart"
        >
          {isMobile ? (
            isCartOpen ? (
              <SvgIcon className="red" icon={CartIcon} />
            ) : (
              <SvgIcon icon={CartIcon} />
            )
          ) : (
            <SvgIcon icon={CartIcon} />
          )}
        </a>
        <a href="#" onClick={(e) => openWishlist(e)} className="icon-item icon">
          {isMobile ? (
            isWishlistOpen ? (
              <SvgIcon className="red" icon={HeartIcon} />
            ) : (
              <SvgIcon icon={HeartIcon} />
            )
          ) : (
            <SvgIcon icon={HeartIcon} />
          )}
        </a>
        {isMobile ? (
          <a href="#" onClick={(e) => openMenu(e)} className="icon-item icon">
            {isMenuOpen ? (
              <SvgIcon className="red" icon={MenuIcon} />
            ) : (
              // <FontAwesomeIcon icon={faBars} />

              <SvgIcon icon={MenuIcon} />
            )}
          </a>
        ) : null}
      </ul>
      <SlidingPane
        className="side-pane-wrapper"
        overlayClassName="side-pane-overlay"
        isOpen={isCartOpen}
        title="Your Cart"
        width={`${isMobile ? "100vw" : "500px"}`}
        closeIcon={<SvgIcon icon={CloseIcon} />}
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
        closeIcon={<SvgIcon icon={CloseIcon} />}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setWishlistOpen(false);
        }}
      >
        <div>Wishlists pane</div>
      </SlidingPane>
      <SlidingPane
        className="side-pane-wrapper nav-menu"
        closeIcon={<SvgIcon icon={CloseIcon} />}
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
