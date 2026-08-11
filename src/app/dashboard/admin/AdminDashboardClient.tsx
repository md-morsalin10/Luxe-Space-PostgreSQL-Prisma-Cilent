"use client";

import React, { useEffect, useRef, useState, useTransition } from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BiBuildingHouse, BiDollarCircle, BiGroup, BiShield, BiTrash } from 'react-icons/bi';
import { useRouter } from 'next/navigation'; 
import gsap from 'gsap';

interface UserType {
    id: string;
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
    const router = useRouter(); 
    const [localUsers, setLocalUsers] = useState<UserType[]>(users);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const totalProperties = properties.length;
    const totalUsers = localUsers.length;

    // Total Revenue Calculation (Case-insensitive check)
    const totalRevenue = properties
        .filter(p => p.status.toLowerCase() === 'sold')
        .reduce((acc, curr) => acc + curr.price, 0);

    // Chart Analytics logic
    const analyticsMap = properties.reduce((acc: any, curr) => {
        const typeKey = curr.type.toUpperCase();
        if (!acc[typeKey]) {
            acc[typeKey] = { type: typeKey, Revenue: 0, Listings: 0 };
        }
        acc[typeKey].Listings += 1;
        if (curr.status.toLowerCase() === 'sold') {
            acc[typeKey].Revenue += curr.price;
        }
        return acc;
    }, {});
    
    const revenueTrendData = Object.values(analyticsMap);

    const userRolesMap = localUsers.reduce((acc: any, curr) => {
        const roleKey = curr.role.toUpperCase();
        acc[roleKey] = (acc[roleKey] || 0) + 1;
        return acc;
    }, {});

    const userPieData = Object.keys(userRolesMap).map(role => ({
        name: role,
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
                { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: "power3.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleDeleteUser = async (userId: string, userEmail: string) => {
        if (!window.confirm(`Are you sure you want to delete ${userEmail}?`)) return;

        const previousUsers = localUsers;
        setLocalUsers(prev => prev.filter(user => user.id !== userId));

        startTransition(async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    router.refresh();
                } else {
                    const data = await response.json();
                    alert(data.message || "Failed to delete user.");
                    setLocalUsers(previousUsers); 
                }
            } catch (error) {
                alert("Network error. Could not delete user.");
                setLocalUsers(previousUsers); 
            }
        });
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="mb-10 border-b border-slate-200 pb-6 flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">HQ Command</span>
                        <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">Enterprise Overview</h1>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                        <BiShield className="w-5 h-5" />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="stat-card bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Gross Revenue</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">${totalRevenue.toLocaleString()}</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-[#C9A227]">
                            <BiDollarCircle className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="stat-card bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Global Properties</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalProperties} Listings</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                            <BiBuildingHouse className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="stat-card bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Users</span>
                            <span className="text-2xl font-bold text-slate-900 mt-1 block">{totalUsers} Users</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <BiGroup className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* 📊 Recharts Section (এখানে যুক্ত করা হয়েছে) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    
                    {/* 1. Property Revenue & Listings ComposedChart */}
                    <div className="chart-card lg:col-span-2 bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
                        <h3 className="text-base font-bold text-slate-900 mb-4">Property Analytics (Revenue vs Listings)</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={revenueTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                                    <XAxis dataKey="type" stroke="#64748B" fontSize={12} />
                                    <YAxis yAxisId="left" stroke="#64748B" fontSize={12} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#64748B" fontSize={12} />
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="Listings" fill="#0F172A" radius={[4, 4, 0, 0]} />
                                    <Line yAxisId="right" type="monotone" dataKey="Revenue" stroke="#C9A227" strokeWidth={3} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 2. User Roles Distribution PieChart */}
                    <div className="chart-card bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
                        <h3 className="text-base font-bold text-slate-900 mb-4">User Roles Distribution</h3>
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={userPieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {userPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>

                {/* User Table */}
                <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h3 className="text-base font-bold text-slate-900">System Users Control Registry</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[11px] uppercase font-semibold">
                                    <th className="py-3 px-6">Name</th>
                                    <th className="py-3 px-6">Email</th>
                                    <th className="py-3 px-6">Role</th>
                                    <th className="py-3 px-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {localUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50">
                                        <td className="py-4 px-6 font-medium text-slate-900">{user.name}</td>
                                        <td className="py-4 px-6 text-slate-500">{user.email}</td>
                                        <td className="py-4 px-6">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium uppercase bg-slate-100 text-slate-700">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <button 
                                                onClick={() => handleDeleteUser(user.id, user.email)}
                                                disabled={isPending || user.role === 'admin'} 
                                                className="p-2 text-slate-400 hover:text-red-600 disabled:opacity-20 rounded-lg hover:bg-red-50"
                                            >
                                                <BiTrash className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboardClient;