"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  {
    id: 1,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Property Sales & Brokerage",
    description: "Exclusive access to premium listings, tailored negotiations, and seamless transition support for high-end properties worldwide."
  },
  {
    id: 2,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Luxury Rentals & Leasing",
    description: "Curated rental collections featuring short-term stays, corporate housing, and long-term luxury residences in prime metropolitan hubs."
  },
  {
    id: 3,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Market Valuation & Advisory",
    description: "Deep data-driven property analysis and luxury real estate insights provided by our top tier industry financial specialists."
  }
];

const Services = () => {
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

      // সার্ভিস কার্ডগুলোর জন্য স্ট্যাগার্ড এন্ট্রান্স অ্যানিমেশন
      gsap.fromTo(".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-16 bg-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* 📋 সেকশন হেডার */}
        <div className="reveal-header opacity-0 text-center mb-16 flex flex-col items-center">
          <span className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-2">
            What We Offer
          </span>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Our Elite Services
          </h2>
          <div className="w-12 h-[2px] bg-amber-600 mt-4"></div>
        </div>

        {/* 📦 ৩ কলামের রেসপন্সিভ সার্ভিস গ্রিড */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id}
              className="service-card opacity-0 bg-zinc-50/50 p-8 md:p-10 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-transparent transition-all duration-500 group text-left flex flex-col justify-between will-change-transform"
            >
              <div>
                {/* আইকন বক্স */}
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                  {service.icon}
                </div>

                {/* সার্ভিস টাইটেল */}
                <h3 className="text-gray-900 font-serif font-bold text-xl mb-3 group-hover:text-amber-700 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* ডেসক্রিপশন */}
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* "Learn More" লিংক */}
              <a 
                href="#contact" 
                className="text-xs font-semibold uppercase tracking-wider text-gray-900 hover:text-amber-600 flex items-center gap-2 transition-colors group/btn pt-2 cursor-pointer"
              >
                <span>Learn More</span>
                <svg 
                  className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;