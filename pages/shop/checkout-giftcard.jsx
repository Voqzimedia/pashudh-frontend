import { Container, Row, Col } from "reactstrap";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { currency } from "../../helper/functions";
import { useRouter } from "next/router";

import client from "../../helper/ApolloClient";
import { getGiftCard } from "../../helper/graphql/getGiftCards";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));
const CheckoutForm = dynamic(() =>
  import("../../components/Shop/CheckoutForm")
);

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutGiftCard = ({ giftCard }) => {
  const pageTitle = "Gift Card Purchasing";
  const router = useRouter();

  useEffect(() => {
    !giftCard ? router.push(`/gift-cards`) : null;
  }, [giftCard]);

  return (
    <PageMotion>
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
                <CheckoutForm />
              </div>
            </div>
          </Container>
        )}
      </section>
    </PageMotion>
  );
};

CheckoutGiftCard.getInitialProps = async (context) => {
  const {
    query: { giftCard },
  } = context;

  if (giftCard) {
    const { data: giftcardsData } = await client.query({
      query: getGiftCard,
      variables: {
        slug: giftCard,
      },
    });

    return {
      giftCard:
        giftcardsData?.giftcards.length > 0 ? giftcardsData.giftcards[0] : null,
    };
  } else {
    return {
      giftCard: null,
    };
  }
};

export default CheckoutGiftCard;
