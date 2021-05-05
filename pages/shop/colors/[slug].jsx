import React, { useState } from "react";
import { Container, DropdownMenu } from "reactstrap";
import { isEmpty } from "lodash";

import { useQuery } from "@apollo/client";
import { getColor, getColors } from "../../../helper/graphql/getColors";
import client from "../../../helper/ApolloClient";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() =>
  import("../../../components/Motion/PageMotion")
);
const ProductGrid = dynamic(() =>
  import("../../../components/Shop/ProductGrid")
);
const CatagoryFilter = dynamic(() =>
  import("../../../components/Shop/CatagoryFilter")
);

const ProductSkeleton = dynamic(() =>
  import("../../../components/utils/ProductSkeleton")
);

const Shop = ({ products, colors, thisFillter }) => {
  const pageTitle = "Shop";

  const [prodList, setProdList] = useState(products);
  const [filterCata, setFilterCata] = useState(thisFillter);
  const [filterSort, setFilterSort] = useState("id");

  const changeTab = (category) => {
    setFilterCata(category);
    refetchCata();
  };

  const sortProduct = (option) => {
    switch (option) {
      case "priceAsc":
        setFilterSort("price:asc");

        break;
      case "priceDesc":
        setFilterSort("price:desc");

        break;
      default:
        setFilterSort("id:asc");
    }

    setTimeout(
      function () {
        refetchCata();
      }.bind(this),
      100
    );
  };

  // Get colors Data.
  const { loading, error, data, refetch: refetchCata } = useQuery(getColor, {
    notifyOnNetworkStatusChange: true,
    variables: {
      slug: filterCata?.slug ? filterCata.slug : "whole-six-yards",
      sort: filterSort,
    },
    onCompleted: () => {
      data?.colors.length > 0 ? setFilterCata(data.colors[0]) : null;
      data?.colors.length > 0
        ? data.colors[0].products
          ? setProdList(data.colors[0].products)
          : null
        : null;
    },
  });

  return (
    <PageMotion>
      <section className={`shop-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
        </Container>
        <div className="shop-body-section">
          <Container className={`shop-filter`}>
            <CatagoryFilter
              cataList={colors}
              changeTab={changeTab}
              filterCata={filterCata}
              exploreSlug={`color`}
            />
          </Container>
          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <div className="content-header">
                  <p className="sub-title">Affordable Affluence</p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">
                    {filterCata?.name ? filterCata.name : "Whole Six Yards"}
                  </h2>
                </div>

                <p className="description">
                  Description: Delightfully comfortable in both quality and
                  price, these contemporary drapes will let you float in the lap
                  of luxury.
                </p>
              </div>
            </div>

            <div className="product-sort-holder">
              <div className={`nav-link dropdown-toggle menu-link has-subMenu`}>
                Sort
                <DropdownMenu className={`subMenu`}>
                  <a
                    onClick={() => sortProduct("priceAsc")}
                    className="dropdown-item"
                  >
                    Price: Low to High
                  </a>
                  <a
                    onClick={() => sortProduct("priceDesc")}
                    className="dropdown-item"
                  >
                    Price: High to Low
                  </a>
                  <a onClick={() => sortProduct()} className="dropdown-item">
                    Newest Arrivals
                  </a>
                </DropdownMenu>
              </div>
            </div>
            {loading ? (
              <ProductSkeleton />
            ) : (
              <ProductGrid
                prodList={prodList}
                filterCata={filterCata}
                isInExpolre={true}
              />
            )}
          </Container>
        </div>
      </section>
    </PageMotion>
  );
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const { data: colorsData } = await client.query({
    query: getColors,
  });

  //   console.log(colorsData);

  const { data: colorData } = await client.query({
    query: getColor,
    variables: {
      slug: slug,
    },
  });

  return {
    props: {
      products:
        colorData?.colors.length > 0
          ? colorData.colors[0].products
            ? colorData.colors[0].products
            : []
          : [],
      colors: colorsData?.colors ? colorsData.colors : [],
      thisFillter: colorData?.colors.length > 0 ? colorData.colors[0] : null,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: getColors,
  });

  const pathsData = [];

  data?.colors &&
    data?.colors.map((cate) => {
      if (!isEmpty(cate?.slug)) {
        pathsData.push({ params: { slug: cate?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: false,
  };
}

export default Shop;
