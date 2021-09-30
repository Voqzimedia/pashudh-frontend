import React, { useContext } from "react";
import Link from "next/link";
import { Row, Col, Container } from "reactstrap";

import AppContext from "../../context/AppContext";

import weavingBg from "../../assets/images/weaving.png?webp";

export default function ImpactSection() {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  return (
    <section className={`page-section impact-section`}>
      <div className="bg-holder" style={{ background: `url(${weavingBg})` }}>
        <div className="content-holder">
          <Container>
            <Row>
              <Col md="12">
                <h2 className="title">Pashudh Impact</h2>
                <p>
                  Bridging the gap between our artisans' well-being and
                  sustainable progress.
                </p>
                <br />
              </Col>
            </Row>
            <Row className={`flex-center items-center`}>
              <Col md="4" xs="6">
                <div className="impact-items">
                  <h3>900+</h3>
                  <p>Weavers Empowered</p>
                </div>
              </Col>
              <Col md="4" xs="6">
                <div className="impact-items">
                  <h3>75+ </h3>
                  <p>Workers Employed</p>
                </div>
              </Col>
              <Col md="4" xs="6">
                <div className="impact-items">
                  <h3>6000+</h3>
                  <p>Happy Customers</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </section>
  );
}
