"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BiUserCheck, BiShieldQuarter, BiTrash, BiSearch, BiFilterAlt } from 'react-icons/bi';
import gsap from 'gsap';
// ManageUsersClient.tsx ফাইলের ভেতরের ইন্টারফেসটি এমন রাখুন:
interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    role: "buyer" | "seller" | "admin";
}

const ManageUsersClient = ({ initialUsers }: { initialUsers: User[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".user-row", 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [searchQuery, roleFilter]);

    // রোল চেঞ্জ বা ডিলিট করার ডামি হ্যান্ডলার (আপনার ব্যাকএন্ড এপিআই কানেক্ট করে নিবেন)
    const handleRoleChange = (userId: string, newRole: "buyer" | "seller" | "admin") => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    const handleDeleteUser = (userId: string) => {
        if(confirm("Are you sure you want to suspend this user?")) {
            setUsers(prev => prev.filter(u => u.id !== userId));
        }
    };

    // ফিল্টারিং ও সার্চিং লজিক
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* হেডার সেকশন */}
                <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">Control Panel</span>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 mt-1">
                            Manage All Users
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                            Administrator console to monitor roles, account verification, and permissions.
                        </p>
                    </div>
                    {/* কুইক স্ট্যাটাস কাউন্টার */}
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 py-2 px-4 rounded-xl shadow-sm text-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Users</span>
                            <span className="text-lg font-bold text-slate-800">{users.length}</span>
                        </div>
                    </div>
                </div>

                {/* ফিল্টার এবং সার্চ বার */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full sm:max-w-xs">
                        <BiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <BiFilterAlt className="text-slate-400 w-4 h-4" />
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="w-full sm:w-auto py-2.5 px-4 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#C9A227] transition-all text-slate-700 font-medium"
                        >
                            <option value="all">All Roles</option>
                            <option value="buyer">Buyers Only</option>
                            <option value="seller">Sellers Only</option>
                            <option value="admin">Administrators</option>
                        </select>
                    </div>
                </div>

                {/* ইউজার ডাটা টেবিল */}
                <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">User Details</th>
                                    <th className="py-4 px-6">Date Registered</th>
                                    <th className="py-4 px-6">Verification</th>
                                    <th className="py-4 px-6">System Role</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-12 text-slate-400">
                                            No users matched your query.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="user-row opacity-0 hover:bg-slate-50/50 transition-all duration-200">
                                            {/* ইউজার ইনফো */}
                                            <td className="py-4 px-6 flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                                                    <img 
                                                        src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                                                        alt={user.name} 
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
                                                        }}
                                                    />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-semibold text-slate-900 truncate">{user.name}</h4>
                                                    <p className="text-slate-400 text-[11px] truncate mt-0.5">{user.email}</p>
                                                </div>
                                            </td>

                                            {/* ক্রিয়েটেড ডেট */}
                                            <td className="py-4 px-6 text-slate-500 font-mono">
                                                {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>

                                            {/* ভেরিফিকেশন স্ট্যাটাস */}
                                            <td className="py-4 px-6">
                                                {user.emailVerified ? (
                                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-100">
                                                        <BiUserCheck className="w-3.5 h-3.5" /> Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-600 text-[10px] font-bold px-2 py-1 rounded-md border border-amber-100">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>

                                            {/* রোল */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                                                    user.role === 'admin' 
                                                    ? 'bg-slate-900 text-white' 
                                                    : user.role === 'seller' 
                                                    ? 'bg-[#C9A227]/10 text-[#A68015] border border-[#C9A227]/20' 
                                                    : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>

                                            {/* রোল আপডেট ও ডিলিট অ্যাকশনস */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    {/* কুইক রোল চেঞ্জ ড্রপডাউন */}
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                                                        className="py-1 px-2 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-600 font-medium"
                                                    >
                                                        <option value="buyer">Buyer</option>
                                                        <option value="seller">Seller</option>
                                                        <option value="admin">Admin</option>
                                                    </select>

                                                    {/* সাসপেন্ড/ডিলিট বাটন */}
                                                    <button 
                                                        onClick={() => handleDeleteUser(user.id)}
                                                        className="p-1.5 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                                                        title="Suspend Account"
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

export default ManageUsersClient;