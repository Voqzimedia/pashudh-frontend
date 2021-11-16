import React, { useContext } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";
import Link from "next/link";
import moment from "moment";

import AppContext from "../../context/AppContext";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import truncate from "../../helper/functions";

export default function BlogSection({ posts }) {
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
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className={`page-section blog-section`}>
      <Container>
        <div className="content-header">
          <div className="content-holder">
            <center>
              <p className="sub-title">Blog</p>
              <hr className="small gradient no-m" />
              <h2 className="title">Silken Symphonies</h2>
            </center>
          </div>
        </div>
        <Slider {...sliderSettings} className={`blog-slider`}>
          {posts?.map((post, index) => (
            <div className="blog-wrapper" key={index}>
              <Link href={`/blog/${post?.slug}`}>
                <a>
                  <div className="blog-img">
                    <div className="date">
                      {moment(post?.attributes?.date).format("MMM , Do")}
                    </div>
                    <div className="image-holder">
                      <picture>
                        <img
                          src={post?.attributes?.thumbnail?.replace(
                            "/public",
                            ""
                          )}
                          width="100"
                          height="100"
                          alt="Blog"
                        />
                      </picture>
                    </div>
                    <h2 className="blog-title">{post?.attributes?.title}</h2>
                  </div>
                  <div className="blog-content">
                    <p className="description">
                      {truncate(post?.attributes?.description, 150)}
                    </p>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
}
