"use client";
import React, { useEffect, useRef } from 'react';
import { Button } from '@heroui/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ১. বাম পাশের ওভারল্যাপিং ইমেজে প্যারালাক্স ও এন্ট্রান্স ইফেক্ট
      gsap.fromTo(mainImageRef.current,
        { opacity: 0, x: -50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mainImageRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      gsap.fromTo(secondaryImageRef.current,
        { opacity: 0, x: 40, y: 40 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: mainImageRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      // হালকা স্ক্রোল প্যারালাক্স ইফেক্ট ইমেজ দুটির জন্য
      gsap.to(mainImageRef.current, {
        y: -20,
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(secondaryImageRef.current, {
        y: -45,
        scrollTrigger: {
          trigger: componentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // ২. ডান পাশের টেক্সট কন্টেন্ট ও ফিচারের স্ট্যাগার্ড এন্ট্রান্স
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".reveal-content-trigger",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      tl.fromTo(".reveal-badge", 
        { opacity: 0, y: -15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      )
      .fromTo(".reveal-heading", 
        { opacity: 0, y: 25 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(".reveal-text", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(".reveal-feature", 
        { opacity: 0, scale: 0.95 }, 
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(".reveal-btn", 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.2"
      );

    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="py-24 px-6 md:px-16 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* 🌄 বাম পাশ: মডার্ন ওভারল্যাপিং ইমেজ লেআউট উইথ প্যারালাক্স */}
        <div className="lg:col-span-6 relative w-full h-[450px] md:h-[550px] flex items-center justify-center">
          {/* মেইন বড় ইমেজ */}
          <div 
            ref={mainImageRef}
            className="absolute top-0 left-0 w-[75%] h-[85%] rounded-2xl overflow-hidden shadow-xl z-10 opacity-0 will-change-transform"
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
              alt="Luxury Interior" 
              className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>
          
          {/* ওভারল্যাপড ছোট ইমেজ */}
          <div 
            ref={secondaryImageRef}
            className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-2xl overflow-hidden shadow-2xl z-20 border-[6px] border-white opacity-0 will-change-transform"
          >
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" 
              alt="Modern Building Exterior" 
              className="w-full h-full object-cover transform scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
            />
          </div>

          {/* ডেকোরেティブ গোল্ডেন আর্ট বক্স */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-100 rounded-2xl -z-10 opacity-60 hidden md:block" />
        </div>

        {/* 📜 ডান পাশ: ব্র্যান্ড স্টোরি ও কন্টেন্ট অ্যানিমেশন */}
        <div className="reveal-content-trigger lg:col-span-6 flex flex-col justify-center text-left space-y-6">
          <div>
            <span className="reveal-badge text-amber-600 text-[11px] font-bold uppercase tracking-widest block mb-2 opacity-0">
              Our Legacy
            </span>
            <h2 className="reveal-heading text-gray-900 text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight opacity-0">
              Crafting Exceptional Living Experiences
            </h2>
          </div>

          <p className="reveal-text text-gray-600 text-sm md:text-base font-light leading-relaxed opacity-0">
            At LuxeSpace, we believe that a home is more than just spaces and walls; it is a reflection of your legacy and lifestyle. For over a decade, we have been connecting visionary individuals with the world’s most prestigious architectural marvels.
          </p>

          <p className="reveal-text text-gray-600 text-sm font-light leading-relaxed opacity-0">
            Our curated portfolio spans from sun-drenched Mediterranean villas to ultra-modern metropolitan penthouses, each handpicked to fulfill the highest standards of luxury, privacy, and sophistication.
          </p>

          {/* কি-ফিচার লিস্ট */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="reveal-feature flex items-start space-x-3 opacity-0">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 flex-shrink-0 mt-0.5">
                ✨
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold text-sm">Unmatched Quality</h4>
                <p className="text-gray-500 text-xs mt-0.5 font-light">Every property meets strict luxury benchmarks.</p>
              </div>
            </div>

            <div className="reveal-feature flex items-start space-x-3 opacity-0">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600 flex-shrink-0 mt-0.5">
                🤝
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold text-sm">Elite Agent Network</h4>
                <p className="text-gray-500 text-xs mt-0.5 font-light">Personalized, private guidance at every step.</p>
              </div>
            </div>
          </div>

          {/* Hero UI CTA Button */}
          <div className="pt-4">
            <Button
              size="lg"
              className="reveal-btn bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 h-12 shadow-md active:scale-95 transition-all opacity-0 cursor-pointer"
            >
              Learn More About Us
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;