import { getFeaturesProperty } from '@/lib/api/property';
import { Variants } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import PropertyCard, { Property } from './PropertyCard';
import { MotionDiv } from './MotionWrapper';
import type { Property as ApiProperty } from '@/types/property';

const FeaturesSection = async () => {
  const featuresData: ApiProperty[] = await getFeaturesProperty().catch((): ApiProperty[] => []);

  // Map from the canonical API Property shape to PropertyCard's Property shape.
  // The API uses `id` (Prisma UUID string), not MongoDB's `_id`.
  const formattedProperties: Property[] = (Array.isArray(featuresData) ? featuresData : []).map((item) => ({
    id:          item.id,
    title:       item.title,
    type:        item.type,
    price:       item.price,
    location:    item.location,
    bedrooms:    item.bedrooms,
    bathrooms:   item.bathrooms,
    area:        item.area,
    image:       item.image       || '',
    status:      item.status,
    description: item.description || undefined,
    sellerId:    item.sellerId,
  }));

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000] }
    }
  };

  return (
    <section className="py-20 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="text-[11px] font-bold text-[#C9A227] tracking-[0.25em] uppercase block">
            Discover Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0f172a] tracking-tight">
            Featured Premium Properties
          </h2>
          <div className="w-12 h-[2px] bg-[#C9A227] mx-auto my-4" />
          <p className="text-gray-500 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Explore our curated selection of architectural masterpieces combining structural engineering with premium luxury assets.
          </p>
        </MotionDiv>

        {formattedProperties.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm font-light">
            No featured properties found at the moment.
          </div>
        ) : (
          <>
            <MotionDiv
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {formattedProperties.map((property) => (
                <MotionDiv key={property.id} variants={itemVariants}>
                  <PropertyCard property={property} />
                </MotionDiv>
              ))}
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center mt-16"
            >
              <Link
                href="/properties"
                className="inline-block border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227] hover:text-white font-medium text-xs tracking-widest uppercase px-8 py-4 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
              >
                View All Properties
              </Link>
            </MotionDiv>
          </>
        )}

      </div>
    </section>
  );
};

export default FeaturesSection;