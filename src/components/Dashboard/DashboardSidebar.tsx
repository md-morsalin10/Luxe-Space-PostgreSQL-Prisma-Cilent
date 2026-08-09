"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Bars,
  LayoutSideContent,
  Plus,
  Persons,
  Gear,
  ArrowRightToSquare,
  Person,
} from "@gravity-ui/icons";
import { PiListMagnifyingGlassThin, PiHouseLineThin } from "react-icons/pi";
import { BiHome, BiBuildingHouse } from "react-icons/bi";
import { FiTrendingUp } from "react-icons/fi";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

interface CustomUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role?: string;
}

export default function DashboardSideBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as CustomUser | undefined;

  const currentRole = user?.role || "buyer";

  // 🚪 ফিক্সড লগআউট ফাংশন (onMouseDown এর জন্য ইভেন্ট টাইপ হ্যান্ডলিং)
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation(); // বাবলিং সম্পূর্ণ ব্লক করা হলো
    
    setIsMenuOpen(false);
    setIsDrawerOpen(false);

    try {
      await authClient.signOut();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 🛍️ 1. Buyer Navigation
  const buyerNavItems = [
    { icon: LayoutSideContent, href: "/dashboard/buyer", label: "Buyer Dashboard" },
    { icon: PiHouseLineThin, href: "/properties", label: "Explore Apartments" },
    { icon: PiListMagnifyingGlassThin, href: "/dashboard/buyer/my-booking", label: "My Bookings" },
    { icon: Gear, href: "/dashboard/buyer/profile", label: "My Profile" },
  ];

  // 🏢 2. Seller Navigation
  const sellerNavItems = [
    { icon: LayoutSideContent, href: "/dashboard/seller", label: "Seller Dashboard" },
    { icon: Plus, href: "/dashboard/seller/add-property", label: "Add Apartment" },
    { icon: BiBuildingHouse, href: "/dashboard/seller/my-properties", label: "My Apartments" },
    { icon: Person, href: "/dashboard/seller/profile", label: "My Profile" },
  ];

  // 👑 3. Admin Navigation
  const adminNavItems = [
    { icon: LayoutSideContent, href: "/dashboard/admin", label: "Admin Control Panel" },
    { icon: Persons, href: "/dashboard/admin/manage-users", label: "All Users & Roles" },
    { icon: BiHome, href: "/dashboard/admin/manage-properties", label: "All Properties (Maintain)" },
    { icon: FiTrendingUp, href: "/dashboard/admin/analytics", label: "Platform Analytics" },
  ];

  const navLinksMap = {
    buyer: buyerNavItems,
    seller: sellerNavItems,
    admin: adminNavItems,
  };

  const navItems = navLinksMap[currentRole as keyof typeof navLinksMap] || buyerNavItems;

  const roleLabelMap = {
    buyer: "Buyer Panel",
    seller: "Seller Panel",
    admin: "Admin Control",
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#1C2533] text-[#F0F7F4] py-6 px-4 justify-between border-r border-[#54748B]/15 font-sans">
      <div className="flex flex-col flex-1">
        {/* 👑 Brand Identity */}
        <div className="px-3 mb-8 border-b border-[#54748B]/15 pb-4">
          <Link
            href="/"
            onClick={() => setIsDrawerOpen(false)}
            className="text-2xl font-bold text-[#C9A227] tracking-wider block"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            LuxeSpace
            <span className="text-[10px] font-sans uppercase tracking-widest text-[#54748B] font-bold block mt-1">
              {roleLabelMap[currentRole as keyof typeof roleLabelMap] || "User Panel"}
            </span>
          </Link>
        </div>

        {/* 🔗 Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {!mounted || isPending ? (
            <div className="space-y-3 px-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-9 bg-[#54748B]/10 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsDrawerOpen(false);
                  }}
                  className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-[11px] uppercase tracking-wider font-bold transition-all duration-300 group ${isActive
                      ? "bg-[#C9A227]/15 text-[#C9A227] border-l-2 border-[#C9A227] pl-[14px]"
                      : "text-gray-300 hover:text-[#F0F7F4] hover:bg-[#54748B]/10 pl-4"
                    }`}
                >
                  <item.icon
                    className={`w-4 h-4 transition-colors ${isActive ? "text-[#C9A227]" : "text-gray-400 group-hover:text-[#F0F7F4]"
                      }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })
          )}
        </nav>
      </div>

      {/* 👤 Profile Area */}
      <div ref={menuRef} className="relative mt-auto border-t border-[#54748B]/15 pt-4 w-full">
        {isMenuOpen && mounted && user && (
          <div className="absolute bottom-16 left-0 w-full bg-[#141B26] border border-[#54748B]/20 rounded-xl p-1.5 shadow-2xl z-50 flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => {
                setIsMenuOpen(false);
                setIsDrawerOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-[#F0F7F4] hover:bg-[#54748B]/10 transition-colors"
            >
              <BiHome className="w-4 h-4 text-gray-400" />
              <span>Go to Home</span>
            </Link>

            {/* 🚪 অন-মাউস-ডাউন ইভেন্ট হ্যান্ডলার ও হাই জেড-ইনডেক্স ব্যবহার করা হয়েছে */}
            <button
              type="button"
              onMouseDown={handleLogout}
              className="relative z-50 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left cursor-pointer select-none"
            >
              <ArrowRightToSquare className="w-4 h-4 text-red-400" />
              <span>Log Out</span>
            </button>
          </div>
        )}

        {mounted && !isPending && user ? (
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-all duration-200 ${isMenuOpen ? "bg-[#54748B]/15 ring-1 ring-[#54748B]/20" : "hover:bg-[#54748B]/5"
              }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full border border-[#C9A227]/40 overflow-hidden flex-shrink-0 bg-[#54748B]/20 flex items-center justify-center">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-white">{user.name ? user.name[0] : "U"}</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#F0F7F4] truncate">
                  {user?.name || "User"}
                </span>
                <span className="text-[10px] text-gray-400 truncate">
                  {user?.email}
                </span>
              </div>
            </div>
            <div className="text-gray-400 pr-1 flex-shrink-0">
              {isMenuOpen ? <IoChevronDownOutline className="w-3.5 h-3.5" /> : <IoChevronUpOutline className="w-3.5 h-3.5" />}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full px-3 h-12 bg-[#54748B]/10 rounded-xl animate-pulse" />
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen flex-shrink-0 bg-[#1C2533] sticky top-0">
        {navContent}
      </aside>

      {/* 📱 Mobile Trigger Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="rounded-full shadow-2xl h-12 w-12 flex items-center justify-center bg-[#C9A227] text-[#1C2533] hover:bg-[#b08d20] active:scale-95 transition-transform cursor-pointer"
        >
          <Bars className="w-5 h-5" />
        </button>
      </div>

      {/* 📱 Mobile Custom Drawer Sheet */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div
          onClick={() => setIsDrawerOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <div className={`absolute top-0 left-0 w-[260px] h-full shadow-2xl transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
          {navContent}
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-[-40px] text-white bg-[#1C2533] p-2 rounded-r-md border-y border-r border-[#54748B]/20 cursor-pointer"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}