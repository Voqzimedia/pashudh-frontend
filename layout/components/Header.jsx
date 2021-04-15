import React, { useContext } from "react";
import Menu from "./Header/Menu";
import UserAction from "./Header/UserAction";
import { Container, CustomInput } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../context/AppContext";

export default function Header() {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  return (
    <header>
      <div className="navbar-area">
        {!isMobile ? (
          <Container>
            <div className="large-nav">
              <div className="search-block">
                <div className="search-input">
                  <input type="text" name="search" />
                  <label htmlFor=""></label>
                  <div className="icon search-box-icon">
                    <FontAwesomeIcon icon={faSearch} />
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
                <label htmlFor=""></label>
                <CustomInput
                  type="switch"
                  id="themeSwitch"
                  name="themeSwitch"
                  className={`theme-switch`}
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
