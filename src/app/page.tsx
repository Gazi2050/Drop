import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import FileType from "@/components/FileType";
import Hero from "@/components/FileUploaderComponents/Hero";
import Footer from "@/components/Footer";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <FileType />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
};

export default page;