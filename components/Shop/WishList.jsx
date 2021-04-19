import React from "react";
import { Row, Col } from "reactstrap";
import QuantityBtn from "./QuantityBtn";
import CloseIcon from "../../images/icons/x.svg?include";

// images

import productImg from "../../images/products/prod1.jpg?webp";

export default function WishList() {
  return (
    <div className="order-list">
      <Row className={`order-item`}>
        <Col xs="4">
          <div className="product-holder">
            <div className="image-holder">
              <picture>
                <img src={productImg} alt="Product" />
              </picture>
            </div>
            {/* <div className="quantity">1</div> */}
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
            {/* <QuantityBtn /> */}
          </div>
        </Col>
        <Col xs="12"></Col>
      </Row>
    </div>
  );
}
