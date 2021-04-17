import React from "react";
import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// images

import userImg1 from "../../images/testimonial/user1.png?webp";
import quoteImg from "../../images/icons/quotes.svg";

export default function TestimonialSection() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <section className={`page-section testimonial-section`}>
      <Container>
        <Row className={`flex-center`}>
          <Col lg="8">
            <div className={`testimonial-wraper`}>
              <div className="quotes-icon">
                <img src={quoteImg} alt="quotes" />
              </div>
              <Slider {...sliderSettings} className={`testimonial-slider`}>
                <div className={`testimonial-item`}>
                  <Row>
                    <Col md="3">
                      <div className="testimonial-img">
                        <img src={userImg1} alt="User" />
                      </div>
                    </Col>
                    <Col md="9">
                      <div className="testimonial-container">
                        <h2 className="name">ImCharanya</h2>
                        <p className="testimonial">
                          I would recommend Pashudh to anyone who wants to find
                          that perfect blend of classical and modern. It makes
                          the sarees more versatile and wearable on different
                          occasions.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className={`testimonial-item`}>
                  <Row>
                    <Col md="3">
                      <div className="testimonial-img">
                        <img src={userImg1} alt="User" />
                      </div>
                    </Col>
                    <Col md="9">
                      <div className="testimonial-container">
                        <h2 className="name">ImCharanya</h2>
                        <p className="testimonial">
                          I would recommend Pashudh to anyone who wants to find
                          that perfect blend of classical and modern. It makes
                          the sarees more versatile and wearable on different
                          occasions.
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
