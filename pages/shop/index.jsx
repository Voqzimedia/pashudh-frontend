import React, { useState } from "react";
import { Container, Row, Col, DropdownMenu } from "reactstrap";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { getCategories } from "../../helper/graphql/getCategories";
import client from "../../helper/ApolloClient";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));

import prodImg1 from "../../assets/images/products/grid/prod1.png?webp";
import prodImg2 from "../../assets/images/products/grid/prod2.png?webp";
import prodImg3 from "../../assets/images/products/grid/prod3.png?webp";

const Shop = ({ products, categories, thisFillter }) => {
  const pageTitle = "Shop";

  const [prodList, setProdList] = useState(products);
  const [cataList, setCataList] = useState(categories);
  const [filterCata, setFilterCata] = useState(thisFillter);

  console.log({ products, categories, thisFillter });

  const changeTab = (category) => {
    // console.log(category);
    setFilterCata(category);
  };

  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const productImgMotion = {
    initial: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
    animate: { opacity: 1, ease: "easeOut", duration: 0.2, type: "tween" },
    whileHover: {
      scale: 1.05,
      y: -5,
    },
    transition: {
      transition,
    },
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
                  <h2 className="title">Yards Of Luxury</h2>
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

            <div className="product-grid">
              <Row>
                {prodList.map((product, index) => (
                  <Col md="4" key={index}>
                    <motion.div
                      whileHover="whileHover"
                      animate="animate"
                      initial="initial"
                      variants={productImgMotion}
                      transition="transition"
                      key={index}
                    >
                      <Link
                        href={`/shop/product/luxury-creamy-beige-sunset-orange-pure-kanjivaram-handloom-silk-saree`}
                      >
                        <a className="product-item">
                          <motion.div className="image-holder">
                            {product.isSoldOut && (
                              <motion.div className="sold-out">
                                <p>Sold Out</p>
                              </motion.div>
                            )}

                            <img
                              width="100"
                              height="100"
                              src={product.img}
                              alt={product.name}
                            />
                          </motion.div>
                          <Row className="product-content-holder">
                            <Col xs="9" className="no-pad">
                              <p className="title">{product.name}</p>
                            </Col>
                            <Col xs="3" className="no-pad">
                              <p className="price">{product.price}</p>
                            </Col>
                          </Row>
                        </a>
                      </Link>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </div>
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

  const jsonSearch = (query, data) => {
    for (var i = 0; i < data.length; i++) {
      if (data[i].slug == query) {
        return data[i];
      }
    }
    return { query, data };
  };

  let slug = ctx.query.category;
  let cataData = categoriesData?.categories ? categoriesData.categories : [];

  const thisFillter = await jsonSearch(ctx.query.catagory, cataData);

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

  return {
    products: prodList,
    categories: categoriesData?.categories ? categoriesData.categories : [],
    thisFillter,
  };
};

export default Shop;
