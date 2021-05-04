import React from "react";

import { Container, DropdownMenu } from "reactstrap";
import Link from "next/link";

export default function CatagoryFilter({
  cataList,
  changeTab,
  filterCata,
  exploreSlug,
}) {
  // console.log({ cataList, filterCata });

  return (
    <Container className={`shop-filter`}>
      <div className={`filter-wrapper ${exploreSlug ? "full" : ""}`}>
        {cataList.map((cata, index) => (
          <Link
            href={`/shop${exploreSlug ? `/${exploreSlug}/` : `/`}${cata.slug}`}
            key={index}
          >
            <a
              onClick={() => changeTab(cata)}
              className={`filter-item ${
                filterCata ? (filterCata.slug == cata.slug ? "active" : "") : ""
              } ${exploreSlug ? "full" : ""}`}
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
