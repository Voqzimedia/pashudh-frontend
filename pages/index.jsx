import dynamic from "next/dynamic";

const PageMotion = dynamic(() => import("../components/Motion/PageMotion"));
const AboutSection = dynamic(() => import("../components/Home/AboutSection"));
const HighlightSection = dynamic(() =>
  import("../components/Home/HighlightSection")
);
const ExploreSection = dynamic(() =>
  import("../components/Home/ExploreSection")
);
const TestimonialSection = dynamic(() =>
  import("../components/Home/TestimonialSection")
);
const BlogSection = dynamic(() => import("../components/Home/BlogSection"));
const CategorySection = dynamic(() =>
  import("../components/Home/CategorySection")
);

export default function Home() {
  return (
    <PageMotion>
      <AboutSection />
      <HighlightSection />
      <ExploreSection />
      <CategorySection />
      <TestimonialSection />
      <BlogSection />
    </PageMotion>
  );
}
