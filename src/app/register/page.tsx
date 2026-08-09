"use client";
import React, { useState } from 'react';
import { Input, Label } from "@heroui/react";
import { Picture } from "@gravity-ui/icons";
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client'; 
import { useRouter } from 'next/navigation'; 
import toast from 'react-hot-toast';
import { motion, Variants } from 'framer-motion';

const RegisterPage = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    avatarUrl: '', 
    password: '',
    role: 'buyer', 
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = e.target;

    if (name === 'role') {
      setFormData(prev => ({ ...prev, role: value }));
      return;
    }

    const fieldMap: { [key: string]: string } = {
      'register-name': 'fullName',
      'register-email': 'email',
      'register-avatar-link': 'avatarUrl',
      'register-password': 'password'
    };

    if (fieldMap[id]) {
      setFormData(prev => ({
        ...prev,
        [fieldMap[id]]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        image: formData.avatarUrl || undefined,
        role: formData.role, 
        callbackURL: "/",
      } as Parameters<typeof authClient.signUp.email>[0] & { role: string }); 

      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
        return;
      }

      if (data) {
        toast.success("Registration successful!");
        router.push("/login");
      }
      
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Explicitly typed Framer Motion Variants to prevent TypeScript errors
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white selection:bg-amber-200 overflow-x-hidden">
    
      {/* 🌄 বাম পাশ: ইমেজ প্যানেল উইথ স্কেল ও ফেড অ্যানিমেশন */}
      <div className="hidden lg:flex lg:col-span-6 relative bg-gray-900 overflow-hidden p-16 flex-col justify-between items-start text-left">
        <motion.div 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            fill
            priority
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
            alt="Heritage Living" 
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        
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
            Heritage Living,<br />Curated for You.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-200/90 text-sm font-light max-w-md leading-relaxed"
          >
            Step into an exclusive world where architectural masterpieces meet unparalleled personal service.
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

      {/* ⚪ ডান পাশ: মডার্ন হোয়াইট স্ট্যাগার্ড ফর্ম প্যানেল */}
      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center px-6 py-12 md:p-16 bg-white overflow-y-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md text-left space-y-7"
        >
          
          {/* টপ লগইন/রেজিস্টার ট্যাব ফিল্টার */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-gray-100/80 p-1 rounded-full flex space-x-1 text-xs font-semibold uppercase tracking-wider">
              <a href="/login" className="px-6 py-2 text-gray-500 rounded-full hover:text-gray-900 transition-colors">
                Login
              </a>
              <span className="bg-[#0f172a] text-white px-6 py-2 rounded-full shadow-sm">
                Register
              </span>
            </div>
          </motion.div>

          {/* হেডিংস */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="text-gray-900 font-serif text-3xl font-bold tracking-tight">
              Create Your Account
            </h3>
            <p className="text-gray-400 text-sm font-light">
              Sign up to manage your private viewing schedule.
            </p>
          </motion.div>

          {/* ফর্ম মডিউল */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* 🎭 রোল সিলেকশন ফিল্ড (Luxury Radio Cards) */}
            <motion.div variants={itemVariants} className="flex flex-col gap-2">
              <Label className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">
                Join As A
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {/* Buyer Card */}
                <label className={`flex flex-col items-center justify-center p-3.5 border rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.role === 'buyer' 
                    ? 'border-gray-900 bg-gray-50/50 shadow-sm' 
                    : 'border-gray-200/80 hover:border-gray-400'
                }`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="buyer"
                    checked={formData.role === 'buyer'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className={`text-xs font-bold uppercase tracking-wider ${formData.role === 'buyer' ? 'text-gray-900' : 'text-gray-400'}`}>
                    🛍️ Buyer
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5 font-light text-center">Want to buy property</span>
                </label>

                {/* Seller Card */}
                <label className={`flex flex-col items-center justify-center p-3.5 border rounded-xl cursor-pointer transition-all duration-300 ${
                  formData.role === 'seller' 
                    ? 'border-gray-900 bg-gray-50/50 shadow-sm' 
                    : 'border-gray-200/80 hover:border-gray-400'
                }`}>
                  <input 
                    type="radio" 
                    name="role" 
                    value="seller"
                    checked={formData.role === 'seller'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className={`text-xs font-bold uppercase tracking-wider ${formData.role === 'seller' ? 'text-gray-900' : 'text-gray-400'}`}>
                    🏢 Seller
                  </span>
                  <span className="text-[10px] text-gray-400 mt-0.5 font-light text-center">Want to list property</span>
                </label>
              </div>
            </motion.div>

            {/* ফুল নেম ইনপুট */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label 
                htmlFor="register-name" 
                className="text-gray-500 text-[10px] font-bold tracking-widest uppercase"
              >
                Full Name
              </Label>
              <Input 
                id="register-name" 
                type="text" 
                placeholder="John Doe" 
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full h-12 bg-gray-50/30 border border-gray-200/80 focus-within:border-gray-900 rounded-xl text-gray-900 text-sm px-4 placeholder:text-gray-300 transition-all"
                required 
              />
            </motion.div>

            {/* ইমেইল এড্রেস ইনপুট */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label 
                htmlFor="register-email" 
                className="text-gray-500 text-[10px] font-bold tracking-widest uppercase"
              >
                Email Address
              </Label>
              <Input 
                id="register-email" 
                type="email" 
                placeholder="name@domain.com" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 bg-gray-50/30 border border-gray-200/80 focus-within:border-gray-900 rounded-xl text-gray-900 text-sm px-4 placeholder:text-gray-300 transition-all"
                required 
              />
            </motion.div>

            {/* ইমেজ সেকশন */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label 
                htmlFor="register-avatar-link" 
                className="text-gray-500 text-[10px] font-bold tracking-widest uppercase"
              >
                Profile Image URL
              </Label>
              
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400 pointer-events-none z-10">
                  <Picture />
                </div>
                
                <Input 
                  id="register-avatar-link" 
                  type="url" 
                  placeholder="https://imgbb.com/your-avatar-link" 
                  value={formData.avatarUrl}
                  onChange={handleInputChange}
                  className="w-full h-12 bg-gray-50/30 border border-gray-200/80 focus-within:border-gray-900 rounded-xl text-gray-900 text-sm pl-11 pr-4 placeholder:text-gray-300 transition-all"
                  required 
                />
              </div>
            </motion.div>

            {/* পাসওয়ার্ড ইনপুট */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label 
                htmlFor="register-password" 
                className="text-gray-500 text-[10px] font-bold tracking-widest uppercase"
              >
                Password
              </Label>
              <Input 
                id="register-password" 
                type="password" 
                placeholder="********" 
                value={formData.password}
                onChange={handleInputChange}
                className="w-full h-12 bg-gray-50/30 border border-gray-200/80 focus-within:border-gray-900 rounded-xl text-gray-900 text-sm px-4 placeholder:text-gray-300 transition-all"
                required 
              />
            </motion.div>

            {/* মেইন সাবমিট বাটন */}
            <motion.button 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              disabled={loading}
              className="w-full h-12 bg-[#0f172a] hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all mt-2 shadow-sm flex items-center justify-center cursor-pointer"
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          {/* ডিভাইডার */}
          <motion.div variants={itemVariants} className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold tracking-widest uppercase">
              Or Continue With
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </motion.div>

          {/* সোশ্যাল বাটন: গুগল */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <button 
              type="button" 
              className="w-full h-11 border border-gray-200 hover:border-gray-900 rounded-xl flex items-center justify-center space-x-2.5 text-gray-700 hover:text-gray-900 transition-all text-xs font-semibold tracking-wide cursor-pointer"
            >
              <FcGoogle size={16} />
              <span>Google</span>
            </button>
          </motion.div>

          {/* কপিরাইট নোটিশ */}
          <motion.div variants={itemVariants} className="text-center pt-2">
            <p className="text-[11px] font-light text-gray-400">
              Protected by reCAPTCHA. LuxeSpace <a href="#privacy" className="font-normal text-gray-600 hover:underline">Privacy</a> & <a href="#terms" className="font-normal text-gray-600 hover:underline">Terms</a>
            </p>
          </motion.div>

        </motion.div>
      </div>

    </div>
  );
};

export default RegisterPage;