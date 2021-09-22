import { useState, useContext, useMemo, useReducer } from "react";
import { Container } from "reactstrap";

import {
  getCategories,
  getCategory,
  getCategoriesPath,
} from "../../helper/graphql/getCategories";
import client from "../../helper/ApolloClient";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";

import dynamic from "next/dynamic";
import CategoryGrid from "../../components/Shop/CategoryGrid";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));

const categories = ({ categories }) => {
  const pageTitle = "Shop";

  // console.log({ categories });

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
            <CategoryGrid categories={categories} />
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

  return {
    props: {
      categories: categoriesData?.categories ? categoriesData.categories : [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export default categories;
