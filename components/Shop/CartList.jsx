import React from "react";
import { Row, Col } from "reactstrap";
import QuantityBtn from "./QuantityBtn";
import { icons } from "feather-icons";

// images

import productImg from "../../assets/images/products/prod1.jpg?webp";

export default function CartList() {
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
            <button
              className={`close-btn btn`}
              dangerouslySetInnerHTML={{ __html: icons.x.toSvg() }}
            ></button>
          </div>
        </Col>
        <Col xs="8">
          <div className="product-details">
            <div className="name">
              Luxury Creamy Beige – Sunset Orange Pure Kanjivaram Handloom Silk
              Saree
            </div>
            <div className="price">₹22,300</div>
            <QuantityBtn />
          </div>
        </Col>
        <Col xs="12"></Col>
      </Row>

      <div className="checkout-action">
        <button className="btn solid-btn">Checkout | ₹ 1,35,000.00</button>
      </div>
    </div>
  );
}
