import React from "react";
import dynamic from "next/dynamic";

import Link from "next/link";

import { Container, Row, Col } from "reactstrap";

const Logo = dynamic(() => import("../Logo"));
const Social = dynamic(() => import("../Social"));

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
                <Link href={`/shop`}>
                  <a className="shop-now btn">Shop Now</a>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
