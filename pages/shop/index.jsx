import React, { useState, useContext, useMemo, useReducer } from "react";
import { Container, DropdownMenu } from "reactstrap";

import { getCategories } from "../../helper/graphql/getCategories";
import client from "../../helper/ApolloClient";
import { useRouter } from "next/router";

import dynamic from "next/dynamic";

import AppContext from "../../context/AppContext";
import {
  getProductByFilter,
  getProductsCount,
} from "../../helper/graphql/getProducts";
import ShopPagination from "../../components/Shop/ShopPagination";
import SvgIcon from "../../components/utils/SvgIcon";
import { icons } from "feather-icons";
import ProductFilter from "../../components/Shop/ProductFilter";
import { getColors } from "../../helper/graphql/getColors";
import { getClasses } from "../../helper/graphql/getClass";
import { arrayRemove } from "../../helper/functions";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));

const SlidingPane = dynamic(() => import("react-sliding-pane"), { ssr: false });

const ProductSkeleton = dynamic(() =>
  import("../../components/utils/ProductSkeleton")
);

export const initialFilter = {
  categories: [],
  class: [],
  color: [],
  price: null,
  priceMax: null,
  isSoldOut: null,
  limit: 9,
  start: 0,
  sort: "id:asc",
};

export const FILTER_ACTIONS = {
  CHANGE_PRICE: "changePrice",
  CHANGE_PRICEMAX: "changePriceMax",
  CLEAR_PRICE: "clearPrice",
  CHANGE_CATEGORY: "changeCategory",
  SELECT_UNSOLD: "selectUnsold",
  REMOVE_CATEGORY: "removeCategory",
  ADD_CATEGORY: "addCategory",
  CHANGE_CLASS: "changeClass",
  REMOVE_CLASS: "removeClass",
  ADD_CLASS: "addClass",
  CHANGE_COLOR: "changeColor",
  REMOVE_COLOR: "removeColor",
  ADD_COLOR: "addColor",
  LOADMORE: "loadMore",
  SORTPRICEASC: "sortShopAsc",
  SORTPRICEDESC: "sortShopDesc",
  SORTID: "sortID",
  CLEAR: "clear",
};

export function filterReducer(state, action) {
  // console.log(router);

  switch (action.type) {
    case FILTER_ACTIONS.CHANGE_CLASS:
      return {
        ...state,
        class: action.class,
        start: 0,
      };
    case FILTER_ACTIONS.ADD_CLASS:
      state.class.push(action.class);
      return {
        ...state,
        class: state.class,
        start: 0,
      };
    case FILTER_ACTIONS.REMOVE_CLASS:
      let newClass = arrayRemove(state.class, action.class);
      return {
        ...state,
        class: newClass,
        start: 0,
      };
    case FILTER_ACTIONS.CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
        start: 0,
      };
    case FILTER_ACTIONS.ADD_COLOR:
      state.color.push(action.color);
      return {
        ...state,
        color: state.color,
        start: 0,
      };
    case FILTER_ACTIONS.REMOVE_COLOR:
      let newColor = arrayRemove(state.color, action.color);
      return {
        ...state,
        color: newColor,
        start: 0,
      };
    case FILTER_ACTIONS.CHANGE_CATEGORY:
      return {
        ...state,
        categories: action.categories,
        start: 0,
      };
    case FILTER_ACTIONS.ADD_CATEGORY:
      state.categories.push(action.category);
      return {
        ...state,
        categories: state.categories,
        start: 0,
      };
    case FILTER_ACTIONS.REMOVE_CATEGORY:
      let newCata = arrayRemove(state.categories, action.category);
      return {
        ...state,
        categories: newCata,
        start: 0,
      };
    case FILTER_ACTIONS.CHANGE_PRICE:
      return { ...state, price: action.min, priceMax: action.max, start: 0 };

    case FILTER_ACTIONS.CLEAR_PRICE:
      return { ...state, priceMax: null, price: null, start: 0 };
    case FILTER_ACTIONS.SELECT_UNSOLD:
      return { ...state, isSoldOut: action.isSoldOut, start: 0 };
    case FILTER_ACTIONS.LOADMORE:
      return { ...state, start: action.start };

    case FILTER_ACTIONS.SORTPRICEASC:
      return { ...state, sort: "price:asc" };
    case FILTER_ACTIONS.SORTPRICEDESC:
      return { ...state, sort: "price:desc" };
    case FILTER_ACTIONS.SORTID:
      return { ...state, sort: "id:desc" };
    default:
      throw new Error();
  }
}

const Shop = ({ products, categories, count, colors, classes }) => {
  const pageTitle = "Shop";

  const [prodList, setProdList] = useState(products);
  const [productsCount, setProductsCount] = useState(count);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(filterReducer, initialFilter);

  const { deviceWidth, searchQuery } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const router = useRouter();

  const filterModelHandle = () => {
    setFilterOpen(() => !isFilterOpen);
  };

  const graphVariable = useMemo(() => {
    let price = state.price ? state.price : null;
    let priceMax = state.priceMax ? state.priceMax : null;
    let isSoldOut = state.isSoldOut != null ? state.isSoldOut : null;
    let categories = state.categories;
    let thisClass = state.class;
    let color = state.color;
    let limit = state.limit;
    let start = state.start;
    let sort = state.sort;
    let query = searchQuery != "" ? searchQuery : null;

    let variable = {};

    if (price) {
      variable = { ...variable, price };
    }
    if (priceMax) {
      variable = { ...variable, priceMax };
    }
    if (isSoldOut != null) {
      variable = { ...variable, isSoldOut };
    }
    if (limit) {
      variable = { ...variable, limit };
    }
    if (query) {
      variable = { ...variable, query };
    }

    return { ...variable, categories, start, class: thisClass, color, sort };
  }, [state, searchQuery]);

  const countVariable = useMemo(() => {
    let price = state.price ? state.price : null;
    let priceMax = state.priceMax ? state.priceMax : null;
    let isSoldOut = state.isSoldOut != null ? state.isSoldOut : null;
    let categories = state.categories.length > 0 ? state.categories : null;
    let thisClass = state.class.length > 0 ? state.class : null;
    let color = state.color.length > 0 ? state.color : null;

    let query = searchQuery != "" ? searchQuery : null;

    let variable = {};

    if (price) {
      variable = { ...variable, price };
    }
    if (priceMax) {
      variable = { ...variable, priceMax };
    }

    // console.log(isSoldOut == null);
    if (isSoldOut != null) {
      variable = { ...variable, isSoldOut };
    }

    if (query) {
      variable = { ...variable, query };
    }

    return { ...variable, categories, class: thisClass, color };
  }, [state, searchQuery]);

  // console.log({ state, graphVariable });

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

    client
      .query({
        query: getProductsCount,
        variables: countVariable,
      })
      .then(({ data }) => {
        // console.log(data, countVariable);
        setProductsCount(() => data?.productsConnection?.aggregate?.count);
        setIsLoading(() => false);
      });
  };

  useMemo(() => {
    setIsLoading(() => true);
    refetchCata();
  }, [graphVariable]);

  useMemo(() => {
    router?.query?.start
      ? dispatch({
          type: FILTER_ACTIONS.LOADMORE,
          start: parseInt(router?.query?.start),
        })
      : null;
  }, [router]);

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

  const filterProps = {
    state,
    dispatch,
    categories,
    colors,
    classes,
  };

  return (
    <PageMotion>
      <section className={`shop-section page-section`}>
        {/* <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
        </Container> */}
        <div className="shop-body-section">
          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <div className="content-header">
                  <p className="sub-title">Affordable Affluence</p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">Whole Six Yards</h2>
                </div>

                <p className="description">
                  Delightfully comfortable in both quality and price, these
                  contemporary drapes will let you float in the lap of luxury.
                </p>
              </div>
            </div>

            <div className="product-sort-holder">
              <div className="product-filter">
                <button
                  className="btn"
                  onClick={() =>
                    filterModelHandle ? filterModelHandle() : null
                  }
                >
                  Filter <SvgIcon icon={icons["filter"].toSvg()} />
                </button>
              </div>
              <div
                className={`nav-link dropdown-toggle menu-link has-subMenu right`}
              >
                Sort
                <DropdownMenu className={`subMenu`}>
                  <a
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SORTPRICEASC,
                      })
                    }
                    className="dropdown-item"
                  >
                    Price: Low to High
                  </a>
                  <a
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SORTPRICEDESC,
                      })
                    }
                    className="dropdown-item"
                  >
                    Price: High to Low
                  </a>
                  <a
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SORTID,
                      })
                    }
                    className="dropdown-item"
                  >
                    Newest Arrivals
                  </a>
                </DropdownMenu>
              </div>
            </div>
            {isLoading ? (
              <ProductSkeleton />
            ) : (
              <>
                <ProductGrid prodList={prodList} />
                <ShopPagination {...pageinationProps} />
              </>
            )}
          </Container>
        </div>
      </section>
      <SlidingPane
        className="side-pane-wrapper"
        overlayClassName="side-pane-overlay"
        isOpen={isFilterOpen}
        from="left"
        title="Filters"
        width={`${isMobile ? "100vw" : "500px"}`}
        closeIcon={<SvgIcon icon={icons.x.toSvg()} />}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setFilterOpen(false);
        }}
      >
        <ProductFilter {...filterProps} />
      </SlidingPane>
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

  const { data: colorsData } = await client.query({
    query: getColors,
  });

  const { data: ClassData } = await client.query({
    query: getClasses,
  });

  const { data: productsCount } = await client.query({
    query: getProductsCount,
  });

  return {
    props: {
      products: productsData.products ? productsData?.products : [],
      categories: categoriesData?.categories ? categoriesData.categories : [],
      count: productsCount?.productsConnection?.aggregate?.count
        ? productsCount?.productsConnection?.aggregate?.count
        : 0,
      colors: colorsData?.colors ? colorsData?.colors : [],
      classes: ClassData?.classes ? ClassData?.classes : [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default Shop;
