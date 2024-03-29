import dynamic from "next/dynamic";

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useQuery } from "@apollo/client";

import { getTestimonials } from "../../helper/graphql/getTestimonials";
import profileImg from "../../assets/images/avatar.jpg";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = dynamic(() => import("react-slick"));

// images

import quoteImg from "../../assets/images/icons/quotes.svg?include";

import SvgIcon from "../utils/SvgIcon";
import { imgUrlCheck } from "../../helper/functions";

export default function TestimonialSection() {
  const [testimonialList, setTestimonial] = useState([]);

  useEffect(() => {
    fetchTestimonial();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  // Get Categories Data.
  const {
    loading,
    error,
    data,
    refetch: fetchTestimonial,
  } = useQuery(getTestimonials, {
    notifyOnNetworkStatusChange: true,

    onCompleted: () => {
      setTestimonial(() => (data?.testimonials ? data.testimonials : []));
    },
  });

  // console.log(testimonialList);

  return (
    <section className={`page-section testimonial-section`}>
      <Container>
        <Row className={`flex-center`}>
          <Col lg="8">
            <div className={`testimonial-wraper`}>
              <div className="quotes-icon">
                {/* <img width="100" height="100" src={quoteImg} alt="quotes" /> */}
                <SvgIcon icon={quoteImg} />
              </div>
              <Slider {...sliderSettings} className={`testimonial-slider`}>
                {testimonialList.map((testimonial, index) =>
                  testimonial.Approved ? (
                    <div className={`testimonial-item`} key={index}>
                      <Row>
                        <Col md="3">
                          <div className="testimonial-img">
                            <img
                              width="145px"
                              height="145px"
                              src={
                                testimonial?.User?.ProfilePic?.formats
                                  ?.thumbnail?.url
                                  ? `${imgUrlCheck(
                                      testimonial.User.ProfilePic.formats
                                        .thumbnail.url
                                    )}`
                                  : profileImg
                              }
                              alt="User"
                            />
                          </div>
                        </Col>
                        <Col md="9">
                          <div className="testimonial-container">
                            <h2 className="name">
                              {testimonial?.User?.username
                                ? testimonial.User.username
                                : testimonial.NickName}
                            </h2>
                            <p className="testimonial">
                              {testimonial.Testimonial}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : null
                )}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
