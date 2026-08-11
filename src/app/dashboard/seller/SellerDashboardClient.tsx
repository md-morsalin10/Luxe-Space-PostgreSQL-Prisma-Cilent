"use client";

import React, { useEffect, useRef } from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ZAxis, ResponsiveContainer,
} from 'recharts';
import { BiDollarCircle, BiBuildingHouse, BiCheckCircle, BiGridAlt, BiUser } from 'react-icons/bi';
import gsap from 'gsap';
import type { SoldProperty, AllProperty } from '@/types/property';

interface SellerDashboardClientProps {
    sellerName: string;
    soldProperties: SoldProperty[];
    allProperties: AllProperty[];
}

interface TooltipPayload {
    payload: {
        title: string;
        price: number;
        type: string;
        dateStr: string;
    };
}

const CustomScatterTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-2xl backdrop-blur-md text-white text-xs min-w-[180px]">
                <p className="text-[#C9A227] font-bold border-b border-slate-800 pb-1.5 uppercase tracking-wider text-[10px] truncate">
                    {data.title}
                </p>
                <div className="space-y-1 mt-2">
                    <p className="flex items-center justify-between">
                        <span className="text-slate-400">Deal Value:</span>
                        <span className="font-bold text-white">${data.price.toLocaleString()}</span>
                    </p>
                    <p className="flex items-center justify-between">
                        <span className="text-slate-400">Category:</span>
                        <span className="font-medium text-slate-300 capitalize">{data.type}</span>
                    </p>
                    <p className="flex items-center justify-between">
                        <span className="text-slate-400">Date:</span>
                        <span className="text-slate-300">{data.dateStr}</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

const SellerDashboardClient = ({ sellerName, soldProperties, allProperties }: SellerDashboardClientProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const totalEarnings  = soldProperties.reduce((acc, curr) => acc + curr.price, 0);
    const activeListings = allProperties.filter(p => p.status === 'available').length;
    const unitsSold      = soldProperties.length;

    const scatterData = [...soldProperties]
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        .map((item, index) => ({
            id:      item.id,
            index:   index + 1,
            price:   item.price,
            title:   item.title,
            type:    item.type,
            dateStr: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            size:    item.price,
        }));

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".seller-stat",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
            );
            gsap.fromTo(".seller-card",
                { opacity: 0, scale: 0.99 },
                { opacity: 1, scale: 1, duration: 0.5, delay: 0.2, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                <div className="mb-10 border-b border-slate-200 pb-6">
                    <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">Seller Portal</span>
                    <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 mt-1">
                        Welcome Back, {sellerName}
                    </h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">
                        Track your listing status, monitor deal liquidations, and analyze gross revenue metrics.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="seller-stat opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Earnings</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">${totalEarnings.toLocaleString()}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227]">
                            <BiDollarCircle className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="seller-stat opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Listings</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">{activeListings} Properties</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                            <BiBuildingHouse className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="seller-stat opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Properties Sold</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">{unitsSold} Units</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <BiCheckCircle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="seller-card opacity-0 lg:col-span-2 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Liquidation Matrix &amp; Capital Scatter</h3>
                                <p className="text-slate-400 text-[11px]">Visual distribution of premium asset scale relative to deal valuation flow</p>
                            </div>
                            <BiGridAlt className="text-[#C9A227] w-5 h-5" />
                        </div>
                        <div className="w-full h-[320px] text-xs">
                            {scatterData.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-400">No trading volume recorded yet.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ScatterChart margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                                        <CartesianGrid stroke="#F8FAFC" strokeDasharray="4 4" />
                                        <XAxis
                                            type="number"
                                            dataKey="index"
                                            name="Timeline Sequence"
                                            stroke="#94A3B8"
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(val: number) => `Deal #${val}`}
                                        />
                                        <YAxis
                                            type="number"
                                            dataKey="price"
                                            name="Valuation"
                                            stroke="#94A3B8"
                                            tickLine={false}
                                            axisLine={false}
                                            tickFormatter={(val: number) => `$${val / 1000}k`}
                                        />
                                        <ZAxis type="number" dataKey="size" range={[80, 450]} />
                                        <Tooltip content={<CustomScatterTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} />
                                        <Scatter
                                            name="Properties"
                                            data={scatterData}
                                            fill="#C9A227"
                                            fillOpacity={0.75}
                                            stroke="#FFF"
                                            strokeWidth={2}
                                        />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    <div className="seller-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-slate-900">Recent Buyers</h3>
                            <p className="text-slate-400 text-[11px]">Latest client interactions and processing logs</p>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4 max-h-[320px] pr-1">
                            {soldProperties.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-400 text-xs py-12">No current buyers found.</div>
                            ) : (
                                soldProperties.map((sold) => (
                                    <div key={sold.id} className="flex items-start gap-3 p-3 bg-slate-50/70 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs shrink-0">
                                            <BiUser className="w-4 h-4" />
                                        </div>
                                        <div className="overflow-hidden w-full">
                                            <div className="flex items-center justify-between gap-2">
                                                <h4 className="font-semibold text-slate-900 text-xs truncate">{sold.buyerName}</h4>
                                                <span className="text-[10px] font-bold text-emerald-600 font-sans shrink-0">+${sold.price.toLocaleString()}</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 truncate">{sold.buyerEmail}</p>
                                            <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex justify-between text-[9px] text-slate-400 uppercase font-medium">
                                                <span className="truncate max-w-[120px] font-serif text-slate-700">{sold.title}</span>
                                                <span>{new Date(sold.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default SellerDashboardClient;