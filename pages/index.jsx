// Section Components

import AboutSection from "../components/Home/AboutSection";
import HighlightSection from "../components/Home/HighlightSection";
import ExploreSection from "../components/Home/ExploreSection";
import TestimonialSection from "../components/Home/TestimonialSection";
import BlogSection from "../components/Home/BlogSection";
import CategorySection from "../components/Home/CategorySection";

export default function Home() {
  return (
    <>
      <AboutSection />
      <HighlightSection />
      <ExploreSection />
      <CategorySection />
      <TestimonialSection />
      <BlogSection />
    </>
  );
}
