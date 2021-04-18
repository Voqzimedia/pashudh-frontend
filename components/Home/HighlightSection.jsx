import React from "react";

import { Row, Col } from "reactstrap";

import highlightImg1 from "../../images/highlight/highlight-1.png?webp";
import highlightImg2 from "../../images/highlight/highlight-2.png?webp";

export default function HighlightSection() {
  return (
    <section className={`page-section highlight-section`}>
      <Row className={`flex-center`}>
        <Col lg="6" className={`highlight-container`}>
          <div className="highlight-wraper">
            <div className="img-holder">
              <picture>
                <img src={highlightImg1} alt="Highlight" />
              </picture>
            </div>
            <div className="content-holder">
              <h2 className="title">Pavana</h2>
              <a href="#" className="shop-now btn">
                Shop Now
              </a>
            </div>
          </div>
        </Col>
        <Col lg="6" className={`highlight-container alter`}>
          <div className="highlight-wraper">
            <div className="img-holder">
              <picture>
                <img src={highlightImg2} alt="Highlight" />
              </picture>
            </div>
            <div className="content-holder">
              <h2 className="title">Pavana</h2>
              <a href="#" className="shop-now btn">
                Shop Now
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
}
