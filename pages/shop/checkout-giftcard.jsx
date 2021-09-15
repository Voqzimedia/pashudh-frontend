import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { currency } from "../../helper/functions";
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

const CheckoutGiftCard = () => {
  const pageTitle = "Checkout";

  const [giftCard, setGiftCard] = useState(null);

  const router = useRouter();

  // console.log(router);

  useEffect(async () => {
    const {
      query: { giftCard },
    } = router;

    if (giftCard) {
      const { data: giftcardsData } = await client.query({
        query: getGiftCard,
        variables: {
          slug: giftCard,
        },
      });

      giftcardsData?.giftcards.length > 0
        ? setGiftCard(giftcardsData.giftcards[0])
        : router.push("/gift-cards");

      // console.log(giftcardsData);
    }
  }, [router]);

  const promise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

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
                <Row className={`order-item`}>
                  <Col md="6" xs="6">
                    <div className="product-details">
                      <h4 className="name">{giftCard.name}</h4>
                      <p>{giftCard.description}</p>
                      <div className="price">
                        {currency.format(giftCard.price)}
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
                    <p>{currency.format(giftCard.price)}</p>
                  </Col>
                </Row>
                <Row className="info-row">
                  <Col md={`8`} className={`info`} xs="6">
                    <h4>Total</h4>
                    <p>Including taxes : </p>
                  </Col>
                  <Col md={`4`} className={`info`} xs="6">
                    <p>{currency.format(giftCard.price)}</p>
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
