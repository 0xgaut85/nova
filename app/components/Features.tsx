'use client';

import { motion } from 'framer-motion';

export default function Features() {
  return (
    <>
      {/* Ecosystem Flow Section - ROBA Style */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl sm:text-7xl font-normal mb-6 tracking-wide">
              How It Works
            </h2>
            <p className="text-xl text-gray-500 font-light">
              Pay-per-request creates value through instant settlements and transparent pricing
            </p>
          </motion.div>

          <div className="relative grid md:grid-cols-2 gap-[1px] bg-white/[0.08]">
            {/* Corner + markers - each item gets all 4 corners */}
            <style jsx>{`
              .ecosystem-grid-wrapper {
                position: relative;
              }
              /* Top-left corner */
              .ecosystem-grid-wrapper::before {
                content: '';
                position: absolute;
                top: -1px;
                left: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
                z-index: 50;
                pointer-events: none;
              }
              /* Top-right corner */
              .ecosystem-grid-wrapper::after {
                content: '';
                position: absolute;
                top: -1px;
                right: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
                z-index: 50;
                pointer-events: none;
              }
              /* Bottom-left corner */
              .corner-bottom-left {
                position: absolute;
                bottom: -1px;
                left: -1px;
                width: 12px;
                height: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
                z-index: 50;
              }
              /* Bottom-right corner */
              .corner-bottom-right {
                position: absolute;
                bottom: -1px;
                right: -1px;
                width: 12px;
                height: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
                z-index: 50;
              }
            `}</style>

            {/* Service Providers Box */}
            <div className="ecosystem-grid-wrapper">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4">Service Providers</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Deploy APIs and AI services with instant micropayments. Get paid for every request, no subscriptions needed.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Developers Box */}
            <div className="ecosystem-grid-wrapper">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4">Developers</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Access premium services without subscriptions. Pay only for what you use with transparent on-chain pricing.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Protocol Box */}
            <div className="ecosystem-grid-wrapper">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4">x402 Protocol</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Standards-based HTTP payment protocol. Works across multiple blockchains with instant settlement.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Marketplace Box */}
            <div className="ecosystem-grid-wrapper">
              <div className="corner-bottom-left" />
              <div className="corner-bottom-right" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4">Discovery</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Browse and discover services across the ecosystem. Test before you buy with transparent pricing.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Numbered Indicators */}
      <section className="relative py-32 px-6 border-t border-white/[0.08]">
        {/* Unicorn background image with 30% opacity and dark grey filter */}
        <div 
          className="absolute inset-0 bg-contain bg-right bg-no-repeat opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url('/unicorn.png')`,
            backgroundSize: '75%',
            backgroundPosition: 'right center',
            filter: 'grayscale(100%) brightness(0.4) contrast(1.2)'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl sm:text-7xl font-normal mb-6 tracking-wide">
              Key Features
            </h2>
          </motion.div>

          <div className="relative grid md:grid-cols-2 gap-[1px] bg-white/[0.08]">
            {/* Corner + markers - each item gets all 4 corners */}
            <style jsx>{`
              .features-grid-wrapper {
                position: relative;
              }
              /* Top-left corner */
              .features-grid-wrapper::before {
                content: '';
                position: absolute;
                top: -1px;
                left: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
                z-index: 50;
                pointer-events: none;
              }
              /* Top-right corner */
              .features-grid-wrapper::after {
                content: '';
                position: absolute;
                top: -1px;
                right: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
                z-index: 50;
                pointer-events: none;
              }
              /* Bottom-left corner */
              .corner-bottom-left-feat {
                position: absolute;
                bottom: -1px;
                left: -1px;
                width: 12px;
                height: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
                z-index: 50;
              }
              /* Bottom-right corner */
              .corner-bottom-right-feat {
                position: absolute;
                bottom: -1px;
                right: -1px;
                width: 12px;
                height: 12px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
                z-index: 50;
              }
            `}</style>

            <div className="features-grid-wrapper">
              <div className="corner-bottom-left-feat" />
              <div className="corner-bottom-right-feat" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="mb-6">
                  <span className="text-xl font-normal text-gray-500 tracking-wider">[1]</span>
                </div>
                <h3 className="text-2xl font-medium mb-4">Pay-Per-Request</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Only pay for what you use. No subscriptions, no upfront costs. True micropayments for API calls with instant on-chain settlement.
                </p>
              </motion.div>
            </div>

            <div className="features-grid-wrapper">
              <div className="corner-bottom-left-feat" />
              <div className="corner-bottom-right-feat" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="mb-6">
                  <span className="text-xl font-normal text-gray-500 tracking-wider">[2]</span>
                </div>
                <h3 className="text-2xl font-medium mb-4">Multi-Chain Support</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Seamlessly operate across Base, Solana, Polygon, and more. One protocol, infinite possibilities across the blockchain ecosystem.
                </p>
              </motion.div>
            </div>

            <div className="features-grid-wrapper">
              <div className="corner-bottom-left-feat" />
              <div className="corner-bottom-right-feat" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="mb-6">
                  <span className="text-xl font-normal text-gray-500 tracking-wider">[3]</span>
                </div>
                <h3 className="text-2xl font-medium mb-4">Instant Settlement</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Payments settle in real-time on-chain. No delays, no chargebacks, no intermediaries. Complete transparency for all transactions.
                </p>
              </motion.div>
            </div>

            <div className="features-grid-wrapper">
              <div className="corner-bottom-left-feat" />
              <div className="corner-bottom-right-feat" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black/40 backdrop-blur-sm p-12 h-full"
              >
                <div className="mb-6">
                  <span className="text-xl font-normal text-gray-500 tracking-wider">[4]</span>
                </div>
                <h3 className="text-2xl font-medium mb-4">Developer First</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Simple integration with powerful SDKs. From testing to production in minutes, not months. Comprehensive documentation included.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
