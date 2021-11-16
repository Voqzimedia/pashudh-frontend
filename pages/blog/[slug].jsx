import React, { useContext } from "react";

import AppContext from "../../context/AppContext";

import { Container, Row, Col } from "reactstrap";

import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../../components/Motion/PageMotion"));

// Images

const importBlogPosts = async () => {
  const markdownFiles = require
    .context("../../content", false, /\.md$/)
    .keys()
    .map((relativePath) => relativePath.substring(2));
  return Promise.all(
    markdownFiles.map(async (path) => {
      const markdown = await import(`../../content/${path}`);
      return { ...markdown, slug: path.substring(0, path.length - 3) };
    })
  );
};

const Blog = ({ post }) => {
  const { deviceWidth } = useContext(AppContext);

  const isMobile = deviceWidth < 500;

  //   console.log(post);

  return (
    <PageMotion>
      <section className={`blog-section page-section`}>
        <Container>
          <center>
            <h1 className="page-title" data-title={post?.attributes?.title}>
              {post?.attributes?.title}
            </h1>
          </center>
        </Container>
      </section>

      <section className={`page-section mobile-blog blog-section`}>
        <Container>
          <Row>
            <Col md="12">
              <div className="blog-post-wrapper">
                <article>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post?.html?.replace("/public", ""),
                    }}
                  />
                </article>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </PageMotion>
  );
};

export async function getStaticProps(context) {
  const {
    params: { slug },
  } = context;

  const postsList = await importBlogPosts();

  const post = postsList.find((post) => post?.slug == slug);

  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await importBlogPosts();

  const pathsData = [];

  posts?.map((post) => {
    if (post?.slug) {
      pathsData.push({ params: { slug: post?.slug } });
    }
  });

  return {
    paths: pathsData,
    fallback: false,
  };
}

export default Blog;
