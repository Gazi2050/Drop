import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import FileType from "@/components/FileType";
import Hero from "@/components/Hero";
import HIW from "@/components/HIW";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <FileType />
      <HIW />
      <Pricing />
      <FAQ />
    </>
  );
};

export default page;