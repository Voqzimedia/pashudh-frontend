import React, { useContext } from "react";

//Componets
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsLetter from "./components/Footer/NewsLetter";
import AppContext from "../context/AppContext";

import Tracker from "./seoWraper";

import SmoothScroll from "../components/utils/SmoothScroll";

const Layout = (props) => {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;
  return (
    <>
      {isMobile ? <Header /> : null}

      <SmoothScroll>
        {!isMobile ? <Header /> : null}

        <Tracker>
          <main className={`page-main`}>{props.children}</main>
        </Tracker>
        <NewsLetter />
        <Footer className={`hide`} />
      </SmoothScroll>
      <Footer className={`parallax`} />
    </>
  );
};

export default Layout;
