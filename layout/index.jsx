import React from "react";

//Componets
import Footer from "./components/Footer";
import Header from "./components/Header";

import Tracker from "./seoWraper";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <Tracker>
        <main className={`page-main`}>{props.children}</main>
      </Tracker>
      <Footer />
    </div>
  );
};

export default Layout;
