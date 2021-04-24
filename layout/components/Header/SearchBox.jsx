import React, { useRef, useEffect } from "react";
import { icons } from "feather-icons";
import dynamic from "next/dynamic";
import { OuterClick } from "react-outer-click";
const SvgIcon = dynamic(() => import("../../../components/utils/SvgIcon"));

export default function SearchBox({ isMobile, toggleSearch, isSearchOpen }) {
  const serachInput = useRef(null);

  useEffect(() => {
    isSearchOpen ? serachInput.current.focus() : null;
  }, []);

  return (
    <OuterClick onOuterClick={toggleSearch ? toggleSearch : null}>
      <div className="search-input">
        <label htmlFor="searchBox"></label>
        <input
          type="text"
          id={`searchBox`}
          name="search"
          placeholder={`Search`}
          ref={serachInput}
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
