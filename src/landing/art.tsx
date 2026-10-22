import { useId } from "react";
import type { Kind } from "./data";

/**
 * Self-drawn vector product renders. They stay crisp at every size, need no
 * image files, and can be swapped for real product photography later.
 */
type ArtProps = {
  kind: Kind;
  tone: [string, string];
  className?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  x?: number;
  y?: number;
};

const ivory = "#f4f0fc";

function Label({ x, y, w, h, line1, line2 }: { x: number; y: number; w: number; h: number; line1: string; line2: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="3" fill={ivory} opacity="0.94" />
      <text x={x + w / 2} y={y + h / 2 - 2} textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" letterSpacing="1.6" fill="#4c1d92">
        {line1}
      </text>
      <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="5.5" letterSpacing="1.4" fill="#4f0ce9">
        {line2}
      </text>
    </g>
  );
}

export function ProductArt({ kind, tone, className, title, width = 300, height = 400, x, y }: ArtProps) {
  const uid = useId().replace(/:/g, "");
  const glass = `g${uid}`;
  const gold = `m${uid}`;
  const shade = `s${uid}`;
  const [c0, c1] = tone;
  return (
    <svg
      className={className}
      viewBox="0 0 300 400"
      width={width}
      height={height}
      x={x}
      y={y}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={glass} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={c0} stopOpacity="0.72" />
          <stop offset="0.18" stopColor={c0} />
          <stop offset="0.55" stopColor={c0} stopOpacity="0.94" />
          <stop offset="1" stopColor={c1} stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id={gold} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={c1} />
          <stop offset="0.35" stopColor="#ede6fb" />
          <stop offset="0.7" stopColor={c1} />
          <stop offset="1" stopColor="#4b1c90" />
        </linearGradient>
        <radialGradient id={shade} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4c1d92" stopOpacity="0.34" />
          <stop offset="1" stopColor="#4c1d92" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="150" cy="372" rx="96" ry="12" fill={`url(#${shade})`} />
      {kind === "serum" && (
        <g>
          <rect x="130" y="62" width="40" height="84" rx="20" fill={ivory} />
          <rect x="136" y="70" width="8" height="64" rx="4" fill="#fff" opacity="0.7" />
          <rect x="116" y="138" width="68" height="36" rx="6" fill={`url(#${gold})`} />
          <rect x="94" y="168" width="112" height="198" rx="24" fill={`url(#${glass})`} />
          <rect x="103" y="184" width="10" height="168" rx="5" fill="#fff" opacity="0.38" />
          <rect x="126" y="170" width="12" height="40" rx="6" fill={c1} opacity="0.5" />
          <Label x={112} y={236} w={76} h={86} line1="ÉCLAT" line2="GLOW SERUM" />
        </g>
      )}
      {kind === "lipstick" && (
        <g>
          <path d="M124 218 V136 Q124 124 130 118 L170 98 Q176 96 176 104 V218 Z" fill={c0} />
          <path d="M132 214 V140 Q132 132 137 128 L146 124 V214 Z" fill="#fff" opacity="0.22" />
          <rect x="116" y="214" width="68" height="46" rx="6" fill={`url(#${gold})`} />
          <rect x="106" y="256" width="88" height="112" rx="10" fill={`url(#${gold})`} />
          <rect x="114" y="266" width="8" height="92" rx="4" fill="#fff" opacity="0.4" />
          <rect x="106" y="262" width="88" height="4" fill="#f1ecfc" opacity="0.7" />
        </g>
      )}
      {kind === "jar" && (
        <g>
          <rect x="66" y="168" width="168" height="56" rx="14" fill={`url(#${gold})`} />
          <rect x="76" y="176" width="10" height="40" rx="5" fill="#fff" opacity="0.4" />
          <rect x="58" y="220" width="184" height="148" rx="30" fill={`url(#${glass})`} />
          <rect x="70" y="236" width="10" height="110" rx="5" fill="#fff" opacity="0.4" />
          <Label x={96} y={262} w={108} h={64} line1="NIGHT CREAM" line2="REVATHI HERBAL BEAUTY CARE" />
        </g>
      )}
      {kind === "mist" && (
        <g>
          <rect x="164" y="104" width="38" height="14" rx="5" fill={c1} />
          <rect x="126" y="104" width="50" height="40" rx="7" fill={`url(#${gold})`} />
          <rect x="138" y="142" width="26" height="34" fill={c1} opacity="0.9" />
          <rect x="98" y="170" width="104" height="198" rx="34" fill={`url(#${glass})`} />
          <rect x="108" y="190" width="10" height="150" rx="5" fill="#fff" opacity="0.4" />
          <Label x={116} y={244} w={68} h={84} line1="ROSE" line2="FACE MIST" />
        </g>
      )}
      {kind === "tube" && (
        <g>
          <rect x="98" y="66" width="104" height="14" rx="3" fill={c1} />
          <path d="M104 80 H196 L204 326 H96 Z" fill={`url(#${glass})`} />
          <path d="M112 90 L116 318" stroke="#fff" strokeWidth="9" strokeLinecap="round" opacity="0.34" />
          <rect x="94" y="322" width="112" height="46" rx="12" fill={`url(#${gold})`} />
          <Label x={110} y={150} w={80} h={96} line1="BODY" line2="200 ML" />
        </g>
      )}
      {kind === "foundation" && (
        <g>
          <rect x="106" y="98" width="88" height="80" rx="12" fill={c1} />
          <rect x="114" y="106" width="8" height="62" rx="4" fill="#fff" opacity="0.28" />
          <rect x="134" y="174" width="32" height="14" fill={`url(#${gold})`} />
          <rect x="102" y="184" width="96" height="184" rx="18" fill={`url(#${glass})`} />
          <rect x="111" y="198" width="9" height="150" rx="4.5" fill="#fff" opacity="0.42" />
          <Label x={116} y={246} w={68} h={80} line1="SKIN TINT" line2="30 ML" />
        </g>
      )}
      {kind === "oil" && (
        <g>
          <rect x="128" y="96" width="44" height="58" rx="8" fill={`url(#${gold})`} />
          <rect x="136" y="104" width="6" height="42" rx="3" fill="#fff" opacity="0.36" />
          <rect x="138" y="150" width="24" height="14" fill={c1} />
          <path d="M116 176 Q116 164 138 164 H162 Q184 164 184 176 V348 Q184 368 164 368 H136 Q116 368 116 348 Z" fill={`url(#${glass})`} />
          <rect x="124" y="190" width="8" height="156" rx="4" fill="#fff" opacity="0.42" />
          <Label x={128} y={244} w={50} h={84} line1="OIL" line2="100 ML" />
        </g>
      )}
      {kind === "compact" && (
        <g>
          <circle cx="150" cy="252" r="104" fill={`url(#${gold})`} />
          <circle cx="150" cy="252" r="84" fill="#4b1d91" opacity="0.22" />
          <circle cx="150" cy="252" r="76" fill={c0} />
          <circle cx="150" cy="252" r="76" fill="url(#none)" />
          <path d="M96 222 Q150 190 204 222" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity="0.32" fill="none" />
          <path d="M104 270 Q150 292 196 270" stroke={c1} strokeWidth="3" strokeLinecap="round" opacity="0.4" fill="none" />
          <rect x="128" y="146" width="44" height="10" rx="5" fill="#f1ecfc" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}
