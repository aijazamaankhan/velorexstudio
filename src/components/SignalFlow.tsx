/**
 * "Ideas into software" — the hero's signature diagram.
 *
 * A signal enters from the left, branches through the studio's disciplines,
 * and converges into VELOREX. Drawn once as inline SVG: the lines draw
 * themselves with stroke-dashoffset and the travelling pulses ride the same
 * paths via CSS `offset-path`. No JS, no library — and the global
 * reduced-motion rule flattens all of it to a static diagram.
 */

const BRANCHES = [
  { label: "PRODUCTS", y: 40 },
  { label: "DESIGN", y: 100 },
  { label: "ENGINEERING", y: 160 },
  { label: "AI", y: 220 },
  { label: "WEB", y: 280 },
];

const IN_X = 40;
const SPLIT_X = 300;
const MID_X = 560;
const JOIN_X = 820;
const OUT_X = 1080;
const CENTRE_Y = 160;

const branchPath = (y: number) =>
  `M ${SPLIT_X} ${CENTRE_Y} C ${SPLIT_X + 90} ${CENTRE_Y}, ${MID_X - 90} ${y}, ${MID_X} ${y}`;

const rejoinPath = (y: number) =>
  `M ${MID_X} ${y} C ${JOIN_X - 90} ${y}, ${JOIN_X - 30} ${CENTRE_Y}, ${JOIN_X} ${CENTRE_Y}`;

export function SignalFlow({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full ${className}`}>
      <svg
        viewBox="0 0 1140 320"
        className="w-full"
        role="img"
        aria-label="Diagram: an idea enters the studio, passes through products, design, engineering, AI and web, and converges into Velorex."
      >
        <defs>
          <linearGradient id="sf-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#9d85ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#2ad4ff" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="sf-glow">
            <stop offset="0%" stopColor="#9d85ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9d85ff" stopOpacity="0" />
          </radialGradient>
          <filter id="sf-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Entry line */}
        <path
          d={`M ${IN_X} ${CENTRE_Y} L ${SPLIT_X} ${CENTRE_Y}`}
          stroke="url(#sf-line)"
          strokeWidth="1.25"
          fill="none"
          className="draw-line"
          style={{ ["--len" as string]: 300 }}
        />

        {/* Branch out / rejoin */}
        {BRANCHES.map((b, i) => (
          <g key={b.label}>
            <path
              d={branchPath(b.y)}
              stroke="url(#sf-line)"
              strokeWidth="1.25"
              fill="none"
              className="draw-line"
              style={{
                ["--len" as string]: 420,
                transitionDelay: `${180 + i * 90}ms`,
              }}
            />
            <path
              d={rejoinPath(b.y)}
              stroke="url(#sf-line)"
              strokeWidth="1.25"
              fill="none"
              className="draw-line"
              style={{
                ["--len" as string]: 420,
                transitionDelay: `${640 + i * 90}ms`,
              }}
            />
          </g>
        ))}

        {/* Convergence line */}
        <path
          d={`M ${JOIN_X} ${CENTRE_Y} L ${OUT_X} ${CENTRE_Y}`}
          stroke="url(#sf-line)"
          strokeWidth="1.5"
          fill="none"
          className="draw-line"
          style={{ ["--len" as string]: 280, transitionDelay: "1200ms" }}
        />

        {/* Travelling pulses — one per branch, riding the outbound path */}
        {BRANCHES.map((b, i) => (
          <circle
            key={`pulse-${b.label}`}
            r="2.6"
            fill="#c3b4ff"
            style={{
              offsetPath: `path("${branchPath(b.y)}")`,
              offsetRotate: "0deg",
              animation: `sf-travel 4.2s ${i * 0.42}s cubic-bezier(0.4,0,0.2,1) infinite`,
            }}
          />
        ))}

        {/* Idea source */}
        <circle cx={IN_X} cy={CENTRE_Y} r="22" fill="url(#sf-glow)" opacity="0.5" />
        <circle cx={IN_X} cy={CENTRE_Y} r="4" fill="#9d85ff" />
        <text
          x={IN_X}
          y={CENTRE_Y - 30}
          textAnchor="middle"
          className="fill-[var(--color-ink-mute)] font-mono"
          fontSize="9"
          letterSpacing="2.4"
        >
          IDEA
        </text>

        {/* Discipline nodes */}
        {BRANCHES.map((b, i) => (
          <g key={`node-${b.label}`}>
            <circle
              cx={MID_X}
              cy={b.y}
              r="3.2"
              fill={i % 2 === 0 ? "#9d85ff" : "#2ad4ff"}
              style={{
                animation: `pulse-dot 3.4s ${i * 0.3}s ease-in-out infinite`,
                transformOrigin: `${MID_X}px ${b.y}px`,
              }}
            />
            <text
              x={MID_X}
              y={b.y - 13}
              textAnchor="middle"
              className="fill-[var(--color-ink-dim)] font-mono"
              fontSize="9.5"
              letterSpacing="2.2"
            >
              {b.label}
            </text>
          </g>
        ))}

        {/* Output */}
        <circle
          cx={OUT_X}
          cy={CENTRE_Y}
          r="34"
          fill="url(#sf-glow)"
          opacity="0.55"
          filter="url(#sf-blur)"
          style={{ animation: "breathe 5s ease-in-out infinite" }}
        />
        <circle cx={OUT_X} cy={CENTRE_Y} r="6" fill="#fff" />
        <text
          x={OUT_X}
          y={CENTRE_Y - 34}
          textAnchor="middle"
          className="fill-[var(--color-ink)] font-mono"
          fontSize="10.5"
          letterSpacing="3"
        >
          VELOREX
        </text>
      </svg>

      <style>{`
        @keyframes sf-travel {
          0%   { offset-distance: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
