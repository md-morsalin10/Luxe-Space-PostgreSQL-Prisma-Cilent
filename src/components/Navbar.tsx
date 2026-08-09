"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars, Xmark } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import NavbarProfileDropdown from "./NavbarProfileDropdown";

// ৩টি রোল ডিফাইন করা হলো: buyer, seller, admin
interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  role?: "buyer" | "seller" | "admin"; 
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as AuthUser | undefined;


  if (pathname.includes("dashboard")) {
    return null;
  }


  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Properties", href: "/properties" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];


  if (user) {
   
    navLinks.push({ label: "Dashboard", href: `/dashboard/${user.role}` });
  }

  return (
    <nav className="bg-white text-[#0f172a] border-b border-gray-100 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Side: LuxeSpace Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-serif font-semibold text-[#0f172a] tracking-wider">
              LuxeSpace
            </Link>
          </div>

          {/* Center: Desktop Navigation Links (গোল্ডেন-ব্রাউন অ্যাকটিভ ইন্ডিকেটর সহ) */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium pb-2 transition-colors duration-200 hover:text-[#0f172a] ${
                    isActive ? "text-[#0f172a]" : "text-gray-600"
                  }`}
                >
                  {link.label}
                  {/* Active Underline Effect */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C9A227] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Auth Buttons & Profile (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            {isPending ? (
              <div className="w-9 h-9 bg-gray-100 rounded-full animate-pulse" />
            ) : user ? (
              <>
                <div className="text-right flex flex-col justify-center">
                  <span className="text-[#0f172a] text-xs font-semibold leading-none">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                  <span className="text-[9px] text-[#54748B] font-bold uppercase tracking-widest mt-1 block leading-none">
                    {user.role}
                  </span>
                </div>
                <NavbarProfileDropdown />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-[#0f172a] transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-[#0f172a] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1e293b] transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#0f172a] hover:bg-gray-50 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <Xmark className="block" style={{ width: "24px", height: "24px" }} />
              ) : (
                <Bars className="block" style={{ width: "24px", height: "24px" }} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu (Smooth Animation) */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
        id="mobile-menu"
      >
        <div className="px-6 pt-2 pb-6 space-y-2 bg-white border-t border-gray-100 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors duration-150 ${
                  isActive
                    ? "bg-gray-50 text-[#C9A227] font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-[#0f172a]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Mobile Auth and Profile Section */}
          <div className="pt-4 mt-4 border-t border-gray-100 px-4 space-y-3">
            {isPending ? (
              <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                  <span className="text-[10px] text-[#54748B] font-bold uppercase tracking-wider">{user.role}</span>
                </div>
                <NavbarProfileDropdown />
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center text-base font-medium text-gray-700 hover:text-[#0f172a] py-2 border border-gray-200 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-[#0f172a] text-white px-4 py-2.5 rounded-lg text-base font-medium shadow-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;