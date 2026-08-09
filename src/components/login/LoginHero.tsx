// components/login/LoginHero.tsx
"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const LoginHero = () => {
  return (
    <div className="hidden lg:flex lg:col-span-6 relative bg-gray-900 overflow-hidden p-16 flex-col justify-between items-start text-left">
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.75 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          fill
          priority
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" 
          alt="Luxe Interior" 
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-white font-serif text-2xl font-bold tracking-wide">
          LuxeSpace
        </h2>
      </motion.div>

      <div className="relative z-10 max-w-xl space-y-4 my-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="text-white font-serif text-4xl md:text-5xl font-bold tracking-tight leading-tight"
        >
          Welcome Back to<br />Your Private Sanctuary.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-200/90 text-sm font-light max-w-md leading-relaxed"
        >
          Sign in to continue exploring architectural masterpieces and customized premium portfolios.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="relative z-10 flex items-center space-x-3 text-[10px] font-bold tracking-[0.2em] uppercase text-amber-400"
      >
        <div className="w-8 h-[1px] bg-amber-400" />
        <span>Global Real Estate Portfolio</span>
      </motion.div>
    </div>
  );
};