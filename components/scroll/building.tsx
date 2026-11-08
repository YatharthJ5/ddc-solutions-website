// Illustrative building elevation in three registered layers (wireframe, massing, visualisation). Not a DDC project.
type M = { x: number; y: number; w: number; h: number; fl: number; bay: number; glass?: boolean };
const MS: M[] = [{ x: 260, y: 470, w: 500, h: 290, fl: 6, bay: 50 }, { x: 700, y: 190, w: 360, h: 570, fl: 14, bay: 45, glass: true }, { x: 1140, y: 330, w: 200, h: 430, fl: 10, bay: 40, glass: true }, { x: 1400, y: 560, w: 220, h: 200, fl: 4, bay: 55 }];
const ORDER = [3, 2, 0, 1], DX = 60, DY = 24, G = 760, VB = "0 0 1600 900", INK = "#171717";
export const fl = (m: M) => Array.from({ length: m.fl + 1 }, (_, i) => m.y + (i * m.h) / m.fl);
const bays = (m: M) => Array.from({ length: Math.floor(m.w / m.bay) + 1 }, (_, i) => m.x + i * m.bay);
const side = (m: M) => `${m.x + m.w},${m.y} ${m.x + m.w + DX},${m.y - DY} ${m.x + m.w + DX},${m.y + m.h - DY} ${m.x + m.w},${m.y + m.h}`;
const S = (vb: string) => ({ viewBox: vb, preserveAspectRatio: "xMidYMax slice", className: "h-full w-full", "aria-hidden": true as const });
const BIG = { x: -1000, y: -1000, width: 4000 };

export function Wire({ vb = VB, id = "w" }: { vb?: string; id?: string }) {
  return (
    <svg {...S(vb)}>
      <defs><pattern id={`${id}g`} width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke={INK} strokeOpacity=".07" /></pattern></defs>
      <rect {...BIG} height="4000" fill={`url(#${id}g)`} />
      {MS.map((m, i) => <g key={i} stroke={INK}><line x1={m.x} x2={m.x} y1={130} y2={G} strokeOpacity=".22" strokeDasharray="6 8" /><circle cx={m.x} cy={112} r={14} fill="none" strokeOpacity=".5" /><text x={m.x} y={117} textAnchor="middle" fontSize="13" fill={INK} stroke="none" fillOpacity=".6" fontFamily="ui-monospace,monospace">{"ABCD"[i]}</text></g>)}
      {ORDER.map(k => { const m = MS[k]; return (
        <g key={k} fill="none" stroke={INK} strokeWidth="1.2">
          <rect className="draw" pathLength={1} x={m.x} y={m.y} width={m.w} height={m.h} /><polygon className="draw" pathLength={1} points={side(m)} />
          {fl(m).slice(1, -1).map(y => <line key={y} className="draw" pathLength={1} x1={m.x} x2={m.x + m.w} y1={y} y2={y} strokeOpacity=".4" strokeWidth=".9" />)}
          {bays(m).slice(1, -1).map(x => <line key={x} x1={x} x2={x} y1={m.y} y2={m.y + m.h} strokeOpacity=".16" strokeWidth=".8" />)}
        </g>); })}
      {fl(MS[1]).map((y, i) => i % 3 === 0 && i < 14 && <g key={y} fontFamily="ui-monospace,monospace" fontSize="12" fill={INK} fillOpacity=".55"><line x1={1130} x2={1140} y1={y} y2={y} stroke={INK} /><text x={1146} y={y + 4}>L{String(14 - i).padStart(2, "0")}</text></g>)}
      <line x1="-1000" x2="3000" y1={G} y2={G} stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}
export function Massing({ vb = VB }: { vb?: string }) {
  return (
    <svg {...S(vb)}>
      <rect {...BIG} height="4000" fill="#F7F6F2" />
      {ORDER.map(k => { const m = MS[k]; return <g key={k} stroke={INK} strokeOpacity=".55" strokeWidth="1"><polygon points={side(m)} fill="#C5C5C0" /><rect x={m.x} y={m.y} width={m.w} height={m.h} fill={m.glass ? "#DAD9D3" : "#E5E3DE"} /></g>; })}
      <rect x="-1000" y={G} width="4000" height="1200" fill="#E5E3DE" /><line x1="-1000" x2="3000" y1={G} y2={G} stroke={INK} strokeWidth="1.5" />
    </svg>
  );
}
export function Render({ vb = VB, id = "r" }: { vb?: string; id?: string }) {
  return (
    <svg {...S(vb)}>
      <defs>
        <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#CFCFCA" /><stop offset=".75" stopColor="#ECEAE3" /><stop offset="1" stopColor="#F7F6F2" /></linearGradient>
        <linearGradient id={`${id}gl`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C9CDCF" /><stop offset=".55" stopColor="#9DA4A8" /><stop offset="1" stopColor="#6F777C" /></linearGradient>
        <linearGradient id={`${id}gs`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9AA1A5" /><stop offset="1" stopColor="#555C60" /></linearGradient>
        <linearGradient id={`${id}st`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#E6E1D5" /><stop offset="1" stopColor="#D2CBBB" /></linearGradient>
        <linearGradient id={`${id}gn`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#B2AEA3" /><stop offset="1" stopColor="#85827A" /></linearGradient>
        <radialGradient id={`${id}sun`} cx=".78" cy=".1" r=".6"><stop offset="0" stopColor="#fff" stopOpacity=".7" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
      </defs>
      <rect {...BIG} height={G + 1000} fill={`url(#${id}sky)`} /><rect {...BIG} height={G + 1000} fill={`url(#${id}sun)`} /><rect x="-1000" y={G} width="4000" height="1200" fill={`url(#${id}gn)`} />
      <polygon points="700,760 1060,760 1420,850 1060,850" fill={INK} fillOpacity=".18" />
      {ORDER.map(k => { const m = MS[k], h = m.h / m.fl; return (
        <g key={k}><polygon points={side(m)} fill={m.glass ? `url(#${id}gs)` : "#BDB6A6"} /><rect x={m.x} y={m.y} width={m.w} height={m.h} fill={m.glass ? `url(#${id}gl)` : `url(#${id}st)`} />
          {!m.glass && Array.from({ length: m.fl }, (_, i) => <rect key={i} x={m.x + 16} y={m.y + i * h + h * 0.28} width={m.w - 32} height={h * 0.44} fill={`url(#${id}gl)`} />)}
          {fl(m).slice(1, -1).map(y => <line key={y} x1={m.x} x2={m.x + m.w} y1={y} y2={y} stroke={INK} strokeOpacity={m.glass ? 0.26 : 0.1} />)}
          {m.glass && bays(m).slice(1, -1).map(x => <line key={x} x1={x} x2={x} y1={m.y} y2={m.y + m.h} stroke={INK} strokeOpacity=".14" />)}
          {k === 1 && <rect x={m.x + 100} y={m.y - 22} width={150} height={22} fill="#A9ADAF" />}</g>); })}
      <rect x="-1000" y={G - 3} width="4000" height="3" fill={INK} fillOpacity=".25" />
    </svg>
  );
}
