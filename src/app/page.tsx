import FeaturedCorses from "@/components/FeaturedCorses";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Instructors from "@/components/instructors";
import TestimonialCards from "@/components/TestimonialCards";
import Upcomingwebinars from "@/components/Upcomingwebinars";

import { cn } from "@/lib/utils"


export default function Home() {
  return (
   <>
     <main className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
        )}>
       <HeroSection />
       <FeaturedCorses/>
       <TestimonialCards/>
       <Upcomingwebinars/>
      <Instructors/>
       <Footer/>
     </main>
   </>
  );
}
