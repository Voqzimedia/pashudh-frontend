import dynamic from "next/dynamic";

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

export default function Home() {
  return (
    <PageMotion>
      <AboutSection />
      <HighlightSection />
      <ClassesSection />
      <ColorsSection />
      <ImpactSection />
      <InstaFeed />
      <BlogSection />
    </PageMotion>
  );
}
