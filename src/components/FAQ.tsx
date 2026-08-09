"use client";
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: 1,
    question: "How do I schedule a private viewing for a featured estate?",
    answer: "You can schedule a private viewing by clicking the 'Contact Agent' button on the specific property page or by reaching out via our elite advisory desk. We arrange personalized, confidential tours for registered clients."
  },
  {
    id: 2,
    question: "Are the property prices inclusive of brokerage fees?",
    answer: "All listed property prices represent the current market evaluation. Transaction specifics, legal advisory costs, and brokerage adjustments are detailed comprehensively during your initial consultation with our agents."
  },
  {
    id: 3,
    question: "Do you offer international legal assistance for foreign buyers?",
    answer: "Yes, LuxeSpace provides full transactional support, including cross-border legal advisory, currency routing compliance, and residency documentation through our network of international real estate attorneys."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(null);
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

      // এফএকিউ আইটেমগুলোর স্ট্যাগার্ড এন্ট্রান্স অ্যানিমেশন
      gsap.fromTo(".faq-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".faq-container",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // অ্যাকর্ডিয়ন ওপেন/ক্লোজ অ্যানিমেশন হ্যান্ডলার
  const handleToggle = (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    const isOpening = openId !== id;
    setOpenId(isOpening ? id : null);

    const button = e.currentTarget;
    const content = button.nextElementSibling as HTMLDivElement;
    const icon = button.querySelector(".faq-icon");

    if (!content) return;

    if (isOpening) {
      // বাকি সব খোলা কন্টেন্ট বন্ধ করার জন্য
      gsap.to(".faq-content", { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      gsap.to(".faq-icon", { rotate: 0, duration: 0.3 });

      // নির্দিষ্ট কন্টেন্ট ওপেন করার জন্য
      gsap.fromTo(content,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      if (icon) gsap.to(icon, { rotate: 45, duration: 0.3, ease: "power2.out" });
    } else {
      // কন্টেন্ট ক্লোজ করার জন্য
      gsap.to(content, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" });
      if (icon) gsap.to(icon, { rotate: 0, duration: 0.3, ease: "power2.inOut" });
    }
  };

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-16 bg-white w-full overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* 📣 সেকশন হেডার */}
        <div className="reveal-header opacity-0 text-center mb-16 flex flex-col items-center">
          <span className="text-amber-600 text-[11px] font-bold uppercase tracking-widest mb-2">
            Questions & Answers
          </span>
          <h2 className="text-gray-900 text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-[2px] bg-amber-600 mt-4"></div>
        </div>

        {/* 📦 এফএকিউ লিস্ট কন্টেইনার */}
        <div className="faq-container space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="faq-item opacity-0 border-b border-gray-100 pb-4 text-left">
              <button
                onClick={(e) => handleToggle(faq.id, e)}
                className="w-full flex justify-between items-center py-4 text-gray-900 hover:text-amber-700 font-serif font-bold text-base md:text-lg focus:outline-none transition-colors duration-300 group cursor-pointer"
              >
                <span>{faq.question}</span>
    
                <span className="faq-icon text-amber-600 text-2xl font-light inline-block transform will-change-transform">
                  +
                </span>
              </button>
              
              <div className="faq-content h-0 opacity-0 overflow-hidden will-change-[height,opacity]">
                <p className="text-gray-500 text-sm font-light leading-relaxed pt-2 pb-4 pr-6">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;