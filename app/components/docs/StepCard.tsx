import Link from 'next/link';

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export default function StepCard({ number, title, description, linkText, linkHref }: StepCardProps) {
  return (
    <div className="relative group">
      <style jsx>{`
        .step-card-wrapper {
          position: relative;
        }
        .step-card-wrapper::before {
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
        .step-card-wrapper::after {
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
        .corner-bottom-left-step {
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
        .corner-bottom-right-step {
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
      
      <div className="step-card-wrapper">
        <div className="corner-bottom-left-step" />
        <div className="corner-bottom-right-step" />
        
        <div className="flex gap-6 items-start bg-black/80 backdrop-blur-sm rounded-lg p-10 border border-white/[0.15] hover:border-white/[0.15] transition-all duration-300">
          <div className="flex-shrink-0 w-12 h-12 bg-[#b2a962] text-black rounded-lg flex items-center justify-center text-xl font-medium">
            {number}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
            <p className="text-base text-gray-400 font-light leading-relaxed mb-4">{description}</p>
            <Link
              href={linkHref}
              className="inline-flex items-center gap-2 text-sm font-light text-[#b2a962] hover:text-[#c4b876] transition-colors group"
            >
              {linkText}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
