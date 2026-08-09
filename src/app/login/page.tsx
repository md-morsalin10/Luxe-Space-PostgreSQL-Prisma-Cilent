"use client";
import React, { useState } from 'react';
import { Input, Label } from "@heroui/react";
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion, Variants } from 'framer-motion';

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldMap: { [key: string]: string } = {
      'login-email': 'email',
      'login-password': 'password'
    };

    if (fieldMap[id]) {
      setFormData(prev => ({
        ...prev,
        [fieldMap[id]]: value
      }));
    }
  };

  // ⚡ ক্রেডেনশিয়াল সেট করে সরাসরি লগইন ট্রিগার করার মেইন ফাংশন
  const handleInstantDemoLogin = async (email: string, pass: string) => {
    setLoading(true);
    setFormData({ email, password: pass });
    toast.loading(`Logging in as ${email.split('@')[0]}...`, { id: 'demo-login' });

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password: pass,
        callbackURL: "/", 
      });

      if (error) {
        toast.error(error.message || "Invalid credentials. Please try again.", { id: 'demo-login' });
        return;
      }

      if (data) {
        toast.success("Login successful!", { id: 'demo-login' });
        router.push("/"); 
      }
    } catch (error) {
      console.error("Demo login failed:", error);
      toast.error("Something went wrong. Please try again.", { id: 'demo-login' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        callbackURL: "/", 
      });

      if (error) {
        toast.error(error.message || "Invalid credentials. Please try again.");
        return;
      }

      if (data) {
        toast.success("Login successful!");
        router.push("/"); 
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* ⚪ ডান পাশ: মডার্ন হোয়াইট স্ট্যাগার্ড ফর্ম প্যানেল */}
      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center px-6 py-12 md:p-16 bg-white overflow-y-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md text-left space-y-6"
        >
          
          {/* টপ লগইন/রেজিস্টার ট্যাব ফিল্টার */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-gray-100/80 p-1 rounded-full flex space-x-1 text-xs font-semibold uppercase tracking-wider">
              <span className="bg-[#0f172a] text-white px-6 py-2 rounded-full shadow-sm">
                Login
              </span>
              <a href="/register" className="px-6 py-2 text-gray-500 rounded-full hover:text-gray-900 transition-colors">
                Register
              </a>
            </div>
          </motion.div>

          {/* হেডিংস */}
          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="text-gray-900 font-serif text-3xl font-bold tracking-tight">
              Sign In
            </h3>
            <p className="text-gray-400 text-sm font-light">
              Enter your credentials to access your private account.
            </p>
          </motion.div>

          {/* 🔑 ইনস্ট্যান্ট ডেমো লগইন বাটন গ্রুপ (ব্যাকগ্রাউন্ড কালারসহ) */}
          <motion.div variants={itemVariants} className="space-y-2 bg-gray-50/80 p-3 rounded-xl border border-gray-100">
            <div className="text-gray-400 text-[9px] font-bold tracking-widest uppercase mb-1">
              Click to Login Instantly
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button 
                type="button"
                disabled={loading}
                onClick={() => handleInstantDemoLogin('seller@gmail.com', 'Morsalin501921')}
                className="py-2.5 px-1 text-center bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg text-[11px] font-semibold tracking-wide shadow-sm transition-all active:scale-[0.97] cursor-pointer disabled:opacity-50"
              >
                Seller
              </button>
              <button 
                type="button"
                disabled={loading}
                onClick={() => handleInstantDemoLogin('afsan@gmail.com', 'Morsalin501921')}
                className="py-2.5 px-1 text-center bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg text-[11px] font-semibold tracking-wide shadow-sm transition-all active:scale-[0.97] cursor-pointer disabled:opacity-50"
              >
                Buyer
              </button>
              <button 
                type="button"
                disabled={loading}
                onClick={() => handleInstantDemoLogin('admin@gmail.com', 'Admin@123')}
                className="py-2.5 px-1 text-center bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-[11px] font-semibold tracking-wide shadow-sm transition-all active:scale-[0.97] cursor-pointer disabled:opacity-50"
              >
                Admin
              </button>
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* ইমেইল এড্রেস ইনপুট */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label 
                htmlFor="login-email" 
                className="text-gray-500 text-[10px] font-bold tracking-widest uppercase"
              >
                Email Address
              </Label>
              <Input 
                id="login-email" 
                type="email" 
                placeholder="name@domain.com" 
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-12 bg-gray-50/30 border border-gray-200/80 focus-within:border-gray-900 rounded-xl text-gray-900 text-sm px-4 placeholder:text-gray-300 transition-all"
                required 
              />
            </motion.div>

            {/* পাসওয়ার্ড ইনপুট */}
            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <Label 
                  htmlFor="login-password" 
                  className="text-gray-500 text-[10px] font-bold tracking-widest uppercase"
                >
                  Password
                </Label>
                <a href="#forgot" className="text-gray-400 hover:text-gray-900 text-[11px] font-light transition-colors">
                  Forgot?
                </a>
              </div>
              <Input 
                id="login-password" 
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
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>

          {/* ডিভাইডার */}
          <motion.div variants={itemVariants} className="relative flex py-1 items-center">
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
          <motion.div variants={itemVariants} className="text-center pt-1">
            <p className="text-[11px] font-light text-gray-400">
              Protected by reCAPTCHA. LuxeSpace <a href="#privacy" className="font-normal text-gray-600 hover:underline">Privacy</a> & <a href="#terms" className="font-normal text-gray-600 hover:underline">Terms</a>
            </p>
          </motion.div>

        </motion.div>
      </div>

    </div>
  );
};

export default LoginPage;