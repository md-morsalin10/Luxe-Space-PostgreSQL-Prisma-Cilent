import { MapPin } from '@gravity-ui/icons';
import Link from 'next/link';
import React from 'react';
import { BiBath, BiBed } from 'react-icons/bi';
import { FiMaximize } from 'react-icons/fi';


export interface Property {
  _id: string;
  title: string;
  type: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  status: string;
  description?: string;
  sellerId?: string;
  sellerName?: string;
  sellerEmail?: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link href={`/properties/${property.id}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer">
      {/* Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        <img
          src={property.image}
          alt={property.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#0f172a] text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded shadow-sm border border-gray-100">
          Exclusive
        </span>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif font-semibold text-base text-[#0f172a] tracking-wide line-clamp-1 group-hover:text-[#C9A227] transition-colors">
            {property.title}
          </h3>
          <span className="text-sm font-bold text-[#C9A227] whitespace-nowrap">
            ${property.price.toLocaleString()}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-5">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-100 mt-auto mb-4" />

        {/* Specs Footer */}
        <div className="grid grid-cols-3 gap-2 text-gray-500 text-[11px] font-medium">
          <div className="flex items-center gap-1.5 justify-start">
            <BiBed className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 justify-start">
            <BiBath className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 justify-start">
            <FiMaximize className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{property.area} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;