import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { camelToNormal, makeTitle } from "../../helper/functions";
import { FILTER_ACTIONS } from "../../pages/shop";

const priceLists = [
  {
    name: "Rs.15000 to Rs.30000",
  },
  {
    name: "Rs.30000 to Rs.60000",
  },
  {
    name: "Rs.5000 to Rs.15000",
  },
  {
    name: "Rs.60000 & up",
  },
];

const ProductFilter = ({ state, dispatch, categories, colors, classes }) => {
  //   console.log({ state, dispatch, categories, colors, classes });

  const { searchQuery } = useContext(AppContext);

  const router = useRouter();

  const filterRoutePush = (query) => {
    // console.log(router);

    var thisQuery = Object.assign(router.query, query);

    router.push(
      {
        pathname: router.route,
        query: thisQuery,
      },
      undefined,
      { shallow: false }
    );
  };

  const categoryHandler = (cata) => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_CATEGORY,
      categories: cata?.slug ? [cata.slug] : [],
    });
    filterRoutePush({ category: cata?.slug });
  };

  const classHandler = (cata) => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_CLASS,
      class: cata?.slug ? [cata.slug] : [],
    });
    filterRoutePush({ class: cata?.slug });
  };

  const colorHandler = (color) => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_COLOR,
      color: color?.slug ? [color.slug] : [],
    });
    filterRoutePush({ color: color?.slug });
  };

  return (
    <div className={"product-filter-holder"}>
      <div className="filter-status">
        {(state?.categories?.length > 0 ||
          state?.class?.length > 0 ||
          state?.color?.length > 0 ||
          searchQuery !== "" ||
          (state.isSoldOut != null) !== "" ||
          state?.price) && (
          <>
            <h4 className="filter-status-title">Applied filters</h4>
            <div className="list-filter">
              {state.price && (
                <div className="filter-tag price">
                  <div>Price : {currency.format(state.price)}</div>
                  <button
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.CHANGE_PRICE,
                        price: null,
                      })
                    }
                  >
                    X
                  </button>
                </div>
              )}
              {state.isSoldOut != null && (
                <div className="filter-tag price">
                  <div>Availability : UnSold</div>
                  <button
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.SELECT_UNSOLD,
                        isSoldOut: null,
                      })
                    }
                  >
                    X
                  </button>
                </div>
              )}
              {searchQuery !== "" && (
                <div className="filter-tag price">
                  <div>Search for : {searchQuery}</div>
                  <button onClick={() => setSearchQuery("")}>X</button>
                </div>
              )}
              {state?.categories?.length > 0 && (
                <div className="filter-tag categories">
                  <div>Categories : </div>
                  {state?.categories?.map((cata, index) => (
                    <div className="cata" key={index}>
                      {makeTitle(cata)}{" "}
                      <button
                        onClick={() =>
                          dispatch({
                            type: FILTER_ACTIONS.REMOVE_CATEGORY,
                            category: cata,
                          })
                        }
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {state?.color?.length > 0 && (
                <div className="filter-tag categories">
                  <div>Colors : </div>
                  {state?.color?.map((item, index) => (
                    <div className="cata" key={index}>
                      {makeTitle(item)}{" "}
                      <button
                        onClick={() =>
                          dispatch({
                            type: FILTER_ACTIONS.REMOVE_COLOR,
                            color: item,
                          })
                        }
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {state?.class?.length > 0 && (
                <div className="filter-tag categories">
                  <div>Class : </div>
                  {state?.class?.map((item, index) => (
                    <div className="cata" key={index}>
                      {makeTitle(item)}{" "}
                      <button
                        onClick={() =>
                          dispatch({
                            type: FILTER_ACTIONS.REMOVE_CLASS,
                            class: item,
                          })
                        }
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="filter-block">
        <h3 className="filter-title">Availability</h3>

        <div
          className="filter-item"
          onClick={() =>
            dispatch({
              type: FILTER_ACTIONS.SELECT_UNSOLD,
              isSoldOut: false,
            })
          }
        >
          UnSold
        </div>
      </div>
      <div className="filter-block">
        <h3 className="filter-title">Categories</h3>
        {categories.map((cata, index) => (
          <div
            className="filter-item"
            key={index}
            onClick={() => categoryHandler(cata)}
          >
            {cata.title}
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h3 className="filter-title">Classes</h3>
        {classes.map((cata, index) => (
          <div
            className="filter-item"
            key={index}
            onClick={() => classHandler(cata)}
          >
            {cata.title}
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h3 className="filter-title">Colors</h3>
        {colors.map((color, index) => (
          <div
            className="filter-item"
            key={index}
            onClick={() => colorHandler(color)}
          >
            {color.title}
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h3 className="filter-title">Price</h3>
        {priceLists.map((price, index) => (
          <div className="filter-item" key={index}>
            {price.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
