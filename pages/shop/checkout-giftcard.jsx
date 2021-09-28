import { Container, Row, Col } from "reactstrap";
import { useEffect, useState, useContext } from "react";
import dynamic from "next/dynamic";
import { currency, imgUrlCheck } from "../../helper/functions";
import { useRouter } from "next/router";
import Head from "next/head";

import client from "../../helper/ApolloClient";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const GiftCardForm = dynamic(() =>
  import("../../components/Shop/GiftCardForm")
);

import giftCardImg from "../../assets/images/giftCard.png";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AppContext from "../../context/AppContext";

const CheckoutGiftCard = () => {
  const pageTitle = "Checkout";

  // const [giftCard, setGiftCard] = useState("");

  const { deviceWidth, giftCard } = useContext(AppContext);

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
        {giftCard && (
          <Container>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>

            <div className={`checkout-body`}>
              <div className="order-list checkout-cart">
                <Row>
                  <Col md="6">
                    <div className="gift-card-img">
                      <div className="image-holder">
                        <picture>
                          <img src={giftCardImg} alt="gift" />
                        </picture>
                      </div>
                      <div className="price-holder">
                        {giftCard?.total > 0
                          ? currency.format(giftCard?.total)
                          : ""}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="checkout-info">
                <Row className="info-row">
                  <Col md={`8`} className={`info`} xs="6">
                    <p>Subtotal : </p>
                  </Col>
                  <Col md={`4`} className={`info`} xs="6">
                    <p>{currency.format(giftCard.total)}</p>
                  </Col>
                </Row>
                <Row className="info-row">
                  <Col md={`8`} className={`info`} xs="6">
                    <h4>Total</h4>
                    <p>Including taxes : </p>
                  </Col>
                  <Col md={`4`} className={`info`} xs="6">
                    <p>{currency.format(giftCard.total)}</p>
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
