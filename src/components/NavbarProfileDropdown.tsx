"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, LayoutSideContent } from "@gravity-ui/icons";
import { Dropdown } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  role?: 'user' | 'admin';
}

const NavbarProfileDropdown: React.FC = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user as AuthUser | undefined;

    const handleSignOut = async (): Promise<void> => {
        try {
            await authClient.signOut();
            router.push("/");
        } catch (error) {
            console.error("Sign out failed:", error);
        }
    };

    const getFallbackLetter = () => {
        return user?.name ? user.name[0].toUpperCase() : "U";
    };

    return (
        <div className="flex items-center">
            <Dropdown >
                {/* Trigger Avatar: এরর এড়াতে button পরিবর্তন করে div করা হয়েছে */}
                <Dropdown.Trigger>
                    <div className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-gray-800 hover:ring-[#E5BA73]/60 transition-all duration-200 p-[2px] flex items-center justify-center bg-[#1A202C] min-w-[40px] min-h-[40px] overflow-hidden outline-none">
                        {user?.image ? (
                            <Image
                                height={40}
                                width={40} 
                                src={user.image} 
                                alt={user?.name || "Avatar"} 
                                className="w-full h-full object-cover rounded-full"
                                unoptimized // Imgbb-এর মত এক্সটার্নাল লিংকের ক্ষেত্রে নেক্সট ইমেজ অপ্টিমাইজেশন এরর আটকাতে এটি সেফ
                            />
                        ) : (
                            <span className="text-[#E5BA73] font-serif font-bold text-sm select-none">
                                {getFallbackLetter()}
                            </span>
                        )}
                    </div>
                </Dropdown.Trigger>

                {/* Popover Container */}
                <Dropdown.Popover className="bg-[#111622] border border-gray-800/80 rounded-2xl shadow-2xl p-2 min-w-[240px] text-white backdrop-blur-xl overflow-visible">
                    
                    {/* User Profile Header Summary */}
                    <div className="px-3 py-3 border-b border-gray-800/60 mb-2 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1A202C] flex items-center justify-center overflow-hidden ring-1 ring-gray-800 min-w-[32px] min-h-[32px]">
                            {user?.image ? (
                                <Image 
                                    height={10}
                                    width={10}
                                    src={user.image} 
                                    alt="Profile" 
                                    className="w-full h-full object-cover rounded-full"
                                />
                            ) : (
                                <span className="text-[#E5BA73] text-xs font-bold">
                                    {getFallbackLetter()}
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                            <p className="text-sm font-medium text-white truncate leading-tight">
                                {user?.name || "Guest User"}
                            </p>
                            <p className="text-[11px] text-gray-400 truncate mt-0.5 font-light">
                                {user?.email || "No email available"}
                            </p>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <Dropdown.Menu aria-label="Profile Actions" className="p-0 flex flex-col gap-1 text-white">
                        
                        <Dropdown.Item key="browse" textValue="Browse Ebooks" className="hover:bg-gray-800/50 p-2 rounded-xl transition-colors text-white data-[hover=true]:bg-gray-800/50">
                            <Link href="/properties" className="flex items-center gap-3 w-full group">
                                <LayoutSideContent className="w-4 h-4 text-gray-400 group-hover:text-[#E5BA73] transition-colors" />
                                <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                                    Explore Properties
                                </span>
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item key="dashboard" textValue="Dashboard" className="hover:bg-gray-800/50 p-2 rounded-xl transition-colors text-white data-[hover=true]:bg-gray-800/50">
                            <Link href={`/dashboard/${user?.role || "user"}`} className="flex items-center gap-3 w-full group">
                                <LayoutSideContent className="w-4 h-4 text-gray-400 group-hover:text-[#E5BA73] transition-colors" />
                                <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                                    Dashboard
                                </span>
                            </Link>
                        </Dropdown.Item>

                        {/* লগআউট বাটন */}
                        <Dropdown.Item
                            key="logout"
                            onClick={handleSignOut}
                            textValue="Logout"
                            className="p-2 rounded-xl mt-1 hover:bg-red-950/40 text-red-400 data-[hover=true]:bg-red-950/40 data-[hover=true]:text-red-300 transition-colors border-t border-gray-800/40"
                        >
                            <div className="flex w-full items-center justify-between gap-2 cursor-pointer">
                                <span className="text-xs font-semibold">Log Out</span>
                                <ArrowRightFromSquare className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </div>
                        </Dropdown.Item>

                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div>
    );
};

export default NavbarProfileDropdown;