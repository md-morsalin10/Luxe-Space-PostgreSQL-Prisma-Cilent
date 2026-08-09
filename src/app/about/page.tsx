"use client";
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LayoutSideContent, Compass, ShieldCheck } from "@gravity-ui/icons";
import { BiTrophy } from 'react-icons/bi';

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const statsContainerRef = useRef<HTMLDivElement>(null);

    // ব্র্যান্ডের মূল ভ্যালু বা বৈশিষ্ট্য
    const coreValues = [
        {
            icon: <Compass className="w-6 h-6 text-[#b89452]" />,
            title: "Expert Curation",
            description: "We handpick every architectural masterpiece, ensuring unparalleled historical and aesthetic value."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-[#b89452]" />,
            title: "Absolute Discretion",
            description: "Providing secure, private, and highly confidential brokerage services to our elite global clientele."
        },
        {
            icon: <BiTrophy className="w-6 h-6 text-[#b89452]" />,
            title: "Legacy & Heritage",
            description: "Connecting modern visionaries with historic properties that stand the test of time."
        }
    ];

    // স্ট্যাটিস্টিকস ডেটা
    const stats = [
        { value: 4.2, label: "Property Portfolio", suffix: "B+" },
        { value: 120, label: "Heritage Estates", suffix: "+" },
        { value: 24, label: "Global Capitals", suffix: "+" },
        { value: 98, label: "Client Retention", suffix: "%" }
    ];

    useEffect(() => {
        // ১. হিরো সেকশন প্যারালাক্স ও এন্ট্রান্স এনিমেশন (GSAP)
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-content", 
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.2 }
            );

            gsap.to(".hero-bg", {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // ২. স্ট্যাটস কাউন্টার এনিমেশন (GSAP Number Counter)
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((el) => {
                const targetVal = parseFloat(el.getAttribute('data-target') || '0');
                gsap.fromTo(el, 
                    { textContent: "0" },
                    {
                        textContent: targetVal,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: statsContainerRef.current,
                            start: "top 85%",
                            toggleActions: "play none none none"
                        },
                        snap: { textContent: targetVal % 1 === 0 ? 1 : 0.1 },
                    }
                );
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    // Framer Motion Variants (Explicit TypeScript Types added)
    const fadeInUpVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
        }
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.15 }
        }
    };

    return (
        <div className="bg-[#FAF9F6] text-slate-900 min-h-screen selection:bg-amber-100 selection:text-black overflow-hidden">
            
            {/* ১. লাইট মিনিমালিস্ট হিরো সেকশন (GSAP Parallax) */}
            <section ref={heroRef} className="relative h-[55vh] flex items-center justify-center overflow-hidden border-b border-slate-200">
                <div className="absolute inset-0 hero-bg w-full h-[120%] -top-[10%]">
                    <Image
                        fill
                        priority
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
                        alt="Luxury Estate Architecture"
                        className="object-cover opacity-15 mix-blend-overlay" 
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-[#FAF9F6]" />
                
                <div className="relative z-10 text-center space-y-4 max-w-3xl px-6 hero-content">
                    <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#b89452] block">
                        Our Story
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-slate-900 leading-tight">
                        Redefining Heritage & <br />Luxury Living
                    </h1>
                    <div className="w-16 h-[1.5px] bg-[#b89452] mx-auto mt-6" />
                </div>
            </section>

            {/* ২. ইন্ট্রোডাকশন সেকশন (Framer Motion Viewport Trigger) */}
            <section className="max-w-7xl mx-auto px-6 py-20 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <motion.div 
                    className="lg:col-span-6 space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariants}
                >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 flex items-center gap-2">
                        <LayoutSideContent className="w-3 h-3 text-[#b89452]" /> Who We Are
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-slate-900 leading-snug">
                        Crafting Exceptional Experiences In Premium Real Estate.
                    </h2>
                    <p className="text-slate-600 text-sm font-normal leading-relaxed">
                        Founded with a vision to connect discerning individuals with the world’s most prestigious properties, LuxeSpace has grown into a global benchmark for luxury real estate. We don't just broker spaces; we curate legacies.
                    </p>
                    <p className="text-slate-600 text-sm font-normal leading-relaxed">
                        Every listing in our portfolio undergoes rigorous architectural evaluation and historical vetting, ensuring that our clients step into a world of unmatched sophistication and timeless class.
                    </p>
                </motion.div>

                {/* রাইট প্যানেল ইমেজ গ্রিড (সফ্ট স্কেল ও ফেড এনিমেশন) */}
                <motion.div 
                    className="lg:col-span-6 grid grid-cols-12 gap-4 relative"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="col-span-7 h-80 relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                        <img 
                            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80" 
                            alt="Luxury Interior" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="col-span-5 h-64 mt-auto relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                        <img 
                            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=500&q=80" 
                            alt="Luxury Meeting" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>
            </section>

            {/* ৩. স্ট্যাটিস্টিকস কাউন্টার বা ব্যানার (GSAP ScrollTriggered Counter) */}
            <section ref={statsContainerRef} className="bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="space-y-1">
                            <h3 className="font-serif text-3xl md:text-4xl font-semibold text-[#b89452]">
                                {stat.label === "Property Portfolio" && "$"}
                                <span className="stat-number" data-target={stat.value}>0</span>
                                {stat.suffix}
                            </h3>
                            <p className="text-[11px] font-medium text-slate-500 tracking-wider uppercase">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ৪. আমাদের মূল ভ্যালুসমূহ (Framer Motion Staggered Cards) */}
            <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
                <div className="text-center space-y-3 mb-16">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                        Our Pillars
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-slate-900">
                        The Foundation of LuxeSpace
                    </h2>
                </div>

                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    {coreValues.map((value, idx) => (
                        <motion.div 
                            key={idx} 
                            variants={fadeInUpVariants}
                            whileHover={{ y: -6, transition: { duration: 0.2 } }}
                            className="bg-white p-8 rounded-2xl border border-slate-200/80 hover:border-[#b89452]/40 transition-all duration-300 group shadow-sm hover:shadow-md flex flex-col justify-between"
                        >
                            <div className="space-y-4">
                                <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] flex items-center justify-center border border-slate-100 group-hover:bg-[#b89452]/10 transition-colors">
                                    {value.icon}
                                </div>
                                <h4 className="text-lg font-medium text-slate-900 group-hover:text-[#b89452] transition-colors">
                                    {value.title}
                                </h4>
                                <p className="text-slate-600 text-xs font-normal leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

        </div>
    );
};

export default AboutPage;