type Segment = {
  label: string;
  pct: number;
  color: string;
};

type Props = {
  segments: Segment[];
  size?: number;
  thickness?: number;
};

// HVOF-tone channel palette. Yellow + neutrals only. Restraint over rainbow.
export const CHANNEL_COLORS: Record<string, string> = {
  "Organic Search": "#E7C81F",
  Direct: "#1a1a1a",
  Referral: "#9a8418",
  "Organic Social": "#666666",
  "Paid Search": "#cdb01b",
  Email: "#444444",
  "Paid Social": "#7a6913",
  Display: "#888888",
  Other: "#bdbdbd",
};

export function paletteFor(i: number): string {
  const order = ["#E7C81F", "#1a1a1a", "#9a8418", "#666666", "#cdb01b", "#444444", "#bdbdbd"];
  return order[i % order.length];
}

export function ChannelDonut({ segments, size = 200, thickness = 28 }: Props) {
  if (!segments || segments.length === 0) return null;

  const total = segments.reduce((acc, s) => acc + s.pct, 0) || 100;
  const r = size / 2 - thickness / 2;
  const c = size / 2;
  const circumference = 2 * Math.PI * r;

  let offset = 0;
  const arcs = segments.map((s, i) => {
    const portion = s.pct / total;
    const length = portion * circumference;
    const dashArray = `${length} ${circumference - length}`;
    const dashOffset = -offset;
    offset += length;
    return (
      <circle
        key={`${s.label}-${i}`}
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke={s.color}
        strokeWidth={thickness}
        strokeDasharray={dashArray}
        strokeDashoffset={dashOffset}
        transform={`rotate(-90 ${c} ${c})`}
      />
    );
  });

  const dominant = [...segments].sort((a, b) => b.pct - a.pct)[0];

  return (
    <div className="inline-flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth={thickness}
          />
          {arcs}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-foreground/55">
            {dominant.label}
          </p>
          <p className="font-display text-2xl font-semibold tracking-tight">
            {Math.round(dominant.pct)}%
          </p>
        </div>
      </div>
    </div>
  );
}
