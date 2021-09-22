import React, { useState } from "react";

import {
  Container,
  DropdownMenu,
  Dropdown,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import Link from "next/link";
import { FILTER_ACTIONS } from "../../pages/shop";

export const CatagoryFilterMobile = ({ cataList, dispatch, filterState }) => {
  var thisCata = cataList.find(
    (cata) => cata.slug === filterState?.categories?.[0]
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen((prevState) => !prevState);
  };

  // console.log({ filterState, cataList, thisCata });

  return (
    <Container>
      <div className={`filter-wrapper mobile`}>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} nav>
          <DropdownToggle nav caret>
            {thisCata?.title
              ? thisCata?.title
              : thisCata?.name
              ? thisCata?.name
              : "Select Category"}
          </DropdownToggle>

          {dropdownOpen && (
            <DropdownMenu className="subMenu">
              {cataList.map((cata, index) => (
                <DropdownItem key={index}>
                  <Link href={`/shop/${cata.slug}`}>
                    <a
                      onClick={() =>
                        dispatch({
                          type: FILTER_ACTIONS.CHANGE_CATEGORY,
                          categories: cata?.slug ? [cata.slug] : [],
                        })
                      }
                      className={`filter-item`}
                    >
                      {cata.title ? cata.title : cata.name ? cata.name : "name"}
                    </a>
                  </Link>
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </Dropdown>
      </div>
    </Container>
  );
};

export default function CatagoryFilter({ cataList, dispatch, filterState }) {
  // console.log({ filterState });

  return (
    <Container className={`shop-filter`}>
      <div className={`filter-wrapper`}>
        {cataList.map((cata, index) => (
          <Link href={`/shop/${cata.slug}`} key={index}>
            <a
              onClick={() =>
                dispatch({
                  type: FILTER_ACTIONS.CHANGE_CATEGORY,
                  categories: cata?.slug ? [cata.slug] : [],
                })
              }
              className={`filter-item ${
                filterState?.categories?.[0]
                  ? filterState?.categories?.[0] == cata.slug
                    ? "active"
                    : ""
                  : ""
              }`}
            >
              <p className="title">
                {cata.title ? cata.title : cata.name ? cata.name : "name"}
              </p>
              {cata.subTitle && <p className="sub-title">{cata.subTitle}</p>}
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}
