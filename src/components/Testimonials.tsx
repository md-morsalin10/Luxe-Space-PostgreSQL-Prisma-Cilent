"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    quote: "Finding a home that matches our lifestyle was seamless with LuxeSpace. Their attention to architectural detail and privacy is unmatched.",
    name: "Sarah Jenkins",
    role: "Chief Executive, Innovate Corp",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 2,
    quote: "The advisory service gave us deep insights into the Mediterranean market. A truly elite experience from start to finish.",
    name: "David Vance",
    role: "Real Estate Investor",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: 3,
    quote: "Every property in their portfolio is a masterpiece. They didn't just sell us a penthouse; they delivered an absolute legacy.",
    name: "Elena Rostova",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // সেকশন হেডার অ্যানিমেশন (Fade & Slide Up)
      gsap.fromTo(".reveal-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".reveal-header",
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );

      // টেস্টিমোনিয়াল কার্ডগুলোর জন্য স্ট্যাগার্ড এন্ট্রান্স অ্যানিমেশন
      gsap.fromTo(".testimonial-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-16 bg-[#f8f9fb] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* 📣 সেকশন হেডার */}
        <div className="reveal-header opacity-0 text-center mb-16 flex flex-col items-center">
          <span className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-2">
            Respected Voices
          </span>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Client Testimonials
          </h2>
          <div className="w-12 h-[2px] bg-amber-600 mt-4"></div>
        </div>

        {/* 📦 টেস্টিমোনিয়াল কার্ড গ্রিড */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div 
              key={t.id} 
              className="testimonial-card opacity-0 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between text-left hover:shadow-xl hover:border-transparent transition-all duration-500 group will-change-transform"
            >
              {/* কোটেশন এস্কেপ ফিক্স করা হয়েছে */}
              <p className="text-gray-600 text-sm font-light italic leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-11 h-11 rounded-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" 
                />
                <div>
                  <h4 className="text-gray-900 font-semibold text-sm group-hover:text-amber-700 transition-colors duration-300">
                    {t.name}
                  </h4>
                  <p className="text-gray-400 text-xs font-light">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Testimonials;