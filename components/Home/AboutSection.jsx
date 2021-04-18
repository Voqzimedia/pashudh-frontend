import React from "react";

import { Container, Row, Col } from "reactstrap";
import Logo from "../Logo";
import Social from "../Social";

export default function AboutSection() {
  return (
    <section className={`about-section page-section`}>
      <Container>
        <Row className={`flex-center`}>
          <Col lg="10">
            <div className={`about-wraper`}>
              <Logo />
              <center>
                <p className="content">
                  Woven by hand, designed from heart, our authentic, pure silk
                  sarees are treasured for their contemporary appeal. Browse
                  through our creations and discover masterpieces that embrace
                  tradition and trends with equal zeal. Allow us to add a silken
                  touch to the special moments of your life.
                </p>
              </center>
              <hr className={`small gradient`} />
              <div className="social-holder">
                <Social />
                <p>follow us</p>
              </div>
              <div className="action-holder">
                <a href="#" className="shop-now btn">
                  Shop Now
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
