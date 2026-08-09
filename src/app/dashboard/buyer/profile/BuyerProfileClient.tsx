"use client";

import React, { useEffect, useRef } from 'react';
import { Person, Envelope } from '@gravity-ui/icons';
import { BiShieldQuarter, BiCalendar, BiHeart, BiCartDownload } from 'react-icons/bi';
import gsap from 'gsap';

interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

interface BuyerProfileClientProps {
    user: AuthUser | undefined;
}

const BuyerProfileClient: React.FC<BuyerProfileClientProps> = ({ user }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const infoCardRef = useRef<HTMLDivElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 0.8 } });

        // Premium staggered entrance timeline
        tl.fromTo(headerRef.current, { opacity: 0, y: -30 }, { opacity: 1, y: 0 })
          .fromTo(leftColRef.current, { opacity: 0, x: -40 }, { opacity: 1, x: 0 }, "-=0.4")
          .fromTo(infoCardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.5")
          .fromTo(bannerRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, "-=0.4");
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div ref={headerRef} className="mb-8">
                    <h1 className="text-3xl font-serif font-semibold text-[#0f172a] tracking-wide">
                        Buyer Profile
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        View your personal details, saved properties, and account tier.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Column: Avatar & Quick Stats */}
                    <div ref={leftColRef} className="md:col-span-1 flex flex-col gap-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-300">
                            <div className="relative w-28 h-28 rounded-full bg-gray-50 border-2 border-[#C9A227]/20 p-1 mb-4 overflow-hidden flex items-center justify-center">
                                {user?.image ? (
                                    <img 
                                        src={user.image} 
                                        alt={user.name} 
                                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <Person className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                            <h2 className="text-lg font-serif font-semibold text-[#0f172a] truncate w-full px-2">
                                {user?.name || "Premium Buyer"}
                            </h2>
                            <span className="text-xs bg-[#0f172a]/10 text-[#0f172a] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-[#0f172a]/20 mt-1">
                                {user?.role || "Buyer"}
                            </span>
                        </div>

                        {/* Quick Activity Metrics */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                                    <BiHeart className="text-[#C9A227]" /> Saved Estates
                                </span>
                                <span className="text-xs text-[#0f172a] font-bold bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100">0</span>
                            </div>
                            <div className="w-full h-[1px] bg-gray-100" />
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider flex items-center gap-1.5">
                                    <BiCartDownload className="text-[#C9A227]" /> Total Inquiries
                                </span>
                                <span className="text-xs text-[#0f172a] font-bold bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100">0</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Personal Information */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* Profile Details Card */}
                        <div ref={infoCardRef} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-base font-serif font-semibold text-[#0f172a] mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                                <Person className="w-4 h-4 text-[#C9A227]" />
                                Account Information
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Name info */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1.5">Full Name</label>
                                    <div className="flex items-center gap-2.5 bg-gray-50/50 border border-gray-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium">
                                        <Person className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="truncate">{user?.name}</span>
                                    </div>
                                </div>

                                {/* Email info */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1.5">Email Address</label>
                                    <div className="flex items-center gap-2.5 bg-gray-50/50 border border-gray-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium">
                                        <Envelope className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="truncate">{user?.email}</span>
                                    </div>
                                </div>

                                {/* Role Info */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1.5">Account Type</label>
                                    <div className="flex items-center gap-2.5 bg-gray-50/50 border border-gray-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium">
                                        <BiShieldQuarter className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="capitalize">{user?.role || "Buyer"}</span>
                                    </div>
                                </div>

                                {/* Account Status */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1.5">Verification Status</label>
                                    <div className="flex items-center gap-2.5 bg-gray-50/50 border border-gray-150 rounded-xl px-3.5 py-2.5 text-sm text-emerald-600 font-semibold">
                                        <BiShieldQuarter className="w-4 h-4 text-emerald-500 shrink-0" />
                                        <span>Verified Client</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informational Banner */}
                        <div ref={bannerRef} className="bg-[#0f172a]/5 border border-[#0f172a]/10 rounded-2xl p-5 flex items-start gap-3">
                            <BiCalendar className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">Buyer Dashboard Security</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Your personal information is synchronized securely. To request property tours or directly message premier sellers, please ensure your email identity remains active and verified.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default BuyerProfileClient;