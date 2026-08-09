// app/register/page.tsx
"use client";
import React, { useState } from 'react';
import { Input, Label } from "@heroui/react";
import { Picture } from "@gravity-ui/icons";
import { FcGoogle } from 'react-icons/fc';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion, Variants } from 'framer-motion';
import { HeroSection } from '@/components/register/HeroSection';
import { RoleSelector } from '@/components/register/RoleSelector';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

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
    const fieldMap: Record<string, string> = {
      'register-name': 'fullName',
      'register-email': 'email',
      'register-avatar-link': 'avatarUrl',
      'register-password': 'password'
    };
    if (fieldMap[id]) {
      setFormData(prev => ({ ...prev, [fieldMap[id]]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await signUp.email({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        image: formData.avatarUrl?.trim() || undefined,
        role: formData.role,
      });

      if (error) {
        console.error("SignUp error response:", error);
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Registration successful!");
      router.push("/");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white selection:bg-amber-200 overflow-x-hidden">
      <HeroSection />

      <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center px-6 py-12 md:p-16 bg-white overflow-y-auto">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md text-left space-y-7">

          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="bg-gray-100/80 p-1 rounded-full flex space-x-1 text-xs font-semibold uppercase tracking-wider">
              <a href="/login" className="px-6 py-2 text-gray-500 rounded-full hover:text-gray-900 transition-colors">Login</a>
              <span className="bg-[#0f172a] text-white px-6 py-2 rounded-full shadow-sm">Register</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="text-gray-900 font-serif text-3xl font-bold tracking-tight">Create Your Account</h3>
            <p className="text-gray-400 text-sm font-light">Sign up to manage your private viewing schedule.</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <RoleSelector selectedRole={formData.role} onChange={handleInputChange} />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="register-name" className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Full Name</Label>
              <Input id="register-name" type="text" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange} className="w-full h-12 bg-gray-50/30 border border-gray-200/80 rounded-xl text-gray-900 text-sm px-4" required />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="register-email" className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Email Address</Label>
              <Input id="register-email" type="email" placeholder="name@domain.com" value={formData.email} onChange={handleInputChange} className="w-full h-12 bg-gray-50/30 border border-gray-200/80 rounded-xl text-gray-900 text-sm px-4" required />
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="register-avatar-link" className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Profile Image URL</Label>
              <div className="relative flex items-center">
                <div className="absolute left-4 text-gray-400 pointer-events-none z-10"><Picture /></div>
                <Input id="register-avatar-link" type="url" placeholder="https://imgbb.com/your-avatar-link" value={formData.avatarUrl} onChange={handleInputChange} className="w-full h-12 bg-gray-50/30 border border-gray-200/80 rounded-xl text-gray-900 text-sm pl-11 pr-4" required />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
              <Label htmlFor="register-password" className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">Password</Label>
              <Input id="register-password" type="password" placeholder="********" value={formData.password} onChange={handleInputChange} className="w-full h-12 bg-gray-50/30 border border-gray-200/80 rounded-xl text-gray-900 text-sm px-4" required />
            </motion.div>

            <motion.button variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={loading} className="w-full h-12 bg-[#0f172a] hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center cursor-pointer">
              {loading ? "Registering..." : "Register"}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-100" />
            <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold tracking-widest uppercase">Or Continue With</span>
            <div className="flex-grow border-t border-gray-100" />
          </motion.div>

          <motion.div variants={itemVariants} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <button type="button" className="w-full h-11 border border-gray-200 hover:border-gray-900 rounded-xl flex items-center justify-center space-x-2.5 text-gray-700 hover:text-gray-900 transition-all text-xs font-semibold tracking-wide cursor-pointer">
              <FcGoogle size={16} />
              <span>Google</span>
            </button>
          </motion.div>

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