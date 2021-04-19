import React from "react";
import { Row, Col } from "reactstrap";

// images

import productImg from "../../images/products/prod1.jpg?webp";

export default function OrderList() {
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
            <div className="quantity">1</div>
          </div>
        </Col>
        <Col xs="8"></Col>
        <Col xs="12"></Col>
      </Row>
    </div>
  );
}
