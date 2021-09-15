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
import { useRouter } from "next/router";

import dynamic from "next/dynamic";
import { CatagoryFilterMobile } from "../../components/Shop/CatagoryFilter";
import AppContext from "../../context/AppContext";
import {
  getProductByFilter,
  getProductList,
  getProductsCount,
} from "../../helper/graphql/getProducts";
import ShopPagination from "../../components/Shop/ShopPagination";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));
const CatagoryFilterX = dynamic(() =>
  import("../../components/Shop/CatagoryFilterX")
);

const ProductSkeleton = dynamic(() =>
  import("../../components/utils/ProductSkeleton")
);

export const initialFilter = {
  categories: [],
  class: [],
  color: [],
  price: null,
  limit: 9,
  start: 0,
};

export const FILTER_ACTIONS = {
  CHANGE_CLASS: "changeClass",
  CHANGE_COLOR: "changeColor",
  CHANGE_PRICE: "changePrice",
  CHANGE_CATEGORY: "changeCategory",
  LOADMORE: "loadMore",
  CLEAR: "clear",
};

export function filterReducer(state, action) {
  switch (action.type) {
    case FILTER_ACTIONS.CHANGE_CLASS:
      return { ...state, class: action.class, start: 0 };
    case FILTER_ACTIONS.CHANGE_COLOR:
      return { ...state, color: action.color, start: 0 };
    case FILTER_ACTIONS.CHANGE_PRICE:
      return { ...state, price: action.price, start: 0 };
    case FILTER_ACTIONS.LOADMORE:
      return { ...state, start: action.start };
    case FILTER_ACTIONS.CHANGE_CATEGORY:
      return { ...state, categories: action.categories };
    default:
      throw new Error();
  }
}

const Shop = ({ products, categories, productsCount }) => {
  const pageTitle = "Shop";

  const [prodList, setProdList] = useState(products);
  const [filterCata, setFilterCata] = useState(null);
  const [filterSort, setFilterSort] = useState("id");
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(filterReducer, initialFilter);

  const { deviceWidth, searchQuery } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const router = useRouter();

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

  const nextPage = () => {
    dispatch({
      type: FILTER_ACTIONS.LOADMORE,
      start: state.start + 9,
    });
    router.push(
      {
        pathname: router.route,
        query: { start: state.start + 9 },
      },
      undefined,
      { shallow: false }
    );
  };

  const previousPage = () => {
    dispatch({
      type: FILTER_ACTIONS.LOADMORE,
      start: state.start - 9,
    });
    router.push(
      {
        pathname: router.route,
        query: { start: state.start - 9 },
      },
      undefined,
      { shallow: false }
    );
  };

  const pageinationProps = {
    productsCount,
    state,
    prodList,
    nextPage,
    previousPage,
  };

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
                filterCata={filterCata}
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
            {isLoading ? (
              <ProductSkeleton />
            ) : (
              <ProductGrid prodList={prodList} />
            )}

            <ShopPagination {...pageinationProps} />
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
    query: getProductByFilter,
    variables: {
      limit: 10,
    },
  });

  const { data: productsCount } = await client.query({
    query: getProductsCount,
  });

  return {
    props: {
      products: productsData.products ? productsData?.products : [],
      categories: categoriesData?.categories ? categoriesData.categories : [],
      productsCount: productsCount.productsCount,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default Shop;