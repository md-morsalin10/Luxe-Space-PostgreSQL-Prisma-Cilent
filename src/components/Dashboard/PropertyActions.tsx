'use client';

import React, { useState } from 'react';
import { FiEdit3, FiTrash2, FiEye, FiAlertTriangle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { getTokenFromClient } from '@/lib/core/token-client';

interface PropertyActionsProps {
  propertyId: string;
  currentStatus: string;
  propertyTitle?: string;
  propertyPrice?: number;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({ 
  propertyId, 
  currentStatus 
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isSold = currentStatus.toLowerCase() === 'sold';
  
  const baseUrl = process.env.NEXT_PUBLIC_URL || '';

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${baseUrl}/api/property/${propertyId}`, {
        method: 'DELETE',
        headers: {
          "authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Property deleted permanently.', {
          style: {
            background: '#0B1329',
            color: '#fff',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }
        });
        setIsOpen(false);
        router.refresh(); 
      } else {
        toast.error(data.message || 'Failed to delete property', {
          style: { background: '#0B1329', color: '#fff', border: '1px solid rgba(239, 68, 68, 0.2)' }
        });
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Something went wrong while connecting to the server', {
        style: { background: '#0B1329', color: '#fff', border: '1px solid rgba(239, 68, 68, 0.2)' }
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-3">
        {/* View Details Button */}
        <Link
          href={`/properties/${propertyId}`}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border shadow-sm bg-white text-[#0f172a] hover:text-[#C9A227] border-gray-200 hover:border-[#C9A227]`}
          title="View Details"
        >
          <FiEye className="w-3.5 h-3.5" />
          View
        </Link>

        {/* Edit Button */}
        <Link
          href={`/dashboard/seller/edit-property/${propertyId}`}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border shadow-sm ${
            isSold 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60' 
              : 'bg-white text-[#0f172a] hover:text-[#C9A227] border-gray-200 hover:border-[#C9A227]'
          }`}
          title={isSold ? "Sold properties cannot be edited" : "Edit Property"}
          onClick={(e) => {
            if (isSold) e.preventDefault();
          }}
        >
          <FiEdit3 className="w-3.5 h-3.5" />
          Edit
        </Link>

        {/* Delete Button trigger */}
        <button
          onClick={() => setIsOpen(true)}
          disabled={isSold}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all border shadow-sm ${
            isSold 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60' 
              : 'bg-red-50/50 text-red-600 hover:text-white border-red-100 hover:border-red-600 hover:bg-red-600'
          }`}
          title={isSold ? "Sold properties cannot be deleted" : "Delete Property"}
        >
          <FiTrash2 className="w-3.5 h-3.5" />
          Delete
        </button>
      </div>

      {/* Native Tailwind CSS Modal (Option B) */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          {/* Modal Backdrop / Click to close */}
          <div className="absolute inset-0" onClick={() => !isDeleting && setIsOpen(false)}></div>
          
          {/* Modal Content Card */}
          <div className="relative bg-[#0B1329] border border-amber-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl transform scale-100 transition-all">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                <FiAlertTriangle className="w-8 h-8 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent mb-3">
                Delete Property?
              </h2>
              <p className="text-gray-300 text-sm text-center mb-8">
                This action cannot be undone. Are you sure you want to permanently remove this listing?
              </p>
              
              <div className="flex w-full justify-center gap-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  disabled={isDeleting}
                  className="px-6 py-2.5 rounded-xl border border-gray-600 text-gray-300 font-medium hover:bg-white/5 hover:border-gray-400 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-8 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg shadow-red-600/30 transition-all flex items-center justify-center min-w-[120px] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    'Yes, delete it'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyActions;