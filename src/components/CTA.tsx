"use client";
import React, { useEffect, useRef } from 'react';
import { Button } from '@heroui/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ১. ব্যাকগ্রাউন্ড গ্লো ইফেক্টের জন্য একটি সফট পালস অ্যানিমেশন
      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // ২. কন্টেন্ট এলিমেন্টগুলোর জন্য স্ক্রোল-ট্রিগার রিভিল টাইমলাইন
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(".reveal-heading", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".reveal-subtitle", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(".reveal-btn-group", 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-16 bg-[#f8f9fb] w-full text-center border-t border-gray-100 relative overflow-hidden">
      
      {/* 🌟 ব্যাকগ্রাউন্ডে অ্যানিমেটেড লাক্সারি গ্লো শেড */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none will-change-transform" 
      />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center space-y-6">
        
        {/* মেইন হেডিং এবং সাবটাইটেল */}
        <div className="space-y-3">
          <h2 className="reveal-heading opacity-0 text-gray-900 text-3xl md:text-5xl font-serif font-bold tracking-tight">
            Begin Your Journey
          </h2>
          <p className="reveal-subtitle opacity-0 text-gray-500 text-sm md:text-base font-light italic leading-relaxed tracking-wide">
            We are ready to guide you toward your next architectural masterpiece.
          </p>
        </div>

        {/* ডুয়াল অ্যাকশন বাটন গ্রুপ */}
        <div className="reveal-btn-group opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
          {/* সলিড ডার্ক লাক্সারি বাটন */}
          <Button
            size="lg"
            className="w-full sm:w-auto bg-[#0f172a] hover:bg-gray-800 text-white font-semibold text-xs uppercase tracking-widest px-8 h-12 shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            Contact Concierge
          </Button>

          {/* লাইট বর্ডারড বাটন (HeroUI variant="outline" ফিক্সড) */}
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-gray-300 hover:border-gray-900 text-gray-800 hover:text-gray-900 font-semibold text-xs uppercase tracking-widest px-8 h-12 transition-all bg-white/50 backdrop-blur-sm active:scale-[0.98] cursor-pointer"
          >
            Download Portfolio
          </Button>
        </div>

      </div>
    </section>
  );
};

export default CTA;