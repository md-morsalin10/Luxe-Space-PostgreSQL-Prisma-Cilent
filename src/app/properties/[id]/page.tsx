import { getPropertyById } from '@/lib/api/property';
import React from 'react';
import PropertyDetailsClient from './PropertyDetailsClient';


const PropertyDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data = await getPropertyById({ propertyId: id });

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500 font-medium">Property not found.</p>
            </div>
        );
    }

    return <PropertyDetailsClient property={Array.isArray(data) ? data[0] : data} />;
};

export default PropertyDetails;