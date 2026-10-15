import React, { useId } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true
}) => {
  const uniqueId = useId().replace(/:/g, '_');
  const goldGradId = `goldGrad_${uniqueId}`;
  const haloCenterId = `haloCenter_${uniqueId}`;
  const gemGradId = `gemGrad_${uniqueId}`;

  const iconDimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  }[size];

  const titleSizes = {
    sm: 'text-[15px]',
    md: 'text-[19px]',
    lg: 'text-2xl'
  }[size];

  const overtitleSizes = {
    sm: 'text-[7px] tracking-[0.32em]',
    md: 'text-[8.5px] tracking-[0.36em]',
    lg: 'text-[10px] tracking-[0.4em]'
  }[size];

  const subtitleSizes = {
    sm: 'text-[6.5px] tracking-[0.24em]',
    md: 'text-[7.5px] tracking-[0.28em]',
    lg: 'text-[9.5px] tracking-[0.32em]'
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Haute Joaillerie & Nail Architecture Seal */}
      <div className={`relative ${iconDimensions} flex-shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich Champagne & Rose Gold Metallic Shading */}
            <linearGradient id={goldGradId} x1="15%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#fae1d1" />
              <stop offset="30%" stopColor="#d5aa8c" />
              <stop offset="65%" stopColor="#8d664c" />
              <stop offset="100%" stopColor="#513724" />
            </linearGradient>

            {/* Pearlescent Gemstone Radial Glow */}
            <radialGradient id={haloCenterId} cx="50%" cy="46%" r="52%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#fcf4ed" />
              <stop offset="85%" stopColor="#f1e0d4" />
              <stop offset="100%" stopColor="#dfc3b0" />
            </radialGradient>

            {/* Inner Gem Facet Gradient */}
            <linearGradient id={gemGradId} x1="50%" y1="15%" x2="50%" y2="85%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#ffdcc5" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#765843" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Soft Pearlescent Medallion Base */}
          <circle cx="50" cy="50" r="46" fill={`url(#${haloCenterId})`} />

          {/* Outer Beaded / Filigree Border */}
          <circle
            cx="50"
            cy="50"
            r="44"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.5"
            strokeDasharray="2 3"
            opacity="0.85"
          />

          {/* Inner Solid Gold Precision Ring */}
          <circle
            cx="50"
            cy="50"
            r="38.5"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.2"
            fill="none"
          />

          {/* 8 Cardinal & Diagonal Gold Jewels / Pearls on Border */}
          {/* North, South, East, West */}
          <circle cx="50" cy="6" r="2.2" fill="#765843" stroke="#fae1d1" strokeWidth="0.8" />
          <circle cx="50" cy="94" r="2.2" fill="#765843" stroke="#fae1d1" strokeWidth="0.8" />
          <circle cx="6" cy="50" r="2.2" fill="#765843" stroke="#fae1d1" strokeWidth="0.8" />
          <circle cx="94" cy="50" r="2.2" fill="#765843" stroke="#fae1d1" strokeWidth="0.8" />
          {/* Diagonals */}
          <circle cx="18.9" cy="18.9" r="1.5" fill="#c5a087" />
          <circle cx="81.1" cy="18.9" r="1.5" fill="#c5a087" />
          <circle cx="18.9" cy="81.1" r="1.5" fill="#c5a087" />
          <circle cx="81.1" cy="81.1" r="1.5" fill="#c5a087" />

          {/* Central Haute Nail & Marquise Diamond Gem Silhouette */}
          {/* Sculpted Almond Silhouette */}
          <path
            d="M50 18 C64 34 66 56 50 78 C34 56 36 34 50 18 Z"
            fill={`url(#${gemGradId})`}
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          {/* Internal Geometric Facet Lines */}
          <path
            d="M50 18 L50 78"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.9"
          />
          <path
            d="M38 48 L50 36 L62 48 L50 62 Z"
            stroke="#ffffff"
            strokeWidth="1.1"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M38 48 L62 48"
            stroke="#ffffff"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Royal 8-point Haute Sparkle ✦ at the Focal Apex */}
          <path
            d="M50 28 Q50 36 56 36 Q50 36 50 44 Q50 36 44 36 Q50 36 50 28 Z"
            fill={`url(#${goldGradId})`}
          />
          <circle cx="50" cy="36" r="1.8" fill="#ffffff" />

          {/* Micro Diamond Sparkle at Bottom */}
          <path
            d="M50 68 Q50 72 53 72 Q50 72 50 76 Q50 72 47 72 Q50 72 50 68 Z"
            fill="#765843"
          />

          {/* Subtle Laurel / Botanical Whispers */}
          <path
            d="M26 62 C28 50 32 40 40 34"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1.5 2"
            opacity="0.75"
          />
          <path
            d="M74 62 C72 50 68 40 60 34"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="1.5 2"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Haute Maison Typography */}
      {showText && (
        <div className="flex flex-col text-left justify-center">
          <span
            className={`font-label-caps ${overtitleSizes} text-[#765843] uppercase font-bold leading-none`}
          >
            ATELIER
          </span>
          <span
            className={`font-headline-sm ${titleSizes} tracking-[0.08em] text-[#1b1b21] leading-none my-0.5 group-hover:text-[#765843] transition-colors`}
            style={{ fontFamily: "'Bodoni Moda', serif" }}
          >
            L'AURA
          </span>
          <span
            className={`font-label-caps ${subtitleSizes} text-[#a07e66] uppercase font-semibold leading-none`}
          >
            HAUTE ONGLERIE • PARIS
          </span>
        </div>
      )}
    </div>
  );
};
