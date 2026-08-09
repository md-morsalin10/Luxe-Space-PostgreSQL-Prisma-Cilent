"use client";
import React, { useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { Envelope, LayoutSideContent } from "@gravity-ui/icons";
import { FaSquareFacebook, FaSquareInstagram, } from "react-icons/fa6";
import { BiPhone } from 'react-icons/bi';
import { MdLocationPin } from 'react-icons/md';
import { FaLinkedinIn } from 'react-icons/fa';

const ContactPage = () => {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        // GSAP দিয়ে ফর্ম ইনপুট ফিল্ডগুলোতে স্মুথ এন্ট্রান্স অ্যানিমেশন
        gsap.fromTo(".animate-input", 
            { opacity: 0, x: -20 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 0.6, 
                stagger: 0.1, 
                ease: "power2.out",
                delay: 0.2 
            }
        );
    }, []);

    // Framer Motion Variants (Explicit TypeScript Types added)
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: [0.215, 0.610, 0.355, 1.000] }
        }
    };

    const infoCardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="bg-[#FAF9F6] text-slate-900 min-h-screen selection:bg-amber-100 selection:text-black overflow-hidden pt-12">
            
            {/* হিরো ও টাইটেল সেকশন */}
            <section className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center space-y-3">
                <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-[#b89452] block">
                    Get In Touch
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-slate-900">
                    Connect With LuxeSpace
                </h1>
                <div className="w-12 h-[1.5px] bg-[#b89452] mx-auto mt-4" />
            </section>

            {/* মেইন কন্টেন্ট গ্রিড */}
            <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* বাম পাশ: কন্টাক্ট ইনফরমেশন ও সোশ্যাল মিডিয়া */}
                <motion.div 
                    className="lg:col-span-5 space-y-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 flex items-center gap-2">
                            <LayoutSideContent className="w-3 h-3 text-[#b89452]" /> Contact Info
                        </span>
                        <h2 className="font-serif text-2xl md:text-3xl font-normal text-slate-900 leading-snug">
                            We’d Love to Hear <br />From You.
                        </h2>
                        <p className="text-slate-600 text-sm font-normal leading-relaxed max-w-sm">
                            Whether you are looking to acquire a heritage estate or sell a premium architectural masterpiece, our elite team is here to assist you with absolute discretion.
                        </p>
                    </div>

                    {/* ইনফো কার্ডস (Staggered Children এনিমেশন সহ) */}
                    <motion.div 
                        className="space-y-4"
                        variants={containerVariants}
                    >
                        {/* ইমেইল */}
                        <motion.div 
                            variants={infoCardVariants}
                            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-slate-100 flex items-center justify-center text-[#b89452]">
                                <Envelope className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Email Us</p>
                                <p className="text-sm font-medium text-slate-800">concierge@luxespace.com</p>
                            </div>
                        </motion.div>

                        {/* ফোন */}
                        <motion.div 
                            variants={infoCardVariants}
                            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-slate-100 flex items-center justify-center text-[#b89452]">
                                <BiPhone className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Call Prestige Support</p>
                                <p className="text-sm font-medium text-slate-800">+1 (800) 456-7890</p>
                            </div>
                        </motion.div>

                        {/* লোকেশন */}
                        <motion.div 
                            variants={infoCardVariants}
                            className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-slate-100 flex items-center justify-center text-[#b89452]">
                                <MdLocationPin className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Global HQ</p>
                                <p className="text-sm font-medium text-slate-800">Fifth Avenue, Manhattan, NY 10022</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* সোশ্যাল আইকন */}
                    <div className="space-y-3 pt-4">
                        <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Follow Our Legacy</p>
                        <div className="flex items-center gap-4 text-slate-400">
                            <a href="#" className="hover:text-[#b89452] transition-colors"><FaSquareFacebook className="w-6 h-6" /></a>
                            <a href="#" className="hover:text-[#b89452] transition-colors"><FaSquareInstagram className="w-6 h-6" /></a>
                            <a href="#" className="hover:text-[#b89452] transition-colors"><FaLinkedinIn className="w-6 h-6" /></a>
                        </div>
                    </div>
                </motion.div>

                {/* ডান পাশ: প্রিমিয়াম কন্টাক্ট ফর্ম */}
                <motion.div 
                    className="lg:col-span-7 bg-white p-8 md:p-10 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <form ref={formRef} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* নাম ফিল্ড */}
                            <div className="space-y-2 animate-input">
                                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="John Doe" 
                                    className="w-full bg-[#FAF9F6] text-slate-900 text-sm px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#b89452]/60 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                            {/* ইমেইল ফিল্ড */}
                            <div className="space-y-2 animate-input">
                                <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="w-full bg-[#FAF9F6] text-slate-900 text-sm px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#b89452]/60 focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        {/* সাবজেক্ট ফিল্ড */}
                        <div className="space-y-2 animate-input">
                            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Subject</label>
                            <input 
                                type="text" 
                                placeholder="Inquiry about Heritage Estate" 
                                className="w-full bg-[#FAF9F6] text-slate-900 text-sm px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#b89452]/60 focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        {/* মেসেজ ফিল্ড */}
                        <div className="space-y-2 animate-input">
                            <label className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Your Message</label>
                            <textarea 
                                rows={5}
                                placeholder="Tell us about your architectural choices or requirements..." 
                                className="w-full bg-[#FAF9F6] text-slate-900 text-sm px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#b89452]/60 focus:outline-none transition-colors resize-none"
                                required
                            />
                        </div>

                        {/* সাবমিট বাটন */}
                        <motion.button 
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="w-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold uppercase tracking-widest py-4 rounded-xl transition-colors shadow-sm cursor-pointer"
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>

            </section>
        </div>
    );
};

export default ContactPage;