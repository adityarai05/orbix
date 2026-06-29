import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Bot, Home, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { XtractUI } from "@/components/sections/XtractUI";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const NAV_ITEMS = [
  { name: 'Home', url: '#', icon: Home },
  { name: 'Features', url: '#features', icon: Rocket },
];

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const footerRef = useRef<HTMLElement>(null);
  const isFooterInView = useInView(footerRef, { margin: "0px" });

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  // Parallax physics: Slide down from -300px offset behind the main content while fading in
  const footerY = useTransform(scrollYProgress, [0, 1], [-300, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "") setActiveTab("");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Sections to observe
    const sections: string[] = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen selection:bg-primary selection:text-white bg-[#f4f4f4]">
      {/* Navigation */}
      <NavBar
        isScrolled={isScrolled}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        items={NAV_ITEMS}
        className={isFooterInView ? "opacity-0 pointer-events-none -translate-y-4" : "opacity-100 translate-y-0"}
      />

      {/* Main Content with overlap shadowing and rounded corners for the pull effect */}
      <main className="relative z-20 flex flex-col bg-[#000000] rounded-b-[40px] md:rounded-b-[80px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] pb-10 xl:pb-20">
        <XtractUI />
      </main>

      {/* Re-designed Minimalist Huge-Typography Footer with Reveal Animation */}
      <div
        className="relative z-10 -mt-[40px] md:-mt-[80px] pt-[40px] md:pt-[80px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/d96d0c7c-6565-4bae-b7fc-f30e46c0d1d6.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <motion.footer
          ref={footerRef}
          style={{ y: footerY, opacity: footerOpacity }}
          className="w-full text-white py-16 md:py-24 px-6 md:px-16 relative z-10"
        >
          <div className="max-w-[1400px] mx-auto flex flex-col gap-20 md:gap-32">

            {/* Top Row: Logo & Links */}
            <div className="flex flex-col xl:flex-row justify-between gap-20 xl:gap-8">

              {/* Huge Logo text (Stretch Hack for Brutalist Typography) */}
              <div className="xl:w-1/2 overflow-hidden flex items-start">
                <h2
                  className="font-black text-white leading-[0.8] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(6rem, 15vw, 13rem)", transform: "scaleY(1.4)", transformOrigin: "top left" }}
                >
                  ORBIX<sup className="text-[30%] top-[-0.8em] font-bold tracking-normal ml-1">®</sup>
                </h2>
              </div>

              {/* Newsletter & Links Matrix */}
              <div className="xl:w-1/2 flex flex-col md:flex-row justify-start xl:justify-end gap-16 md:gap-24 pt-4">

                {/* Newsletter Box */}
                <div className="flex flex-col w-full md:w-[320px]">
                  <h4 className="text-[2.5rem] md:text-5xl font-bold tracking-tight mb-4 text-white">Stay connected</h4>
                </div>

                {/* Links */}
                <div className="flex gap-16 lg:gap-24 font-bold text-[15px] text-white pt-2">
                  <div className="flex flex-col gap-3">
                    <button onClick={() => scrollToSection("top")} className="text-left hover:text-gray-300 transition-colors">Home</button>
                    <button onClick={() => scrollToSection("features")} className="text-left hover:text-gray-300 transition-colors">Features</button>
                    <button onClick={() => scrollToSection("training")} className="text-left hover:text-gray-300 transition-colors">Demo</button>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-6 mt-10 md:mt-20">

              {/* Contact Info */}
              <div className="flex flex-col gap-1 w-full lg:w-1/3">
                <p className="font-bold text-[1.6rem] tracking-tight text-white">orbix@gmail.com</p>
              </div>

              {/* Subtext */}
              <div className="w-full lg:w-1/3 text-gray-300 text-[13px] leading-snug font-semibold text-left lg:text-center">
                With ORBIX, your company gets more than just a software layer. We design experiences that resonate with your customers and drive meaningful engagement.
              </div>

              {/* Credit */}
              <div className="w-full lg:w-1/3 flex items-center justify-start lg:justify-end gap-3 text-[11px] font-bold text-gray-400">
                <span>Created by</span>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                    <img src="https://ui-avatars.com/api/?name=AD&background=random" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  <span>Aditya Studio</span>
                </div>
              </div>

            </div>

          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Landing;
