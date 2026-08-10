import { getAllProperties } from '@/lib/api/property';
import React from 'react';
import PropertiesClient from './PropertiesClient';
import { Property } from '@/components/PropertyCard';

const PropertyPage = async () => {
    const allProperty = await getAllProperties();
    console.log(allProperty, "property")
    
    const properties: Property[] = allProperty?.data || [];
   

    return <PropertiesClient initialProperties={properties} />;
};

export default PropertyPage;