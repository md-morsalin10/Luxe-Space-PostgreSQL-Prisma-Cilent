import { getAllProperties } from '@/lib/api/property';
import React from 'react';
import PropertiesClient from './PropertiesClient';
import { Property } from '@/components/PropertyCard';

const PropertyPage = async () => {
    const allProperty = await getAllProperties();
    // নিশ্চিত হওয়া যে ডেটা সঠিক অ্যারে ফরম্যাটে আছে
    const properties: Property[] = Array.isArray(allProperty) ? allProperty : [];

    return <PropertiesClient initialProperties={properties} />;
};

export default PropertyPage;