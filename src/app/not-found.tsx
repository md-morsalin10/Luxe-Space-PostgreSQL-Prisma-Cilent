"use client";

import React from 'react';
import Link from 'next/link';

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center px-6 relative overflow-hidden select-none">
            {/* ব্যাকগ্রাউন্ডে একটি মৃদু লাক্সারি গোল্ড গ্লো এবং ডাস্ট পার্টিকেল মোশন */}
            <div className="absolute w-[500px] h-[500px] bg-[#C9A227]/5 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            
            <div className="relative max-w-2xl w-full text-center flex flex-col items-center">
                
                {/* ১. মোশন আর্কিটেকচারাল মোটিফ (404 এবং হাউস কোলাজ) */}
                <div className="relative flex items-center justify-center w-full h-48 md:h-56">
                    {/* ব্যাকগ্রাউন্ডে বড় ৪-৪ গ্রাফিক্স */}
                    <span className="absolute text-[120px] md:text-[180px] font-bold font-serif text-[#0F172A]/[0.03] tracking-widest">
                        404
                    </span>

                    {/* সেন্টারে ভাসমান এবং পালসিং লাক্সারি হাউস মেমব্রেন */}
                    <div className="relative w-36 h-36 flex items-center justify-center animate-[float_4s_infinite_ease-in-out]">
                        
                        {/* গোল্ডেন রোটেটিং অরবিটাল রিং */}
                        <div className="absolute inset-0 rounded-full border border-dashed border-[#C9A227]/30 animate-[spin_15s_infinite_linear]" />
                        
                        {/* আর্কিটেকচারাল গ্রাফিক্স */}
                        <div className="relative w-12 h-12 flex flex-col items-center justify-end overflow-hidden z-10">
                            {/* ছাদ (Roof Line) */}
                            <div className="w-10 h-10 border-t-2 border-l-2 border-[#0F172A] rotate-45 translate-y-4 rounded-[1px] transition-all duration-500" />
                            {/* বডি ও গোল্ডেন উইন্ডো */}
                            <div className="w-9 h-6 border-l-2 border-r-2 border-b-2 border-[#0F172A] bg-[#FCFCFD] rounded-sm flex items-center justify-center">
                                <div className="w-2.5 h-2.5 bg-[#C9A227] rounded-[1px] animate-pulse shadow-[0_0_10px_#C9A227]" />
                            </div>
                        </div>

                    </div>
                </div>

                {/* ২. ইনফরমেশন ও সাব-টেক্সট */}
                <div className="mt-4 z-20">
                    <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.3em] uppercase">
                        Lost In Space
                    </span>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0F172A] tracking-tight mt-2">
                        Architectural Space Not Found
                    </h1>
                    <p className="text-slate-400 text-xs md:text-sm max-w-md mx-auto mt-3 leading-relaxed">
                        The curated masterpiece or asset pipeline you are trying to acquire might have been relocated, sold, or decommissioned.
                    </p>
                </div>

                {/* ৩. মোশন অ্যাকশন বাটন */}
                <div className="mt-10 z-20">
                    <Link 
                        href="/" 
                        className="group relative inline-flex items-center justify-center px-8 py-3.5 border border-[#0F172A] text-xs font-bold uppercase tracking-[0.2em] overflow-hidden transition-all duration-300"
                    >
                        {/* গোল্ডেন ব্যাকগ্রাউন্ড হোভার স্লাইড অ্যানিমেশন */}
                        <span className="absolute inset-0 w-0 bg-[#0F172A] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full" />
                        
                        <span className="relative text-[#0F172A] group-hover:text-[#FCFCFD] transition-colors duration-300 flex items-center gap-2">
                            <span>Return to LuxeSpace</span>
                            <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                    </Link>
                </div>

            </div>

        
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }
            `}} />
        </div>
    );
};

export default PageNotFound;