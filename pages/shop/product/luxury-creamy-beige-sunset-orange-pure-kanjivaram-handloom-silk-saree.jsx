import React from "react";

import { Container, Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";

import Link from "next/link";

import prodImg1 from "../../../assets/images/products/grid/prod1.png?webp";
import prodImg2 from "../../../assets/images/products/grid/prod2.png?webp";
import prodImg3 from "../../../assets/images/products/grid/prod3.png?webp";

export default function Product() {
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

  return (
    <>
      <section className={`shop-section page-section`}>
        <div className="shop-body-section">
          <Container>
            <div className="shop-breadcrumbs">
              <Breadcrumb className="breadcrumbs-holder">
                <BreadcrumbItem>
                  <a href="#">Shop</a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a href="#">Yards of luxury</a>
                </BreadcrumbItem>
                <BreadcrumbItem active>Black checked saree</BreadcrumbItem>
              </Breadcrumb>
            </div>

            <Row className={`single-product-wrapper`}>
              <Col lg="6" className={`product-detail-wrapper`}></Col>
              <Col lg="6" className={`product-image-wrapper`}></Col>
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
