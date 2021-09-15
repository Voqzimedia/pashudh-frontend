const ShopPagination = ({
  productsCount,
  state,
  prodList,
  nextPage,
  previousPage,
}) => {
  return (
    <div className="pagination-holder">
      <div className="pagination">
        {state?.start > 0 && (
          <button className={`btn shop-now left`} onClick={previousPage}>
            Previous
          </button>
        )}

        {state?.limit + state?.start < productsCount && prodList.length >= 9 && (
          <button className={`btn shop-now right`} onClick={nextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopPagination;
