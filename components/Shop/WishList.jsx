import React from "react";
import { Row, Col } from "reactstrap";
import CloseIcon from "../../assets/images/icons/x.svg?include";

// images

import productImg from "../../assets/images/products/prod1.jpg?webp";

export default function WishList() {
  return (
    <div className="order-list">
      <Row className={`order-item`}>
        <Col xs="4">
          <div className="product-holder">
            <div className="image-holder">
              <picture>
                <img width="100" height="100" src={productImg} alt="Product" />
              </picture>
            </div>

            <button className={`close-btn btn`}>
              <div dangerouslySetInnerHTML={{ __html: CloseIcon }} />
            </button>
          </div>
        </Col>
        <Col xs="8">
          <div className="product-details">
            <div className="name">
              Luxury Creamy Beige – Sunset Orange Pure Kanjivaram Handloom Silk
              Saree
            </div>
            <div className="price">₹22,300</div>
          </div>
        </Col>
        <Col xs="12"></Col>
      </Row>
    </div>
  );
}
