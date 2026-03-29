'use client';

import type { HTMLMotionProps } from 'motion/react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type React from 'react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface CardTiltProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  maxTilt?: number;
  scale?: number;
}

export function CardTilt({
  children,
  maxTilt = 15,
  scale = 1.02,
  className,
  ...props
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale }}
      className={cn('w-full relative transition-all duration-200', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
