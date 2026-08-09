import React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { Person, Envelope } from '@gravity-ui/icons';
import { BiShieldQuarter, BiCalendar, BiSolidBuildingHouse, BiBriefcaseAlt2 } from 'react-icons/bi';

interface AuthUser {
    id: string;
    email: string;
    name: string;
    image?: string | null;
    role?: "buyer" | "seller" | "admin";
}

const SellerProfile = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const user = session?.user as AuthUser | undefined;

    return (
        <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-serif font-semibold text-[#0f172a] tracking-wide">
                        My Profile
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your account details and view your seller status.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Left Column: Avatar & Quick Stats */}
                    <div className="md:col-span-1 flex flex-col gap-6">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
                            <div className="relative w-28 h-28 rounded-full bg-gray-50 border-2 border-[#C9A227]/20 p-1 mb-4 overflow-hidden flex items-center justify-center">
                                {user?.image ? (
                                    <img 
                                        src={user.image} 
                                        alt={user.name} 
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <Person className="w-12 h-12 text-gray-400" />
                                )}
                            </div>
                            <h2 className="text-lg font-serif font-semibold text-[#0f172a]">
                                {user?.name || "Premium Seller"}
                            </h2>
                            <span className="text-xs bg-[#C9A227]/10 text-[#C9A227] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border border-[#C9A227]/20 mt-1">
                                {user?.role || "Seller"}
                            </span>
                        </div>

                        {/* Quick Metrics */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Account Status</span>
                                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full">Active</span>
                            </div>
                            <div className="w-full h-[1px] bg-gray-100" />
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Verified Identity</span>
                                <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full">Yes</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Detailed Information */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* Profile Details Card */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="text-base font-serif font-semibold text-[#0f172a] mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                                <BiBriefcaseAlt2 className="w-4 h-4 text-[#C9A227]" />
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
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1.5">Account Role</label>
                                    <div className="flex items-center gap-2.5 bg-gray-50/50 border border-gray-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium">
                                        <BiShieldQuarter className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span className="capitalize">{user?.role || "Seller"}</span>
                                    </div>
                                </div>

                                {/* Seller Type/Company Info */}
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase block mb-1.5">Seller Tier</label>
                                    <div className="flex items-center gap-2.5 bg-gray-50/50 border border-gray-150 rounded-xl px-3.5 py-2.5 text-sm text-gray-700 font-medium">
                                        <BiSolidBuildingHouse className="w-4 h-4 text-gray-400 shrink-0" />
                                        <span>Exclusive Partner</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Security Notice / Action Info */}
                        <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-5 flex items-start gap-3">
                            <BiCalendar className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider mb-1">Security & Access</h4>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Your profile data is synchronized with your authentication identity provider. If you wish to update your email or profile picture, please update your associated identity account credentials.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default SellerProfile;