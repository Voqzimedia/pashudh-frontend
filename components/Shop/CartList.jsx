import React, { useContext } from "react";
import { Row, Col } from "reactstrap";
import { QuantityBtn } from "./CartActions";
import { icons } from "feather-icons";
import AppContext from "../../context/AppContext";

import { currency } from "../../helper/functions";

// images

import productImg from "../../assets/images/products/prod1.jpg?webp";

export default function CartList() {
  const { cart, setCartOpen } = useContext(AppContext);

  console.log(cart);

  return (
    <div className="order-list">
      {cart.items.map((product, index) => (
        <Row className={`order-item`} key={index}>
          <Col xs="4">
            <div className="product-holder">
              <div className="image-holder">
                <picture>
                  <img
                    width="100"
                    height="100"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${product.image.url}`}
                    alt={product.name}
                  />
                </picture>
              </div>
              <div className="quantity">{product.quantity}</div>
              <button
                className={`close-btn btn`}
                dangerouslySetInnerHTML={{ __html: icons.x.toSvg() }}
              ></button>
            </div>
          </Col>
          <Col xs="8">
            <div className="product-details">
              <div className="name">{product.name}</div>
              <div className="price">
                {currency.format(product.price)} X {product.quantity} ={" "}
                {currency.format(product.price * product.quantity)}
              </div>
              <QuantityBtn product={product} />
            </div>
          </Col>
          <Col xs="12"></Col>
        </Row>
      ))}

      <div className="checkout-action">
        {cart.total > 0 ? (
          <button className="btn solid-btn">
            Checkout | {currency.format(cart.total)}
          </button>
        ) : (
          <button className="btn solid-btn" onClick={() => setCartOpen(false)}>
            Continue Shoping
          </button>
        )}
      </div>
    </div>
  );
}
