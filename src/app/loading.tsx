"use client";

import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FCFCFD] overflow-hidden select-none">
           
            <div className="absolute w-[400px] h-[400px] bg-[#C9A227]/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative flex flex-col items-center">
                
              
                <div className="relative w-28 h-28 flex items-center justify-center">
                    
                   
                    <div className="absolute inset-0 rounded-full border border-slate-100" />
                    
                    <div className="absolute inset-0 rounded-full border border-transparent border-t-[#C9A227] animate-spin [animation-duration:1.5s]" />

                  
                    <div className="relative w-10 h-10 flex flex-col items-center justify-end overflow-hidden">
                     
                        <div className="w-8 h-8 border-t-2 border-l-2 border-[#0F172A] rotate-45 translate-y-3.5 rounded-[1px] animate-[pulse_2s_infinite]" />
                        
             
                        <div className="w-7 h-5 border-l-2 border-r-2 border-b-2 border-[#0F172A] bg-white/50 z-10 rounded-sm flex items-center justify-center">
                         
                            <div className="w-2.5 h-2.5 bg-[#C9A227] rounded-[1px] animate-pulse shadow-[0_0_8px_#C9A227]" />
                        </div>
                    </div>

                </div>

            
                <div className="mt-6 flex flex-col items-center text-center">
                    
              
                    <h2 className="text-sm font-bold text-[#0F172A] uppercase tracking-[0.4em] font-serif">
                        LuxeSpace
                    </h2>
                    
                  
                    <div className="h-[1.5px] w-24 bg-[#0F172A]/5 rounded-full mt-3.5 relative overflow-hidden">
                        <div 
                            className="absolute inset-y-0 h-full w-8 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent animate-[luxurySlide_1.6s_infinite_ease-in-out]"
                            style={{ willChange: 'transform' }}
                        />
                    </div>

               
                    <p className="text-[10px] text-slate-400 mt-3 font-medium tracking-[0.2em] uppercase">
                        Curating Masterpieces
                    </p>
                </div>

            </div>

    
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes luxurySlide {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(300%);
                    }
                }
            `}} />
        </div>
    );
};

export default Loading;