import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import Link from "next/link";

import { Row, Col } from "reactstrap";

import classImg1 from "../../assets/images/explore/001.png?webp";
import classImg2 from "../../assets/images/explore/002.png?webp";
import classImg3 from "../../assets/images/explore/003.png?webp";

export default function ClassesSection() {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const classesItems = [
    {
      title: "Fresh Heritage",
      subTitle: "Spectrum Of Inheritance",
      img: classImg2,
      tagLine: "For the modern-era brides, who are chic and enchanting.",
      slug: "fresh-heritage",
    },
    {
      title: "Neoclassic Heirlooms",
      subTitle: "Spectrum Of Sophistication",
      img: classImg3,
      tagLine:
        "For the casual wearer, who is effortlessly unique and composed.",
      slug: "neoclassic-heirlooms",
    },
    {
      title: "Modern Muse",
      subTitle: "Spectrum Of Inspiration",
      img: classImg1,
      tagLine: "For the working woman, who is focussed and fabulous.",
      slug: "modern-muse",
    },
  ];

  return (
    <section className={`page-section classes-section`}>
      <div className="classes-holder">
        {classesItems.map((explore, index) => (
          <Row className={`classes-item`} key={index}>
            <Col lg="7">
              {isMobile && (
                <div className="content-holder">
                  <div className="content-header">
                    <h6 className="sub-title">{explore.subTitle}</h6>
                    <hr className="small gradient no-m" />
                    <h2 className="title">{explore.title}</h2>
                  </div>
                </div>
              )}

              <div className="img-holder">
                <picture>
                  <img
                    width="100"
                    height="100"
                    src={explore.img}
                    alt="Modern Muse"
                  />
                </picture>
              </div>
            </Col>
            <Col lg="5">
              <div className="content-warper">
                <div className="content-holder">
                  {!isMobile && (
                    <div className="content-header">
                      <p className="sub-title">{explore.subTitle}</p>
                      <hr className="small gradient no-m" />
                      <h2 className="title">{explore.title}</h2>
                    </div>
                  )}

                  <p className="description">{explore.tagLine}</p>
                  <Link href={`/shop/class/${explore.slug}`}>
                    <a className="shop-now btn">Shop Now</a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        ))}
      </div>
    </section>
  );
}
