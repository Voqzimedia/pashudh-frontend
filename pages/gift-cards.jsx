import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

import { getGiftCards } from "../helper/graphql/getGiftCards";
import { currency } from "../helper/functions";

import client from "../helper/ApolloClient";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const Logo = dynamic(() => import("../components/Logo"));

export default function GiftCards({ giftCards }) {
  const pageTitle = "Gift cards";

  // console.log(giftCards);

  return (
    <PageMotion>
      <section className={`gift-card-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
          <Row className={`gift-card-container`}>
            {giftCards.map((giftCard, index) => (
              <Col md="4" key={index}>
                <Link
                  href={`/shop/checkout-giftcard?giftCard=${giftCard.slug}`}
                >
                  <a>
                    <div className="gift-card-wrapper">
                      <Row className={`flex-center align-center`}>
                        <Col md="12" className={`logo-holder`}>
                          <Logo />
                        </Col>
                        <Col md="12" className={`content`}>
                          <h4 className={`title`}>{giftCard.name}</h4>
                          <p>{giftCard.description}</p>
                        </Col>
                        <Col md="12" className={`price`}>
                          <p>{currency.format(giftCard.price)}/-</p>
                        </Col>
                      </Row>
                    </div>
                  </a>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </PageMotion>
  );
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps(context) {
  const { data: giftcardsData } = await client.query({
    query: getGiftCards,
  });

  return {
    props: {
      giftCards: giftcardsData?.giftcards ? giftcardsData.giftcards : [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
