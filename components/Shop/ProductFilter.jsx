import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { camelToNormal, currency, makeTitle } from "../../helper/functions";
import { FILTER_ACTIONS } from "../../pages/shop";

const thisForList = ["Women", "Men", "Kids"];

const priceLists = [
  {
    name: "Rs.15000 to Rs.30000",
    min: 15000,
    max: 30000,
  },
  {
    name: "Rs.30000 to Rs.60000",
    min: 30000,
    max: 60000,
  },
  {
    name: "Rs.5000 to Rs.15000",
    min: 5000,
    max: 15000,
  },
  {
    name: "Rs.60000 & up",
    min: 60000,
    max: null,
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

  const forHandler = (thisFor) => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_FOR,
      thisFor: thisFor ? thisFor : null,
    });
    filterRoutePush({ thisFor: thisFor });
  };

  const classHandler = (cata) => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_CLASS,
      class: cata?.slug ? [cata.slug] : [],
    });
    filterRoutePush({ collection: cata?.slug });
  };

  const colorHandler = (color) => {
    dispatch({
      type: FILTER_ACTIONS.CHANGE_COLOR,
      color: color?.slug ? [color.slug] : [],
    });
    filterRoutePush({ color: color?.slug });
  };

  const priceHandler = ({ min, max }) => {
    // console.log({ min, max });
    dispatch({
      type: FILTER_ACTIONS.CHANGE_PRICE,
      max,
      min,
    });
  };

  return (
    <div className={"product-filter-holder"}>
      <div className="filter-status">
        {(state?.categories?.length > 0 ||
          state?.class?.length > 0 ||
          state?.color?.length > 0 ||
          state?.thisFor ||
          searchQuery !== "" ||
          state.isSoldOut != null ||
          state?.price) && (
          <>
            <h4 className="filter-status-title">Applied filters</h4>
            <div className="list-filter">
              {state.price && (
                <div className="filter-tag price">
                  <div>
                    Price : {currency.format(state.price)} To{" "}
                    {state.priceMax ? currency.format(state.priceMax) : "Up"}
                  </div>
                  <button
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.CLEAR_PRICE,
                      })
                    }
                  >
                    X
                  </button>
                </div>
              )}
              {state.thisFor && (
                <div className="filter-tag price">
                  <div>For : {state.thisFor}</div>
                  <button
                    onClick={() =>
                      dispatch({
                        type: FILTER_ACTIONS.CHANGE_FOR,
                        thisFor: null,
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
                  <div>Collections : </div>
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
        <h5 className="filter-title">For</h5>
        {thisForList.map((item, index) => (
          <div
            className="filter-item"
            key={index}
            onClick={() => forHandler(item)}
          >
            <input type="radio" name={`For`} id={`${item}${index}`} />
            <label htmlFor={`${item}${index}`}>{item}</label>
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h5 className="filter-title">Categories</h5>

        {categories.map((cata, index) => (
          <div
            className="filter-item"
            key={index}
            onClick={() => categoryHandler(cata)}
          >
            <input
              type="radio"
              name={`Categories`}
              id={`${cata.title}${index}`}
            />
            <label htmlFor={`${cata.title}${index}`}>{cata.title}</label>
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h5 className="filter-title">Collections</h5>
        {classes.map((cata, index) => (
          <div
            className="filter-item"
            key={index}
            onClick={() => classHandler(cata)}
          >
            <input
              type="radio"
              name={`Collections`}
              id={`${cata.title}${index}`}
            />
            <label htmlFor={`${cata.title}${index}`}>{cata.title}</label>
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h5 className="filter-title">Colors</h5>
        {colors.map((color, index) => (
          <div
            className="filter-item"
            key={index}
            onClick={() => colorHandler(color)}
          >
            <input type="radio" name={`Colors`} id={`${color.title}${index}`} />
            <label htmlFor={`${color.title}${index}`}>{color.title}</label>
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h5 className="filter-title">Price</h5>
        {priceLists.map((price, index) => (
          <div
            onClick={() => priceHandler({ min: price.min, max: price.max })}
            className="filter-item"
            key={index}
          >
            <input type="radio" name={`Price`} id={`${price.name}${index}`} />
            <label htmlFor={`${price.name}${index}`}>{price.name}</label>
          </div>
        ))}
      </div>
      <div className="filter-block">
        <h5 className="filter-title">Availability</h5>

        <div
          className="filter-item"
          onClick={() =>
            dispatch({
              type: FILTER_ACTIONS.SELECT_UNSOLD,
              isSoldOut: false,
            })
          }
        >
          <input type="radio" name={`For`} id={`UnSold`} />
          <label htmlFor={`UnSold`}>UnSold</label>
        </div>
        <div
          className="filter-item"
          onClick={() =>
            dispatch({
              type: FILTER_ACTIONS.SELECT_UNSOLD,
              isSoldOut: true,
            })
          }
        >
          <input type="radio" name={`Availability`} id={`Sold`} />
          <label htmlFor={`Sold`}>Sold</label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
