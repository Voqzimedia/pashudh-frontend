import React, { useContext } from "react";
import dynamic from "next/dynamic";

import AppContext from "../context/AppContext";
import Tracker from "./seoWraper";
import SmoothScroll from "../components/utils/SmoothScroll";
import { AnimatePresence } from "framer-motion";
import WhatsappChat from "../components/utils/WhatsappChat";

//Componets
const Footer = dynamic(() => import("./components/Footer"));
const Header = dynamic(() => import("./components/Header"));
const NewsLetter = dynamic(() => import("./components/Footer/NewsLetter"));

const Layout = (props) => {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;
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
      <div class="elfsight-app-f503cfd1-2fb1-42c7-9c63-2fb2072cacdd"></div>
    </>
  );
};

export default Layout;
