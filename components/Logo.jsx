import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import LogoImg from "../assets/images/logo/logo.svg";
import LogoMobileImg from "../assets/images/logo/logo-mobile.svg";
import LogoImgDark from "../assets/images/logo/logo-white.svg";
import LogoMobileImgDark from "../assets/images/logo/logo-mobile-white.svg";

// import SvgIcon from "./utils/SvgIcon";

export default function Logo() {
  const { deviceWidth, darkTheme } = useContext(AppContext);
  const isMobile = deviceWidth < 500;

  return (
    <div className={`header-logo`}>
      <div className="logo-holder">
        <picture>
          {darkTheme ? (
            isMobile ? (
              <img
                src={LogoMobileImgDark}
                width="100"
                height="100"
                alt="logo"
              />
            ) : (
              <img src={LogoImgDark} width="100" height="100" alt="logo" />
            )
          ) : isMobile ? (
            <img src={LogoMobileImg} width="100" height="100" alt="logo" />
          ) : (
            <img src={LogoImg} width="100" height="100" alt="logo" />
          )}
        </picture>
      </div>
    </div>
  );
}
