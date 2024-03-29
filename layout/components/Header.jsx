import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { Container, CustomInput } from "reactstrap";
import { icons } from "feather-icons";
import AppContext from "../../context/AppContext";
import { useRouter } from "next/router";
import Link from "next/link";

import { motion } from "framer-motion";

import Menu from "./Header/Menu";
import UserAction from "./Header/UserAction";
import Logo from "../../components/Logo";

// const UserAction = dynamic(() => import("./Header/UserAction"));
const SearchBox = dynamic(() => import("./Header/SearchBox"), { ssr: false });
const SvgIcon = dynamic(() => import("../../components/utils/SvgIcon"), {
  ssr: false,
});

import miniLogo from "../../assets/images/mini-logo.svg";
import miniLogoWhite from "../../assets/images/mini-logo-white.svg";

export default function Header({ categories }) {
  const { deviceWidth, toggleTheme, darkTheme } = useContext(AppContext);
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };
  const isMobile = deviceWidth < 500;

  const headerAnimation = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
    transition: { transition },
  };
  const mobileHeaderAnimation = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
    transition: { transition },
  };

  const router = useRouter();

  return (
    <header className={isMobile ? "mobile-head" : ""}>
      {isMobile && !(router?.route == "/") && (
        <div className="top-bar">
          <Link href="/">
            <a className="logo">
              <Logo isHeader={true} />
            </a>
          </Link>
        </div>
      )}
      <div className="navbar-area">
        {!isMobile ? (
          <motion.div
            exit="exit"
            animate="animate"
            initial="initial"
            transition="transition"
            variants={headerAnimation}
          >
            <Container>
              <div className="large-nav">
                <div className="logo-block">
                  <Link href="/">
                    <a className="logo-holder">
                      {darkTheme ? (
                        <img src={miniLogoWhite} alt="logo" />
                      ) : (
                        <img src={miniLogo} alt="logo" />
                      )}
                    </a>
                  </Link>
                </div>
                <div className="menu-block">
                  <Menu categories={categories} />
                </div>

                <div className="user-block">
                  <UserAction isMobile={isMobile} />
                </div>

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
              </div>
            </Container>
          </motion.div>
        ) : (
          <motion.div
            exit="exit"
            animate="animate"
            initial="initial"
            transition="transition"
            variants={mobileHeaderAnimation}
            className="mobile-header"
          >
            <div className="user-block">
              <UserAction isMobile={isMobile} />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
