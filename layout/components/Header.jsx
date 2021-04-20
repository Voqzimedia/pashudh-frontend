import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { Container, CustomInput } from "reactstrap";
import { icons } from "feather-icons";
import AppContext from "../../context/AppContext";

import Menu from "./Header/Menu";

const UserAction = dynamic(() => import("./Header/UserAction"), { ssr: false });
const SvgIcon = dynamic(() => import("../../components/utils/SvgIcon"), {
  ssr: false,
});

export default function Header() {
  const { deviceWidth, toggleTheme } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  return (
    <header className={isMobile ? "mobile-head" : ""}>
      <div className="navbar-area">
        {!isMobile ? (
          <Container>
            <div className="large-nav">
              <div className="search-block">
                <div className="search-input">
                  <label htmlFor="searchBox"></label>
                  <input
                    type="text"
                    id={`searchBox`}
                    name="search"
                    placeholder={`Search`}
                  />

                  <div className="icon search-box-icon">
                    <SvgIcon icon={icons.search.toSvg()} />
                  </div>
                </div>
              </div>
              <div className="menu-block">
                <Menu />
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
                />
              </div>
            </div>
          </Container>
        ) : (
          <div className="mobile-header">
            <div className="user-block">
              <UserAction isMobile={isMobile} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
