import React from "react";

import { Row, Col } from "reactstrap";

import highlightImg1 from "../../assets/images/highlight/highlight-1.png?webp";
import highlightImg2 from "../../assets/images/highlight/highlight-2.png?webp";

import leftVid from "../../assets/videos/left.mp4";
import rightVid from "../../assets/videos/right.mp4";

export default function HighlightSection() {
  return (
    <section className={`page-section highlight-section`}>
      <Row className={`flex-center`}>
        <Col lg="6" className={`highlight-container video`}>
          <div className="highlight-wraper ">
            {/* <div className="img-holder">
              <picture>
                <img src={highlightImg1} alt="Highlight" />
              </picture>
            </div> */}
            <div className="video-holder">
              <video
                autoPlay={true}
                muted={true}
                loop={true}
                controlsList="nodownload"
              >
                <source src={leftVid} />
              </video>
            </div>
            <div className="content-holder">
              <h2 className="title">Pavana</h2>
              <a href="#" className="shop-now btn">
                Shop Now
              </a>
            </div>
          </div>
        </Col>
        <Col lg="6" className={`highlight-container alter video`}>
          <div className="highlight-wraper">
            {/* <div className="img-holder">
              <picture>
                <img src={highlightImg2} alt="Highlight" />
              </picture>
            </div> */}
            <div className="video-holder">
              <video
                autoPlay={true}
                muted={true}
                loop={true}
                controlsList="nodownload"
              >
                <source src={rightVid} />
              </video>
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
