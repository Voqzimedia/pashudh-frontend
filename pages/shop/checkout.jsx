import { Container, Row, Col } from "reactstrap";
import AppContext from "../../context/AppContext";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { currency } from "../../helper/functions";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const CheckoutForm = dynamic(() =>
  import("../../components/Shop/CheckoutForm")
);

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function Checkout() {
  const pageTitle = "Checkout";
  const { cart, clearCart } = useContext(AppContext);

  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <PageMotion>
      <section className={`checkout-section page-section`}>
        <Container>
          <h1 className="page-title" data-title={pageTitle}>
            {pageTitle}
          </h1>

          <div className={`checkout-body`}>
            {cart.items.length > 0 ? (
              <>
                <div className="order-list checkout-cart">
                  {cart.items.map((product, index) => {
                    return (
                      <Row className={`order-item`} key={index}>
                        <Col md="2" xs="6">
                          <div className="product-holder">
                            <div className="image-holder">
                              <picture>
                                <img
                                  width="100"
                                  height="100"
                                  src={`${product.image.url}`}
                                  alt={product.name}
                                />
                              </picture>
                            </div>
                            <div className="quantity">{product.quantity}</div>
                          </div>
                        </Col>
                        <Col md="6" xs="6">
                          <div className="product-details">
                            <div className="name">{product.name}</div>
                            <div className="price">
                              {currency.format(product.price)} X{" "}
                              {product.quantity}
                            </div>
                          </div>
                        </Col>
                        <Col
                          md={{ size: 4, offset: 0 }}
                          xs={{ size: 6, offset: 6 }}
                        >
                          <div className="product-details">
                            <div className="price">
                              {currency.format(
                                product.price * product.quantity
                              )}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
                </div>

                <div className="discount-panel">
                  <Row className="discount-input form-body">
                    <Col md="8" className={`input-Holder`}>
                      <input type="text" placeholder={`Discount code`} />
                    </Col>

                    <Col md="4" className={`input-Holder`}>
                      <button className={`submit-btn btn`}>Apply</button>
                    </Col>
                  </Row>
                </div>

                <div className="checkout-info">
                  <Row className="info-row">
                    <Col md={`8`} className={`info`} xs="6">
                      <p>Subtotal : </p>
                    </Col>
                    <Col md={`4`} className={`info`} xs="6">
                      <p>{currency.format(cart.total)}</p>
                    </Col>
                  </Row>
                  <Row className="info-row">
                    <Col md={`8`} className={`info`} xs="6">
                      <h4>Total</h4>
                      <p>Including taxes : </p>
                    </Col>
                    <Col md={`4`} className={`info`} xs="6">
                      <p>{currency.format(cart.total)}</p>
                    </Col>
                  </Row>
                </div>
              </>
            ) : null}

            <div className="checkout-form">
              <Elements stripe={promise}>
                <CheckoutForm cart={cart} clearCart={clearCart} />
              </Elements>
            </div>
          </div>
        </Container>
      </section>
    </PageMotion>
  );
}
