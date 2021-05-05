import React, { useState, useContext, useEffect } from "react";
import { Container, DropdownMenu } from "reactstrap";
import { isEmpty } from "lodash";
import AppContext from "../../context/AppContext";

import { useQuery } from "@apollo/client";
import { searchProduct } from "../../helper/graphql/getProducts";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));
const ProductSkeleton = dynamic(() =>
  import("../../components/utils/ProductSkeleton")
);

const Shop = () => {
  const pageTitle = "Search Product";
  const [prodList, setProdList] = useState([]);

  const { searchQuery } = useContext(AppContext);

  useEffect(() => {
    searchQuery != "" ? searchProductList() : null;
  }, [searchQuery]);

  // Search product Data.
  const { loading, error, data, refetch: searchProductList } = useQuery(
    searchProduct,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        query: searchQuery ? searchQuery : "",
      },
      onCompleted: () => {
        data.products ? setProdList(data.products) : null;
      },
    }
  );

  return (
    <PageMotion>
      <section className={`shop-section page-section`}>
        <div className="shop-body-section">
          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <center>
                  {searchQuery != "" ? (
                    <p className="description">
                      Search results for: <strong>"{searchQuery}"</strong>
                    </p>
                  ) : null}
                </center>
              </div>
            </div>
            {searchQuery != "" ? (
              !loading ? (
                prodList.length > 0 ? (
                  <ProductGrid prodList={prodList} isInExpolre={true} />
                ) : (
                  <center>
                    <h4>No product found</h4>
                  </center>
                )
              ) : error ? (
                <center>
                  <h2>{error.message}</h2>
                </center>
              ) : (
                <ProductSkeleton />
              )
            ) : (
              <center>
                <h2>Search products</h2>
              </center>
            )}
          </Container>
        </div>
      </section>
    </PageMotion>
  );
};

export default Shop;
