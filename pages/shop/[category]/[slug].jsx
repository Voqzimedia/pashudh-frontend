import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";
import { isEmpty } from "lodash";
import { useQuery } from "@apollo/client";

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

  const [thisProduct, setProduct] = useState(product);

  const isInCart = (product) => {
    return !!cart.items.find((item) => item.id === product.id);
  };

  // console.log({ product, category });

  useEffect(() => {
    refetchProduct();
  }, []);

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
  ];

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

      // console.log({ productData, category });
    },
  });

  const productDetails = [];

  for (const [key, value] of Object.entries(thisProduct.ProductDetails)) {
    key != "__typename"
      ? productDetails.push({
          name: camelToNormal(key),
          value,
        })
      : null;
  }

  let actionProd = { ...thisProduct };

  // console.log(productDetails);

  return (
    <PageMotion>
      <section className={`shop-section page-section`}>
        <div className="shop-body-section">
          <Container>
            <div className="shop-breadcrumbs">
              <Breadcrumb className="breadcrumbs-holder">
                <BreadcrumbItem>
                  <Link href={`/shop/${category.slug}`}>
                    <a>Shop</a>
                  </Link>
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
                {prodList.map((product, index) => (
                  <Col md="4" key={index}>
                    <Link
                      href={`/shop/product/luxury-creamy-beige-sunset-orange-pure-kanjivaram-handloom-silk-saree`}
                    >
                      <a className="product-item">
                        <div className="image-holder">
                          {product.isSoldOut && (
                            <div className="sold-out">
                              <p>Sold Out</p>
                            </div>
                          )}

                          <img
                            width="100"
                            height="100"
                            src={product.img}
                            alt={product.name}
                          />
                        </div>
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
