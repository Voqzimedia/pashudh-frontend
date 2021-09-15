import React, { useState, useContext, useMemo, useReducer } from "react";
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
import {
  getProductByFilter,
  getProductList,
} from "../../helper/graphql/getProducts";
import { filterReducer, FILTER_ACTIONS, initialFilter } from ".";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));
const CatagoryFilterX = dynamic(() =>
  import("../../components/Shop/CatagoryFilterX")
);

const ProductSkeleton = dynamic(() =>
  import("../../components/utils/ProductSkeleton")
);

const CatagoryShop = ({ products, categories, thisFillter }) => {
  const pageTitle = "Shop";

  const [prodList, setProdList] = useState(products);
  const [isLoading, setIsLoading] = useState(false);

  const thisinitialFilter = {
    ...initialFilter,
    categories: thisFillter?.slug ? [thisFillter.slug] : [],
  };

  const [state, dispatch] = useReducer(filterReducer, thisinitialFilter);

  const { deviceWidth, searchQuery } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const graphVariable = useMemo(() => {
    let price = state.price ? state.price : null;
    let categories = state.categories;
    let thisClass = state.class;
    let color = state.color;
    let limit = state.limit;
    let start = state.start;
    let query = searchQuery != "" ? searchQuery : null;

    let variable = {};

    if (price) {
      variable = { ...variable, price };
    }
    if (limit) {
      variable = { ...variable, limit };
    }
    if (query) {
      variable = { ...variable, query };
    }

    return { ...variable, categories, start, class: thisClass, color };
  }, [state, searchQuery]);

  const refetchCata = () => {
    client
      .query({
        query: getProductByFilter,
        variables: graphVariable,
      })
      .then(({ data }) => {
        setProdList(() => data?.products);
        setIsLoading(() => false);
      });
  };

  useMemo(() => {
    setIsLoading(() => true);
    refetchCata();
  }, [graphVariable]);

  useMemo(() => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_CATEGORY,
      categories: thisFillter?.slug ? [thisFillter.slug] : [],
    });
  }, [thisFillter]);

  // console.log(thisFillter);

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
              {/* <CatagoryFilterMobile
                cataList={categories}
                changeTab={changeTab}
                initialFilter?.categories?.[0]={initialFilter?.categories?.[0]}
              /> */}
            </center>
          ) : (
            <Container className={`shop-filter`}>
              <CatagoryFilterX
                cataList={categories}
                dispatch={dispatch}
                filterState={state}
              />
            </Container>
          )}

          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <div className="content-header">
                  <p className="sub-title">
                    {thisFillter?.tagLine
                      ? thisFillter?.tagLine
                      : "Affordable Affluence"}
                  </p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">
                    {thisFillter?.title
                      ? thisFillter?.title
                      : "Whole Six Yards"}
                  </h2>
                </div>

                <p className="description">
                  {thisFillter?.description
                    ? thisFillter?.description
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
            {isLoading ? (
              <ProductSkeleton />
            ) : (
              <ProductGrid prodList={prodList} />
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

  const { data: productsData } = await client.query({
    query: getProductByFilter,
    variables: {
      limit: 10,
    },
  });

  return {
    props: {
      products: productsData.products ? productsData?.products : [],
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

export default CatagoryShop;

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
