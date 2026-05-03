import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * MoahScroll applies the scroll-triggered visual effects (blur and opacity) 
 * as described in the prompt, while letting the browser handle the 
 * 1:1 synchronized sliding (native document scrolling).
 */
export function MoahScroll({ 
  layer1, 
  layer2 
}: { 
  layer1: React.ReactNode, 
  layer2: React.ReactNode 
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We track the container's absolute scroll intersection.
  // When scrolling past layer 1, we apply blur.
  // When layer 2 enters the viewport, we apply opacity reveal.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const { scrollY } = useScroll();

  // B. Critical Text Details
  // Red Text Blur: Progress 0% to 50% smoothly increases the blur radius on the large text as it moves up.
  // We'll map the first 500px of scrolling to 0-30px blur for layer 1.
  const blurValue = useTransform(scrollY, [0, 500], [0, 30]);
  const blurFilter = useTransform(blurValue, (v) => `blur(${v}px)`);

  // Charcoal Text Reveal: Set opacity to 0, fade to 1 as it rises past the text's final position.
  // We'll map the window scroll reaching layer 2 to scale its opacity.
  const layer2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: layer2Progress } = useScroll({
    target: layer2Ref,
    // "start end" means layer 2's top hits bottom of viewport
    // "start center" means layer 2's top hits center of viewport
    offset: ["start end", "start center"]
  });
  
  // Easing: cubic-bezier(0.4, 0, 0.2, 1) applied progressively
  const layer2Opacity = useTransform(layer2Progress, [0, 1], [0, 1], {
    ease: (t) => {
      // Ease out cubic
      return 1 - Math.pow(1 - t, 3);
    }
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Layer 1: Progressively blurs as we scroll away */}
      <motion.div 
        style={{ 
          filter: blurFilter,
        }}
        className="w-full sticky top-0 h-screen overflow-hidden z-10"
      >
        {layer1}
      </motion.div>

      {/* Layer 2: Fades in smoothly as it enters the viewport */}
      <motion.div 
        ref={layer2Ref}
        style={{ 
          opacity: layer2Opacity 
        }}
        className="w-full relative z-20"
      >
        {layer2}
      </motion.div>
    </div>
  );
}
