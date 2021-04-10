import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart } from "@fortawesome/free-regular-svg-icons";

import {
  faCartPlus,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import SlidingPane from "react-sliding-pane";

export default function UserAction({ isMobile }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  const openCart = (event) => {
    event.preventDefault();
    setWishlistOpen(() => false);
    setCartOpen(() => true);
  };

  const openWishlist = (event) => {
    event.preventDefault();
    setCartOpen(() => false);
    setWishlistOpen(() => true);
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
          <FontAwesomeIcon icon={faCartPlus} />
        </a>
        <a href="" onClick={(e) => openWishlist(e)} className="icon-item icon">
          <FontAwesomeIcon icon={faHeart} />
        </a>
        {isMobile ? (
          <a
            href=""
            onClick={(e) => openWishlist(e)}
            className="icon-item icon"
          >
            <FontAwesomeIcon icon={faBars} />
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
          setCartOpen(() => false);
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
          setWishlistOpen(() => false);
        }}
      >
        <div>Wishlists pane</div>
      </SlidingPane>
    </>
  );
}
