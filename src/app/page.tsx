import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import FileType from "@/components/FileType";
import Footer from "@/components/Footer";
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
      <CTA />
      <Footer />
    </>
  );
};

export default page;