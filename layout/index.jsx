import React, { useContext } from "react";
import dynamic from "next/dynamic";

import AppContext from "../context/AppContext";
import Tracker from "./seoWraper";
import SmoothScroll from "../components/utils/SmoothScroll";
import { AnimatePresence } from "framer-motion";

//Componets
const Footer = dynamic(() => import("./components/Footer"));
const Header = dynamic(() => import("./components/Header"));
const NewsLetter = dynamic(() => import("./components/Footer/NewsLetter"));

const Layout = (props) => {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;
  return (
    <>
      {isMobile ? <Header /> : null}

      <div className="scroll-parent">
        {!isMobile ? <Header /> : null}

        <Tracker>
          <main className={`page-main`}>
            <AnimatePresence exitBeforeEnter>{props.children}</AnimatePresence>
          </main>
        </Tracker>
        <NewsLetter />

        <Footer className={`hide`} />
      </div>
      <Footer className={`parallax`} />
    </>
  );
};

export default Layout;
