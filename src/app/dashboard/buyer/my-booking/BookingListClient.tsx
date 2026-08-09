"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { BiMap, BiDollarCircle, BiBadgeCheck, BiUser } from 'react-icons/bi';
import gsap from 'gsap';

interface PaymentProperty {
    _id: string;
    sessionId: string;
    propertyId: string;
    title: string;
    price: number;
    type: string;
    location: string;
    image: string;
    seller: {
        id: string;
        name: string;
        email: string;
    };
    createdAt: string;
}

const BookingListClient = ({ properties }: { properties: PaymentProperty[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // হেডার অ্যানিমেশন
            gsap.fromTo(headerRef.current, 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            );

            // কার্ডগুলোর একের পর এক স্ট্যাগার্ড এন্ট্রান্স অ্যানিমেশন
            if (properties.length > 0) {
                gsap.fromTo(".booking-card", 
                    { opacity: 0, y: 40, scale: 0.98 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        duration: 0.6, 
                        stagger: 0.12, 
                        ease: "power3.out",
                        delay: 0.1 
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [properties]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* ব্যাকগ্রাউন্ড লাইট সফট গ্লো ইফেক্টস */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* হেডার সেকশন */}
                <div ref={headerRef} className="mb-14 border-b border-slate-200 pb-6 opacity-0">
                    <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">Private Client</span>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mt-1 text-slate-900">
                        My Invested Estates
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-1.5 font-normal">
                        Overview of your authenticated property acquisitions and secured portfolios.
                    </p>
                </div>

                {/* খালি বুকিং স্টেট */}
                {properties.length === 0 ? (
                    <div className="text-center py-24 bg-white border border-slate-200/60 rounded-3xl shadow-sm">
                        <BiDollarCircle className="w-14 h-14 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-700">No Premium Bookings</h3>
                        <p className="text-slate-400 text-xs mt-1 mb-6 max-w-xs mx-auto">You have not finalized any property transactions yet.</p>
                        <Link href="/properties" className="inline-flex bg-[#0f172a] text-white text-xs font-semibold uppercase tracking-widest py-3 px-6 rounded-xl transition-all hover:bg-slate-800">
                            Browse Collection
                        </Link>
                    </div>
                ) : (
                    /* বুকিং কার্ড গ্রিড */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((booking) => (
                            <div 
                                key={booking._id} 
                                className="booking-card opacity-0 group relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-300 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* ইমেজ কন্টেইনার */}
                                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                        <img 
                                            src={booking.image} 
                                            alt={booking.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
                                        
                                        {/* পেমেন্ট সাকসেস ব্যাজ (মিনিমালিস্ট গ্রিন) */}
                                        <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-emerald-600 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1.5 rounded-lg shadow-sm border border-emerald-100 flex items-center gap-1.5">
                                            <BiBadgeCheck className="w-4 h-4 text-emerald-500" /> Secured
                                        </span>

                                        <span className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
                                            {booking.type}
                                        </span>
                                    </div>

                                    {/* কন্টেন্ট ডিটেইলস */}
                                    <div className="p-6">
                                        <span className="text-[9px] font-mono text-slate-400 tracking-wider block mb-1">
                                            TXT-ID: #{booking.sessionId.slice(-12).toUpperCase()}
                                        </span>
                                        <h2 className="text-xl font-serif font-bold text-slate-950 tracking-tight group-hover:text-[#C9A227] transition-colors line-clamp-1">
                                            {booking.title}
                                        </h2>
                                        
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-2 mb-5">
                                            <BiMap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <span className="truncate">{booking.location}</span>
                                        </div>

                                        {/* সেলার কার্ড এলিমেন্ট (লাইট মিনিমাল) */}
                                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                                                <BiUser className="w-4 h-4" />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider leading-none">Representative</p>
                                                <p className="text-xs text-slate-700 font-medium mt-1 truncate">{booking.seller.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* প্রাইস এবং অ্যাকশন বাটন */}
                                <div className="p-6 pt-0 mt-auto border-t border-slate-100 flex items-center justify-between gap-4">
                                    <div>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Acquisition Cost</span>
                                        <span className="text-lg font-sans font-bold text-slate-900">${booking.price.toLocaleString()}</span>
                                    </div>
                                    <Link 
                                        href={`/properties/${booking.propertyId}`}
                                        className="bg-slate-900 text-white hover:bg-slate-800 text-[11px] font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xl transition-all shadow-sm"
                                    >
                                        View Asset
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingListClient;