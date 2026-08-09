// components/login/DemoLoginButtons.tsx
"use client";
import React from 'react';

interface DemoLoginButtonsProps {
  loading: boolean;
  onInstantLogin: (email: string, pass: string) => void;
}

export const DemoLoginButtons: React.FC<DemoLoginButtonsProps> = ({ loading, onInstantLogin }) => {
  return (
    <div className="space-y-2 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
      <div className="text-gray-400 text-[9px] font-bold tracking-widest uppercase mb-1">
        Click to Login Instantly
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button 
          type="button"
          disabled={loading}
          onClick={() => onInstantLogin('seller@gmail.com', 'Morsalin501921')}
          className="py-2.5 px-1 text-center bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg text-[11px] font-semibold tracking-wide shadow-sm transition-all active:scale-[0.97] cursor-pointer disabled:opacity-50"
        >
          Seller
        </button>
        <button 
          type="button"
          disabled={loading}
          onClick={() => onInstantLogin('afsan@gmail.com', 'Morsalin501921')}
          className="py-2.5 px-1 text-center bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg text-[11px] font-semibold tracking-wide shadow-sm transition-all active:scale-[0.97] cursor-pointer disabled:opacity-50"
        >
          Buyer
        </button>
        <button 
          type="button"
          disabled={loading}
          onClick={() => onInstantLogin('admin@gmail.com', 'Admin@123')}
          className="py-2.5 px-1 text-center bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-[11px] font-semibold tracking-wide shadow-sm transition-all active:scale-[0.97] cursor-pointer disabled:opacity-50"
        >
          Admin
        </button>
      </div>
    </div>
  );
};