export default function MarketScene({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Awning posts */}
      <rect x="70" y="90" width="6" height="130" fill="#1B4332" />
      <rect x="324" y="90" width="6" height="130" fill="#1B4332" />

      {/* Awning stripes */}
      <path d="M60 90 L90 50 L120 90 Z" fill="#E8A33D" />
      <path d="M120 90 L150 50 L180 90 Z" fill="#F6F1E4" stroke="#D8D2C0" strokeWidth="1.5" />
      <path d="M180 90 L210 50 L240 90 Z" fill="#E8A33D" />
      <path d="M240 90 L270 50 L300 90 Z" fill="#F6F1E4" stroke="#D8D2C0" strokeWidth="1.5" />
      <path d="M300 90 L330 50 L340 90 Z" fill="#E8A33D" />
      <rect x="55" y="86" width="290" height="8" fill="#0F2A1D" />

      {/* Counter */}
      <rect x="60" y="180" width="280" height="60" rx="4" fill="#F6F1E4" stroke="#1B4332" strokeWidth="3" />
      {/* Kitenge-inspired trim */}
      <path
        d="M60 195 L75 185 L90 195 L105 185 L120 195 L135 185 L150 195 L165 185 L180 195 L195 185 L210 195 L225 185 L240 195 L255 185 L270 195 L285 185 L300 195 L315 185 L330 195 L340 190"
        fill="none"
        stroke="#E8A33D"
        strokeWidth="2.5"
      />

      {/* Standing figure (abstract silhouette, no facial detail) */}
      <path
        d="M195 90 Q200 70 215 70 Q230 70 235 90 L238 130 Q238 150 220 155 L210 155 Q192 150 192 130 Z"
        fill="#0F2A1D"
      />
      <rect x="200" y="150" width="30" height="35" fill="#0F2A1D" />
      <circle cx="215" cy="60" r="16" fill="#0F2A1D" />
      {/* Headwrap knot detail */}
      <path d="M203 52 Q215 40 227 52 Q220 58 215 56 Q210 58 203 52 Z" fill="#E8A33D" />

      {/* Baskets of produce on counter */}
      <ellipse cx="110" cy="178" rx="26" ry="10" fill="#C9821E" />
      <circle cx="98" cy="170" r="7" fill="#B5502D" />
      <circle cx="112" cy="166" r="7" fill="#E8A33D" />
      <circle cx="124" cy="171" r="7" fill="#B5502D" />

      <ellipse cx="290" cy="178" rx="26" ry="10" fill="#C9821E" />
      <circle cx="278" cy="169" r="6" fill="#2D6A4F" />
      <circle cx="291" cy="165" r="6" fill="#2D6A4F" />
      <circle cx="303" cy="170" r="6" fill="#2D6A4F" />

      <ellipse cx="200" cy="176" rx="20" ry="8" fill="#C9821E" />
      <circle cx="192" cy="170" r="5" fill="#E8A33D" />
      <circle cx="202" cy="167" r="5" fill="#E8A33D" />
      <circle cx="210" cy="171" r="5" fill="#E8A33D" />
    </svg>
  );
}