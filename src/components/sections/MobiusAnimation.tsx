import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function DepthWord({ 
  word, 
  isKeyword, 
  progress 
}: { 
  word: string, 
  isKeyword: boolean, 
  progress: any 
}) {
  // If keyword, it flies towards camera (scales up heavily) and fades faster
  const scale = useTransform(progress, [0, 0.35], [1, isKeyword ? 15 : 0.6]);
  const opacity = useTransform(progress, [0, isKeyword ? 0.3 : 0.4], [1, 0]);
  
  return (
    <motion.span 
      style={{ scale, opacity, display: "inline-block", whiteSpace: "pre", transformOrigin: "center center" }}
    >
      {word}{" "}
    </motion.span>
  );
}

export function MobiusAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Typography animations
  // First part of the scroll: Text scales up massively and fades out
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 6]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Video block animations
  // Second part of the scroll: video scales up from bottom/center
  const videoScale = useTransform(scrollYProgress, [0.3, 0.8], [0.4, 1.2]);
  const videoOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  // Use string template for width/height or use scale. Scale is better for performance.

  // Marquee animation
  const marqueeOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const marqueeX = useTransform(scrollYProgress, [0.3, 1], ["20%", "-40%"]);

  // Global fade for the text container so as it scales out it vanishes cleanly
  const containerOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const wordsConfig = [
    { word: "SupportAI", isKeyword: false },
    { word: "brings", x: 0, y: 0, isKeyword: false }, // adding x/y internally just for ignoring, but omitting is cleaner
    { word: "intelligence", isKeyword: true },
    { word: "and", isKeyword: false },
    { word: "automation", isKeyword: true },
    { word: "together,", isKeyword: false },
    { word: "turning", isKeyword: false },
    { word: "queries", isKeyword: false },
    { word: "into", isKeyword: false },
    { word: "resolutions", isKeyword: true },
    { word: "and", isKeyword: false },
    { word: "support", isKeyword: false },
    { word: "into", isKeyword: false },
    { word: "satisfaction.", isKeyword: true },
  ];

  return (
    <div className="bg-white text-black selection:bg-black selection:text-white">
      {/* 1. SCROLL ANIMATED HERO SECTIONS */}
      <section ref={containerRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          
          {/* Layer 1: The Initial Text */}
          <motion.div 
            style={{ opacity: containerOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 md:px-20 z-10"
          >
            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-center max-w-[1400px]">
              {wordsConfig.map((item, idx) => (
                <DepthWord 
                  key={idx} 
                  word={item.word} 
                  isKeyword={item.isKeyword || false} 
                  progress={scrollYProgress} 
                />
              ))}
            </h1>
            
            <p className="mt-16 text-gray-600 text-sm md:text-base font-medium max-w-[600px] text-center leading-relaxed">
              At SupportAI, we keep our operations seamless, intelligent, and focused. We work continuously as an autonomous force, resolving each interaction with precision and speed. Every query is fully understood, solved instantly, and guided by our AI core.
            </p>
          </motion.div>

          {/* Layer 2: The Marquee (Behind Video) */}
          <motion.div 
            style={{ opacity: marqueeOpacity, x: marqueeX }}
            className="absolute z-20 whitespace-nowrap opacity-0 flex items-center justify-center"
          >
            <h2 className="text-[15vw] font-black tracking-tighter uppercase text-black/10 select-none">
              Ideas in Motion. Ideas in Motion. Ideas in Motion.
            </h2>
          </motion.div>

          {/* Layer 3: The Video Block */}
          <motion.div 
            style={{ scale: videoScale, opacity: videoOpacity }}
            className="absolute z-30 w-full md:w-[70vw] h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden shadow-2xl origin-center"
          >
            {/* We'll use a placeholder image for the video/helmet guy */}
            <img 
              src="https://images.unsplash.com/photo-1614031679247-4f686dc076ea?q=80&w=2940&auto=format&fit=crop" 
              alt="Helmet Neon" 
              className="w-full h-full object-cover zoom-in"
            />
            {/* Play Button Overlay Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white pl-1 shadow-lg">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section className="relative z-40 bg-white min-h-screen py-32 px-6 md:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
          
          {/* Left Column */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Our Services</h3>
            </div>
            
            <div className="mt-40 lg:mt-auto">
              <p className="text-gray-500 font-medium max-w-[280px] mb-8">
                If you're looking for clarity in design, let's build it together.
              </p>
              <button className="flex items-center gap-2 text-xl font-bold hover:gap-4 transition-all">
                Get Started <span>→</span>
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.21, 1, 0.36, 1] }}
              className="flex gap-4 md:gap-8 items-start mb-16"
            >
              <span className="text-4xl md:text-5xl font-bold text-gray-300 select-none hidden md:block">A /</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                We create identity systems that bring clarity and distinction to brands — thoughtful visuals, cohesive structure, and design that lasts.
              </h2>
            </motion.div>

            {/* Service Pills */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="flex flex-wrap gap-3 items-center ml-0 md:ml-[4.5rem]"
            >
              <div className="w-3 h-3 bg-black rounded-full mr-4" />
              
              {[
                "Brand Strategy", 
                "Visual Identity System", 
                "Logo & Mark Development", 
                "Typography & Color System", 
                "Guidelines & Asset Library"
              ].map((pill, i) => (
                <motion.div 
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                  className="px-5 py-3 rounded-full bg-[#f2f2f2] text-sm font-semibold hover:bg-black hover:text-white transition-colors cursor-default"
                >
                  {pill}
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
