import { getPropertyById } from '@/lib/api/property';
import React from 'react';
import PropertyDetailsClient from './PropertyDetailsClient';
import { notFound } from 'next/navigation';

const PropertyDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const property = await getPropertyById({ propertyId: id });

    if (!property) {
        notFound();
    }

    return <PropertyDetailsClient property={property} />;
};

export default PropertyDetails;