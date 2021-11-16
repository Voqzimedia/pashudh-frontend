import { Masonry } from "masonic";
import React, { useContext } from "react";

import AppContext from "../context/AppContext";

import { Container, Row, Col } from "reactstrap";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));

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
  // console.log(post);

  return (
    <Link href={`/blog/${post?.slug}`}>
      <a>
        <div className={`blog-item`}>
          <img
            width="100"
            height="100"
            src={post?.attributes?.image}
            alt={post?.attributes?.title}
          />

          <div className="name">{post?.attributes?.title}</div>
        </div>
      </a>
    </Link>
  );
};

export default function Blog({ postsList }) {
  const pageTitle = "Silken Symphonies";

  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

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
                            src={post?.attributes?.thumbnail}
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
