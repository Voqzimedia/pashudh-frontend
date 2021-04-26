import React, { useState } from "react";
import { Container, DropdownMenu } from "reactstrap";
import Link from "next/link";

import { useQuery } from "@apollo/client";
import { getCategories, getCategory } from "../../helper/graphql/getCategories";
import client from "../../helper/ApolloClient";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const ProductGrid = dynamic(() => import("../../components/Shop/ProductGrid"));

import prodImg1 from "../../assets/images/products/grid/prod1.png?webp";
import prodImg2 from "../../assets/images/products/grid/prod2.png?webp";
import prodImg3 from "../../assets/images/products/grid/prod3.png?webp";

const Shop = ({ products, categories, thisFillter }) => {
  const pageTitle = "Shop";

  const [prodList, setProdList] = useState(products);
  const [cataList, setCataList] = useState(categories);
  const [filterCata, setFilterCata] = useState(thisFillter);

  const changeTab = (category) => {
    setFilterCata(category);
    refetch();
  };

  // Get Categories Data.
  const { loading, error, data, refetch } = useQuery(getCategory, {
    notifyOnNetworkStatusChange: true,
    variables: {
      slug: filterCata?.slug ? filterCata.slug : "whole-six-yards",
    },
    onCompleted: () => {
      data?.categories.length > 0 ? setFilterCata(data.categories[0]) : null;
    },
  });

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
          <Container className={`shop-filter`}>
            <div className={`filter-wrapper`}>
              {cataList.map((cata, index) => (
                <Link href={`/shop?catagory=${cata.slug}`} key={index}>
                  <a
                    onClick={() => changeTab(cata)}
                    className={`filter-item ${
                      filterCata
                        ? filterCata.slug == cata.slug
                          ? "active"
                          : ""
                        : ""
                    }`}
                  >
                    <p className="title">{cata.title}</p>
                    {cata.subTitle && (
                      <p className="sub-title">{cata.subTitle}</p>
                    )}
                  </a>
                </Link>
              ))}
            </div>
          </Container>
          <Container>
            <div className="shop-title-header">
              <div className="content-holder">
                <div className="content-header">
                  <p className="sub-title">Affordable Affluence</p>
                  <hr className="small gradient no-m" />
                  <h2 className="title">
                    {filterCata?.title ? filterCata.title : "Whole Six Yards"}
                  </h2>
                </div>

                <p className="description">
                  Description: Delightfully comfortable in both quality and
                  price, these contemporary drapes will let you float in the lap
                  of luxury.
                </p>
              </div>
            </div>

            <div className="product-sort-holder">
              <div className={`nav-link dropdown-toggle menu-link has-subMenu`}>
                Sort
                <DropdownMenu className={`subMenu`}>
                  <a href="#" className="dropdown-item">
                    Price: Low to High
                  </a>
                  <a href="#" className="dropdown-item">
                    Price: High to Low
                  </a>
                  <a href="#" className="dropdown-item">
                    Newest Arrivals
                  </a>
                </DropdownMenu>
              </div>
              <div className={`nav-link dropdown-toggle menu-link has-subMenu`}>
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
            </div>

            <ProductGrid filterCata={filterCata} prodList={prodList} />
          </Container>
        </div>
      </section>
    </PageMotion>
  );
};

Shop.getInitialProps = async (ctx) => {
  const { data: categoriesData } = await client.query({
    query: getCategories,
  });

  let slug = ctx.query.catagory;

  // console.log({slug});

  const prodList = [
    {
      name:
        "Luxury Creamy Beige – Sunset Orange Pure Kanjivaram Handloom Silk Saree",
      price: "₹22,300",
      img: prodImg1,
      isSoldOut: false,
    },
    {
      name: "Rich Burgundy – Rani Pink Pure Kanjivaram Silk Saree",
      price: "₹35,900",
      img: prodImg2,
      isSoldOut: true,
    },
    {
      name: "Bright Violet – Yellow Luxury Pure Kanjivaram Handloom Silk Saree",
      price: "₹53,350",
      img: prodImg3,
      isSoldOut: false,
    },

    {
      name:
        "Handwoven Milky Rose – Grey Beige Pure Kanjivaram Handllom Silk Saree",
      price: "₹35,900",
      img: prodImg2,
      isSoldOut: true,
    },
    {
      name: "Rich Turquoise- Grey Pure Kanjivaram Handloom Silk Saree",
      price: "₹23,450",
      img: prodImg1,
      isSoldOut: false,
    },
    {
      name:
        "Rich Handwoven Kathiripoo Purple – Black Pure Kanjivaram Silk Saree",
      price: "₹28,700",
      img: prodImg3,
      isSoldOut: false,
    },
  ];

  try {
    const { data: categoryData } = await client.query({
      query: getCategory,
      variables: {
        slug: slug,
      },
    });
    const thisFillter = slug
      ? categoryData?.categories.length > 0
        ? categoryData.categories[0]
        : null
      : null;

    return {
      products: prodList,
      categories: categoriesData?.categories ? categoriesData.categories : [],
      thisFillter,
      slug,
    };
  } catch (err) {
    return {
      products: prodList,
      categories: categoriesData?.categories ? categoriesData.categories : [],
      thisFillter: null,
      slug,
    };
  }
};

export default Shop;
