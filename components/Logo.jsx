import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import LogoImg from "../images/logo/logo.svg";
import LogoMobileImg from "../images/logo/logo-mobile.svg";
import LogoImgDark from "../images/logo/logo-white.svg";
import LogoMobileImgDark from "../images/logo/logo-mobile-white.svg";

export default function Logo() {
  const { deviceWidth, darkTheme } = useContext(AppContext);
  const isMobile = deviceWidth < 500;
  return (
    <div className={`header-logo`}>
      <div className="logo-holder">
        {darkTheme ? (
          isMobile ? (
            <img src={LogoMobileImgDark} alt="logo" />
          ) : (
            <img src={LogoImgDark} alt="logo" />
          )
        ) : isMobile ? (
          <img src={LogoMobileImg} alt="logo" />
        ) : (
          <img src={LogoImg} alt="logo" />
        )}
      </div>
    </div>
  );
}
