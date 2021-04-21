import React from "react";
import { Container, Row, Col, DropdownMenu } from "reactstrap";

import Link from "next/link";

import prodImg1 from "../../assets/images/products/grid/prod1.png?webp";
import prodImg2 from "../../assets/images/products/grid/prod2.png?webp";
import prodImg3 from "../../assets/images/products/grid/prod3.png?webp";

export default function Shop() {
  const pageTitle = "Shop";

  var cataList = [
    {
      title: "Yards of Couture",
      slug: "youthful-yellows",
    },
    {
      title: "Yards of Eminence",
      slug: "youthful-yellows",
    },
    {
      title: "Yards of Luxury",
      slug: "youthful-yellows",
    },
    {
      title: "Yards of Elegance",
      slug: "youthful-yellows",
    },
    {
      title: "The Shri Collection ",
      subTitle: "Men's Silk Dhotis",
      slug: "youthful-yellows",
    },
    {
      title: "Whole Six Yards ",
      subTitle: "All Products",
      slug: "youthful-yellows",
    },
  ];

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

  return (
    <>
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
                <div xs="2" key={index} className={`filter-item`}>
                  <a href="#">
                    <p className="title">{cata.title}</p>
                    {cata.subTitle && (
                      <p className="sub-title">{cata.subTitle}</p>
                    )}
                  </a>
                </div>
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
              <a className={`nav-link dropdown-toggle menu-link has-subMenu`}>
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
              </a>
              <a className={`nav-link dropdown-toggle menu-link has-subMenu`}>
                Filter
                <DropdownMenu className={`subMenu`}>
                  <a href="#" className="dropdown-item">
                    Color
                  </a>
                  <a href="#" className="dropdown-item">
                    Class
                  </a>
                </DropdownMenu>
              </a>
            </div>

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
