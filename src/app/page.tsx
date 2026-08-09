import About from "@/components/About";
import Banner from "@/components/Banner";
import CTA from "@/components/CTA";
import ExclusiveHighlighted from "@/components/ExclusiveHighted";
import FAQ from "@/components/FAQ";
import FeaturesSection from "@/components/FeaturesSection";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";


export default function Home() {
  return (
    <div>
       <Banner/>
       <ExclusiveHighlighted/>
       {/* <FeaturesSection/> */}
       <About/>
       <Services/>
       <Testimonials/>
       <FAQ/>
       <CTA/>
    </div>
  );
}
