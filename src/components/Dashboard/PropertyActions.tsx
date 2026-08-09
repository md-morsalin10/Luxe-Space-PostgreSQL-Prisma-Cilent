'use client';

import React, { useState } from 'react';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PropertyActionsProps {
  propertyId: string;
  currentStatus: string;
  propertyTitle: string;
  propertyPrice: number;
}

const PropertyActions: React.FC<PropertyActionsProps> = ({ 
  propertyId, 
  currentStatus 
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const isSold = currentStatus.toLowerCase() === 'sold';
  
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const handleDelete = async () => {
    if (isSold) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this property?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`${baseUrl}/api/property/${propertyId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Property deleted successfully');
        router.refresh(); 
      } else {
        alert(data.message || 'Failed to delete property');
      }
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Something went wrong while connecting to the server');
    } finally {
      setIsDeleting(false);
    }
  };

 


  return (
    <div className="flex items-center gap-3">
      {/* Edit Button */}
      <Link
        href={`/properties/${propertyId}`}
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors border shadow-sm ${
          isSold 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60' 
            : 'bg-white text-[#0f172a] hover:text-[#C9A227] border-gray-200 hover:border-[#C9A227]'
        }`}
        title={isSold ? "Sold properties cannot be edited" : "Edit Property"}
      >
        <FiEdit3 className="w-3.5 h-3.5" />
        View Details
      </Link>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        disabled={isSold || isDeleting}
        className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all border shadow-sm ${
          isSold 
            ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60' 
            : 'bg-red-50/50 text-red-600 hover:text-white border-red-100 hover:border-red-600 hover:bg-red-600'
        }`}
        title={isSold ? "Sold properties cannot be deleted" : "Delete Property"}
      >
        <FiTrash2 className="w-3.5 h-3.5" />
        {isDeleting ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default PropertyActions;