import React, { useState } from "react";
import { Container, DropdownMenu } from "reactstrap";
import { isEmpty } from "lodash";

import { useQuery } from "@apollo/client";
import { getColor, getColors } from "../../helper/graphql/getColors";
import client from "../../helper/ApolloClient";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));

const Shop = () => {
  const pageTitle = "Search Product";

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
          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <div className="content-header">
                  <p className="sub-title">Affordable Affluence</p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">{"Whole Six Yards"}</h2>
                </div>

                <p className="description">
                  Description: Delightfully comfortable in both quality and
                  price, these contemporary drapes will let you float in the lap
                  of luxury.
                </p>
              </div>
            </div>

            {/* <ProductGrid
                prodList={prodList}
                filterCata={filterCata}
                isInExpolre={true}
              /> */}
          </Container>
        </div>
      </section>
    </PageMotion>
  );
};

export default Shop;
