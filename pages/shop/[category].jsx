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
import { CatagoryFilterMobile } from "../../components/Shop/CatagoryFilterX";
import AppContext from "../../context/AppContext";
import {
  getProductByFilter,
  getProductList,
  getProductsCount,
} from "../../helper/graphql/getProducts";
import { filterReducer, FILTER_ACTIONS, initialFilter } from ".";
import ShopPagination from "../../components/Shop/ShopPagination";
import { useRouter } from "next/router";
import SvgIcon from "../../components/utils/SvgIcon";
import { icons } from "feather-icons";
import ProductFilter from "../../components/Shop/ProductFilter";
import { getClasses } from "../../helper/graphql/getClass";
import { getColors } from "../../helper/graphql/getColors";

const SlidingPane = dynamic(() => import("react-sliding-pane"), { ssr: false });

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));
const CatagoryFilterX = dynamic(() =>
  import("../../components/Shop/CatagoryFilterX")
);

const ProductSkeleton = dynamic(() =>
  import("../../components/utils/ProductSkeleton")
);

const CatagoryShop = ({
  products,
  categories,
  thisFillter,
  count,
  colors,
  classes,
}) => {
  const pageTitle = "Shop";

  const router = useRouter();

  const [prodList, setProdList] = useState(products);
  const [productsCount, setProductsCount] = useState(count);

  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setFilterOpen] = useState(false);

  const thisinitialFilter = {
    ...initialFilter,
    categories: thisFillter?.slug ? [thisFillter.slug] : [],
  };

  const filterModelHandle = () => {
    setFilterOpen(() => !isFilterOpen);
  };

  const [state, dispatch] = useReducer(filterReducer, thisinitialFilter);

  const { deviceWidth, searchQuery } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const graphVariable = useMemo(() => {
    let price = state.price ? state.price : null;
    let thisFor = state.thisFor ? state.thisFor : null;
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
    if (thisFor) {
      variable = { ...variable, thisFor };
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

  useMemo(() => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_CATEGORY,
      categories: thisFillter?.slug ? [thisFillter.slug] : [],
    });
  }, [thisFillter]);

  // console.log(thisFillter);

  const nextPage = () => {
    dispatch({
      type: FILTER_ACTIONS.LOADMORE,
      start: state.start + 9,
    });
    router.push(
      {
        pathname: router.route,
        query: { start: state.start + 9, category: thisFillter.slug },
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
        query: { start: state.start - 9, category: thisFillter.slug },
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
                        type: FILTER_ACTIONS.SORT,
                        sort: "id:desc",
                      })
                    }
                    className="dropdown-item"
                  >
                    Featured
                  </a>
                  <a
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SORT,
                        sort: "name:asc",
                      })
                    }
                    className="dropdown-item"
                  >
                    Alphabetically: A to Z
                  </a>
                  <a
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SORT,
                        sort: "name:desc",
                      })
                    }
                    className="dropdown-item"
                  >
                    Alphabetically: Z to A
                  </a>
                  <a
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SORT,
                        sort: "price:asc",
                      })
                    }
                    className="dropdown-item"
                  >
                    Price: Low to High
                  </a>
                  <a
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SORT,
                        sort: "price:desc",
                      })
                    }
                    className="dropdown-item"
                  >
                    Price: High to Low
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

  const { data: colorsData } = await client.query({
    query: getColors,
  });

  const { data: ClassData } = await client.query({
    query: getClasses,
  });

  const { data: productsData } = await client.query({
    query: getProductByFilter,
    variables: {
      limit: 10,
    },
  });

  const { data: productsCount } = await client.query({
    query: getProductsCount,
    variables: {
      categories: [category],
    },
  });

  return {
    props: {
      products: productsData.products ? productsData?.products : [],
      categories: categoriesData?.categories ? categoriesData.categories : [],
      thisFillter:
        categoryData?.categories.length > 0 ? categoryData.categories[0] : null,
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
