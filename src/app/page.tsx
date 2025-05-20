import Features from "@/components/Features";
import FileType from "@/components/FileType";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <FileType />
    </>
  );
};

export default page;