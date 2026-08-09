"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@heroui/react';
import gsap from 'gsap';

const slides = [
    {
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
        title: "The Architecture of Living",
        subtitle: "Find your signature luxury property tailored precisely to your modern lifestyle."
    },
    {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80",
        title: "Discover Your Modern Oasis",
        subtitle: "Exclusive minimalist spaces designed for premium urban comfort and elegance."
    },
    {
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
        title: "Luxury Spaces Redefined",
        subtitle: "Experience upscale living with our world-class handpicked real estate collection."
    }
];

const stats = [
    { value: "500+", label: "Luxury Homes" },
    { value: "120+", label: "Premium Villas" },
    { value: "25+", label: "Awards Won" }
];

const Banner: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    // GSAP Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    // স্লাইড অটো-প্লে ইন্টারভাল
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000); // অ্যানিমেশন স্মুথ ফিল দেওয়ার জন্য টাইম সামান্য বাড়ানো হয়েছে
        return () => clearInterval(interval);
    }, []);

    // ১. ফার্স্ট টাইম লোড অ্যানিমেশন (Initial Entrance)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(".reveal-badge",
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
            )
                .fromTo(".reveal-btn",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" },
                    "-=0.3"
                )
                .fromTo(".reveal-stat",
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
                    "-=0.4"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // ২. স্লাইড পরিবর্তনের সাথে টেক্সট রিভিল অ্যানিমেশন (Slide Transition)
    useEffect(() => {
        const ctx = gsap.context(() => {
            // টাইটেল অ্যানিমেশন
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" }
            );

            // সাবটাইটেল অ্যানিমেশন
            gsap.fromTo(subtitleRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: "power3.out" }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [currentSlide]);

    return (
        <div
            ref={containerRef}
            className="relative h-[85vh] w-full flex items-center justify-start px-6 md:px-16 overflow-hidden bg-gray-900"
        >
            {/* ব্যাকগ্রাউন্ড স্লাইডার ইমেজ (Zoom/Scale Effect) */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.85) 40%, rgba(0, 0, 0, 0.25) 100%), url('${slide.image}')`,
                        opacity: index === currentSlide ? 1 : 0,
                        zIndex: index === currentSlide ? 1 : 0,
                        transform: index === currentSlide ? 'scale(1)' : 'scale(1.08)',
                        transition: 'opacity 1000ms ease-in-out, transform 6000ms ease-out'
                    }}
                />
            ))}

            {/* কন্টেন্ট এরিয়া */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col justify-center text-left space-y-8 mt-10">

                {/* মেইন হেডিংস */}
                <div className="space-y-4">
                    <span className="reveal-badge text-[#fcd34d] font-semibold text-sm tracking-widest uppercase block opacity-0">
                        Welcome to LuxeSpace
                    </span>

                    <h1
                        ref={titleRef}
                        className="text-white text-4xl md:text-6xl font-serif font-bold tracking-tight drop-shadow-md max-w-2xl leading-tight dynamic-title"
                    >
                        {slides[currentSlide].title}
                    </h1>

                    <p
                        ref={subtitleRef}
                        className="text-gray-300 text-base md:text-lg max-w-xl font-light leading-relaxed dynamic-subtitle"
                    >
                        {slides[currentSlide].subtitle}
                    </p>
                </div>

                {/* অ্যাকশন বাটনস */}
                <div className="flex flex-wrap gap-4">
                    <Button
                        size="lg"
                        className="reveal-btn opacity-0 bg-[#fcd34d] hover:bg-[#fbbf24] text-gray-900 font-semibold px-8 h-12 shadow-lg active:scale-95 transition-all cursor-pointer"
                    >
                        Explore Properties
                    </Button>
                    <Button
                        size="lg"
                        variant="outline" // 'bordered' পরিবর্তন করে 'outline' করা হয়েছে
                        className="reveal-btn opacity-0 text-white border-white/40 hover:border-white hover:bg-white/10 font-medium px-8 h-12 active:scale-95 transition-all cursor-pointer"
                    >
                        Contact Agent
                    </Button>
                </div>

                {/* রিয়েল এস্টেট লাইভ স্ট্যাটস কাউন্টার */}
                <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md">
                    {stats.map((stat, i) => (
                        <div key={i} className="reveal-stat opacity-0 text-left">
                            <h4 className="text-white text-2xl md:text-3xl font-bold font-serif">
                                {stat.value}
                            </h4>
                            <p className="text-gray-400 text-xs md:text-sm mt-1 font-light">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Banner;