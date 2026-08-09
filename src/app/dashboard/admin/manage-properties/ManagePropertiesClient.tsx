"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BiBuildingHouse, BiMap, BiBed, BiBath, BiArea, BiTrash, BiSearch, BiFilterAlt, BiBadgeCheck, BiInfoCircle } from 'react-icons/bi';
import gsap from 'gsap';

interface Property {
    _id: string;
    title: string;
    type: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    description: string;
    image: string;
    status: "available" | "sold";
    dateUploaded: string;
    sellerId: string;
    sellerName: string;
    sellerEmail: string;
    buyerEmail?: string;
    buyerId?: string;
    buyerName?: string;
}

const ManagePropertiesClient = ({ initialProperties }: { initialProperties: Property[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [properties, setProperties] = useState<Property[]>(initialProperties);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".property-row", 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [searchQuery, statusFilter]);

    const handleDeleteProperty = (id: string) => {
        if (confirm("Are you sure you want to remove this property listing?")) {
            setProperties(prev => prev.filter(p => p._id !== id));
        }
    };

    // ফিল্টারিং ও সার্চিং লজিক
    const filteredProperties = properties.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              p.sellerEmail.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* হেডার সেকশন */}
                <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">Real Estate Control</span>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 mt-1">
                            Manage All Properties
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                            Admin console to monitor premium assets, verification updates status, and transactional operations.
                        </p>
                    </div>
                    {/* কুইক স্ট্যাটাস */}
                    <div className="flex gap-3">
                        <div className="bg-white border border-slate-200 py-2 px-4 rounded-xl shadow-sm text-center">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">Available</span>
                            <span className="text-base font-bold text-emerald-600">{properties.filter(p => p.status === 'available').length}</span>
                        </div>
                        <div className="bg-white border border-slate-200 py-2 px-4 rounded-xl shadow-sm text-center">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">Sold Out</span>
                            <span className="text-base font-bold text-[#C9A227]">{properties.filter(p => p.status === 'sold').length}</span>
                        </div>
                    </div>
                </div>

                {/* ফিল্টার এবং সার্চ বার */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:max-w-xs">
                        <BiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by title, location or seller..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <BiFilterAlt className="text-slate-400 w-4 h-4" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full sm:w-auto py-2.5 px-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-all text-slate-700 font-medium"
                        >
                            <option value="all">All Statuses</option>
                            <option value="available">Available Listings</option>
                            <option value="sold">Sold Contracts</option>
                        </select>
                    </div>
                </div>

                {/* প্রোপার্টি ডাটা টেবিল */}
                <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">Property Details</th>
                                    <th className="py-4 px-6">Specs & Space</th>
                                    <th className="py-4 px-6">Market Price</th>
                                    <th className="py-4 px-6">Ownership Status</th>
                                    <th className="py-4 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredProperties.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-12 text-slate-400">
                                            No properties found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredProperties.map((property) => (
                                        <tr key={property._id} className="property-row opacity-0 hover:bg-slate-50/50 transition-all duration-200">
                                            {/* ইমেজ ও টাইটেল */}
                                            <td className="py-4 px-6 max-w-sm">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative">
                                                        <img 
                                                            src={property.image} 
                                                            alt={property.title} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <h4 className="font-serif font-bold text-slate-950 truncate text-sm">{property.title}</h4>
                                                        <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold uppercase px-1.5 py-0.5 rounded mt-1 inline-block">
                                                            {property.type}
                                                        </span>
                                                        <div className="flex items-center gap-1 text-slate-400 text-[11px] mt-1 truncate">
                                                            <BiMap className="w-3 h-3 shrink-0" />
                                                            <span className="truncate">{property.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* স্পেসিফিকেশনস */}
                                            <td className="py-4 px-6 font-medium text-slate-600">
                                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-fit">
                                                    <span className="flex items-center gap-1"><BiBed className="text-slate-400" /> {property.bedrooms} Beds</span>
                                                    <span className="flex items-center gap-1"><BiBath className="text-slate-400" /> {property.bathrooms} Baths</span>
                                                    <span className="flex items-center gap-1 col-span-2"><BiArea className="text-slate-400" /> {property.area} sqft</span>
                                                </div>
                                            </td>

                                            {/* প্রাইস */}
                                            <td className="py-4 px-6 font-bold text-slate-950 font-sans text-sm">
                                                ${property.price.toLocaleString()}
                                            </td>

                                            {/* স্ট্যাটাস ব্যাজ ও ওনারশিপ ট্র্যাকিং */}
                                            <td className="py-4 px-6">
                                                {property.status === 'sold' ? (
                                                    <div>
                                                        <span className="inline-flex items-center gap-1 bg-amber-50 text-[#A68015] text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-100">
                                                            <BiBadgeCheck className="w-3.5 h-3.5" /> Sold Out
                                                        </span>
                                                        <p className="text-[10px] text-slate-400 mt-1">
                                                            Buyer: <span className="font-medium text-slate-700">{property.buyerName}</span>
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-100">
                                                            Available
                                                        </span>
                                                        <p className="text-[10px] text-slate-400 mt-1">
                                                            Seller: <span className="font-medium text-slate-700">{property.sellerName}</span>
                                                        </p>
                                                    </div>
                                                )}
                                            </td>

                                            {/* অ্যাকশন বাটন */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button 
                                                        onClick={() => handleDeleteProperty(property._id)}
                                                        className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors border border-transparent hover:border-rose-100"
                                                        title="Delete Property"
                                                    >
                                                        <BiTrash className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManagePropertiesClient;