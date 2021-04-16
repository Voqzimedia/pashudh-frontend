import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import LogoImg from "../images/logo/logo.svg";
import LogoMobileImg from "../images/logo/logo-mobile.svg";

export default function Logo() {
  const { deviceWidth } = useContext(AppContext);
  const isMobile = deviceWidth < 500;
  return (
    <div className={`header-logo`}>
      <div className="logo-holder">
        {isMobile ? (
          <img src={LogoMobileImg} alt="logo" />
        ) : (
          <img src={LogoImg} alt="logo" />
        )}
      </div>
    </div>
  );
}
