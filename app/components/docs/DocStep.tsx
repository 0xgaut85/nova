interface DocStepProps {
  number: number;
  title: string;
  description: string;
}

export default function DocStep({ number, title, description }: DocStepProps) {
  return (
    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-white/[0.15]">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-[#b2a962] text-black rounded-lg flex items-center justify-center text-sm font-medium">
          {number}
        </div>
        <h3 className="text-base font-medium text-white m-0">{title}</h3>
      </div>
      <p className="text-sm text-gray-400 font-light m-0 pl-11 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

