"use client";

import React, { useState, useEffect, useRef } from 'react';
import PropertyCard, { Property } from '@/components/PropertyCard';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import gsap from 'gsap';

interface PropertiesClientProps {
    initialProperties: Property[];
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({ initialProperties }) => {
    // states
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState<number>(150000);
    const [selectedLocation, setSelectedLocation] = useState<string>("All");
    const [sortBy, setSortBy] = useState<string>("default");

    // refs for GSAP animation
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    // Get unique locations for dropdown
    const uniqueLocations = ["All", ...new Set(initialProperties.map(p => p.location.split(',')[0].trim()))];

    const handleTypeChange = (type: string) => {
        setSelectedTypes(prev => 
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const handleClearAll = () => {
        setSelectedTypes([]);
        setMaxPrice(150000);
        setSelectedLocation("All");
        setSearchQuery("");
        setSortBy("default");
    };

    // Filtering & Sorting Logic
    const filteredProperties = initialProperties.filter(property => {
        const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              property.location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(property.type.toLowerCase());
        const matchesPrice = property.price <= maxPrice;
        const matchesLocation = selectedLocation === "All" || property.location.includes(selectedLocation);

        return matchesSearch && matchesType && matchesPrice && matchesLocation;
    }).sort((a, b) => {
        if (sortBy === "low-to-high") return a.price - b.price;
        if (sortBy === "high-to-low") return b.price - a.price;
        return 0; // Default sorting
    });

    // GSAP Initial & Filter Update Animation
    useEffect(() => {
        if (gridRef.current) {
            const cards = gridRef.current.children;
            if (cards.length > 0) {
                gsap.fromTo(cards, 
                    { opacity: 0, y: 30 }, 
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" }
                );
            }
        }
    }, [selectedTypes, maxPrice, selectedLocation, searchQuery, sortBy]);

    return (
        <div ref={containerRef} className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumbs & Header Section */}
                <div className="mb-8">
                    <span className="text-xs text-gray-400 tracking-wider">Home &gt; Explore Listings</span>
                    <h1 className="text-4xl font-serif font-semibold text-[#0f172a] mt-2 tracking-tight">Curated Luxury Estates</h1>
                    <p className="text-gray-500 text-sm mt-2 max-w-2xl">
                        Discover an exclusive collection of high-end properties designed for the discerning individual. From penthouse suites to coastal villas.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mt-10">
                    {/* LEFT SIDEBAR: Filters */}
                    <div className="w-full lg:w-64 shrink-0 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                            <div className="flex items-center gap-2 font-semibold text-[#0f172a]">
                                <SlidersHorizontal className="w-4 h-4 text-[#C9A227]" />
                                <span>Filters</span>
                            </div>
                            <button onClick={handleClearAll} className="text-xs font-semibold text-[#C9A227] hover:underline">
                                Clear All
                            </button>
                        </div>

                        {/* Search Bar Inside Filter */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Search</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search Title or Area..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full text-xs text-amber-500 border border-gray-200 bg-gray-50/50 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#C9A227] transition-all"
                                />
                                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            </div>
                        </div>

                        {/* Property Type Checkbox */}
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-3">Property Type</label>
                            <div className="space-y-2.5 text-sm text-gray-600">
                                {["Apartment", "Villa", "House", "Penthouse", "Studio"].map((type) => (
                                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(type.toLowerCase())}
                                            onChange={() => handleTypeChange(type.toLowerCase())}
                                            className="rounded border-gray-300 text-[#C9A227] focus:ring-[#C9A227] w-4 h-4"
                                        />
                                        <span className="group-hover:text-[#0f172a] transition-colors">{type}s</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Slider */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-gray-400 tracking-widest uppercase">Price Range</label>
                                <span className="text-xs font-bold text-[#C9A227]">${(maxPrice / 1000).toFixed(0)}k+</span>
                            </div>
                            <input
                                type="range"
                                min="20000"
                                max="150000"
                                step="5000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="w-full accent-[#C9A227] bg-gray-200 rounded-lg appearance-none h-1 cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-medium">
                                <span>$20k</span>
                                <span>$150k+</span>
                            </div>
                        </div>

                        {/* Location Dropdown */}
                        <div>
                            <label className="block text-xs font-bold text-gray-400 tracking-widest uppercase mb-2">Location</label>
                            <div className="relative">
                                <select
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                    className="w-full text-xs border border-gray-200 bg-gray-50/50 rounded-xl px-3 py-2.5 appearance-none focus:outline-none focus:border-[#C9A227] cursor-pointer text-gray-700 font-medium"
                                >
                                    {uniqueLocations.map(loc => (
                                        <option key={loc} value={loc}>{loc === "All" ? "All Destinations" : loc}</option>
                                    ))}
                                </select>
                                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT AREA: Sorting & Properties Grid */}
                    <div className="flex-1">
                        {/* Top Utility Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white border border-gray-100 rounded-2xl p-4 mb-6 shadow-sm">
                            <span className="text-xs font-medium text-gray-500">
                                Showing <strong className="text-[#0f172a]">{filteredProperties.length}</strong> available listings
                            </span>
                            
                            {/* Sort Filter */}
                            <div className="flex items-center gap-2 self-end sm:self-auto">
                                <span className="text-xs text-gray-400 font-medium">Sort By</span>
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="text-xs font-medium text-gray-700 border border-gray-200 rounded-xl pl-3 pr-8 py-2 bg-gray-50/50 appearance-none focus:outline-none focus:border-[#C9A227] cursor-pointer"
                                    >
                                        <option value="default">Default</option>
                                        <option value="low-to-high">Price: Low to High</option>
                                        <option value="high-to-low">Price: High to Low</option>
                                    </select>
                                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Properties Grid with Animating Container */}
                        {filteredProperties.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-gray-400 text-sm">No luxury estates matches your exact filters.</p>
                                <button onClick={handleClearAll} className="mt-4 text-xs font-bold text-[#C9A227] hover:underline">Reset Filters</button>
                            </div>
                        ) : (
                            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredProperties.map((property) => (
                                    <PropertyCard key={property._id?.toString() || property.title} property={property} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertiesClient;