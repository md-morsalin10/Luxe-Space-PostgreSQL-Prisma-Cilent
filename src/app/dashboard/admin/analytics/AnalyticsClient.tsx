"use client";

import React, { useEffect, useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BiLineChart, BiTrendingUp, BiCompass, BiPieChartAlt2 } from 'react-icons/bi';
import gsap from 'gsap';

interface PropertyData {
    _id: string;
    price: number;
    status: "available" | "sold";
    type: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
}

interface UserData {
    role: "buyer" | "seller" | "admin";
}

interface AnalyticsClientProps {
    properties: PropertyData[];
    users: UserData[];
}

const AnalyticsClient = ({ properties, users }: AnalyticsClientProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // ১. অ্যানালিটিক্স ক্যালকুলেশন
    const totalProperties = properties.length;
    const soldProperties = properties.filter(p => p.status === 'sold');
    const totalSoldRevenue = soldProperties.reduce((acc, curr) => acc + curr.price, 0);
    const avgPropertyPrice = totalProperties > 0 ? Math.round(properties.reduce((acc, curr) => acc + curr.price, 0) / totalProperties) : 0;

    // ২. চার্ট ১ ডাটা (Radar Chart): প্রোপার্টি টাইপের গড় আর্কিটেকচারাল সাইজ ও স্পেস অ্যানালিটিক্স
    const typeGroup = properties.reduce((acc: any, curr) => {
        if (!acc[curr.type]) {
            acc[curr.type] = { count: 0, totalArea: 0, totalBeds: 0, totalBaths: 0 };
        }
        acc[curr.type].count += 1;
        acc[curr.type].totalArea += curr.area;
        acc[curr.type].totalBeds += curr.bedrooms;
        acc[curr.type].totalBaths += curr.bathrooms;
        return acc;
    }, {});

    const radarChartData = Object.keys(typeGroup).map(type => ({
        subject: type.toUpperCase(),
        Area: Math.round(typeGroup[type].totalArea / typeGroup[type].count / 10), // স্কেলিংয়ের সুবিধার্থে ১০ দিয়ে ভাগ
        Beds: Math.round((typeGroup[type].totalBeds / typeGroup[type].count) * 100), // স্কেলিংয়ের সুবিধার্থে ১০০ দিয়ে গুণ
        Baths: Math.round((typeGroup[type].totalBaths / typeGroup[type].count) * 100)
    }));

    // ৩. চার্ট ২ ডাটা (Bar Chart): টাইপ অনুযায়ী লিস্টিং বনাম সোল্ড রেশিও
    const salesDistribution = Object.keys(typeGroup).map(type => {
        const typeListings = properties.filter(p => p.type === type);
        const typeSold = typeListings.filter(p => p.status === 'sold');
        return {
            name: type.toUpperCase(),
            Listings: typeListings.length,
            Sold: typeSold.length
        };
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".analytic-card", 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
            gsap.fromTo(".chart-card", 
                { opacity: 0, scale: 0.98 },
                { opacity: 1, scale: 1, duration: 0.6, delay: 0.3, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* হেডার সেকশন */}
                <div className="mb-10 border-b border-slate-200 pb-6 flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">Intelligence Panel</span>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 mt-1">
                            System Analytics
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                            Deep dive into property metrics, architectural distributions, and sales conversions.
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center justify-center shadow-sm">
                        <BiLineChart className="w-5 h-5" />
                    </div>
                </div>

                {/* কুইক অ্যানালিটিক্যাল স্ট্যাটস */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="analytic-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Conversion Rate</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">
                                {totalProperties > 0 ? ((soldProperties.length / totalProperties) * 100).toFixed(1) : 0}%
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <BiTrendingUp className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="analytic-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Average Deal Value</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">${avgPropertyPrice.toLocaleString()}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227]">
                            <BiCompass className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="analytic-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Liquidity Index</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">
                                {users.filter(u => u.role === 'buyer').length} Active Buyers
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                            <BiPieChartAlt2 className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* চার্ট সেকশন */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* বামের চার্ট: সেলস বনাম লিস্টিং রেশিও (Bar Chart) */}
                    <div className="chart-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-slate-900">Inventory Liquidation</h3>
                            <p className="text-slate-400 text-[11px]">Total property listings mapped against successful acquisitions</p>
                        </div>
                        <div className="w-full h-[320px] text-xs">
                            {salesDistribution.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-400">No trading data analytics found.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={salesDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                                        <XAxis dataKey="name" stroke="#94A3B8" />
                                        <YAxis stroke="#94A3B8" />
                                        <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none' }} />
                                        <Legend />
                                        <Bar dataKey="Listings" fill="#0F172A" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="Sold" fill="#C9A227" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* ডানের চার্ট: আর্কিটেকচারাল মেট্রিকেশনস (Radar Chart) */}
                    <div className="chart-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-slate-900">Architectural Proportionality</h3>
                            <p className="text-slate-400 text-[11px]">Average proportional balance across Area (sqft/10) and Room configurations</p>
                        </div>
                        <div className="w-full h-[320px] text-xs flex items-center justify-center">
                            {radarChartData.length === 0 ? (
                                <div className="text-slate-400">Not enough data to map proportions.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarChartData}>
                                        <PolarGrid stroke="#E2E8F0" />
                                        <PolarAngleAxis dataKey="subject" stroke="#64748B" />
                                        <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#94A3B8" />
                                        <Radar name="Space Index" dataKey="Area" stroke="#C9A227" fill="#C9A227" fillOpacity={0.2} />
                                        <Radar name="Bedrooms (scaled)" dataKey="Beds" stroke="#0F172A" fill="#0F172A" fillOpacity={0.1} />
                                        <Legend />
                                        <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none' }} />
                                    </RadarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default AnalyticsClient;