import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { isEmpty } from "lodash";
import { useQuery } from "@apollo/client";
// import Sticky from "react-sticky-el";

import { currency, camelToNormal } from "../../../helper/functions";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() =>
  import("../../../components/Motion/PageMotion")
);

const Accordion = dynamic(() =>
  import("../../../components/utils/accordion").then((mod) => mod.Accordion)
);
const AccordionItem = dynamic(() =>
  import("../../../components/utils/accordion").then((mod) => mod.AccordionItem)
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
  AddToCart,
  AddWishlist,
} from "../../../components/Shop/CartActions";
import BackBtn from "../../../components/utils/BackBtn";

const RelatedItems = dynamic(() =>
  import("../../../components/Shop/RelatedItems")
);
const ProductShowcase = dynamic(() =>
  import("../../../components/Shop/ProductShowcase")
);

const Product = ({ product, category }) => {
  const { deviceWidth, cart } = useContext(AppContext);
  const isMobile = deviceWidth < 500;

  const [relatedItems, setRelatedItems] = useState(null);
  const [thisProduct, setProduct] = useState(product);
  const [isFooterView, setIsFooterView] = useState(false);

  const router = useRouter();
  const productDetails = [];

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
    // category.products.map((thisProduct) =>
    //   thisProduct.id != product.id ? productList.push(thisProduct) : null
    // );

    return productList;
  };

  const isInCart = (product) => {
    return !!cart.items.find((item) => item.id === product.id);
  };

  useEffect(() => {
    refetchProduct();
    setRelatedItems(() => getrelatedItems());
  }, [category]);

  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    return (
      top < window.pageYOffset + window.innerHeight &&
      left < window.pageXOffset + window.innerWidth &&
      top + height > window.pageYOffset &&
      left + width > window.pageXOffset
    );
  }

  // useEffect(() => {
  //   const footer = document.querySelector(".related-items");

  //   const isEnd = () => {
  //     setIsFooterView(() => elementInViewport(footer));
  //   };

  //   if (!isMobile) {
  //     document.addEventListener("scroll", isEnd, {
  //       passive: true,
  //     });
  //   }

  //   return () => {
  //     document.removeEventListener("scroll", isEnd);
  //   };
  // }, [isMobile]);

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
      <section className={`shop-section page-section single-shop-section`}>
        <div className="shop-body-section">
          <Container className={`${isMobile ? "no-padding" : ""}`}>
            {!isMobile && (
              <div className="shop-breadcrumbs">
                <div className="go-back">
                  <BackBtn> Go Back </BackBtn>
                </div>

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
            )}

            <Row className={`single-product-wrapper`}>
              <Col lg="6" className={`product-detail-wrapper`}>
                {isMobile ? (
                  <>
                    <article>
                      <div className="product-header">
                        <div className="header-top">
                          <h1 className="product-name">{thisProduct?.name}</h1>
                          <p className="price">
                            {currency.format(thisProduct?.price)}
                          </p>
                        </div>

                        <div className="header-bottom">
                          <p>SKU : {thisProduct?.StockDetails?.SKU}</p>
                          {isMobile && thisProduct.isSoldOut ? (
                            <button disabled={true}>Sold Out</button>
                          ) : (
                            <AddToCart
                              product={{ ...thisProduct }}
                              className={`${
                                isInCart(thisProduct) ? "" : "no-left-margin"
                              } isMini`}
                              isMini={true}
                            />
                          )}
                        </div>
                      </div>
                      <p className="description">{thisProduct.content}</p>
                      {isMobile ? (
                        <Accordion atomic={true} className={`product-drop`}>
                          <AccordionItem title={`Specifications`}>
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
                                  This is a handcrafted product. Small
                                  imperfections add to the unique charm and
                                  beauty of these handwoven sarees.
                                </p>
                              </li>
                            </ul>
                          </AccordionItem>
                        </Accordion>
                      ) : (
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
                              This is a handcrafted product. Small imperfections
                              add to the unique charm and beauty of these
                              handwoven sarees.
                            </p>
                          </li>
                        </ul>
                      )}
                    </article>
                    {thisProduct.isSoldOut ? (
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
                      <>
                        <div className="quantity-holder">
                          {isInCart(thisProduct) ? (
                            <QuantityBtn product={{ ...thisProduct }} />
                          ) : null}
                        </div>
                        <div className="shop-action">
                          <AddToCart
                            product={{ ...thisProduct }}
                            className={`${
                              isInCart(thisProduct) ? "" : "no-left-margin"
                            }`}
                          />
                          <AddWishlist product={{ ...thisProduct }} />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <article>
                      <div className="product-header">
                        <h1 className="product-name">{thisProduct.name}</h1>
                        <p className="price">
                          {currency.format(thisProduct.price)}
                        </p>
                        <p>SKU : {thisProduct?.StockDetails?.SKU}</p>
                      </div>
                      <p className="description">{thisProduct.content}</p>
                      {isMobile ? (
                        <Accordion atomic={true} className={`product-drop`}>
                          <AccordionItem title={`Product Details`}>
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
                                  This is a handcrafted product. Small
                                  imperfections add to the unique charm and
                                  beauty of these handwoven sarees.
                                </p>
                              </li>
                            </ul>
                          </AccordionItem>
                        </Accordion>
                      ) : (
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
                              This is a handcrafted product. Small imperfections
                              add to the unique charm and beauty of these
                              handwoven sarees.
                            </p>
                          </li>
                        </ul>
                      )}
                    </article>
                    {thisProduct.isSoldOut ? (
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
                      <>
                        <div className="quantity-holder">
                          {isInCart(thisProduct) ? (
                            <QuantityBtn product={{ ...thisProduct }} />
                          ) : null}
                        </div>
                        <div className="shop-action">
                          <AddToCart
                            product={{ ...thisProduct }}
                            className="product-btn"
                          />
                          <AddWishlist
                            product={{ ...thisProduct }}
                            className="product-btn"
                          />
                        </div>
                      </>
                    )}
                  </>
                )}
              </Col>
              <Col lg="6" className={`product-image-wrapper`}>
                <ProductShowcase
                  isMobile={isMobile}
                  thisProduct={thisProduct}
                />
              </Col>
            </Row>
          </Container>
          <div className="related-items">
            {relatedItems && (
              <RelatedItems relatedItems={relatedItems} category={category} />
            )}
          </div>
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
    params: { slug },
  } = context;

  const { data: productData } = await client.query({
    query: getProduct,
    variables: {
      slug: slug,
    },
  });

  const { data: categoryData } = await client.query({
    query: getCategory,
    variables: {
      slug: productData?.products?.[0].categories?.[0]?.slug,
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

  const pathsData = [];

  data?.products &&
    data?.products.map((product) => {
      if (!isEmpty(product?.slug)) {
        pathsData.push({ params: { slug: product?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: false,
  };
}

export default Product;
