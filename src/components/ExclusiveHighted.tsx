"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAP প্লাগইন রেজিস্টার করা হলো
gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    id: 1,
    title: "Coastal Sanctuaries",
    subtitle: "Waterfront living redefined across Mediterranean shores.",
    // প্রিমিয়াম কোস্টাল আর্কিটেকচার ইমেজ
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    gridClass: "md:col-span-8 h-[300px]"
  },
  {
    id: 2,
    title: "Urban Icons",
    subtitle: "Defining horizons in global metropolises.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    gridClass: "md:col-span-4 h-[300px]"
  },
  {
    id: 3,
    title: "Heritage Estates",
    subtitle: "Preserving the soul of classic architecture.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    gridClass: "md:col-span-4 h-[320px]"
  },
  {
    id: 4,
    title: "Alpine Retreats",
    subtitle: "Serenity found at the world's highest peaks.",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    gridClass: "md:col-span-8 h-[320px]"
  }
];

const ExclusiveHighlighted = () => {
  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // সেকশন হেডার অ্যানিমেশন
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

      // বেন্টো গ্রিড আইটেমগুলোর স্ট্যাগার্ড এন্ট্রান্স অ্যানিমেশন
      gsap.fromTo(".bento-item", 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".grid-container",
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, componentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={componentRef} className="py-20 px-6 md:px-16 bg-[#f8f9fb] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* সেকশন হেডার (View All রিমুভড) */}
        <div className="reveal-header opacity-0 flex flex-col justify-between items-start mb-10 gap-4">
          <div>
            <span className="text-amber-600 text-[11px] font-bold uppercase tracking-widest block mb-1">
              Curated Experiences
            </span>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-serif font-bold tracking-tight">
              Exclusive Collections
            </h2>
          </div>
        </div>

        {/* বেন্টো গ্রিড লেআউট */}
        <div className="grid-container grid grid-cols-1 md:grid-cols-12 gap-6">
          {collections.map((item) => (
            <div
              key={item.id}
              className={`bento-item opacity-0 relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500 group cursor-pointer ${item.gridClass}`}
            >
              {/* ব্যাকগ্রাউন্ড ইমেজ (Luxury Scale Down-to-Up Hover Effect) */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* গ্রাডিয়েন্ট ওভারলে */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-500 group-hover:opacity-95" />

              {/* কন্টেন্ট টেক্সট */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end text-left z-10">
                <h3 className="text-white font-serif font-bold text-xl md:text-2xl mb-1.5 drop-shadow-sm group-hover:text-amber-300 transition-colors duration-300">
                  {item.title}
                </h3>
                {/* সাবটাইটেল হোভারে সামান্য ওপরে পুশ হবে */}
                <p className="text-gray-200 text-xs md:text-sm font-light max-w-md opacity-90 leading-relaxed transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExclusiveHighlighted;