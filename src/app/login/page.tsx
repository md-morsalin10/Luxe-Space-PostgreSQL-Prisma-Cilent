// app/login/page.tsx
"use client";
import React, { useState } from 'react';
import { Input, Label } from "@heroui/react";
import { FcGoogle } from 'react-icons/fc';
import {signIn } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion, Variants } from 'framer-motion';
import { LoginHero } from '@/components/login/LoginHero';
import { DemoLoginButtons } from '@/components/login/DemoLoginButtons';

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

  const handleInstantDemoLogin = async (email: string, pass: string) => {
    setLoading(true);
    setFormData({ email, password: pass });
    toast.loading(`Logging in as ${email.split('@')[0]}...`, { id: 'demo-login' });

    try {
      const { data, error } = await signIn.email({
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
      const { data, error } = await signIn.email({
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

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white selection:bg-amber-200 overflow-x-hidden">
      
      <LoginHero />

      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center px-6 py-12 md:p-16 bg-white overflow-y-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md text-left space-y-6"
        >
          
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

          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="text-gray-900 font-serif text-3xl font-bold tracking-tight">
              Sign In
            </h3>
            <p className="text-gray-400 text-sm font-light">
              Enter your credentials to access your private account.
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <DemoLoginButtons loading={loading} onInstantLogin={handleInstantDemoLogin} />
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

          <motion.div variants={itemVariants} className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold tracking-widest uppercase">
              Or Continue With
            </span>
            <div className="flex-grow border-t border-gray-100"></div>
          </motion.div>

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