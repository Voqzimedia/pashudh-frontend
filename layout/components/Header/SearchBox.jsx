import React, { useRef, useEffect, useContext } from "react";
import { icons } from "feather-icons";
import dynamic from "next/dynamic";
import { OuterClick } from "react-outer-click";
const SvgIcon = dynamic(() => import("../../../components/utils/SvgIcon"));
import { useRouter } from "next/router";

import AppContext from "../../../context/AppContext";

export default function SearchBox({ isMobile, toggleSearch, isSearchOpen }) {
  const serachInput = useRef(null);

  const router = useRouter();

  const { setSearchQuery, searchQuery } = useContext(AppContext);

  const goToSearch = () => {
    router.route != "/shop/search" ? router.push(`/shop/search`) : null;
  };

  useEffect(() => {
    isSearchOpen ? serachInput.current.focus() : null;
  }, []);

  const getSearchInput = (e) => {
    // console.log(e.target.value);

    setSearchQuery(e.target.value ? e.target.value : "");
  };

  return (
    <OuterClick onOuterClick={toggleSearch ? toggleSearch : null}>
      <div className="search-input">
        <label htmlFor="searchBox"></label>
        <input
          type="text"
          id={`searchBox`}
          name="search"
          onFocus={goToSearch}
          placeholder={`Search`}
          ref={serachInput}
          onKeyUp={getSearchInput}
        />

        {isMobile ? (
          <button
            className="search-btn-icon"
            onClick={toggleSearch ? toggleSearch : null}
          >
            <div className="icon search-box-icon">
              <SvgIcon icon={icons.search.toSvg()} />
            </div>
          </button>
        ) : (
          <div className="icon search-box-icon">
            <SvgIcon icon={icons.search.toSvg()} />
          </div>
        )}
      </div>
    </OuterClick>
  );
}
