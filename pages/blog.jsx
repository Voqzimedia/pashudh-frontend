import { Masonry } from "masonic";
import React, { useContext } from "react";

import AppContext from "../context/AppContext";

import { Container, Row, Col } from "reactstrap";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));

// Images

import blogImg1 from "../assets/images/blog/full/img1.png?webp";
import blogImg2 from "../assets/images/blog/full/img2.png?webp";
import blogImg3 from "../assets/images/blog/full/img3.png?webp";
import blogImg4 from "../assets/images/blog/full/img4.png?webp";
import blogImg5 from "../assets/images/blog/full/img5.png?webp";
import blogImg6 from "../assets/images/blog/full/img6.png?webp";
import moment from "moment";
import Link from "next/link";

const importBlogPosts = async () => {
  const markdownFiles = require
    .context("../content", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../content/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

const BlogGrid = ({ data: post }) => {
  return (
    <Link href={`/blog/${post?.slug}`}>
      <a>
        <div className={`blog-item`}>
          <img
            width="100"
            height="100"
            src={post?.attributes?.thumbnail}
            alt={post?.attributes?.title}
          />

          <div className="name">{post?.attributes?.title}</div>
        </div>
      </a>
    </Link>
  );

  return null;
};

export default function Blog({ postsList }) {
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
    <PageMotion>
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
        <section className={`page-section mobile-blog blog-section`}>
          <Container>
            <Row>
              {postsList.map((post, index) => (
                <Col md="4">
                  <div className="blog-wrapper" key={index}>
                    <div className="blog-img">
                      <div className="date">
                        {moment(post?.attributes?.date).format("MMM , Do")}
                      </div>
                      <div className="image-holder">
                        <picture>
                          <img
                            width="100"
                            height="100"
                            src={post?.attributes?.thumbnail?.replace(
                              "/public",
                              ""
                            )}
                            alt="Blog"
                          />
                        </picture>
                      </div>
                      <h2 className="blog-title">{post?.attributes?.title}</h2>
                    </div>
                    <div className="blog-content">
                      {/* <h2 className="title">{post.name}</h2> */}
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
            items={postsList}
            render={BlogGrid}
            columnWidth={deviceWidth ? deviceWidth / 2.5 : 800}
          />
        </section>
      )}
    </PageMotion>
  );
}

export async function getStaticProps() {
  const postsList = await importBlogPosts();

  return {
    props: {
      postsList,
    },
  };
}
