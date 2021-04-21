import dynamic from "next/dynamic";

import { Masonry } from "masonic";
import React, { useContext } from "react";

import AppContext from "../context/AppContext";

import { Container, Row, Col } from "reactstrap";

// Images

import blogImg1 from "../assets/images/blog/full/img1.png?webp";
import blogImg2 from "../assets/images/blog/full/img2.png?webp";
import blogImg3 from "../assets/images/blog/full/img3.png?webp";
import blogImg4 from "../assets/images/blog/full/img4.png?webp";
import blogImg5 from "../assets/images/blog/full/img5.png?webp";
import blogImg6 from "../assets/images/blog/full/img6.png?webp";

const BlogGrid = ({ data: { name, img } }) => {
  return (
    <div className={`blog-item`}>
      <img src={img} alt={name} />
      <div className="name">{name}</div>
    </div>
  );
};

export default function Blog() {
  const pageTitle = "Silken Symphonies";

  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  const blogItems = [
    {
      name: "Kanjeevaram: The dream weave of deities and divas",
      description: `It is the queen of silks that is said to be the favourite fabric of the gods and today, it’s the go-to choice of jet-setting women who want to make dazzling appearances…`,
      img: blogImg1,
      date: "March 6",
    },
    {
      name: "Kanjeevaram: The dream weave of deities and divas",
      description: `It is the queen of silks that is said to be the favourite fabric of the gods and today, it’s the go-to choice of jet-setting women who want to make dazzling appearances…`,
      date: "March 7",
      img: blogImg2,
    },
    {
      name: "Kanjeevaram: The dream weave of deities and divas",
      description: `It is the queen of silks that is said to be the favourite fabric of the gods and today, it’s the go-to choice of jet-setting women who want to make dazzling appearances…`,
      date: "March 8",
      img: blogImg3,
    },
    {
      name: "Kanjeevaram: The dream weave of deities and divas",
      description: `It is the queen of silks that is said to be the favourite fabric of the gods and today, it’s the go-to choice of jet-setting women who want to make dazzling appearances…`,
      date: "March 9",
      img: blogImg4,
    },
    {
      name: "Kanjeevaram: The dream weave of deities and divas",
      description: `It is the queen of silks that is said to be the favourite fabric of the gods and today, it’s the go-to choice of jet-setting women who want to make dazzling appearances…`,
      date: "March 10",
      img: blogImg5,
    },
    {
      name: "Kanjeevaram: The dream weave of deities and divas",
      description: `It is the queen of silks that is said to be the favourite fabric of the gods and today, it’s the go-to choice of jet-setting women who want to make dazzling appearances…`,
      date: "March 11",
      img: blogImg6,
    },
  ];

  return (
    <>
      <section className={`blog-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={pageTitle}>
              {pageTitle}
            </h1>
          </center>
        </Container>
      </section>
      {isMobile ? (
        <section className={`page-section blog-section`}>
          <Container>
            <Row>
              {blogItems.map((post, index) => (
                <Col md="4">
                  <div className="blog-wrapper" key={index}>
                    <div className="blog-img">
                      <div className="date">{post.date}</div>
                      <div className="image-holder">
                        <picture>
                          <img src={post.img} alt="Blog" />
                        </picture>
                      </div>
                    </div>
                    <div className="blog-content">
                      <h2 className="title">{post.name}</h2>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      ) : (
        <section className={`blog-masonic-section page-section`}>
          <Masonry
            columnGutter={0}
            overscanBy={2}
            items={blogItems}
            render={BlogGrid}
            columnWidth={deviceWidth ? deviceWidth / 2.5 : 800}
          />
        </section>
      )}
    </>
  );
}
