import React, { useState, useContext } from "react";
import { motion } from "framer-motion";

import dynamic from "next/dynamic";

import { icons } from "feather-icons";

import AppContext from "../../../context/AppContext";

import { DropdownMenu, CustomInput, Modal, ModalBody } from "reactstrap";

const AnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

const SlidingPane = dynamic(() => import("react-sliding-pane"), { ssr: false });
const Menu = dynamic(() => import("./Menu"), { ssr: false });
const SvgIcon = dynamic(() => import("../../../components/utils/SvgIcon"));
const CartList = dynamic(() => import("../../../components/Shop/CartList"));
const WishList = dynamic(() => import("../../../components/Shop/WishList"));
const LoginForm = dynamic(() => import("../../../components/User/LoginForm"));
const SignupForm = dynamic(() => import("../../../components/User/SignupForm"));

export default function UserAction({ isMobile }) {
  const [isUserOpen, setUserOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const [modalLogin, setModalLogin] = useState(false);
  const [modalSignup, setModalSignup] = useState(false);

  const toggleLogin = (e) => {
    e.preventDefault();
    setModalLogin(() => !modalLogin);
  };

  const toggleSignup = (e) => {
    e.preventDefault();
    setModalSignup(() => !modalSignup);
  };

  const {
    isCartOpen,
    isWishlistOpen,
    isMenuOpen,
    setCartOpen,
    setWishlistOpen,
    setMenuOpen,
    toggleTheme,
    darkTheme,
  } = useContext(AppContext);

  const openCart = (event) => {
    event.preventDefault();
    setWishlistOpen(false);
    setMenuOpen(false);
    setUserOpen(false);
    isCartOpen ? setCartOpen(false) : setCartOpen(true);
  };

  const openWishlist = (event) => {
    event.preventDefault();
    setCartOpen(false);
    setMenuOpen(false);
    setUserOpen(false);
    isWishlistOpen ? setWishlistOpen(false) : setWishlistOpen(true);
  };

  const openMenu = (event) => {
    event.preventDefault();
    setWishlistOpen(false);
    setCartOpen(false);
    setUserOpen(false);
    isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  const toggleUser = (e) => {
    e.preventDefault();
    setWishlistOpen(false);
    setMenuOpen(false);
    setCartOpen(false);
    setUserOpen((prevState) => !prevState);
  };
  const toggleSearch = (e) => {
    e.preventDefault();
    setSearchOpen((prevState) => !prevState);
  };

  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const mobileHeaderAnimation = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
    transition: { transition },
  };

  return (
    <>
      <div className="icon-container">
        <AnimatePresence initial={false}>
          {!isSearchOpen ? (
            <motion.div
              exit="exit"
              animate="animate"
              initial="initial"
              transition="transition"
              variants={mobileHeaderAnimation}
              className={`icon-wrapper`}
            >
              {isMobile ? (
                <div
                  onClick={(e) => toggleSearch(e)}
                  className="icon-item icon"
                >
                  <SvgIcon icon={icons.search.toSvg()} />
                </div>
              ) : null}

              {isMobile ? (
                <div onClick={(e) => toggleUser(e)} className="icon-item icon">
                  <SvgIcon icon={icons.user.toSvg()} />
                </div>
              ) : (
                <div className={`dropdown nav-item`}>
                  <div
                    title={`user`}
                    className={`icon-item icon has-subMenu nav-link`}
                  >
                    <SvgIcon icon={icons.user.toSvg()} />

                    <DropdownMenu className={`subMenu`}>
                      <a
                        title={`login`}
                        onClick={toggleLogin}
                        className="dropdown-item"
                      >
                        Login
                      </a>
                      <a
                        onClick={(e) => {
                          toggleSignup(e);
                          toggleUser(e);
                        }}
                        title={`signup`}
                        className="dropdown-item"
                      >
                        Signup
                      </a>
                    </DropdownMenu>
                  </div>
                </div>
              )}

              <div onClick={(e) => openCart(e)} className="icon-item icon cart">
                <SvgIcon icon={icons["shopping-cart"].toSvg()} />

                <div className="cart-quantity">1</div>
              </div>
              <div
                title={`wishlist`}
                onClick={(e) => openWishlist(e)}
                className="icon-item icon"
              >
                <SvgIcon icon={icons.heart.toSvg()} />
              </div>
              {isMobile ? (
                <div
                  title={`menu`}
                  onClick={(e) => openMenu(e)}
                  className="icon-item icon"
                >
                  <SvgIcon icon={icons.menu.toSvg()} />
                </div>
              ) : null}
            </motion.div>
          ) : (
            <motion.div className="search-warper-mobile">
              <div className="search-input">
                <label htmlFor="searchBox"></label>
                <input
                  type="text"
                  id={`searchBox`}
                  name="search"
                  placeholder={`Search`}
                />
                <button className="search-btn-icon" onClick={toggleSearch}>
                  <div className="icon search-box-icon">
                    <SvgIcon icon={icons.search.toSvg()} />
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isMobile ? (
          isUserOpen ? (
            <motion.div
              exit="exit"
              animate="animate"
              initial="initial"
              transition="transition"
              variants={mobileHeaderAnimation}
              className="user-panel"
            >
              <div className="link-wrapper">
                <a
                  onClick={(e) => {
                    toggleLogin(e);
                    toggleUser(e);
                  }}
                  title={`login`}
                  className="dropdown-item"
                >
                  Login
                </a>
                <a
                  onClick={(e) => {
                    toggleSignup(e);
                    toggleUser(e);
                  }}
                  title={`signup`}
                  className="dropdown-item"
                >
                  Signup
                </a>
              </div>
              <button
                className={`btn close-btn`}
                onClick={(e) => toggleUser(e)}
              >
                <SvgIcon icon={icons.x.toSvg()} />
              </button>
            </motion.div>
          ) : null
        ) : null}
      </AnimatePresence>

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
      <Modal isOpen={modalLogin} toggle={toggleLogin} className={"login-modal"}>
        <ModalBody>
          <LoginForm />
        </ModalBody>
      </Modal>
      <Modal
        isOpen={modalSignup}
        toggle={toggleSignup}
        className={"login-modal"}
      >
        <ModalBody>
          <SignupForm />
        </ModalBody>
      </Modal>
      {isMobile ? (
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
          <div className="theme-block">
            <label htmlFor="themeSwitch"></label>
            <CustomInput
              type="switch"
              id="themeSwitch"
              name="themeSwitch"
              className={`theme-switch`}
              onChange={toggleTheme}
              checked={darkTheme}
            />
          </div>
          <Menu />
        </SlidingPane>
      ) : null}
    </>
  );
}
