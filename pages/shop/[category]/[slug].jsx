import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";

import { currency, camelToNormal } from "../../../helper/functions";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() =>
  import("../../../components/Motion/PageMotion")
);

import {
  getProduct,
  getProductSlug,
} from "../../../helper/graphql/getProducts";

import {
  getCategory,
  getCategoriesPath,
} from "../../../helper/graphql/getCategories";

import client from "../../../helper/ApolloClient";

import AppContext from "../../../context/AppContext";

import {
  QuantityBtn,
  BuyNow,
  AddToCart,
  AddWishlist,
} from "../../../components/Shop/CartActions";

import prodImg1 from "../../../assets/images/products/grid/prod1.png?webp";
import prodImg2 from "../../../assets/images/products/grid/prod2.png?webp";
import prodImg3 from "../../../assets/images/products/grid/prod3.png?webp";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"));

const Product = ({ product, category }) => {
  const { deviceWidth, cart } = useContext(AppContext);
  const isMobile = deviceWidth < 500;

  const [relatedItems, setRelatedItems] = useState(category.products);
  const [thisProduct, setProduct] = useState(product);

  const router = useRouter();
  const productDetails = [];

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  // Get Product Data.
  const {
    loading,
    error,
    data: productData,
    refetch: refetchProduct,
  } = useQuery(getProduct, {
    notifyOnNetworkStatusChange: true,
    variables: {
      slug: product.slug,
    },
    onCompleted: () => {
      setProduct(() =>
        productData?.products.length > 0 ? productData.products[0] : []
      );
    },
  });

  const getrelatedItems = () => {
    const productList = [];
    category.products.map((thisProduct) =>
      thisProduct.id != product.id ? productList.push(thisProduct) : null
    );

    return productList;
  };

  const isInCart = (product) => {
    return !!cart.items.find((item) => item.id === product.id);
  };

  useEffect(() => {
    refetchProduct();
    setRelatedItems(() => getrelatedItems());
  }, [category]);

  for (const [key, value] of Object.entries(thisProduct.ProductDetails)) {
    key != "__typename"
      ? productDetails.push({
          name: camelToNormal(key),
          value,
        })
      : null;
  }

  return (
    <PageMotion>
      <section className={`shop-section page-section`}>
        <div className="shop-body-section">
          <Container>
            <div className="shop-breadcrumbs">
              <Breadcrumb className="breadcrumbs-holder">
                <BreadcrumbItem>
                  <a onClick={() => router.back()}>Shop</a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link href={`/shop/${category.slug}`}>
                    <a>{category.title}</a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>{thisProduct.name}</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <Row className={`single-product-wrapper`}>
              <Col lg="6" className={`product-detail-wrapper`}>
                <div>
                  <article>
                    <div className="product-header">
                      <h1 className="product-name">{thisProduct.name}</h1>
                      <p className="price">
                        {currency.format(thisProduct.price)}
                      </p>
                    </div>
                    <p className="description">{thisProduct.content}</p>
                    <ul className="product-detail-list">
                      {productDetails.map((detail, index) => (
                        <li className="detail-items" key={index}>
                          <p className="title">
                            <b>{detail.name}</b>
                          </p>
                          <p>{detail.value}</p>
                        </li>
                      ))}

                      <li className="detail-items">
                        <p className="title">
                          <b>Note</b>
                        </p>
                        <p>
                          This is a handcrafted product. Small imperfections add
                          to the unique charm and beauty of these handwoven
                          sarees.
                        </p>
                      </li>
                    </ul>
                  </article>
                  {thisProduct.StockDetails.isSoldOut ? (
                    <>
                      <div className="shop-action ">
                        <button
                          className="btn solid-btn no-left-margin"
                          disabled
                        >
                          SoldOut
                        </button>
                        <AddWishlist product={{ ...thisProduct }} />
                      </div>
                    </>
                  ) : (
                    <div className="shop-action">
                      {isInCart(thisProduct) ? (
                        <QuantityBtn product={{ ...thisProduct }} />
                      ) : null}

                      <AddToCart
                        product={{ ...thisProduct }}
                        className={`${
                          isInCart(thisProduct) ? "" : "no-left-margin"
                        }`}
                      />
                      <AddWishlist product={{ ...thisProduct }} />
                    </div>
                  )}
                </div>
              </Col>
              <Col lg="6" className={`product-image-wrapper`}>
                {isMobile ? (
                  <div className="product-images-slider">
                    <Slider {...sliderSettings} className={`image-slider`}>
                      {thisProduct.GalleryImgs.map((image, index) => (
                        <div className="image-holder" key={index}>
                          <picture>
                            <img
                              width="100"
                              height="100"
                              src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                              alt="Black Checked Saree"
                            />
                          </picture>
                        </div>
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <div className="product-images-holder">
                    {thisProduct.GalleryImgs.map((image, index) => (
                      <div className="image-holder" key={index}>
                        <picture>
                          <img
                            width="100"
                            height="100"
                            src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
                            alt="Black Checked Saree"
                          />
                        </picture>
                      </div>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          </Container>

          <Container>
            <center>
              <h2 className={`grid-title`}>You May Also Like</h2>
            </center>
            <div className="product-grid">
              <Row>
                {relatedItems.map(
                  (product, index) =>
                    index < 3 && (
                      <Col md="4" key={index}>
                        <motion.div
                          whileHover="whileHover"
                          animate="animate"
                          initial="initial"
                          variants={productImgMotion}
                          transition="transition"
                          key={index}
                        >
                          <Link href={`/shop/${category.slug}/${product.slug}`}>
                            <a className="product-item">
                              <motion.div className="image-holder">
                                {product.StockDetails.isSoldOut && (
                                  <motion.div className="sold-out">
                                    <p>Sold Out</p>
                                  </motion.div>
                                )}

                                <img
                                  width="100"
                                  height="100"
                                  src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                                  alt={product.name}
                                />
                              </motion.div>
                              <Row className="product-content-holder">
                                <Col xs="9" className="no-pad">
                                  <p className="title">{product.name}</p>
                                </Col>
                                <Col xs="3" className="no-pad">
                                  <p className="price">
                                    {currency.format(product.price)}
                                  </p>
                                </Col>
                              </Row>
                            </a>
                          </Link>
                        </motion.div>
                      </Col>
                    )
                )}
              </Row>
            </div>
          </Container>
        </div>
      </section>
    </PageMotion>
  );
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
  const {
    params: { slug, category },
  } = context;

  const { data: categoryData } = await client.query({
    query: getCategory,
    variables: {
      slug: category,
    },
  });

  const { data: productData } = await client.query({
    query: getProduct,
    variables: {
      slug: slug,
    },
  });

  return {
    props: {
      product: productData?.products.length > 0 ? productData.products[0] : [],
      category:
        categoryData?.categories.length > 0 ? categoryData.categories[0] : [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: getProductSlug,
  });

  const { data: cataData } = await client.query({
    query: getCategoriesPath,
  });

  const pathsData = [];

  cataData?.categories &&
    cataData?.categories.map((cate) => {
      if (!isEmpty(cate?.slug)) {
        data?.products &&
          data?.products.map((product) => {
            if (!isEmpty(product?.slug)) {
              pathsData.push({
                params: { slug: product?.slug, category: cate?.slug },
              });
            }
          });
      }
    });

  return {
    paths: pathsData,
    fallback: false,
  };
}

export default Product;
