'use client';

import { motion } from 'framer-motion';
import { RoadmapPhase as RoadmapPhaseType } from './roadmap-data';
import RoadmapCard from './RoadmapCard';

interface RoadmapPhaseProps {
  phase: RoadmapPhaseType;
  index: number;
  isActive: boolean;
}

export default function RoadmapPhase({ phase, index, isActive }: RoadmapPhaseProps) {
  return (
    <div className="flex flex-col justify-center py-8 sm:py-12">
      {/* Massive Phase Title - Premium Feel */}
      <motion.div 
        className="mb-12 sm:mb-16"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Phase Number - Smaller on mobile */}
        <motion.div
          className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[180px] font-light text-white/[0.03] leading-none mb-[-40px] sm:mb-[-50px] md:mb-[-60px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          0{index + 1}
        </motion.div>

        {/* Phase Title */}
        <motion.h2 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3"
          initial={{ opacity: 0, y: 50 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {phase.phase}
        </motion.h2>

        {/* Period */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-500 font-light"
          initial={{ opacity: 0, x: -30 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {phase.period}
        </motion.p>
      </motion.div>

      {/* Items - Clean Layout */}
      <motion.div 
        className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {phase.items.map((item, itemIndex) => (
          <RoadmapCard key={item.id} item={item} index={itemIndex} />
        ))}
      </motion.div>
    </div>
  );
}

