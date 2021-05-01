import React, { useState } from "react";
import { Container, DropdownMenu } from "reactstrap";
import { isEmpty } from "lodash";

import { useQuery } from "@apollo/client";
import {
  getCategories,
  getCategory,
  getCategoriesPath,
} from "../../../helper/graphql/getCategories";
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

const Shop = ({ products, categories, thisFillter }) => {
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

  // Get Categories Data.
  const { loading, error, data, refetch: refetchCata } = useQuery(getCategory, {
    notifyOnNetworkStatusChange: true,
    variables: {
      slug: filterCata?.slug ? filterCata.slug : "whole-six-yards",
      sort: filterSort,
    },
    onCompleted: () => {
      data?.categories.length > 0 ? setFilterCata(data.categories[0]) : null;
      data?.categories.length > 0
        ? data.categories[0].products
          ? setProdList(data.categories[0].products)
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
              cataList={categories}
              changeTab={changeTab}
              filterCata={filterCata}
            />
          </Container>
          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <div className="content-header">
                  <p className="sub-title">Affordable Affluence</p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">
                    {filterCata?.title ? filterCata.title : "Whole Six Yards"}
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
              <div className={`nav-link dropdown-toggle menu-link has-subMenu`}>
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
            </div>
            {loading ? (
              <div>
                <h1>Loading</h1>
              </div>
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
export async function getStaticProps(context) {
  const {
    params: { category },
  } = context;

  const { data: categoriesData } = await client.query({
    query: getCategories,
  });

  const { data: categoryData } = await client.query({
    query: getCategory,
    variables: {
      slug: category,
    },
  });

  return {
    props: {
      products:
        categoryData?.categories.length > 0
          ? categoryData.categories[0].products
            ? categoryData.categories[0].products
            : []
          : [],
      categories: categoriesData?.categories ? categoriesData.categories : [],
      thisFillter:
        categoryData?.categories.length > 0 ? categoryData.categories[0] : null,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: getCategoriesPath,
  });

  const pathsData = [];

  data?.categories &&
    data?.categories.map((cate) => {
      if (!isEmpty(cate?.slug)) {
        pathsData.push({ params: { category: cate?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: false,
  };
}

export default Shop;
