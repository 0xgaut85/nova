interface BlockchainBadgeProps {
  name: string;
  logo: string;
}

export default function BlockchainBadge({ name, logo }: BlockchainBadgeProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 bg-black/80 backdrop-blur-sm hover:bg-black/90 rounded-lg border border-white/[0.15] transition-all hover:border-[#b2a962]/30">
      <img src={logo} alt={name} className="w-5 h-5 rounded" />
      <span className="text-sm font-light text-gray-300">{name}</span>
    </div>
  );
}
