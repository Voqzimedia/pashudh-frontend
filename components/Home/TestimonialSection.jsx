import dynamic from "next/dynamic";

import React from "react";
import { Container, Row, Col } from "reactstrap";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"));

// images

import userImg1 from "../../assets/images/testimonial/user1.png?webp";
import quoteImg from "../../assets/images/icons/quotes.svg";

export default function TestimonialSection() {
  const testimonialList = [
    {
      name: "ImCharanya",
      testimonial: `“I would recommend Pashudh to anyone who wants to find that perfect blend of classical and modern. It makes the sarees more versatile and wearable on different occasions.”`,
      img: userImg1,
    },
    {
      name: "ImCharanya",
      testimonial: `“This website is a blessing for those who don’t want to spend too much time shopping. Especially when it comes to sarees for gifting purposes, I am in and out in a matter of minutes.”`,
      img: userImg1,
    },
    {
      name: "ImCharanya",
      testimonial: `I have always wanted to have a touch and feel of the sarees that I buy, but I have come to trust Pashudh because they have delighted me whenever I have purchased from them.`,
      img: userImg1,
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <section className={`page-section testimonial-section`}>
      <Container>
        <Row className={`flex-center`}>
          <Col lg="8">
            <div className={`testimonial-wraper`}>
              <div className="quotes-icon">
                <img width="100" height="100" src={quoteImg} alt="quotes" />
              </div>
              <Slider {...sliderSettings} className={`testimonial-slider`}>
                {testimonialList.map((testimonial, index) => (
                  <div className={`testimonial-item`} key={index}>
                    <Row>
                      <Col md="3">
                        <div className="testimonial-img">
                          <img
                            width="100"
                            height="100"
                            src={testimonial.img}
                            alt="User"
                          />
                        </div>
                      </Col>
                      <Col md="9">
                        <div className="testimonial-container">
                          <h2 className="name">{testimonial.name}</h2>
                          <p className="testimonial">
                            {testimonial.testimonial}
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
