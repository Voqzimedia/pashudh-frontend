import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

import dynamic from "next/dynamic";

import { icons } from "feather-icons";
import { OuterClick } from "react-outer-click";

import AppContext from "../../../context/AppContext";
import SvgIcon from "../../../components/utils/SvgIcon";

import { logout } from "../../../helper/auth";

import { DropdownMenu, CustomInput, Modal, ModalBody } from "reactstrap";

const SlidingPane = dynamic(() => import("react-sliding-pane"), { ssr: false });
const Menu = dynamic(() => import("./Menu"), { ssr: false });
const SearchBox = dynamic(() => import("./SearchBox"), { ssr: false });
const CartList = dynamic(() => import("../../../components/Shop/CartList"), {
  ssr: false,
});
const WishList = dynamic(() => import("../../../components/Shop/WishList"), {
  ssr: false,
});
const OrderList = dynamic(() => import("../../../components/Shop/OrderList"), {
  ssr: false,
});

const PromoList = dynamic(
  () =>
    import("../../../components/Shop/OrderList").then((mod) => mod.PromoList),
  { ssr: false }
);
const LoginForm = dynamic(() => import("../../../components/User/LoginForm"), {
  ssr: false,
});
const SignupForm = dynamic(
  () => import("../../../components/User/SignupForm"),
  { ssr: false }
);
const Profile = dynamic(() => import("../../../components/User/Profile"), {
  ssr: false,
});
const Settings = dynamic(() => import("../../../components/User/Settings"), {
  ssr: false,
});

export default function UserAction({ isMobile }) {
  const [isUserOpen, setUserOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isSettingOpen, setSettingOpen] = useState(false);
  const [isPromoOpen, setPromoOpen] = useState(false);

  const {
    isCartOpen,
    isOrderOpen,
    isWishlistOpen,
    cart,
    isMenuOpen,
    modalLogin,
    modalSignup,
    setCartOpen,
    setOrderOpen,
    setWishlistOpen,
    isAuthenticated,
    setMenuOpen,
    setModalLogin,
    setModalSignup,
    toggleTheme,
    darkTheme,
    setUser,
  } = useContext(AppContext);

  const toggleLogin = (e) => {
    e.preventDefault();
    setModalSignup(false);
    setProfileOpen(false);
    setOrderOpen(false);
    modalLogin ? setModalLogin(false) : setModalLogin(true);
  };

  const toggleSignup = (e) => {
    e.preventDefault();
    setModalLogin(false);
    setProfileOpen(false);
    setOrderOpen(false);
    modalSignup ? setModalSignup(false) : setModalSignup(true);
  };

  const toggleProfile = (e) => {
    e.preventDefault();
    setModalLogin(false);
    setModalSignup(false);
    setUserOpen(false);
    setOrderOpen(false);
    isProfileOpen ? setProfileOpen(false) : setProfileOpen(true);
  };

  const toggleSettings = (e) => {
    e ? e.preventDefault() : null;
    setModalLogin(false);
    setModalSignup(false);
    setUserOpen(false);
    setOrderOpen(false);
    setProfileOpen(false);

    isSettingOpen ? setSettingOpen(false) : setSettingOpen(true);
  };

  const toggleOrder = (e) => {
    e.preventDefault();
    // console.log(isOrderOpen);
    setModalLogin(false);
    setModalSignup(false);
    setUserOpen(false);
    setProfileOpen(false);
    isOrderOpen ? setOrderOpen(false) : setOrderOpen(true);
  };

  const togglePromo = (e) => {
    e.preventDefault();
    // console.log(isOrderOpen);
    setModalLogin(false);
    setModalSignup(false);
    setUserOpen(false);
    setProfileOpen(false);
    setOrderOpen(false);
    isPromoOpen ? setPromoOpen(false) : setPromoOpen(true);
  };

  const openCart = (event) => {
    event.preventDefault();
    setWishlistOpen(false);
    setMenuOpen(false);
    setUserOpen(false);
    setModalLogin(false);
    setModalSignup(false);
    setProfileOpen(false);
    setOrderOpen(false);
    isCartOpen ? setCartOpen(false) : setCartOpen(true);
  };

  const openWishlist = (event) => {
    event.preventDefault();
    setCartOpen(false);
    setMenuOpen(false);
    setUserOpen(false);
    setModalLogin(false);
    setModalSignup(false);
    setProfileOpen(false);
    setOrderOpen(false);
    isWishlistOpen ? setWishlistOpen(false) : setWishlistOpen(true);
  };

  const openMenu = (event) => {
    event.preventDefault();
    setWishlistOpen(false);
    setCartOpen(false);
    setUserOpen(false);
    setModalLogin(false);
    setModalSignup(false);
    setProfileOpen(false);
    setOrderOpen(false);
    isMenuOpen ? setMenuOpen(false) : setMenuOpen(true);
  };

  const toggleUser = (e) => {
    e.preventDefault();
    setWishlistOpen(false);
    setMenuOpen(false);
    setCartOpen(false);

    setUserOpen((prevState) => !prevState);
  };

  const changeTheme = () => {
    isMobile ? (isMenuOpen ? setMenuOpen(false) : setMenuOpen(true)) : null;
    toggleTheme();
    setWishlistOpen(false);
    setCartOpen(false);
    setUserOpen(false);
    setModalLogin(false);
    setModalSignup(false);
  };

  const toggleSearch = (e) => {
    e.preventDefault();
    setSearchOpen((prevState) => !prevState);
    setWishlistOpen(false);
    setCartOpen(false);
    setUserOpen(false);
    setModalLogin(false);
    setModalSignup(false);
    setMenuOpen(false);
  };

  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const mobileHeaderAnimation = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
    transition: { transition },
  };

  const searchBoxAnimation = {
    initial: { opacity: 0, x: -100, scale: 0.5 },
    animate: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, x: -100, scale: 0.5 },
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
              variants={searchBoxAnimation}
              className={`icon-wrapper`}
            >
              {isMobile ? (
                <>
                  <Link href={`/`}>
                    <a className="icon-item icon">
                      <SvgIcon icon={icons.home.toSvg()} />
                    </a>
                  </Link>
                </>
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
                      {isAuthenticated ? (
                        <>
                          <a
                            title={`Profile`}
                            onClick={toggleProfile}
                            className="dropdown-item"
                          >
                            Profile
                          </a>
                          <a
                            title={`Order Lists`}
                            onClick={toggleOrder}
                            className="dropdown-item"
                          >
                            My Orders
                          </a>
                          <a
                            title={`Order Lists`}
                            onClick={togglePromo}
                            className="dropdown-item"
                          >
                            My Promos
                          </a>
                          <a
                            title={`Settings`}
                            onClick={toggleSettings}
                            className="dropdown-item"
                          >
                            Settings
                          </a>
                          <a
                            title={`Logout`}
                            onClick={() => {
                              logout();
                              setUser(null);
                            }}
                            className="dropdown-item"
                          >
                            Logout
                          </a>
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </DropdownMenu>
                  </div>
                </div>
              )}

              <div onClick={(e) => openCart(e)} className="icon-item icon cart">
                <SvgIcon icon={icons["shopping-cart"].toSvg()} />
                {cart.totalQuantity ? (
                  <div className="cart-quantity">{cart.totalQuantity}</div>
                ) : null}
              </div>
              <div
                title={`wishlist`}
                onClick={(e) => openWishlist(e)}
                className="icon-item icon"
              >
                <SvgIcon icon={icons.heart.toSvg()} />
              </div>
              <div onClick={(e) => toggleSearch(e)} className="icon-item icon">
                <SvgIcon icon={icons.search.toSvg()} />
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
            <motion.div
              exit="exit"
              animate={{ scale: 1.03, x: 0 }}
              initial="initial"
              variants={searchBoxAnimation}
              className={`${
                isMobile ? "search-warper-mobile" : "search-block"
              }`}
            >
              <SearchBox
                isMobile={isMobile}
                toggleSearch={toggleSearch}
                isSearchOpen={isSearchOpen}
              />
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
              <OuterClick onOuterClick={() => setUserOpen(false)}>
                <div className="link-wrapper">
                  {isAuthenticated ? (
                    <>
                      <a
                        title={`Profile`}
                        onClick={toggleProfile}
                        className="dropdown-item"
                      >
                        Profile
                      </a>
                      <a
                        title={`Order Lists`}
                        onClick={toggleOrder}
                        className="dropdown-item"
                      >
                        My Orders
                      </a>
                      <a
                        title={`Order Lists`}
                        onClick={togglePromo}
                        className="dropdown-item"
                      >
                        My Promos
                      </a>
                      <a
                        title={`Settings`}
                        onClick={toggleSettings}
                        className="dropdown-item"
                      >
                        Settings
                      </a>
                      <a
                        title={`Logout`}
                        onClick={() => {
                          logout();
                          setUser(null);
                        }}
                        className="dropdown-item"
                      >
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </div>
                <button
                  className={`btn close-btn`}
                  onClick={(e) => toggleUser(e)}
                >
                  <SvgIcon icon={icons.x.toSvg()} />
                </button>
              </OuterClick>
            </motion.div>
          ) : null
        ) : null}
      </AnimatePresence>

      <SlidingPane
        className="side-pane-wrapper"
        overlayClassName="side-pane-overlay"
        isOpen={isCartOpen}
        title="My Cart"
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
        title="My Wishlists"
        width={`${isMobile ? "100vw" : "500px"}`}
        closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setWishlistOpen(false);
        }}
      >
        <WishList />
      </SlidingPane>

      {!isAuthenticated ? (
        <>
          <Modal
            isOpen={modalLogin}
            toggle={toggleLogin}
            className={"login-modal"}
          >
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
        </>
      ) : (
        <>
          <Modal
            isOpen={isProfileOpen}
            toggle={toggleProfile}
            className={"login-modal"}
          >
            <ModalBody>
              <Profile />
            </ModalBody>
          </Modal>

          <Modal
            isOpen={isSettingOpen}
            toggle={toggleSettings}
            className={"login-modal"}
          >
            <ModalBody>
              <Settings toggleSettings={toggleSettings} />
            </ModalBody>
          </Modal>

          <SlidingPane
            className="side-pane-wrapper"
            overlayClassName="side-pane-overlay"
            isOpen={isOrderOpen}
            title="My Orders"
            width={`${isMobile ? "100vw" : "500px"}`}
            closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setOrderOpen(false);
            }}
          >
            <OrderList />
          </SlidingPane>
          <SlidingPane
            className="side-pane-wrapper"
            overlayClassName="side-pane-overlay"
            isOpen={isPromoOpen}
            title="My Promos"
            width={`${isMobile ? "100vw" : "500px"}`}
            closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setPromoOpen(false);
            }}
          >
            <PromoList />
          </SlidingPane>
        </>
      )}

      {isMobile && (
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
              onChange={changeTheme}
              checked={darkTheme}
            />
          </div>
          <Menu />
        </SlidingPane>
      )}
    </>
  );
}
