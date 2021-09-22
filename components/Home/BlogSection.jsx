import React, { useContext } from "react";
import Slider from "react-slick";
import { Container } from "reactstrap";

import AppContext from "../../context/AppContext";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images
import blogImg1 from "../../assets/images/blog/blog-1.png?webp";
import blogImg2 from "../../assets/images/blog/blog-2.png?webp";
import blogImg3 from "../../assets/images/blog/blog-3.png?webp";

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
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const blogList = [
    {
      title: "Kanjeevaram: The dream weave of deities and divas",
      description: `It is the queen of silks that is said to be the favourite fabric of the gods and today, it’s the go-to choice of jet-setting women who want to make dazzling appearances…`,
      img: blogImg1,
      date: "March 6",
    },
    {
      title: "Tips for choosing Kanjeevarams for your bridal trousseau",
      description: `You want to be the centre of attraction on your special day, but not for the wrong reasons. Here are a few pointers to keep in mind while choosing a Kanjeevaram…`,
      img: blogImg2,
      date: "March 7",
    },
    {
      title: "The long life of your silk sarees is in your hands",
      description: `With the right care, your silk saree can last generations in all its glory. We bring you some hacks that your grandma will vouch for and some that will be news to her…`,
      img: blogImg3,
      date: "March 8",
    },
    {
      title: "Tips for choosing Kanjeevarams for your bridal trousseau",
      description: `You want to be the centre of attraction on your special day, but not for the wrong reasons. Here are a few pointers to keep in mind while choosing a Kanjeevaram…`,
      img: blogImg2,
      date: "March 7",
    },
  ];

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
          {blogList.map((post, index) => (
            <div className="blog-wrapper" key={index}>
              <div className="blog-img">
                <div className="date">{post.date}</div>
                <div className="image-holder">
                  <picture>
                    <img src={post.img} width="100" height="100" alt="Blog" />
                  </picture>
                </div>
                <h2 className="blog-title">{post.title}</h2>
              </div>
              <div className="blog-content">
                <p className="description">{post.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </Container>
    </section>
  );
}
