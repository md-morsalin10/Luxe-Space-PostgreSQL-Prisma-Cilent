"use client";

import React, { useEffect, useRef } from 'react';
import { Person, Envelope } from '@gravity-ui/icons';
import { BiBed, BiBath, BiArea, BiMap, BiCalendar, BiDollarCircle } from 'react-icons/bi';
import gsap from 'gsap';
import type { Property } from '@/types/property';

interface PropertyDetailsClientProps {
    property: Property;
}

const PropertyDetailsClient: React.FC<PropertyDetailsClientProps> = ({ property }) => {
    const headerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const sellerName  = property.seller?.name  || "Property Owner";
    const sellerEmail = property.seller?.email || "";
    const sellerId    = property.sellerId || property.seller?.id || "";

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

        tl.fromTo(headerRef.current,  { opacity: 0, y: -20 }, { opacity: 1, y: 0 })
          .fromTo(imageRef.current,   { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 }, "-=0.5")
          .fromTo(detailsRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0 }, "-=0.4")
          .fromTo(sidebarRef.current, { opacity: 0, x: 30 },  { opacity: 1, x: 0 }, "-=0.8");
    }, []);

    const uploadDate    = property.dateUploaded || property.createdAt || new Date().toISOString();
    const formattedDate = new Date(uploadDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const imageUrl = property.image || '';

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header / Breadcrumb */}
                <div ref={headerRef} className="mb-8">
                    <span className="text-xs text-gray-400 tracking-wider">Properties &gt; {property.type} &gt; Details</span>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-semibold text-[#0f172a] tracking-wide">
                                {property.title}
                            </h1>
                            <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-2">
                                <BiMap className="w-4 h-4 text-gray-400 shrink-0" />
                                <span>{property.location}</span>
                            </div>
                        </div>
                        <div className="text-left md:text-right">
                            <span className="text-xs font-bold text-[#C9A227] tracking-widest uppercase block mb-1">Price</span>
                            <span className="text-3xl font-bold text-[#0f172a]">${property.price?.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Main Hero Image */}
                <div ref={imageRef} className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-150 mb-10 shadow-md">
                    <img
                        src={imageUrl}
                        alt={property.title}
                        className="object-cover w-full h-full"
                    />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#0f172a] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded shadow-sm border border-gray-100">
                        {property.status}
                    </span>
                    <span className="absolute top-4 right-4 bg-[#0f172a]/90 backdrop-blur-sm text-[#C9A227] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded shadow-sm">
                        {property.type}
                    </span>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left: Property Details */}
                    <div ref={detailsRef} className="lg:col-span-2 space-y-8">
                        {/* Key Features Block */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-serif font-semibold text-[#0f172a] mb-5 border-b border-gray-100 pb-3">
                                Property Overview
                            </h3>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center">
                                    <BiBed className="w-6 h-6 text-[#C9A227] mb-2" />
                                    <span className="text-xs text-gray-400 font-medium">Bedrooms</span>
                                    <span className="text-sm font-bold text-[#0f172a] mt-0.5">{property.bedrooms} Beds</span>
                                </div>
                                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center">
                                    <BiBath className="w-6 h-6 text-[#C9A227] mb-2" />
                                    <span className="text-xs text-gray-400 font-medium">Bathrooms</span>
                                    <span className="text-sm font-bold text-[#0f172a] mt-0.5">{property.bathrooms} Baths</span>
                                </div>
                                <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center">
                                    <BiArea className="w-6 h-6 text-[#C9A227] mb-2" />
                                    <span className="text-xs text-gray-400 font-medium">Floor Area</span>
                                    <span className="text-sm font-bold text-[#0f172a] mt-0.5">{property.area} sqft</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-lg font-serif font-semibold text-[#0f172a] mb-4 border-b border-gray-100 pb-3">
                                Description
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                {property.description ?? "No description available."}
                            </p>
                        </div>
                    </div>

                    {/* Right: Seller Contact Sidebar */}
                    <div ref={sidebarRef} className="lg:col-span-1">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
                            <h3 className="text-base font-serif font-semibold text-[#0f172a] mb-5 border-b border-gray-100 pb-3">
                                Listed By Seller
                            </h3>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/20 flex items-center justify-center text-[#C9A227] overflow-hidden">
                                    {property.seller?.image ? (
                                        <img src={property.seller.image} alt={sellerName} className="w-full h-full object-cover" />
                                    ) : (
                                        <Person className="w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#0f172a]">{sellerName}</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">Professional Agency Partner</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3 text-xs text-gray-600 bg-gray-50/50 border border-gray-100 rounded-xl px-3.5 py-2.5">
                                    <Envelope className="w-4 h-4 text-gray-400 shrink-0" />
                                    <span className="truncate">{sellerEmail || "No email available"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-600 bg-gray-50/50 border border-gray-100 rounded-xl px-3.5 py-2.5">
                                    <BiCalendar className="w-4 h-4 text-gray-400 shrink-0" />
                                    <span>Listed on {formattedDate}</span>
                                </div>
                            </div>

                            {/* CTA Action Buttons */}
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${sellerEmail}?subject=Inquiry about ${property.title}`}
                                    className="w-full bg-[#0f172a] text-white hover:bg-[#1e293b] text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-[#0f172a]"
                                >
                                    <Envelope className="w-4 h-4" />
                                    Contact Seller
                                </a>

                                {/*
                                  Hidden form inputs:
                                  - propertyId, title, price, type, location, image → property metadata for Stripe line items
                                  - sellerId, sellerEmail, sellerName → stored in the Booking record
                                  - buyerId is intentionally NOT included here; the Next.js /api/payment route
                                    reads it from the server-side session (getSessionOnServer) for security.
                                */}
                                <form action="/api/payment" method="POST">
                                    <input type="hidden" name="propertyId"   value={property.id} />
                                    <input type="hidden" name="title"        value={property.title} />
                                    <input type="hidden" name="price"        value={property.price} />
                                    <input type="hidden" name="type"         value={property.type} />
                                    <input type="hidden" name="location"     value={property.location} />
                                    <input type="hidden" name="image"        value={imageUrl} />
                                    <input type="hidden" name="sellerId"     value={sellerId} />
                                    <input type="hidden" name="sellerEmail"  value={sellerEmail} />
                                    <input type="hidden" name="sellerName"   value={sellerName} />

                                    <button
                                        type="submit"
                                        disabled={property.status === "sold"}
                                        className={`w-full text-xs font-semibold uppercase tracking-wider py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border ${
                                            property.status === "sold"
                                                ? "bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed"
                                                : "bg-[#C9A227] text-[#0f172a] hover:bg-[#e5ba73] border-[#C9A227]"
                                        }`}
                                    >
                                        <BiDollarCircle className="w-4 h-4" />
                                        {property.status === "sold" ? "Sold" : "Book Now"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default PropertyDetailsClient;