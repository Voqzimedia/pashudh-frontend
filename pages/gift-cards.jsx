import React from "react";
import { Container, Row, Col } from "reactstrap";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const Logo = dynamic(() => import("../components/Logo"));

export default function GiftCards() {
  const pageTitle = "Gift cards";

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
            <Col md="4">
              <div className="gift-card-wrapper">
                <Row className={`flex-center align-center`}>
                  <Col md="12" className={`logo-holder`}>
                    <Logo />
                  </Col>
                  <Col md="12" className={`content`}>
                    <h4 className={`title`}>Gift Card</h4>
                    <p>Gift the best silk experience!</p>
                  </Col>
                  <Col md="12" className={`price`}>
                    <p>₹ 20,000/-</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="4">
              <div className="gift-card-wrapper">
                <Row className={`flex-center align-center`}>
                  <Col md="12" className={`logo-holder`}>
                    <Logo />
                  </Col>
                  <Col md="12" className={`content`}>
                    <h4 className={`title`}>Gift Card</h4>
                    <p>Gift the best silk experience!</p>
                  </Col>
                  <Col md="12" className={`price`}>
                    <p>₹ 20,000/-</p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md="4">
              <div className="gift-card-wrapper">
                <Row className={`flex-center align-center`}>
                  <Col md="12" className={`logo-holder`}>
                    <Logo />
                  </Col>
                  <Col md="12" className={`content`}>
                    <h4 className={`title`}>Gift Card</h4>
                    <p>Gift the best silk experience!</p>
                  </Col>
                  <Col md="12" className={`price`}>
                    <p>₹ 20,000/-</p>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </PageMotion>
  );
}
