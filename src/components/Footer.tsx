"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const pathName = usePathname();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // যদি ড্যাশবোর্ড হয় তাহলে অ্যানিমেশন চালানোর প্রয়োজন নেই
    if (pathName.includes("dashboard")) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });

      // ৪টি মেইন কলামের স্ট্যাগার্ড অ্যানিমেশন
      tl.fromTo(".footer-col",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out"
        }
      )
      // বটম কপিরাইট এরিয়ার ফেড-ইন অ্যানিমেশন
      .fromTo(".footer-bottom",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }, footerRef);

    return () => ctx.revert();
  }, [pathName]);

  if (pathName.includes("dashboard")) {
    return null;
  }

  return (
    <footer ref={footerRef} className="bg-[#0b1320] text-gray-400 font-sans pt-16 pb-8 px-6 md:px-16 w-full text-left overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* 📦 মেইন ৪-কলাম গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-gray-800">
          
          {/* কলাম ১: ব্র্যান্ড ইনফো (LuxeSpace) */}
          <div className="footer-col opacity-0 lg:col-span-4 space-y-5">
            <h3 className="text-white font-serif font-bold text-2xl tracking-wide">
              LuxeSpace
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
              Redefining luxury living through spatial sophistication and architectural heritage since 1994.
            </p>
            {/* সোশ্যাল আইকনস */}
            <div className="flex items-center space-x-4 pt-2">
              <button className="hover:text-amber-500 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
              </button>
              <button className="hover:text-amber-500 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
                </svg>
              </button>
              <button className="hover:text-amber-500 transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </button>
            </div>
          </div>

          {/* কলাম ২: NAVIGATE */}
          <div className="footer-col opacity-0 lg:col-span-2 space-y-4">
            <h4 className="text-[#c4a468] text-xs font-bold tracking-widest uppercase">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><a href="#collections" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Properties</a></li>
              <li><a href="#about" className="hover:text-white border-b border-[#c4a468] pb-0.5 text-white">About Us</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Meet the Team</a></li>
            </ul>
          </div>

          {/* কলাম ৩: RESOURCES */}
          <div className="footer-col opacity-0 lg:col-span-2 space-y-4">
            <h4 className="text-[#c4a468] text-xs font-bold tracking-widest uppercase">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm font-light">
              <li><a href="#newsletter" className="hover:text-white transition-colors">Newsletter</a></li>
              <li><a href="#insights" className="hover:text-white transition-colors">Market Insights</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Legal Terms</a></li>
            </ul>
          </div>

          {/* কলাম ৪: NEWSLETTER FORM */}
          <div className="footer-col opacity-0 lg:col-span-4 space-y-4">
            <h4 className="text-[#c4a468] text-xs font-bold tracking-widest uppercase">
              Newsletter
            </h4>
            <p className="text-gray-400 text-sm font-light max-w-xs">
              Receive curated properties directly to your inbox.
            </p>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full max-w-sm mt-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full h-11 bg-[#162235] border border-gray-800 focus:border-amber-600 focus:outline-none rounded-l text-white text-sm px-4 placeholder:text-gray-600 transition-colors"
              />
              <button 
                type="submit" 
                className="h-11 px-4 bg-[#866528] hover:bg-amber-600 text-white rounded-r flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              >
                <svg className="w-4 h-4 transform rotate-45 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </form>
          </div>

        </div>

        {/* 📑 বটম কপিরাইট এরিয়া */}
        <div className="footer-bottom opacity-0 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-light text-gray-500 gap-4">
          <div>
            <p>&copy; {new Date().getFullYear()} LuxeSpace. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#cookies" className="hover:text-gray-400 transition-colors">Cookies</a>
            <a href="#accessibility" className="hover:text-gray-400 transition-colors">Accessibility</a>
            <a href="#sitemap" className="hover:text-gray-400 transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;