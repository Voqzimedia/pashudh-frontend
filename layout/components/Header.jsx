import React, { useContext } from "react";
import Menu from "./Header/Menu";
import UserAction from "./Header/UserAction";
import { Container, CustomInput } from "reactstrap";
import { icons } from "feather-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../../context/AppContext";

import SvgIcon from "../../components/utils/SvgIcon";
import SearchIcon from "../../images/icons/search.svg";

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
                    placeholder={`Serach`}
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
