"use client";

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BiBuildingHouse, BiDollarCircle, BiGroup, BiShield, BiTrash } from 'react-icons/bi';
import { useRouter } from 'next/navigation'; // ফিক্স ১: useRouter ইম্পোর্ট করুন
import gsap from 'gsap';

interface UserType {
    _id: string;
    name?: string;
    email: string;
    role: string;
}

interface AdminDashboardClientProps {
    properties: Array<{ price: number; status: string; type: string }>;
    users: Array<UserType>;
}

const AdminDashboardClient = ({ properties, users }: AdminDashboardClientProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter(); // ফিক্স ২: রাউটার ইনিশিয়েট করুন
    const [localUsers, setLocalUsers] = useState<UserType[]>(users);
    const [isPending, startTransition] = useTransition();

    // প্যারেন্ট থেকে আসা নতুন ইউজার লিস্ট লোকাল স্টেটে সিন্ক করা
    useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const totalProperties = properties.length;
    const totalUsers = localUsers.length;

    const totalRevenue = properties
        .filter(p => p.status === 'sold')
        .reduce((acc, curr) => acc + curr.price, 0);

    const analyticsMap = properties.reduce((acc: any, curr) => {
        if (!acc[curr.type]) {
            acc[curr.type] = { type: curr.type.toUpperCase(), Revenue: 0, Listings: 0 };
        }
        acc[curr.type].Listings += 1;
        if (curr.status === 'sold') {
            acc[curr.type].Revenue += curr.price;
        }
        return acc;
    }, {});
    const revenueTrendData = Object.values(analyticsMap);

    const userRolesMap = localUsers.reduce((acc: any, curr) => {
        acc[curr.role] = (acc[curr.role] || 0) + 1;
        return acc;
    }, {});
    const userPieData = Object.keys(userRolesMap).map(role => ({
        name: role.toUpperCase(),
        value: userRolesMap[role]
    }));

    const COLORS = ['#C9A227', '#0F172A', '#10B981'];

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

    const handleDeleteUser = async (userId: string, userEmail: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${userEmail}?`);
        if (!confirmDelete) return;

        const previousUsers = localUsers;
        

        setLocalUsers(prev => prev.filter(user => user._id !== userId));

        startTransition(async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    router.refresh();
                } else {
                    alert(data.message || "Failed to delete user from database.");
                    setLocalUsers(previousUsers); 
                }
            } catch (error) {
                console.error("Delete request error:", error);
                alert("Network error. Could not reach backend server.");
                setLocalUsers(previousUsers); 
            }
        });
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* হেডার সেকশন */}
                <div className="mb-10 border-b border-slate-200 pb-6 flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">HQ Command</span>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 mt-1">
                            Enterprise Overview
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                            Real-time platform metrics, global revenue generation, and user growth mapping.
                        </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                        <BiShield className="w-5 h-5" />
                    </div>
                </div>

            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="stat-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Gross Platform Revenue</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">${totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227]">
                            <BiDollarCircle className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="stat-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Global Properties</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalProperties} Listings</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                            <BiBuildingHouse className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="stat-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Registered Constituents</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalUsers} Users</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <BiGroup className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* চার্ট গ্রিড */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="chart-card opacity-0 lg:col-span-2 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-slate-900">Capital Flow & Volumetric Density</h3>
                            <p className="text-slate-400 text-[11px]">Comparison of total income generated versus asset type volume</p>
                        </div>
                        <div className="w-full h-[320px] text-xs">
                            {revenueTrendData.length === 0 ? (
                                <div className="h-full flex items-center justify-center text-slate-400">No trading data analytics recorded.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={revenueTrendData} margin={{ top: 10, right: -5, left: -10, bottom: 0 }}>
                                        <CartesianGrid stroke="#F1F5F9" strokeDasharray="3 3" />
                                        <XAxis dataKey="type" stroke="#94A3B8" />
                                        <YAxis yAxisId="left" stroke="#94A3B8" label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft', fill: '#94A3B8' }} />
                                        <YAxis yAxisId="right" orientation="right" stroke="#C9A227" label={{ value: 'Listings Count', angle: 90, position: 'insideRight', fill: '#C9A227' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '12px', color: '#fff', border: 'none' }} />
                                        <Legend />
                                        <Bar yAxisId="left" dataKey="Revenue" barSize={35} fill="#0F172A" radius={[6, 6, 0, 0]} />
                                        <Line yAxisId="right" type="monotone" dataKey="Listings" stroke="#C9A227" strokeWidth={3} dot={{ r: 4 }} />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    <div className="chart-card opacity-0 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900">Demographic Diversity</h3>
                            <p className="text-slate-400 text-[11px]">Platform segmentation by role privileges</p>
                        </div>
                        <div className="w-full h-[250px] flex items-center justify-center text-xs">
                            {userPieData.length === 0 ? (
                                <div className="text-slate-400">No active network data found.</div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={userPieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={85}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {userPieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: any) => [`${value} Accounts`, 'Volume']} />
                                        <Legend verticalAlign="bottom" iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>
                </div>

                {/* ইউজার টেবিল */}
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.01)] overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-base font-bold text-slate-900">System Users Control Registry</h3>
                        <p className="text-slate-400 text-[11px] mt-0.5">Audit system accounts and revoke database privileges dynamically.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                                    <th className="py-3 px-6">Identified Name</th>
                                    <th className="py-3 px-6">Network Email Address</th>
                                    <th className="py-3 px-6">Privilege Role</th>
                                    <th className="py-3 px-6 text-right">Database Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700">
                                {localUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-slate-900">{user.name || 'Anonymous Platform User'}</td>
                                        <td className="py-4 px-6 text-slate-500">{user.email}</td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                                                ${user.role === 'admin' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' : 
                                                  user.role === 'seller' ? 'bg-slate-900 text-white' : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button 
                                                onClick={() => handleDeleteUser(user._id, user.email)}
                                                disabled={isPending || user.role === 'admin'} 
                                                className="p-2 text-slate-400 hover:text-red-600 disabled:opacity-20 disabled:hover:text-slate-400 rounded-lg hover:bg-red-50 transition-all"
                                                title={user.role === 'admin' ? "Security Protocol: System Admin cannot be terminated" : "Purge User Profile"}
                                            >
                                                <BiTrash className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {localUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-slate-400 text-xs">No users mapped in network log files.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardClient;