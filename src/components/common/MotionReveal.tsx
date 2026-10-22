import React from 'react';
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';

// Standard viewport animation configuration
export const viewportConfig = {
  once: true,
  margin: '-60px 0px -40px 0px',
  amount: 0.15,
};

// Easing curves
export const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Smooth Apple/Automotive cubic bezier
export const bounceSpring = { type: 'spring' as const, damping: 20, stiffness: 180 };

interface FadeInProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  children: React.ReactNode;
}

export const FadeIn: React.FC<FadeInProps> = ({
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 32,
  className = '',
  children,
  ...props
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      case 'none': return { opacity: 0 };
    }
  };

  const getTargetPosition = () => {
    switch (direction) {
      case 'up':
      case 'down': return { y: 0, opacity: 1 };
      case 'left':
      case 'right': return { x: 0, opacity: 1 };
      case 'none': return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={getTargetPosition()}
      viewport={viewportConfig}
      transition={{
        duration,
        delay,
        ease: luxuryEase,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerChildren?: number;
  delayChildren?: number;
  className?: string;
  children: React.ReactNode;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  staggerChildren = 0.08,
  delayChildren = 0.1,
  className = '',
  children,
  ...props
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  className?: string;
  children: React.ReactNode;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  direction = 'up',
  className = '',
  children,
  ...props
}) => {
  const getVariants = (): Variants => {
    if (direction === 'scale') {
      return {
        hidden: { opacity: 0, scale: 0.92, y: 16 },
        show: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.55, ease: luxuryEase },
        },
      };
    }

    const offset = 24;
    let initialOffset = { y: offset };
    if (direction === 'down') initialOffset = { y: -offset };
    if (direction === 'left') initialOffset = { y: 0 };
    if (direction === 'right') initialOffset = { y: 0 };

    return {
      hidden: { opacity: 0, ...initialOffset },
      show: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: { duration: 0.55, ease: luxuryEase },
      },
    };
  };

  return (
    <motion.div
      variants={getVariants()}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

interface ScaleInProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

export const ScaleIn: React.FC<ScaleInProps> = ({
  delay = 0,
  duration = 0.55,
  className = '',
  children,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={viewportConfig}
      transition={{ duration, delay, ease: luxuryEase }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
