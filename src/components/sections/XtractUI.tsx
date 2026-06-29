import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Bot, Sparkles, Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';
import { Sparkles as SparklesBg } from '@/components/ui/sparkles';
import ShaderBackground from '@/components/ui/shader-background';
import AnimatedCardStack from '@/components/ui/animate-card-animation';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { LampContainer } from "@/components/ui/lamp";

export function XtractUI() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);

  const dashboardRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: dashboardRef,
    offset: ["start 95%", "center center"]
  });

  const dashboardRotateX = useTransform(scrollYProgress, [0, 1], [25, 0]);
  const dashboardScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const dashboardOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dashboardY = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const trainingRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: trainingScroll } = useScroll({
    target: trainingRef,
    offset: ["start 90%", "center center"]
  });

  const trainingLeftX = useTransform(trainingScroll, [0, 1], [-250, 0]);
  const trainingRightX = useTransform(trainingScroll, [0, 1], [250, 0]);
  const trainingOpacity = useTransform(trainingScroll, [0, 1], [0, 1]);

  // Slower upward translation to prevent crashing into navbar while still covering text
  const phoneY = useTransform(trainingScroll, [0, 1], [100, -80]);
  const phoneScale = useTransform(trainingScroll, [0, 1], [0.92, 1]);
  const phoneRotate = useTransform(trainingScroll, [0, 1], [15, 0]);

  // Text Parallax to hide behind phone MUCH faster
  const headlineY = useTransform(trainingScroll, [0, 0.5], [0, 200]);
  const headlineOpacity = useTransform(trainingScroll, [0.2, 0.45], [1, 0]);

  // Trigger glow and cards to scale up and complete EXACTLY early near scroll progress 0.5
  const glowOpacity = useTransform(trainingScroll, [0, 0.5], [0, 1]);
  const glowScale = useTransform(trainingScroll, [0, 0.5], [0.6, 1.4]);

  // Feature cards appear and fan out swiftly
  const cardsOpacity = useTransform(trainingScroll, [0, 0.5], [0, 1]);

  // Left Cards Arrays (X, Y) - Perfectly fanned out
  const card1X = useTransform(trainingScroll, [0, 0.5], [0, -260]);
  const card1Y = useTransform(trainingScroll, [0, 0.5], [0, -160]);
  const card2X = useTransform(trainingScroll, [0, 0.5], [0, -320]);
  const card2Y = useTransform(trainingScroll, [0, 0.5], [0, -10]);
  const card3X = useTransform(trainingScroll, [0, 0.5], [0, -240]);
  const card3Y = useTransform(trainingScroll, [0, 0.5], [0, 160]);

  // Right Cards Arrays (X, Y) - Perfectly fanned out
  const card4X = useTransform(trainingScroll, [0, 0.5], [0, 260]);
  const card4Y = useTransform(trainingScroll, [0, 0.5], [0, -160]);
  const card5X = useTransform(trainingScroll, [0, 0.5], [0, 320]);
  const card5Y = useTransform(trainingScroll, [0, 0.5], [0, -10]);
  const card6X = useTransform(trainingScroll, [0, 0.5], [0, 240]);
  const card6Y = useTransform(trainingScroll, [0, 0.5], [0, 160]);

  const heroWrapperRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroWrapperProgress } = useScroll({
    target: heroWrapperRef,
    offset: ["end end", "end start"]
  });
  const heroWrapperScale = useTransform(heroWrapperProgress, [0, 1], [1, 0.85]);
  const heroWrapperOpacity = useTransform(heroWrapperProgress, [0, 1], [1, 0.2]);

  const trainingWrapperRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress: trainingWrapperProgress } = useScroll({
    target: trainingWrapperRef,
    offset: ["start start", "end start"]
  });
  // Slide down slightly to create parallax overlap effect while scaling down
  const trainingWrapperY = useTransform(trainingWrapperProgress, [0, 1], [0, 200]);
  const trainingWrapperScale = useTransform(trainingWrapperProgress, [0, 1], [1, 0.95]);

  return (
    <div className="bg-[#000000] min-h-screen text-white font-sans">

      <div ref={heroWrapperRef} className="sticky bottom-0 z-0 w-full bg-[#000000]">
        <motion.div style={{ scale: heroWrapperScale, opacity: heroWrapperOpacity }} className="w-full origin-bottom">
          {/* Xtract Hero Section */}
          <section id="hero" className="relative pt-16 pb-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden min-h-screen">

            {/* Shader Background */}
            <ShaderBackground />

            {/* Space Motion Background */}
            <div className="absolute inset-0 z-0 opacity-80">
              <SparklesBg
                density={200}
                size={1.5}
                speed={0.4}
                opacity={0.5}
                opacitySpeed={3}
                color="#FFFFFF"
                className="w-full h-full"
              />
            </div>

            {/* Dynamic Glowing Effect (Optimized) */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[700px] bg-[#814bf6] blur-[150px] rounded-[100%] pointer-events-none z-0 transform-gpu"
            />

            <ContainerScroll
              titleComponent={
                <motion.div
                  style={{ opacity: heroOpacity, y: heroY }}
                  className="relative z-10 flex flex-col items-center max-w-5xl mx-auto mt-12 mb-8 md:mb-16"
                >
                  {/* Top Pill / Badge */}
                  <div className="px-5 py-2 rounded-full border border-[#1f2937] bg-[#0a0a0a] flex items-center gap-2 mb-8 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#814bf6] animate-pulse" />
                    <span className="text-sm text-gray-300 font-medium tracking-wide">SupportAI Framework</span>
                  </div>

                  <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] mb-8 text-[#ffffff]">
                    Supreme Intelligence <br />
                    <span className="text-gray-400">at your fingertips</span>
                  </h1>

                  <p className="text-lg md:text-xl text-gray-400 font-medium max-w-2xl mb-12 leading-relaxed">
                    SupportAI brings intelligence and automation together, turning queries into resolutions and support into satisfaction.
                  </p>


                </motion.div>
              }
            >
              <div className="w-full h-full flex flex-col pt-1 bg-[#0A0B10]">
                {/* Header */}
                <div className="h-14 border-b border-[#1f2937] flex items-center px-6 gap-3 bg-[#0f0f0f]">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#1f2937]" />
                    <div className="w-3 h-3 rounded-full bg-[#1f2937]" />
                    <div className="w-3 h-3 rounded-full bg-[#1f2937]" />
                  </div>
                  <div className="h-8 flex-1 max-w-[200px] ml-4 bg-[#1f2937]/50 rounded-lg" />
                </div>

                {/* Inner Dashboard Layout - Customized based on request */}
                <div className="flex-1 p-6 relative overflow-hidden bg-[#0A0B10]">
                  {/* Decorative background blur */}
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#814bf6]/5 blur-[120px] rounded-full pointer-events-none" />

                  <div className="flex flex-col gap-6 h-full">

                    {/* Top Row - Search and User Profile */}
                    <div className="flex items-center gap-4 w-full h-16 bg-[#814bf6] rounded-xl px-6">
                      <div className="flex items-center gap-3 text-white/70 w-full max-w-sm border border-white/20 rounded-full px-4 py-2 hover:border-white/40 transition-colors">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-white w-full placeholder:text-white/60 text-sm" />
                      </div>

                      <div className="ml-auto flex items-center gap-6">
                        <div className="flex items-center gap-4 text-white">
                          <svg className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>
                          <svg className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                          <svg className="w-5 h-5 cursor-pointer opacity-80 hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        </div>
                        <div className="h-6 w-px bg-white/20"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                          <span className="text-white text-sm font-semibold tracking-wide">SUPPORT AI ADMIN</span>
                          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white group-hover:border-white/50 transition-colors">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="User" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* KPI Cards Row */}
                    <div className="grid grid-cols-3 gap-6 min-h-[140px]">
                      {/* No Code Setup */}
                      <div className="bg-white rounded-xl p-5 flex flex-col justify-center gap-3 relative overflow-hidden group hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#814bf6]/10 flex items-center justify-center text-[#814bf6]">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <div>
                          <h3 className="text-gray-900 text-lg font-bold">No-Code Setup</h3>
                          <p className="text-gray-500 text-xs mt-1 leading-snug">
                            Launch a fully functional chatbot without writing a single line of code.
                          </p>
                        </div>
                      </div>

                      {/* Always Learning */}
                      <div className="bg-white rounded-xl p-5 flex flex-col justify-center gap-3 relative overflow-hidden group hover:shadow-lg transition-shadow border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#814bf6]/10 flex items-center justify-center text-[#814bf6]">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </div>
                        <div>
                          <h3 className="text-gray-900 text-lg font-bold">Always Learning</h3>
                          <p className="text-gray-500 text-xs mt-1 leading-snug">
                            The bot improves with every conversation, getting smarter over time.
                          </p>
                        </div>
                      </div>

                      {/* Reduce Support Load (Highlighted) */}
                      <div className="bg-[#814bf6] rounded-xl p-5 flex flex-col justify-center gap-3 text-white relative overflow-hidden shadow-[0_4px_20px_rgba(129,75,246,0.3)]">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white relative z-10">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                        </div>
                        <div className="relative z-10">
                          <h3 className="text-xl font-bold">Deflect Tickets</h3>
                          <p className="text-white/80 text-xs mt-1 leading-snug">
                            Resolve repetitive queries instantly so your team focuses on what matters.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Main Content Area - Split Layout */}
                    <div className="flex gap-6 flex-1 min-h-[300px]">

                      {/* Main Area - Chatbot Creation Steps */}
                      <div className="bg-white rounded-xl p-6 flex-1 flex flex-col border border-gray-100 shadow-sm relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                          <h4 className="font-bold text-gray-900">Build Your Chatbot</h4>
                          <div className="text-xs font-semibold text-[#814bf6] bg-[#814bf6]/10 px-3 py-1 rounded-full">4 Simple Steps</div>
                        </div>

                        <div className="flex-1 flex flex-col gap-3 justify-center">
                          {[
                            { step: "01", title: "Connect Your Knowledge Base", desc: "Upload FAQs, docs, or website URLs — the bot learns from your content." },
                            { step: "02", title: "Configure Tone & Behavior", desc: "Set the bot's name, language, fallback responses, and escalation rules." },
                            { step: "03", title: "Test Conversations", desc: "Run live test chats, review responses, and fine-tune accuracy before launch." },
                            { step: "04", title: "Embed on Your Website", desc: "Copy one line of code and your chat widget goes live on any webpage instantly." },
                          ].map((item, i, arr) => (
                            <div key={i} className="flex items-start gap-4 relative">
                              {i < arr.length - 1 && (
                                <div className="absolute left-[19px] top-10 w-px h-full bg-[#814bf6]/20 z-0" />
                              )}
                              <div className="w-10 h-10 rounded-full bg-[#814bf6] flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0 z-10">
                                {item.step}
                              </div>
                              <div className="flex-1 bg-[#f9f9fb] rounded-xl px-4 py-3 border border-gray-100">
                                <span className="font-bold text-gray-900 text-xs block mb-0.5">{item.title}</span>
                                <p className="text-gray-500 text-[11px] leading-snug">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Satisfaction & Sources */}
                      <div className="w-[30%] flex flex-col gap-6">

                        {/* Bot Capabilities Checklist */}
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex flex-col h-1/2">
                          <h4 className="font-bold text-gray-900 mb-4 text-center">Bot Capabilities</h4>
                          <div className="flex-1 flex flex-col gap-2.5 justify-center">
                            {[
                              "Answers FAQs automatically",
                              "Escalates to human agents",
                              "Learns from past chats",
                              "Supports multiple languages",
                            ].map((cap, i) => (
                              <div key={i} className="flex items-center gap-2.5">
                                <div className="w-5 h-5 rounded-full bg-[#814bf6]/10 flex items-center justify-center flex-shrink-0">
                                  <svg className="w-3 h-3 text-[#814bf6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                <span className="text-gray-700 text-xs font-medium">{cap}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Website Chat Widget Preview */}
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col flex-1">
                          <h4 className="font-bold text-gray-900 mb-4">Live Chat Widget</h4>
                          <div className="flex flex-col gap-2 flex-1 justify-between">
                            <div className="flex flex-col gap-2">
                              <div className="flex items-end gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-[#814bf6] flex-shrink-0 flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                                </div>
                                <div className="bg-[#814bf6]/10 text-gray-800 text-[10px] font-medium px-3 py-1.5 rounded-2xl rounded-bl-none">Hi! How can I help you today?</div>
                              </div>
                              <div className="flex justify-end">
                                <div className="bg-[#814bf6] text-white text-[10px] font-medium px-3 py-1.5 rounded-2xl rounded-br-none">What are your pricing plans?</div>
                              </div>
                              <div className="flex items-end gap-1.5">
                                <div className="w-5 h-5 rounded-full bg-[#814bf6] flex-shrink-0 flex items-center justify-center">
                                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
                                </div>
                                <div className="bg-[#814bf6]/10 text-gray-800 text-[10px] font-medium px-3 py-1.5 rounded-2xl rounded-bl-none">We have Free, Pro &amp; Business plans!</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 mt-2">
                              <input type="text" disabled placeholder="Type a message..." className="flex-1 bg-transparent text-[10px] text-gray-400 outline-none" />
                              <div className="w-5 h-5 rounded-full bg-[#814bf6] flex items-center justify-center flex-shrink-0">
                                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                              </div>
                            </div>
                          </div>
                        </div>

                       </div>
                    </div>

                  </div>
                </div>
              </div>
            </ContainerScroll>
          </section>
        </motion.div>
      </div>

      {/* Redesigned Features/Services Section (Mobius Inspired) */}
      <section id="features" className="py-24 md:py-40 px-4 bg-white relative z-20 shadow-[0_-30px_100px_rgba(0,0,0,0.8)] border-t border-gray-100 rounded-t-[40px] md:rounded-t-[60px] -mt-10 font-sans">
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 border-t border-gray-100 opacity-50 rounded-t-[40px] md:rounded-t-[60px] overflow-hidden bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)]" 
        />
        
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row relative z-10 gap-16 lg:gap-0">
          
          {/* Left Column - Sticky on Desktop */}
          <div className="w-full lg:w-[35%] lg:sticky lg:top-40 h-fit flex flex-col pr-8 z-10">
            <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight text-black mb-8 relative flex items-center gap-4">
              <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
              Core Features
            </h2>
            <div className="lg:mt-[50vh] mt-10">
              <p className="text-gray-500 font-medium text-lg leading-snug max-w-sm mb-6">
                If you're looking for operational clarity and intelligent automation, let's build it together.
              </p>
            </div>
          </div>

          {/* Right Column - Scrolling Feature Blocks */}
          <div className="w-full lg:w-[65%] flex flex-col gap-32 md:gap-48 lg:pl-12">
             
             {/* Feature A */}
             <div className="flex flex-col relative w-full">
               <div className="absolute -left-4 lg:-left-20 -top-8 lg:-top-12 text-[6rem] md:text-[9rem] font-bold text-black/5 leading-none select-none tracking-tighter">A /</div>
               <h3 className="text-4xl md:text-[3.25rem] lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-black mb-10 relative z-10">
                 Train your chatbot on your own content and watch it answer questions like a pro from day one.
               </h3>
               <div className="flex flex-wrap gap-3 relative z-10">
                 {["Upload Docs & FAQs", "Website Scraping", "Custom Q&A", "Knowledge Base"].map((tag, i) => (
                    <span key={i} className="px-5 py-2.5 rounded-full bg-[#f4f4f5] text-black font-bold text-[13px] hover:bg-gray-200 transition-colors cursor-default tracking-wide uppercase">
                      {tag}
                    </span>
                 ))}
               </div>
             </div>

             {/* Feature B */}
             <div className="flex flex-col relative w-full">
               <div className="absolute -left-4 lg:-left-20 -top-8 lg:-top-12 text-[6rem] md:text-[9rem] font-bold text-black/5 leading-none select-none tracking-tighter">B /</div>
               <h3 className="text-4xl md:text-[3.25rem] lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-black mb-10 relative z-10">
                 Set up chat flows, auto-replies, and hand off to a human agent when the bot needs backup.
               </h3>
               <div className="flex flex-wrap gap-3 relative z-10">
                 {["Auto Replies", "Chat Flows", "Human Handoff", "Fallback Messages"].map((tag, i) => (
                    <span key={i} className="px-5 py-2.5 rounded-full bg-[#f4f4f5] text-black font-bold text-[13px] hover:bg-gray-200 transition-colors cursor-default tracking-wide uppercase">
                      {tag}
                    </span>
                 ))}
               </div>
             </div>

             {/* Feature C */}
             <div className="flex flex-col relative w-full pb-20">
               <div className="absolute -left-4 lg:-left-20 -top-8 lg:-top-12 text-[6rem] md:text-[9rem] font-bold text-black/5 leading-none select-none tracking-tighter">C /</div>
               <h3 className="text-4xl md:text-[3.25rem] lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-black mb-10 relative z-10">
                 Go live on your website in minutes — just paste one line of code and the chat widget appears instantly.
               </h3>
               <div className="flex flex-wrap gap-3 relative z-10">
                  {["1-Click Deploy", "Website Widget", "Copy-Paste Script", "Any Page"].map((tag, i) => (
                    <span key={i} className="px-5 py-2.5 rounded-full bg-[#f4f4f5] text-black font-bold text-[13px] hover:bg-gray-200 transition-colors cursor-default tracking-wide uppercase">
                      {tag}
                    </span>
                 ))}
               </div>
             </div>

          </div>
          
        </div>
      </section>
      {/* Redesigned AI Training Section matching Framer UI */}
      <motion.section 
        id="training"
        ref={trainingWrapperRef}
        style={{ y: trainingWrapperY, scale: trainingWrapperScale }}
        className="pt-24 pb-64 px-4 bg-[#fcfcfc] text-black relative flex flex-col items-center overflow-hidden min-h-screen font-sans border-t border-gray-200 z-10"
      >


        {/* Main Headline */}
        <motion.div
          style={{ y: headlineY, opacity: headlineOpacity, zIndex: 10 }}
          className="relative text-center max-w-3xl px-4 mb-20 flex flex-col items-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[3.5rem] md:text-[5.5rem] font-medium tracking-tight text-[#09090b] leading-[1.05] drop-shadow-sm flex flex-col items-center"
          >
            <span>Reimagine How</span>
            <span>You Interact With</span>
            <span>AI Training</span>
          </motion.h2>
        </motion.div>

        {/* Floating Phone with Scroll Animation */}
        <div className="relative w-full max-w-[300px] md:max-w-[340px] perspective-[1200px]" style={{ zIndex: 20 }} ref={trainingRef}>

          {/* Crystal Pink/Purple Glow Behind Phone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[130%] h-[100%] md:h-[110%] z-0 pointer-events-none flex justify-center items-center">
            <motion.div
              style={{ opacity: glowOpacity, scale: glowScale }}
              className="w-full h-full bg-gradient-to-tr from-[#ff66cc]/85 via-[#9966ff]/60 to-[#ff99cc]/20 blur-[50px] md:blur-[70px] rounded-[60px]"
            />
          </div>

          {/* Floating Feature Cards (Behind Phone, fan out) */}
          {/* Card 1 */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <motion.div style={{ x: card1X, y: card1Y, opacity: cardsOpacity, rotate: -8 }} className="flex items-center justify-between w-[220px] bg-[#fbf5eedd] backdrop-blur-md border border-[#e8dccb] rounded-xl p-3 shadow-sm transform-gpu transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <span className="text-yellow-600 font-bold text-xs"><Bot size={14} /></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Knowledge</span>
                  <span className="text-xs text-gray-400">Synced</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-700">100%</span>
                <span className="text-xs text-gray-400 font-mono">Fast</span>
              </div>
            </motion.div>
          </div>

          {/* Card 2 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <motion.div style={{ x: card2X, y: card2Y, opacity: cardsOpacity, rotate: -12 }} className="flex items-center justify-between w-[200px] bg-[#fbf5eedd] backdrop-blur-md border border-[#e8dccb] rounded-xl p-3 shadow-sm transform-gpu transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xs"><Zap size={14} /></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Answers</span>
                  <span className="text-xs text-gray-400">Resolved</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-700">Instant</span>
                <span className="text-xs text-gray-400 font-mono">-0ms</span>
              </div>
            </motion.div>
          </div>

          {/* Card 3 */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <motion.div style={{ x: card3X, y: card3Y, opacity: cardsOpacity, rotate: -4 }} className="flex items-center justify-between w-[220px] bg-[#fbf5eedd] backdrop-blur-md border border-[#e8dccb] rounded-xl p-3 shadow-sm transform-gpu transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-green-600 font-bold text-xs"><Shield size={14} /></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Security</span>
                  <span className="text-xs text-gray-400">Verified</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-700">Active</span>
              </div>
            </motion.div>
          </div>

          {/* Card 4 (Right) */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <motion.div style={{ x: card4X, y: card4Y, opacity: cardsOpacity, rotate: 6 }} className="flex items-center justify-between w-[220px] bg-[#fbf5eedd] backdrop-blur-md border border-[#e8dccb] rounded-xl p-3 shadow-sm transform-gpu transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-xs"><TrendingUp size={14} /></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Widget</span>
                  <span className="text-xs text-gray-400">Embedded</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-700">Ready</span>
              </div>
            </motion.div>
          </div>

          {/* Card 5 (Right) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <motion.div style={{ x: card5X, y: card5Y, opacity: cardsOpacity, rotate: 12 }} className="flex items-center justify-between w-[200px] bg-[#fbf5eedd] backdrop-blur-md border border-[#e8dccb] rounded-xl p-3 shadow-sm transform-gpu transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                  <span className="text-rose-600 font-bold text-xs"><Sparkles size={14} /></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Support</span>
                  <span className="text-xs text-gray-400">Queries</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-700">Live</span>
              </div>
            </motion.div>
          </div>

          {/* Card 6 (Right) */}
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 z-10 hidden md:block">
            <motion.div style={{ x: card6X, y: card6Y, opacity: cardsOpacity, rotate: 5 }} className="flex items-center justify-between w-[220px] bg-[#fbf5eedd] backdrop-blur-md border border-[#e8dccb] rounded-xl p-3 shadow-sm transform-gpu transition-all">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-xs">AI</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">Responses</span>
                  <span className="text-xs text-gray-400">Instant</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-gray-700">Auto</span>
              </div>
            </motion.div>
          </div>

          {/* The Image Itself (Z-20 to be above the glow and cards) */}
          <motion.div
            style={{
              y: phoneY,
              rotateX: phoneRotate,
              scale: phoneScale
            }}
            className="relative z-20 w-full transform-gpu"
          >
            <img
              src="/Gemini_Generated_Image_d138dkd138dkd138.png"
              alt="App Interface"
              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
            />
          </motion.div>

        </div>

        {/* Bottom Text and Button */}
        {/* <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} 
           className="relative z-10 flex flex-col items-center text-center max-w-sm px-4 mt-12 md:mt-16"
        // >
        //    <p className="text-[#52525b] text-[15px] font-medium mb-8 leading-snug tracking-tight">
        //      From transactions to integrations — explore every corner of the AI universe with ease.
        //    </p>
        //    <button className="bg-[#ff5500] text-white px-8 py-3.5 rounded-full font-semibold text-sm shadow-[0_4px_14px_0_rgba(255,85,0,0.39)] hover:shadow-[0_6px_20px_rgba(255,85,0,0.23)] hover:-translate-y-0.5 transition-all outline-none">
        //      Download for free
        //    </button>
           
        </motion.div> */}

      </motion.section>



      {/* Xtract Call To Action Footer */}
      <section className="relative w-full bg-[#f8f9fa] z-40 px-4 pb-12 pt-10 overflow-hidden">
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40
          bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] md:bg-[size:6rem_6rem]" 
        />
        
        <div className="relative w-full bg-black rounded-[40px] md:rounded-[80px] overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.6)] border border-white/10 z-10">
          <LampContainer className="bg-black pt-16 md:pt-32">
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-white to-gray-400 py-4 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-6xl lg:text-7xl max-w-4xl leading-[1.1]"
          >
            Let AI do the heavy lifting <br /> while you scale.
          </motion.h1>
          <motion.button 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
            className="mt-10 h-14 px-10 rounded-full bg-[#814bf6] text-white font-semibold hover:bg-[#6e3dde] transition-colors relative z-10 shadow-[0_4px_30px_rgba(129,75,246,0.5)] text-lg"
          >
            Create
          </motion.button>
        </LampContainer>
        </div>
      </section>

    </div>
  );
}
