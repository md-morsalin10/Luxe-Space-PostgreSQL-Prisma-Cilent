'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import { getTokenFromClient } from '@/lib/core/token-client';

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string;
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:5000';

  const [formData, setFormData] = useState({
    title: '',
    type: 'villa',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    image: '',
    status: 'available'
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!propertyId) return;

    const fetchProperty = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/property/${propertyId}`);

        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (res.ok && data && data.success !== false) {
          // If the backend wraps response in data.data or returns it directly
          const prop = data.data || data;
          setFormData({
            title: prop.title || '',
            type: prop.type || 'villa',
            price: prop.price?.toString() || '',
            location: prop.location || '',
            bedrooms: prop.bedrooms?.toString() || '',
            bathrooms: prop.bathrooms?.toString() || '',
            area: prop.area?.toString() || '',
            description: prop.description || '',
            image: prop.image || prop.imageUrl || '',
            status: prop.status || 'available'
          });
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId, baseUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const token = await getTokenFromClient()
    // console.log("🔑 Client-side Token:", token);
    try {
      const res = await fetch(`${baseUrl}/api/property/${propertyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          area: Number(formData.area),
        })
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: '<h2 class="text-xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Success!</h2>',
          html: "<p class='text-gray-300 text-sm'>Property updated successfully.</p>",
          icon: 'success',
          background: '#0B1329',
          color: '#fff',
          customClass: {
            popup: 'border border-emerald-500/20 rounded-2xl shadow-2xl',
            confirmButton: 'bg-[#C9A227] hover:bg-[#b08d22] text-white font-medium py-2 px-6 rounded-xl shadow-lg transition-all',
          },
          buttonsStyling: false
        });
        router.push('/dashboard/seller/my-properties');
        router.refresh();
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message || 'Failed to update property',
          icon: 'error',
          background: '#0B1329',
          color: '#fff'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong while connecting to the server',
        icon: 'error',
        background: '#0B1329',
        color: '#fff'
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-10"></div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2 h-12 bg-gray-100 rounded-xl"></div>
            <div className="sm:col-span-2 h-12 bg-gray-100 rounded-xl"></div>
            <div className="h-12 bg-gray-100 rounded-xl"></div>
            <div className="h-12 bg-gray-100 rounded-xl"></div>
            <div className="h-12 bg-gray-100 rounded-xl"></div>
            <div className="h-12 bg-gray-100 rounded-xl"></div>
            <div className="sm:col-span-2 h-32 bg-gray-100 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50/50 py-20 px-4 flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-2xl border border-red-100 shadow-lg text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-500 mb-8">The property you are trying to edit does not exist or may have been deleted.</p>
          <button
            onClick={() => router.push('/dashboard/seller/my-properties')}
            className="w-full bg-[#0f172a] hover:bg-[#C9A227] text-white font-medium py-3 px-4 rounded-xl transition-colors"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-serif font-bold text-[#0f172a] mb-2 tracking-wide">
          Edit Property Details
        </h1>
        <p className="text-gray-500 text-sm mb-10">
          Make changes to your property listing details below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {/* Title */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Property Title</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="e.g. Modern Villa with Pool" />
            </div>

            {/* Location */}
            <div className="sm:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="e.g. 123 Luxury Avenue, Beverly Hills" />
            </div>

            {/* Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">Property Type</label>
              <select name="type" id="type" value={formData.type} onChange={handleChange}
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all">
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="mansion">Mansion</option>
                <option value="penthouse">Penthouse</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (USD)</label>
              <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required min="0"
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="e.g. 5000000" />
            </div>

            {/* Bedrooms */}
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
              <input type="number" name="bedrooms" id="bedrooms" value={formData.bedrooms} onChange={handleChange} required min="0"
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="e.g. 5" />
            </div>

            {/* Bathrooms */}
            <div>
              <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
              <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} required min="0"
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="e.g. 4" />
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area (sq ft)</label>
              <input type="number" name="area" id="area" value={formData.area} onChange={handleChange} required min="0"
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="e.g. 4500" />
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
              <select name="status" id="status" value={formData.status} onChange={handleChange}
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all">
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Cover Image URL</label>
              <input type="url" name="image" id="image" value={formData.image} onChange={handleChange}
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="https://example.com/image.jpg" />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea name="description" id="description" rows={5} value={formData.description} onChange={handleChange} required
                className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-[#C9A227] focus:bg-white focus:ring-1 focus:ring-[#C9A227] outline-none transition-all"
                placeholder="Describe the property features and highlights..."></textarea>
            </div>

          </div>

          <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => router.push('/dashboard/seller/my-properties')}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#0f172a] rounded-xl hover:bg-[#C9A227] transition-colors shadow-sm disabled:opacity-70"
            >
              {submitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
