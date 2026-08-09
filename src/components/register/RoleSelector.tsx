// components/register/RoleSelector.tsx
"use client";
import React from 'react';
import { Label } from "@heroui/react";

interface RoleSelectorProps {
  selectedRole: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
        Join As A
      </Label>
      <div className="grid grid-cols-2 gap-3">
        <label className={`flex flex-col items-center justify-center p-3.5 border rounded-xl cursor-pointer transition-all duration-300 ${
          selectedRole === 'buyer' ? 'border-gray-900 bg-gray-50/50 shadow-sm' : 'border-gray-200/80 hover:border-gray-400'
        }`}>
          <input
            type="radio"
            name="role"
            value="buyer"
            checked={selectedRole === 'buyer'}
            onChange={onChange}
            className="sr-only"
          />
          <span className={`text-xs font-bold uppercase tracking-wider ${selectedRole === 'buyer' ? 'text-gray-900' : 'text-gray-400'}`}>
            🛍️ Buyer
          </span>
          <span className="text-[10px] text-gray-400 mt-0.5 font-light text-center">Want to buy property</span>
        </label>

        <label className={`flex flex-col items-center justify-center p-3.5 border rounded-xl cursor-pointer transition-all duration-300 ${
          selectedRole === 'seller' ? 'border-gray-900 bg-gray-50/50 shadow-sm' : 'border-gray-200/80 hover:border-gray-400'
        }`}>
          <input
            type="radio"
            name="role"
            value="seller"
            checked={selectedRole === 'seller'}
            onChange={onChange}
            className="sr-only"
          />
          <span className={`text-xs font-bold uppercase tracking-wider ${selectedRole === 'seller' ? 'text-gray-900' : 'text-gray-400'}`}>
            🏢 Seller
          </span>
          <span className="text-[10px] text-gray-400 mt-0.5 font-light text-center">Want to list property</span>
        </label>
      </div>
    </div>
  );
};