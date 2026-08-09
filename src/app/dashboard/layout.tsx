import React from 'react';
import DashboardSideBar from '@/components/Dashboard/DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
 
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      
  
      <DashboardSideBar />

      {/* 🚀 Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        
        {/* 📱 Mobile Top Header */}
        <header className="lg:hidden flex items-center justify-between bg-[#1C2533] text-[#F0F7F4] px-6 py-4">
          <span className="text-xl font-bold text-[#C9A227] tracking-wider" style={{ fontFamily: "'Playfair Display', serif" }}>
            LuxeSpace
          </span>
        </header>

    
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
   
          <div className="max-w-7xl mx-auto w-full bg-white border border-[#E2E8F0] rounded-2xl p-6 min-h-[calc(100vh-4rem)] lg:min-h-0 shadow-sm">
            {children}
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default DashboardLayout;