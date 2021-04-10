import React from "react";

//Componets
import Footer from "./components/Footer";
import Header from "./components/Header";
import NewsLetter from "./components/Footer/NewsLetter";

import Tracker from "./seoWraper";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <Tracker>
        <main className={`page-main`}>{props.children}</main>
      </Tracker>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Layout;
