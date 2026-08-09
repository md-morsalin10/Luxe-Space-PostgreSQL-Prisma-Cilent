"use client";

import React, { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { BiBuildingHouse, BiDollarCircle, BiTrendingUp, BiWallet } from 'react-icons/bi';
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
    seller: { id: string; name: string; email: string };
    createdAt: string;
}

interface DashboardClientProps {
    user: any;
    properties: PaymentProperty[];
}

const DashboardClient = ({ user, properties }: DashboardClientProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // ১. স্ট্যাটিস্টিকস ক্যালকুলেশন
    const totalSpent = properties.reduce((acc, curr) => acc + curr.price, 0);
    const totalProperties = properties.length;
    
    // ২. চার্ট ১ এর জন্য ডেটা প্রিপারেশন (টাইপ ভিত্তিক ইনভেস্টমেন্ট ডিস্ট্রিবিউশন)
    const typeDataMap = properties.reduce((acc: any, curr) => {
        acc[curr.type] = (acc[curr.type] || 0) + curr.price;
        return acc;
    }, {});
    
    const pieChartData = Object.keys(typeDataMap).map(type => ({
        name: type.toUpperCase(),
        value: typeDataMap[type]
    }));

    // ৩. চার্ট ২ এর জন্য ডেটা প্রিপারেশন (সময় ভিত্তিক ইনভেস্টমেন্ট ট্রেন্ড)
    const trendData = properties.map(p => ({
        date: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: p.price
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // ৪. প্রিমিয়াম কালার প্যালেট (লাক্সারি গোল্ড, স্লেট, এমারেল্ড)
    const COLORS = ['#C9A227', '#0F172A', '#10B981', '#6366F1'];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".stat-card", 
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
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* হেডার ও ওয়েলকাম মেসেজ */}
                <div className="mb-10 border-b border-slate-200 pb-6">
                    <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">Investor Portal</span>
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 mt-1">
                        Welcome Back, {user?.name || 'Investor'}
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">
                        Here is the financial overview of your secured real estate acquisitions.
                    </p>
                </div>

                {/* স্ট্যাট কার্ডস গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* কার্ড ১: মোট ইনভেস্টমেন্ট */}
                    <div className="stat-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Capital Deployed</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">${totalSpent.toLocaleString()}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227]">
                            <BiDollarCircle className="w-6 h-6" />
                        </div>
                    </div>

                    {/* কার্ড ২: প্রোপার্টি সংখ্যা */}
                    <div className="stat-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Assets Owned</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalProperties} Properties</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                            <BiBuildingHouse className="w-6 h-6" />
                        </div>
                    </div>

                    {/* কার্ড ৩: গড় এভারেজ ভ্যালু */}
                    <div className="stat-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Average Asset Value</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">
                                ${totalProperties > 0 ? Math.round(totalSpent / totalProperties).toLocaleString() : 0}
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <BiTrendingUp className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* চার্ট সেকশন গ্রিড */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* বামের বড় চার্ট: ইনভেস্টমেন্ট টাইমলাইন ট্রেন্ড (AreaChart) */}
                    <div className="chart-card opacity-0 lg:col-span-2 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Acquisition Analytics</h3>
                                <p className="text-slate-400 text-[11px]">Investment timeline dynamic flow</p>
                            </div>
                            <BiWallet className="text-slate-400 w-5 h-5" />
                        </div>
                        <div className="w-full h-[320px] text-xs">
                            {trendData.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-400">No transaction records available.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#C9A227" stopOpacity={0.2}/>
                                                <stop offset="95%" stopColor="#C9A227" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                                        <XAxis dataKey="date" stroke="#94A3B8" />
                                        <YAxis stroke="#94A3B8" />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none' }}
                                            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Amount Paid']}
                                        />
                                        <Area type="monotone" dataKey="amount" stroke="#C9A227" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* ডানের চার্ট: ক্যাটাগরি বা টাইপ ভিত্তিক বন্টন (PieChart) */}
                    <div className="chart-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Portfolio Diversity</h3>
                            <p className="text-slate-400 text-[11px]">Asset segmentation by type</p>
                        </div>
                        <div className="w-full h-[260px] flex items-center justify-center text-xs">
                            {pieChartData.length === 0 ? (
                                <div className="text-slate-400">No assets detected.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieChartData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {pieChartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any) => `$${value.toLocaleString()}`} />
                                        <Legend verticalAlign="bottom" iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default DashboardClient;