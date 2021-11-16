import dynamic from "next/dynamic";

// import { importBlogPosts } from "../helper/functions";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const AboutSection = dynamic(() => import("../components/Home/AboutSection"));
const HighlightSection = dynamic(() =>
  import("../components/Home/HighlightSection")
);
const ClassesSection = dynamic(() =>
  import("../components/Home/ClassesSection")
);
const InstaFeed = dynamic(() => import("../components/Home/InstaFeed"));
const BlogSection = dynamic(() => import("../components/Home/BlogSection"));
const ColorsSection = dynamic(() => import("../components/Home/ColorsSection"));
const ImpactSection = dynamic(() => import("../components/Home/ImpactSection"));

export const importBlogPosts = async () => {
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

export default function Home({ postsList }) {
  console.log(postsList);

  return (
    <PageMotion>
      <AboutSection />
      <HighlightSection />
      <ClassesSection />
      <ColorsSection />
      <ImpactSection />
      <InstaFeed />
      <BlogSection posts={postsList} />
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
