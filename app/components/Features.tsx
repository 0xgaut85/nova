'use client';

import { motion } from 'framer-motion';

export default function Features() {
  return (
    <>
      {/* Ecosystem Flow Section - Split Screen Layout */}
      <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden mt-16 md:mt-24 lg:mt-32">
        <style jsx>{`
          .corner-tl {
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
          .corner-tr {
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
          .corner-bl {
            position: absolute;
            bottom: -1px;
            left: -1px;
            width: 12px;
            height: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            border-left: 1px solid rgba(255, 255, 255, 0.25);
            z-index: 10;
            pointer-events: none;
          }
          .corner-br {
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 12px;
            height: 12px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.25);
            border-right: 1px solid rgba(255, 255, 255, 0.25);
            z-index: 10;
            pointer-events: none;
          }
          .corner-tl-white {
            position: absolute;
            top: -1px;
            left: -1px;
            width: 12px;
            height: 12px;
            border-top: 1px solid rgba(0, 0, 0, 0.5);
            border-left: 1px solid rgba(0, 0, 0, 0.5);
            z-index: 10;
            pointer-events: none;
          }
          .corner-tr-white {
            position: absolute;
            top: -1px;
            right: -1px;
            width: 12px;
            height: 12px;
            border-top: 1px solid rgba(0, 0, 0, 0.5);
            border-right: 1px solid rgba(0, 0, 0, 0.5);
            z-index: 10;
            pointer-events: none;
          }
          .corner-bl-white {
            position: absolute;
            bottom: -1px;
            left: -1px;
            width: 12px;
            height: 12px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
            border-left: 1px solid rgba(0, 0, 0, 0.5);
            z-index: 10;
            pointer-events: none;
          }
          .corner-br-white {
            position: absolute;
            bottom: -1px;
            right: -1px;
            width: 12px;
            height: 12px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
            border-right: 1px solid rgba(0, 0, 0, 0.5);
            z-index: 10;
            pointer-events: none;
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16 lg:mb-20 relative z-10 px-6"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6 tracking-wide">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-light">
            Pay-per-request creates value through instant settlements and transparent pricing
          </p>
        </motion.div>

        {/* Split Background Container */}
        <div className="relative flex flex-col md:flex-row min-h-[800px] md:min-h-[600px]">
          {/* Left Half - Black Background with Grain */}
          <div className="flex-1 bg-black relative">
            {/* Heavy grain texture overlay */}
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
            
            <div className="flex items-center justify-center px-4 sm:px-6 md:px-12 py-12 md:py-0 h-full relative z-10">
            <div className="w-full max-w-2xl space-y-4 md:space-y-6">

              {/* Service Providers Box */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/[0.15] relative split-box"
              >
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">Service Providers</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Deploy APIs and AI services with instant micropayments. Get paid for every request, no subscriptions needed.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Protocol Box */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/[0.15] relative split-box"
              >
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">x402 Protocol</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Standards-based HTTP payment protocol. Works across multiple blockchains with instant settlement.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            </div>
          </div>

          {/* Center Divider Line */}
          <div className="hidden md:block w-[1px] bg-gradient-to-b from-gray-400/40 via-gray-500/60 to-gray-400/40 absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-10" />

          {/* Right Half - Dark Grey Background with Grain */}
          <div className="flex-1 bg-[#1a1a1a] relative">
            {/* Heavy grain texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.2] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.0' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter2)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '150px 150px'
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.8' numOctaves='7' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain2)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '100px 100px'
              }}
            />
            
            <div className="flex items-center justify-center px-4 sm:px-6 md:px-12 py-12 md:py-0 h-full relative z-10">
            <div className="w-full max-w-2xl space-y-4 md:space-y-6">
              {/* Developers Box */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/[0.15] relative split-box"
              >
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">Developers</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Access premium services without subscriptions. Pay only for what you use with transparent on-chain pricing.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Discovery Box */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/[0.15] relative split-box"
              >
                <div className="corner-tl" />
                <div className="corner-tr" />
                <div className="corner-bl" />
                <div className="corner-br" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-[2px] bg-gray-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium mb-4 text-white">Discovery</h3>
                    <p className="text-gray-400 font-light leading-relaxed">
                      Browse and discover services across the ecosystem. Test before you buy with transparent pricing.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean 2x2 Grid Layout */}
      <section className="relative py-16 md:py-24 lg:py-32 px-6 border-t border-white/[0.08]">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6 tracking-wide">
              Key Features
            </h2>
          </motion.div>

          {/* Box Grid Container - More spacing between boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto">
            <style jsx>{`
              .feature-box-wrapper {
                position: relative;
              }
              /* Top-left corner */
              .feature-box-wrapper .corner-tl {
                position: absolute;
                top: -1px;
                left: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-left: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
                z-index: 50;
              }
              /* Top-right corner */
              .feature-box-wrapper .corner-tr {
                position: absolute;
                top: -1px;
                right: -1px;
                width: 12px;
                height: 12px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                border-right: 1px solid rgba(255, 255, 255, 0.25);
                pointer-events: none;
                z-index: 50;
              }
              /* Bottom-left corner */
              .feature-box-wrapper .corner-bl {
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
              .feature-box-wrapper .corner-br {
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

            {/* Feature 1 */}
            <div className="feature-box-wrapper">
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-10 border border-white/[0.15] h-full"
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

            {/* Feature 2 */}
            <div className="feature-box-wrapper">
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-10 border border-white/[0.15] h-full"
              >
                <div className="mb-6">
                  <span className="text-xl font-normal text-gray-500 tracking-wider">[2]</span>
                </div>
                <h3 className="text-2xl font-medium mb-4">Base & Solana Live</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  Native support for Base and Solana mainnet. Pay with USDC or SOL instantly. More chains coming soon.
                </p>
              </motion.div>
            </div>

            {/* Feature 3 */}
            <div className="feature-box-wrapper">
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-10 border border-white/[0.15] h-full"
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

            {/* Feature 4 */}
            <div className="feature-box-wrapper">
              <div className="corner-tl" />
              <div className="corner-tr" />
              <div className="corner-bl" />
              <div className="corner-br" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black/40 backdrop-blur-sm p-8 md:p-10 border border-white/[0.15] h-full"
              >
                <div className="mb-6">
                  <span className="text-xl font-normal text-gray-500 tracking-wider">[4]</span>
                </div>
                <h3 className="text-2xl font-medium mb-3">Developer First</h3>
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
