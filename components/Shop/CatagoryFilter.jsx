import React from "react";

import { Container, DropdownMenu } from "reactstrap";
import Link from "next/link";

export default function CatagoryFilter({ cataList, changeTab, filterCata }) {
  return (
    <Container className={`shop-filter`}>
      <div className={`filter-wrapper`}>
        {cataList.map((cata, index) => (
          <Link href={`/shop/${cata.slug}`} key={index}>
            <a
              onClick={() => changeTab(cata)}
              className={`filter-item ${
                filterCata ? (filterCata.slug == cata.slug ? "active" : "") : ""
              }`}
            >
              <p className="title">{cata.title}</p>
              {cata.subTitle && <p className="sub-title">{cata.subTitle}</p>}
            </a>
          </Link>
        ))}
      </div>
    </Container>
  );
}
