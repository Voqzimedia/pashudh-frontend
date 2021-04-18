import React, { useContext } from "react";
import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";

import AppContext from "../../context/AppContext";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import blogImg1 from "../../images/blog/blog-1.png";
import blogImg2 from "../../images/blog/blog-2.png";
import blogImg3 from "../../images/blog/blog-3.png";

export default function BlogSection() {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;
  const isTab = deviceWidth < 800;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTab ? 2 : 3,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <section className={`page-section blog-section`}>
      <Container>
        <Slider {...sliderSettings} className={`blog-slider`}>
          <div className="blog-wrapper">
            <div className="blog-img">
              <div className="date">March 6</div>
              <div className="image-holder">
                <picture>
                  <img src={blogImg1} alt="Blog" />
                </picture>
              </div>
            </div>
            <div className="blog-content">
              <h2 className="title">Pashudh / Fashion / Silks</h2>
              <p className="description">
                It is the queen of silks that is said to be the favourite fabric
                of the gods. Today, it’s the go-to choice of jet-setting
                women.....
              </p>
            </div>
          </div>
          <div className="blog-wrapper">
            <div className="blog-img">
              <div className="date">March 7</div>
              <div className="image-holder">
                <picture>
                  <img src={blogImg2} alt="Blog" />
                </picture>
              </div>
            </div>
            <div className="blog-content">
              <h2 className="title">Pashudh / Fashion / Silks</h2>
              <p className="description">
                You want to be the centre of attraction on your special day, but
                not for the wrong reasons. Here are a few pointers......
              </p>
            </div>
          </div>
          <div className="blog-wrapper">
            <div className="blog-img">
              <div className="date">March 8</div>
              <div className="image-holder">
                <picture>
                  <img src={blogImg3} alt="Blog" />
                </picture>
              </div>
            </div>
            <div className="blog-content">
              <h2 className="title">Pashudh / Fashion / Silks</h2>
              <p className="description">
                With the right care, your silk saree can last generations in all
                its glory. We bring you some hacks that your grandma.....
              </p>
            </div>
          </div>
        </Slider>
      </Container>
    </section>
  );
}
