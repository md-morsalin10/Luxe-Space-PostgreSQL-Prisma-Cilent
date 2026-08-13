"use client";

import React, { useEffect, useRef, useState } from 'react';
import { BiUserCheck, BiShieldQuarter, BiSearch, BiFilterAlt } from 'react-icons/bi';
import { FiSlash, FiCheckCircle } from 'react-icons/fi';
import gsap from 'gsap';
import { toast } from 'react-hot-toast';
import { ClientAuthHeader } from '@/lib/core/client-api';


interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    role: "buyer" | "seller" | "admin";
    isSuspended: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_URL || '';

const ManageUsersClient = ({ initialUsers }: { initialUsers: User[] }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('all');
    const [togglingId, setTogglingId] = useState<string | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".user-row",
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [searchQuery, roleFilter]);

    const handleRoleChange = async (userId: string, newRole: "buyer" | "seller" | "admin") => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    };

    const handleToggleSuspend = async (user: User) => {
        setTogglingId(user.id);
        const newStatus = !user.isSuspended;
        try {
            const res = await fetch(`${baseUrl}/api/users/${user.id}/suspend`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...await ClientAuthHeader()
                },
                body: JSON.stringify({ isSuspended: newStatus }),
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isSuspended: newStatus } : u));
                toast.success(newStatus ? `${user.name} has been suspended.` : `${user.name} has been unsuspended.`, {
                    style: { background: '#0B1329', color: '#fff', border: '1px solid rgba(201,162,39,0.2)' }
                });
            } else {
                toast.error(data.message || 'Failed to update suspension status', {
                    style: { background: '#0B1329', color: '#fff', border: '1px solid rgba(239,68,68,0.2)' }
                });
            }
        } catch {
            toast.error('Network error — could not reach the server.', {
                style: { background: '#0B1329', color: '#fff', border: '1px solid rgba(239,68,68,0.2)' }
            });
        } finally {
            setTogglingId(null);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div ref={containerRef} className="min-h-screen bg-[#F9FAFB] text-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-10 border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.2em] uppercase">Control Panel</span>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-slate-900 mt-1">
                            Manage All Users
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                            Administrator console to monitor roles, account verification, and suspension status.
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white border border-slate-200 py-2 px-4 rounded-xl shadow-sm text-center">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Users</span>
                            <span className="text-lg font-bold text-slate-800">{users.length}</span>
                        </div>
                        <div className="bg-white border border-red-100 py-2 px-4 rounded-xl shadow-sm text-center">
                            <span className="text-[10px] uppercase font-bold text-red-400 block">Suspended</span>
                            <span className="text-lg font-bold text-red-600">{users.filter(u => u.isSuspended).length}</span>
                        </div>
                    </div>
                </div>

                {/* Filter & Search */}
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

                {/* User Table */}
                <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    <th className="py-4 px-6">User Details</th>
                                    <th className="py-4 px-6">Date Registered</th>
                                    <th className="py-4 px-6">Verification</th>
                                    <th className="py-4 px-6">System Role</th>
                                    <th className="py-4 px-6">Status</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-slate-400">
                                            No users matched your query.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className={`user-row opacity-0 hover:bg-slate-50/50 transition-all duration-200 ${user.isSuspended ? 'bg-red-50/30' : ''}`}>
                                            {/* User Info */}
                                            <td className="py-4 px-6 flex items-center gap-3">
                                                <div className="relative w-9 h-9 shrink-0">
                                                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                                                        <img
                                                            src={user.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"}
                                                            alt={user.name}
                                                            className={`w-full h-full object-cover ${user.isSuspended ? 'grayscale opacity-60' : ''}`}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
                                                            }}
                                                        />
                                                    </div>
                                                    {user.isSuspended && (
                                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center">
                                                            <FiSlash className="w-2 h-2 text-white" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-semibold text-slate-900 truncate">{user.name}</h4>
                                                    <p className="text-slate-400 text-[11px] truncate mt-0.5">{user.email}</p>
                                                </div>
                                            </td>

                                            {/* Created Date */}
                                            <td className="py-4 px-6 text-slate-500 font-mono">
                                                {new Date(user.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>

                                            {/* Email Verification */}
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

                                            {/* Role */}
                                            <td className="py-4 px-6">
                                                <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${user.role === 'admin'
                                                    ? 'bg-slate-900 text-white'
                                                    : user.role === 'seller'
                                                        ? 'bg-[#C9A227]/10 text-[#A68015] border border-[#C9A227]/20'
                                                        : 'bg-slate-100 text-slate-600'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>

                                            {/* Suspension Status Badge */}
                                            <td className="py-4 px-6">
                                                {user.isSuspended ? (
                                                    <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-red-100">
                                                        <FiSlash className="w-3 h-3" /> Suspended
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-100">
                                                        <FiCheckCircle className="w-3 h-3" /> Active
                                                    </span>
                                                )}
                                            </td>

                                            {/* Actions */}
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    {/* Role Selector */}
                                                    <select
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                                                        className="py-1 px-2 text-[11px] bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-600 font-medium"
                                                    >
                                                        <option value="buyer">Buyer</option>
                                                        <option value="seller">Seller</option>
                                                        <option value="admin">Admin</option>
                                                    </select>

                                                    {/* Suspend / Unsuspend Toggle Button */}
                                                    <button
                                                        onClick={() => handleToggleSuspend(user)}
                                                        disabled={togglingId === user.id}
                                                        title={user.isSuspended ? "Unsuspend Account" : "Suspend Account"}
                                                        className={`flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-lg transition-all border shadow-sm ${togglingId === user.id
                                                            ? 'opacity-60 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                                                            : user.isSuspended
                                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                                                                : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-600 hover:text-white hover:border-red-600'
                                                            }`}
                                                    >
                                                        {togglingId === user.id ? (
                                                            <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                                                        ) : user.isSuspended ? (
                                                            <><FiCheckCircle className="w-3.5 h-3.5" /> Unsuspend</>
                                                        ) : (
                                                            <><FiSlash className="w-3.5 h-3.5" /> Suspend</>
                                                        )}
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