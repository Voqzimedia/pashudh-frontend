import { Container, Row, Col } from "reactstrap";
import { useEffect, useState, useContext } from "react";
import dynamic from "next/dynamic";
import { currency, imgUrlCheck } from "../../helper/functions";
import { useRouter } from "next/router";
import Head from "next/head";

import client from "../../helper/ApolloClient";
import { getGiftCard } from "../../helper/graphql/getGiftCards";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const GiftCardForm = dynamic(() =>
  import("../../components/Shop/GiftCardForm")
);

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppContext from "../../context/AppContext";

const CheckoutGiftCard = () => {
  const pageTitle = "Checkout";

  const [giftCard, setGiftCard] = useState(null);

  const { cartGiftCard, deviceWidth, deleteItemGiftCard } =
    useContext(AppContext);

  const router = useRouter();

  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  // console.log(cartGiftCard);

  return (
    <PageMotion>
      <Head>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        <meta name="robots" content="nofollow" />
      </Head>
      <section className={`checkout-section page-section`}>
        {cartGiftCard?.items?.length > 0 && (
          <Container>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>

            <div className={`checkout-body`}>
              <div className="order-list checkout-cart">
                {cartGiftCard?.items?.map((giftCard, index) => (
                  <Row className={`order-item`} key={index}>
                    <Col md="2" xs="6">
                      <div className="product-holder">
                        <div className="image-holder">
                          <picture>
                            <img
                              width="100"
                              height="100"
                              src={`${imgUrlCheck(giftCard.img.url)}`}
                              alt={giftCard.name}
                            />
                          </picture>
                        </div>
                        <div className="quantity">{giftCard.quantity}</div>
                      </div>
                    </Col>
                    <Col md="6" xs="6">
                      <div className="product-details">
                        <div className="name">
                          Pashuth {currency.format(giftCard.price)} Gift Card{" "}
                        </div>
                        <div className="price">
                          {currency.format(giftCard.price)} X{" "}
                          {giftCard.quantity}
                        </div>
                      </div>
                    </Col>
                    <Col
                      md={{ size: 4, offset: 0 }}
                      xs={{ size: 6, offset: 6 }}
                    >
                      <div className="product-details">
                        <div className="price">
                          {currency.format(giftCard.price * giftCard.quantity)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>

              <div className="checkout-info">
                <Row className="info-row">
                  <Col md={`8`} className={`info`} xs="6">
                    <p>Subtotal : </p>
                  </Col>
                  <Col md={`4`} className={`info`} xs="6">
                    <p>{currency.format(cartGiftCard.total)}</p>
                  </Col>
                </Row>
                <Row className="info-row">
                  <Col md={`8`} className={`info`} xs="6">
                    <h4>Total</h4>
                    <p>Including taxes : </p>
                  </Col>
                  <Col md={`4`} className={`info`} xs="6">
                    <p>{currency.format(cartGiftCard.total)}</p>
                  </Col>
                </Row>
              </div>

              <div className="checkout-form">
                <Elements stripe={promise}>
                  <GiftCardForm giftCard={giftCard} />
                </Elements>
              </div>
            </div>
          </Container>
        )}
      </section>
    </PageMotion>
  );
};

export default CheckoutGiftCard;
