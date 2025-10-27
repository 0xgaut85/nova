'use client';

import { motion } from 'framer-motion';
import { RoadmapItem } from './roadmap-data';

interface RoadmapCardProps {
  item: RoadmapItem;
  index: number;
}

const statusConfig = {
  completed: {
    label: '✓ Completed',
    color: 'text-[#b2a962]',
  },
  'in-progress': {
    label: '◉ In Progress',
    color: 'text-white',
  },
  planned: {
    label: '○ Planned',
    color: 'text-gray-500',
  },
};

export default function RoadmapCard({ item, index }: RoadmapCardProps) {
  const status = statusConfig[item.status];
  const isFirstItem = index === 0;

  // First item gets grain texture box like docs CTA
  if (isFirstItem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="group relative"
      >
        {/* Corner crosses - same as landing page */}
        <style jsx>{`
          .roadmap-first-card::before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            width: 12px;
            height: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.25);
            border-left: 1px solid rgba(255, 255, 255, 0.25);
            z-index: 10;
            pointer-events: none;
          }
          .roadmap-first-card::after {
            content: '';
            position: absolute;
            top: -1px;
            right: -1px;
            width: 12px;
            height: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.25);
            border-right: 1px solid rgba(255, 255, 255, 0.25);
            z-index: 10;
            pointer-events: none;
          }
          .corner-bottom-left-roadmap {
            position: absolute;
            bottom: -1px;
            left: -1px;
            width: 12px;
            height: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            border-left: 1px solid rgba(255, 255, 255, 0.25);
            pointer-events: none;
            z-index: 10;
          }
          .corner-bottom-right-roadmap {
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 12px;
            height: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            border-right: 1px solid rgba(255, 255, 255, 0.25);
            pointer-events: none;
            z-index: 10;
          }
        `}</style>

        <div className="roadmap-first-card relative rounded-lg p-8 text-white overflow-hidden border border-white/[0.15]">
          {/* Corner crosses */}
          <div className="corner-bottom-left-roadmap" />
          <div className="corner-bottom-right-roadmap" />

          {/* Enhanced gradient background - black to green */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-[#0a0a0a] via-[#1a1a1a] to-[#b2a962]" />
          
          {/* Heavy grain texture overlay - same as docs CTA */}
          <div 
            className="absolute inset-0 opacity-[0.2] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '150px 150px'
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='7' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '100px 100px'
            }}
          />
          
          <div className="relative z-10">
            {/* Status */}
            <motion.p 
              className={`text-xs sm:text-sm font-light mb-3 ${status.color}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
            >
              {status.label}
            </motion.p>

            {/* Title */}
            <motion.h3 
              className="text-xl sm:text-2xl font-light text-white mb-3 group-hover:text-[#b2a962] transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
            >
              {item.title}
            </motion.h3>

            {/* Description */}
            <motion.p 
              className="text-sm sm:text-base text-gray-300 mb-4 font-light leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
            >
              {item.description}
            </motion.p>

            {/* Features */}
            {item.features && item.features.length > 0 && (
              <motion.ul 
                className="space-y-1.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
              >
                {item.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="text-gray-400 font-light text-xs sm:text-sm flex items-start gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.6 + i * 0.05 }}
                  >
                    <span className="text-white mt-0.5">—</span>
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Other items get corner crosses on minimalist design
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Corner crosses - same as landing page */}
      <style jsx>{`
        .roadmap-card-wrapper::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          width: 12px;
          height: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 10;
          pointer-events: none;
        }
        .roadmap-card-wrapper::after {
          content: '';
          position: absolute;
          top: -1px;
          right: -1px;
          width: 12px;
          height: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          z-index: 10;
          pointer-events: none;
        }
        .corner-bottom-left-roadmap-min {
          position: absolute;
          bottom: -1px;
          left: -1px;
          width: 12px;
          height: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
          z-index: 10;
        }
        .corner-bottom-right-roadmap-min {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 12px;
          height: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          border-right: 1px solid rgba(255, 255, 255, 0.15);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>

      {/* Minimalist Design - No boxes but with corner crosses */}
      <div className="roadmap-card-wrapper py-6 border-b border-white/[0.06] hover:border-[#b2a962]/30 transition-all duration-500">
        {/* Corner crosses */}
        <div className="corner-bottom-left-roadmap-min" />
        <div className="corner-bottom-right-roadmap-min" />

        {/* Status */}
        <motion.p 
          className={`text-xs sm:text-sm font-light mb-3 ${status.color}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
        >
          {status.label}
        </motion.p>

        {/* Title - Big and Bold */}
        <motion.h3 
          className="text-xl sm:text-2xl font-light text-white mb-3 group-hover:text-[#b2a962] transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        >
          {item.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-sm sm:text-base text-gray-400 mb-4 font-light leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
        >
          {item.description}
        </motion.p>

        {/* Features - Minimalist List */}
        {item.features && item.features.length > 0 && (
          <motion.ul 
            className="space-y-1.5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
          >
            {item.features.map((feature, i) => (
              <motion.li
                key={i}
                className="text-gray-500 font-light text-xs sm:text-sm flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.6 + i * 0.05 }}
              >
                <span className="text-[#b2a962] mt-0.5">—</span>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.div>
  );
}

