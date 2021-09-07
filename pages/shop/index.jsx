import React, { useState, useContext } from "react";
import { Container, DropdownMenu } from "reactstrap";
import { isEmpty } from "lodash";

import { useQuery } from "@apollo/client";
import {
  getCategories,
  getCategory,
  getCategoriesPath,
} from "../../helper/graphql/getCategories";
import client from "../../helper/ApolloClient";

import dynamic from "next/dynamic";
import { CatagoryFilterMobile } from "../../components/Shop/CatagoryFilter";
import AppContext from "../../context/AppContext";
import { getProductList } from "../../helper/graphql/getProducts";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));
const CatagoryFilter = dynamic(() =>
  import("../../components/Shop/CatagoryFilter")
);

const ProductSkeleton = dynamic(() =>
  import("../../components/utils/ProductSkeleton")
);

const Shop = ({ products, categories }) => {
  const pageTitle = "Shop";

  const [prodList, setProdList] = useState(products);
  const [filterCata, setFilterCata] = useState(null);
  const [filterSort, setFilterSort] = useState("id");

  const changeTab = (category) => {
    setFilterCata(category);
    refetchCata();
  };

  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

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

  //   Get Categories Data.
  const {
    loading,
    error,
    data,
    refetch: refetchCata,
  } = useQuery(getCategory, {
    notifyOnNetworkStatusChange: true,
    variables: {
      slug: filterCata?.slug ? filterCata.slug : "whole-six-yards",
      sort: filterSort,
    },
    onCompleted: () => {
      data?.categories.length > 0 ? setFilterCata(data.categories[0]) : null;
      data?.categories.length > 0
        ? data.categories[0].products
          ? console.log(data.categories[0].products)
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
          {isMobile ? (
            <center>
              <CatagoryFilterMobile
                cataList={categories}
                changeTab={changeTab}
                filterCata={filterCata}
              />
            </center>
          ) : (
            <Container className={`shop-filter`}>
              <CatagoryFilter
                cataList={categories}
                changeTab={changeTab}
                filterCata={filterCata}
              />
            </Container>
          )}

          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <div className="content-header">
                  <p className="sub-title">
                    {filterCata?.tagLine
                      ? filterCata.tagLine
                      : "Affordable Affluence"}
                  </p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">
                    {filterCata?.title ? filterCata.title : "Whole Six Yards"}
                  </h2>
                </div>

                <p className="description">
                  {filterCata?.description
                    ? filterCata.description
                    : `Delightfully comfortable in both quality and
                  price, these contemporary drapes will let you float in the lap
                  of luxury.`}
                </p>
              </div>
            </div>

            <div className="product-sort-holder">
              <div
                className={`nav-link dropdown-toggle menu-link has-subMenu `}
              >
                Filter
                <DropdownMenu className={`subMenu`}>
                  <a href="#" className="dropdown-item">
                    Color
                  </a>
                  <a href="#" className="dropdown-item">
                    Class
                  </a>
                </DropdownMenu>
              </div>
              <div
                className={`nav-link dropdown-toggle menu-link has-subMenu right`}
              >
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
              <ProductGrid prodList={prodList} filterCata={filterCata} />
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
export async function getStaticProps() {
  const { data: categoriesData } = await client.query({
    query: getCategories,
  });

  const { data: productsData } = await client.query({
    query: getProductList,
    variables: {
      limit: 10,
    },
  });

  return {
    props: {
      products: productsData.products ? productsData?.products : [],
      categories: categoriesData?.categories ? categoriesData.categories : [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default Shop;
