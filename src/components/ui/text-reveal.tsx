import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 min-h-[150vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[100vh] max-w-[1200px] flex-col items-center justify-center bg-transparent px-4 pb-8 pt-24 md:pb-16 md:pt-32">
        
        {/* Crystal Purple Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[800px] h-[400px] md:h-[600px] bg-[#814bf6] opacity-25 blur-[120px] rounded-full pointer-events-none -z-10" />

        <p className="flex flex-wrap items-center justify-center text-center text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.05] tracking-tight uppercase text-white drop-shadow-sm">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mx-1.5 md:mx-3 lg:mx-4 mt-2 mb-2">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }} className="text-white">
        {children}
      </motion.span>
    </span>
  );
};
