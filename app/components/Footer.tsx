import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.08] py-20 px-6 overflow-hidden">
      {/* Gradient background - black to yellow */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-[#1a1606] to-[#2a2210]" />

      {/* Heavy grain texture overlay - matching CTAs */}
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
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-normal font-title mb-5 tracking-wide text-white">Nova402</h3>
            <p className="text-gray-300 leading-relaxed font-light text-base max-w-md">
              The infrastructure layer for pay-per-request digital services. Built on open standards, powered by blockchain technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-medium mb-6 text-gray-400 uppercase tracking-[0.25em]">Product</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/docs" className="text-gray-300 hover:text-white transition-colors duration-300 font-light text-base">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/dapp" className="text-gray-300 hover:text-white transition-colors duration-300 font-light text-base">
                  Launch App
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-gray-300 hover:text-white transition-colors duration-300 font-light text-base">
                  Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-medium mb-6 text-gray-400 uppercase tracking-[0.25em]">Community</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://github.com/nova402" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-light text-base"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com/xNova402" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-light text-base"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/xnova402" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 font-light text-base"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.15] flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-gray-400 text-sm font-light">
            © 2025 Nova402. Built in the open.
          </p>
          <div className="flex gap-8 text-sm text-gray-400 font-light">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
