'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const MotionDiv: React.FC<MotionWrapperProps> = ({ children, ...props }) => {
  return <motion.div {...props}>{children}</motion.div>;
};