import React, { useState, useContext } from "react";

import Menu from "./Menu";
import SvgIcon from "../../../components/utils/SvgIcon";
import CartList from "../../../components/Shop/CartList";
import WishList from "../../../components/Shop/WishList";
import { icons } from "feather-icons";

import AppContext from "../../../context/AppContext";

import { Dropdown, DropdownMenu } from "reactstrap";
import SlidingPane from "react-sliding-pane";

export default function UserAction({ isMobile }) {
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
            <SvgIcon icon={icons.search.toSvg()} />
          </a>
        ) : null}

        {isMobile ? (
          <a href="#" onClick={(e) => toggleUser(e)} className="icon-item icon">
            <SvgIcon icon={icons.user.toSvg()} />
          </a>
        ) : (
          <Dropdown nav inNavbar>
            <a href="#" className={`icon-item icon has-subMenu nav-link`}>
              <SvgIcon icon={icons.user.toSvg()} />

              <DropdownMenu className={`subMenu`}>
                <a href="#" className="dropdown-item">
                  Login
                </a>
                <a href="#" className="dropdown-item">
                  Signup
                </a>
              </DropdownMenu>
            </a>
          </Dropdown>
        )}

        <a
          onClick={(e) => openCart(e)}
          href="#"
          className="icon-item icon cart"
        >
          <SvgIcon icon={icons["shopping-cart"].toSvg()} />

          <div className="cart-quantity">1</div>
        </a>
        <a href="#" onClick={(e) => openWishlist(e)} className="icon-item icon">
          <SvgIcon icon={icons.heart.toSvg()} />
        </a>
        {isMobile ? (
          <a href="#" onClick={(e) => openMenu(e)} className="icon-item icon">
            <SvgIcon icon={icons.menu.toSvg()} />
          </a>
        ) : null}
      </ul>
      {isMobile ? (
        isUserOpen ? (
          <div className="user-panel">
            <div className="link-wrapper">
              <a href="#" className="dropdown-item">
                Login
              </a>
              <a href="#" className="dropdown-item">
                Signup
              </a>
            </div>
            <button className={`btn close-btn`} onClick={(e) => toggleUser(e)}>
              <SvgIcon icon={icons.x.toSvg()} />
            </button>
          </div>
        ) : null
      ) : null}
      <SlidingPane
        className="side-pane-wrapper"
        overlayClassName="side-pane-overlay"
        isOpen={isCartOpen}
        title="Your Cart"
        width={`${isMobile ? "100vw" : "500px"}`}
        closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setCartOpen(false);
        }}
      >
        <div>
          <CartList />
        </div>
      </SlidingPane>
      <SlidingPane
        className="side-pane-wrapper"
        overlayClassName="side-pane-overlay"
        isOpen={isWishlistOpen}
        title="Your Wishlists"
        width={`${isMobile ? "100vw" : "500px"}`}
        closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setWishlistOpen(false);
        }}
      >
        <WishList />
      </SlidingPane>
      <SlidingPane
        className="side-pane-wrapper nav-menu"
        closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
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
