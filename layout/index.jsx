import React, { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

import AppContext from "../context/AppContext";
import Tracker from "./seoWraper";
import SmoothScroll from "../components/utils/SmoothScroll";
import { AnimatePresence } from "framer-motion";
import WhatsappChat from "../components/utils/WhatsappChat";
import SvgIcon from "../components/utils/SvgIcon";
import { icons } from "feather-icons";
import ReactSlidingPane from "react-sliding-pane";

import { useRouter } from "next/router";

//Componets
const Footer = dynamic(() => import("./components/Footer"));
const Header = dynamic(() => import("./components/Header"));
const NewsLetter = dynamic(() => import("./components/Footer/NewsLetter"));

const Layout = (props) => {
  const {
    deviceWidth,
    modalLogin,
    modalSignup,
    setModalLogin,
    setModalSignup,
  } = useContext(AppContext);

  const [isPopUpOpened, setPopUpOpened] = useState(true);

  const isMobile = deviceWidth < 500;

  const toggleLogin = () => {
    setModalSignup(false);
    setPopUpOpened(false);
    modalLogin ? setModalLogin(false) : setModalLogin(true);
  };
  const toggleSignUp = () => {
    setModalLogin(false);
    setPopUpOpened(false);
    modalSignup ? setModalSignup(false) : setModalSignup(true);
  };

  const router = useRouter();

  useEffect(() => {
    !(router.route == "/") ? setPopUpOpened(() => false) : null;
    return () => {
      setPopUpOpened(() => false);
    };
  }, []);

  return (
    <>
      {isMobile ? <Header categories={props?.categories} /> : null}

      <div className="scroll-parent">
        {!isMobile ? <Header categories={props?.categories} /> : null}

        <Tracker>
          <main className={`page-main`}>
            <AnimatePresence exitBeforeEnter>{props.children}</AnimatePresence>
          </main>
        </Tracker>
        <NewsLetter />

        <Footer className={`hide`} />
      </div>
      <Footer className={`parallax`} />
      <WhatsappChat />
      <ReactSlidingPane
        className="slide-pane-wrapper bottom-pane"
        overlayClassName="slide-pane-overlay bottom-overlay"
        isOpen={isPopUpOpened}
        width={`100vw`}
        from="bottom"
        closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setPopUpOpened(false);
        }}
      >
        <div className="popup-wrapper">
          <div className="popup-holder">
            <center>
              <p>Join our community to avail exciting rewards!</p>

              <div className="form-body">
                <div className="input-Holder">
                  <button className="btn submit-btn" onClick={toggleSignUp}>
                    Sign up
                  </button>
                </div>
                <div className="input-Holder">
                  <button className="btn submit-btn" onClick={toggleLogin}>
                    Log in
                  </button>
                </div>
              </div>
            </center>
          </div>
        </div>
      </ReactSlidingPane>
      <div className="elfsight-app-f503cfd1-2fb1-42c7-9c63-2fb2072cacdd"></div>
    </>
  );
};

export default Layout;
