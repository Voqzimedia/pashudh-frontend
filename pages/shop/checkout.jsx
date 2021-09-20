import { Container, Row, Col, Alert } from "reactstrap";
import AppContext from "../../context/AppContext";
import React, { useContext, useState } from "react";
import dynamic from "next/dynamic";
import {
  buyBtnDataFormater,
  currency,
  imgUrlCheck,
} from "../../helper/functions";
import Head from "next/head";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const BuyButton = dynamic(() => import("../../components/Shop/BuyButton"));
const CheckoutForm = dynamic(() =>
  import("../../components/Shop/CheckoutForm")
);

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { validatePromo } from "../../helper/auth";

export default function Checkout() {
  const pageTitle = "Checkout";
  const { cart, clearCart, user } = useContext(AppContext);

  const [discount, setDiscount] = useState(null);
  const [useRedeemPoints, setRedeemPoints] = useState(false);
  const [discountField, setDiscountField] = useState(null);
  const [error, setError] = useState(false);

  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const validateDiscountCode = () => {
    validatePromo(discountField)
      .then((res) => {
        // console.log(res.data);
        setError(!res?.data?.isValid);
        res?.data?.isValid ? setDiscount(res?.data) : null;
      })
      .catch((e) => {
        console.log(e);
        setError(true);
      });
  };

  // console.log(useRedeemPoints);

  return (
    <PageMotion>
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <meta name="robots" content="nofollow" />
      </Head>
      <section className={`checkout-section page-section`}>
        <Container>
          <h1 className="page-title" data-title={pageTitle}>
            {pageTitle}
          </h1>
          <Elements stripe={promise}>
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
                                    src={`${imgUrlCheck(product.image.url)}`}
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
                      {discount ? (
                        <>
                          <Col md="8" className={`input-Holder`}>
                            <div className="product-details">
                              <h5>
                                Promo Code applied: ({discount.giftcard}){" "}
                              </h5>
                              <div className="coupon">
                                <span className="code  ">
                                  <p>{discount.promoCode}</p>
                                </span>
                              </div>
                            </div>
                          </Col>
                          <Col md="4" className={`input-Holder`}>
                            <button
                              className={`submit-btn btn`}
                              onClick={() => setDiscount(null)}
                            >
                              Clear
                            </button>
                          </Col>
                        </>
                      ) : (
                        <>
                          <Col md="8" className={`input-Holder`}>
                            <input
                              type="text"
                              placeholder={`Discount code`}
                              onChange={(e) =>
                                setDiscountField(e?.target?.value)
                              }
                            />
                            <br />
                            <Alert
                              color="danger"
                              isOpen={error}
                              toggle={() => setError(false)}
                              style={{ margin: "1rem 0" }}
                            >
                              <p style={{ margin: "5px" }}>
                                Invalide Promo Code
                              </p>
                            </Alert>
                          </Col>

                          <Col md="4" className={`input-Holder`}>
                            <button
                              className={`submit-btn btn`}
                              onClick={validateDiscountCode}
                            >
                              Apply
                            </button>
                          </Col>
                        </>
                      )}
                    </Row>
                  </div>
                  {user && (
                    <div className="checkout-info form-body">
                      <Row className="info-row">
                        <Col md={`8`} className={`info`} xs="6">
                          <p>Your Redeem Points : </p>
                        </Col>
                        <Col md={`4`} className={`info`} xs="6">
                          <p>{user.redeemPoints} Pts</p>
                        </Col>
                        <Col lg="8" className="input-Holder lable-on">
                          <label
                            htmlFor="redeem"
                            className={`flex-align-center`}
                          >
                            <input
                              type="checkbox"
                              name={`redeem`}
                              onChange={(event) =>
                                setRedeemPoints(event.target.checked)
                              }
                              checked={useRedeemPoints}
                              id={`redeem`}
                            />{" "}
                            Use my Redeem Points
                          </label>
                        </Col>
                      </Row>
                    </div>
                  )}

                  <div className="checkout-info">
                    <Row className="info-row">
                      <Col md={`8`} className={`info`} xs="6">
                        <p>Subtotal : </p>
                      </Col>
                      <Col md={`4`} className={`info`} xs="6">
                        <p>{currency.format(cart.total)}</p>
                      </Col>
                    </Row>
                    {discount && (
                      <Row className="info-row">
                        <Col md={`8`} className={`info`} xs="6">
                          <p>Discount : </p>
                        </Col>
                        <Col md={`4`} className={`info`} xs="6">
                          <p>- {currency.format(discount.price)}</p>
                        </Col>
                      </Row>
                    )}
                    {useRedeemPoints && user && (
                      <Row className="info-row">
                        <Col md={`8`} className={`info`} xs="6">
                          <p>{user.redeemPoints} Pts Used : </p>
                        </Col>
                        <Col md={`4`} className={`info`} xs="6">
                          <p>- {currency.format(user.redeemPoints / 10)}</p>
                        </Col>
                      </Row>
                    )}

                    <Row className="info-row">
                      <Col md={`8`} className={`info`} xs="6">
                        <h4>Total</h4>
                        <p>Including taxes : </p>
                      </Col>
                      <Col md={`4`} className={`info`} xs="6">
                        {discount && useRedeemPoints && user ? (
                          <p>
                            {currency.format(
                              cart.total -
                                (discount.price + user.redeemPoints / 10)
                            )}
                          </p>
                        ) : discount ? (
                          <p>{currency.format(cart.total - discount.price)}</p>
                        ) : useRedeemPoints && user ? (
                          <p>
                            {currency.format(
                              cart.total - user.redeemPoints / 10
                            )}
                          </p>
                        ) : (
                          <p>{currency.format(cart.total)}</p>
                        )}
                      </Col>
                    </Row>
                  </div>
                </>
              ) : null}

              {/* <BuyButton product={buyBtnDataFormater(cart)} /> */}

              <div className="checkout-form">
                <CheckoutForm
                  cart={cart}
                  clearCart={clearCart}
                  discount={discount}
                  useRedeemPoints={useRedeemPoints}
                />
              </div>
            </div>
          </Elements>
        </Container>
      </section>
    </PageMotion>
  );
}
