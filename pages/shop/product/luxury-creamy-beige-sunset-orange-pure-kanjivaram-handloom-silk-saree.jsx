import React, { useContext } from "react";
import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Link from "next/link";
import dynamic from "next/dynamic";

import AppContext from "../../../context/AppContext";

import QuantityBtn from "../../../components/Shop/QuantityBtn";

import prodImg1 from "../../../assets/images/products/grid/prod1.png?webp";
import prodImg2 from "../../../assets/images/products/grid/prod2.png?webp";
import prodImg3 from "../../../assets/images/products/grid/prod3.png?webp";

import pImg1 from "../../../assets/images/products/inner/img1.png?webp";
import pImg2 from "../../../assets/images/products/inner/img2.png?webp";
import pImg3 from "../../../assets/images/products/inner/img3.png?webp";
import pImg4 from "../../../assets/images/products/inner/img4.png?webp";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"));

export default function Product() {
  const { deviceWidth } = useContext(AppContext);
  const isMobile = deviceWidth < 500;

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

  const productImgs = [pImg1, pImg2, pImg3, pImg4];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <section className={`shop-section page-section`}>
        <div className="shop-body-section">
          <Container>
            <div className="shop-breadcrumbs">
              <Breadcrumb className="breadcrumbs-holder">
                <BreadcrumbItem>
                  <Link href={`/shop`}>
                    <a>Shop</a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link href={`/shop`}>
                    <a>Yards of luxury</a>
                  </Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Black checked saree</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <Row className={`single-product-wrapper`}>
              <Col lg="6" className={`product-detail-wrapper`}>
                <article>
                  <div className="product-header">
                    <h1 className="product-name">Black Checked Saree</h1>
                    <p className="price">₹ 45,000</p>
                  </div>
                  <p className="description">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Sint excepturi assumenda voluptates nemo, perspiciatis atque
                    repellat officiis aperiam illum quisquam! Fuga nam ipsam
                    dolorem similique? Incidunt optio quod dolorem. Alias.
                  </p>
                  <ul className="product-detail-list">
                    <li className="detail-items">
                      <p className="title">
                        <b>Details</b>
                      </p>
                      <p>Length 7.5 meters, Width 47 inches</p>
                    </li>
                    <li className="detail-items">
                      <p className="title">
                        <b>Fabric</b>
                      </p>
                      <p>Handloom Cotton</p>
                    </li>
                    <li className="detail-items">
                      <p className="title">
                        <b>Blouse Piece</b>
                      </p>
                      <p>Not Provided</p>
                    </li>
                    <li className="detail-items">
                      <p className="title">
                        <b>How to wash</b>
                      </p>
                      <p>Hand wash in cold water, Medium heat iron</p>
                    </li>
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
                    <li className="detail-items">
                      <p className="title">
                        <b>Shipping</b>
                      </p>
                      <p>
                        We ship within 2-3 business days from the date of order
                      </p>
                    </li>
                  </ul>
                </article>
                <div className="shop-action">
                  <QuantityBtn />
                  <button className="btn solid-btn">Add to Cart</button>
                  <button className="btn solid-btn">Buy Now</button>
                </div>
              </Col>
              <Col lg="6" className={`product-image-wrapper`}>
                {isMobile ? (
                  <div className="product-images-slider">
                    <Slider {...sliderSettings} className={`image-slider`}>
                      {productImgs.map((images, index) => (
                        <div className="image-holder" key={index}>
                          <picture>
                            <img src={images} alt="Black Checked Saree" />
                          </picture>
                        </div>
                      ))}
                    </Slider>
                  </div>
                ) : (
                  <div className="product-images-holder">
                    {productImgs.map((images, index) => (
                      <div className="image-holder" key={index}>
                        <picture>
                          <img src={images} alt="Black Checked Saree" />
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

                          <img src={product.img} alt={product.name} />
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
    </>
  );
}
