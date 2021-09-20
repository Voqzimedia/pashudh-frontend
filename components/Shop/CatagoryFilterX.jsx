import React from "react";

import { Container, DropdownMenu } from "reactstrap";
import Link from "next/link";
import { FILTER_ACTIONS } from "../../pages/shop";

export const CatagoryFilterMobile = ({ cataList, dispatch, filterState }) => {
  var thisCata = cataList.find(
    (cata) => cata.slug === filterState?.categories?.[0]
  );

  // console.log({ filterState, cataList, thisCata });

  return (
    <Container>
      <div className={`filter-wrapper mobile`}>
        <div className={`nav-link dropdown-toggle menu-link has-subMenu`}>
          {thisCata.title
            ? thisCata.title
            : thisCata.name
            ? thisCata.name
            : "name"}

          <DropdownMenu className={`subMenu`}>
            {cataList.map((cata, index) => (
              <Link href={`/shop/${cata.slug}`} key={index}>
                <a
                  onClick={() =>
                    dispatch({
                      type: FILTER_ACTIONS.CHANGE_CATEGORY,
                      categories: cata?.slug ? [cata.slug] : [],
                    })
                  }
                  className={`filter-item dropdown-item`}
                >
                  {cata.title ? cata.title : cata.name ? cata.name : "name"}
                </a>
              </Link>
            ))}
          </DropdownMenu>
        </div>
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
