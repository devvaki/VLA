import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#06060e", bg2: "#0c0c18", bg3: "#111122",
  card: "#0f0f1e",
  accent: "#6366f1", accentSoft: "#818cf8", accentGlow: "rgba(99,102,241,0.12)",
  green: "#34d399", greenGlow: "rgba(52,211,153,0.1)",
  orange: "#fb923c", orangeGlow: "rgba(251,146,60,0.1)",
  pink: "#f472b6",
  cyan: "#22d3ee",
  red: "#f87171", yellow: "#facc15",
  text: "#e2e8f0", muted: "#94a3b8", dim: "#64748b",
  border: "#1e293b",
};

const FadeIn = ({ children, delay = 0, style = {} }) => {
  const [v, setV] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>{children}</div>;
};

const Pill = ({ children, color = C.accent }) => (
  <span style={{ display: "inline-block", padding: "3px 12px", borderRadius: 20, fontSize: 10, fontWeight: 800, letterSpacing: 1.8, textTransform: "uppercase", color, background: color + "14", border: `1px solid ${color}28` }}>{children}</span>
);

const Divider = () => <div style={{ height: 1, background: `linear-gradient(90deg, transparent 5%, ${C.border} 50%, transparent 95%)`, maxWidth: 1000, margin: "0 auto" }} />;

const GlowCard = ({ children, color = C.accent, style = {} }) => (
  <div style={{ background: C.card, border: `1px solid ${color}22`, borderRadius: 16, padding: "28px 24px", position: "relative", overflow: "hidden", ...style }}>
    <div style={{ position: "absolute", top: -60, right: -60, width: 120, height: 120, background: `radial-gradient(circle, ${color}15 0%, transparent 70%)`, borderRadius: "50%" }} />
    <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
  </div>
);

/* ═══════════ VLA ARCH SVG ═══════════ */
const VLAArchDiagram = () => {
  const [pulse, setPulse] = useState(0);
  useEffect(() => { const t = setInterval(() => setPulse(p => (p + 1) % 100), 50); return () => clearInterval(t); }, []);
  const fo = (pulse % 100) / 100;
  return (
    <svg viewBox="0 0 680 310" style={{ width: "100%", maxWidth: 680, display: "block", margin: "0 auto" }}>
      <defs>
        <linearGradient id="gVLM" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.accent + "22"} /><stop offset="100%" stopColor={C.cyan + "11"} /></linearGradient>
        <linearGradient id="gVLA" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor={C.pink + "15"} /><stop offset="100%" stopColor={C.orange + "08"} /></linearGradient>
        <filter id="gl"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect x="120" y="20" width="440" height="230" rx="16" fill="url(#gVLA)" stroke={C.pink + "33"} strokeWidth="1" strokeDasharray="6 4" />
      <text x="340" y="46" textAnchor="middle" fill={C.pink} fontSize="11" fontWeight="800" letterSpacing="3" fontFamily="inherit">V L A</text>
      <rect x="140" y="58" width="300" height="175" rx="12" fill="url(#gVLM)" stroke={C.accent + "44"} strokeWidth="1" />
      <text x="290" y="78" textAnchor="middle" fill={C.accentSoft} fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="inherit">V L M</text>
      <rect x="160" y="95" width="120" height="48" rx="8" fill={C.cyan + "18"} stroke={C.cyan + "55"} strokeWidth="1.5" /><text x="220" y="123" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="700" fontFamily="inherit">Vision Encoder</text>
      <rect x="160" y="165" width="120" height="48" rx="8" fill={C.green + "18"} stroke={C.green + "55"} strokeWidth="1.5" /><text x="220" y="193" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="700" fontFamily="inherit">Language Encoder</text>
      <rect x="310" y="116" width="110" height="56" rx="8" fill={C.accent + "22"} stroke={C.accent + "55"} strokeWidth="1.5" /><text x="365" y="140" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">Multimodal</text><text x="365" y="154" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">Fusion</text>
      <rect x="460" y="106" width="85" height="56" rx="8" fill={C.orange + "22"} stroke={C.orange + "55"} strokeWidth="1.5" /><text x="503" y="130" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">Action</text><text x="503" y="144" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">Decoder</text>
      {[[280,119,310,136],[280,189,310,153],[420,144,460,134],[545,134,590,134]].map(([x1,y1,x2,y2],i)=>(
        <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.dim} strokeWidth="1.5"/><circle cx={x1+(x2-x1)*fo} cy={y1+(y2-y1)*fo} r="3" fill={[C.cyan,C.green,C.accent,C.orange][i]} filter="url(#gl)" opacity="0.8"/></g>
      ))}
      <text x="30" y="118" fill={C.cyan} fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="inherit">Vision</text>
      <line x1="55" y1="119" x2="160" y2="119" stroke={C.cyan+"55"} strokeWidth="1.5"/>
      <text x="30" y="188" fill={C.green} fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="inherit">"Clean the table"</text>
      <line x1="75" y1="189" x2="160" y2="189" stroke={C.green+"55"} strokeWidth="1.5"/>
      <text x="626" y="128" fill={C.muted} fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="inherit">Robot</text><text x="626" y="142" fill={C.muted} fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="inherit">Actions</text>
      <path d="M 626 160 L 626 272 L 340 272 L 340 250" fill="none" stroke={C.muted+"44"} strokeWidth="1" strokeDasharray="4 3"/>
      <text x="485" y="288" fill={C.dim} fontSize="9" fontFamily="inherit">Robot State (closed-loop feedback)</text>
      <polygon points="340,250 336,258 344,258" fill={C.muted+"44"}/>
    </svg>
  );
};

/* ═══════════ IMAGE TOKENIZATION ANIMATION ═══════════ */
const ImageTokenAnim = () => {
  const [phase, setPhase] = useState(0); // 0=image 1=patches 2=labels 3=vector
  const [hIdx, setHIdx] = useState(26);
  const timerRef = useRef();

  useEffect(() => {
    const durations = [2200, 1800, 2000, 3500];
    timerRef.current = setTimeout(() => {
      setPhase(p => {
        const next = (p + 1) % 4;
        if (next === 3) setHIdx(Math.floor(Math.random() * 49));
        return next;
      });
    }, durations[phase]);
    return () => clearTimeout(timerRef.current);
  }, [phase]);

  const GRID = 7;
  const colors = Array.from({ length: 49 }, (_, i) => {
    const r = Math.floor(i / 7), c = i % 7;
    const h = 240 + (r * 5 + c * 8) % 60;
    const s = 45 + (i * 7) % 30;
    const l = 55 + (i * 3) % 25;
    return `hsl(${h},${s}%,${l}%)`;
  });

  const vec = [-0.33, -0.73, 0.80, -0.73, -0.12, 0.27, -0.89, 0.94];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["See the image", "Chop into patches", "Label patches", "Patch to vector"].map((l, i) => (
          <span key={i} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 700, color: phase === i ? "#fff" : C.dim, background: phase === i ? C.accent : C.bg3, border: `1px solid ${phase === i ? C.accent : C.border}`, transition: "all 0.3s" }}>{l}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", minHeight: 340 }}>
        <div style={{ width: 280, height: 280, borderRadius: 12, overflow: "hidden", position: "relative", border: `1px solid ${C.border}`, flexShrink: 0 }}>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID},1fr)`, width: "100%", height: "100%", position: "absolute", inset: 0 }}>
            {colors.map((col, i) => (
              <div key={i} style={{
                background: col,
                opacity: phase === 0 ? 1 : phase === 3 && i === hIdx ? 1 : phase >= 1 ? 0.6 : 1,
                transition: "all 0.6s",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700, color: "#fff",
                border: phase >= 1 ? "1px solid rgba(255,255,255,0.15)" : "none",
                position: "relative",
                boxShadow: phase === 3 && i === hIdx ? `0 0 16px ${C.accent}88, inset 0 0 12px rgba(255,255,255,0.3)` : "none",
                zIndex: phase === 3 && i === hIdx ? 2 : 1,
              }}>
                {phase >= 2 && <span style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}>P{i}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel - fixed size, always in DOM */}
        <div style={{ flex: 1, minWidth: 240, minHeight: 300, opacity: phase === 3 ? 1 : 0, transition: "opacity 0.5s" }}>
          <div style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", minHeight: 300 }}>
            <h5 style={{ margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: C.text }}>Patch P{hIdx} to Vector</h5>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 12 }}>
              {vec.map((v, i) => (
                <span key={i} style={{ padding: "4px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700, background: v >= 0 ? C.green + "22" : C.accent + "22", border: `1px solid ${v >= 0 ? C.green + "44" : C.accent + "44"}`, color: v >= 0 ? C.green : C.accentSoft }}>{v.toFixed(2)}</span>
              ))}
              <span style={{ padding: "4px 8px", fontSize: 11, color: C.dim }}>...x768</span>
            </div>
            <p style={{ margin: "0 0 14px", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
              Each patch becomes a <strong style={{ color: C.text }}>768-number vector</strong>. These numbers encode color, edges, texture: everything the model sees in that tiny square.
            </p>
            <div style={{ background: C.accent + "12", border: `1px solid ${C.accent}22`, borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.accentSoft, marginBottom: 4 }}>Full picture:</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
                224x224 image / 32x32 patches = <strong style={{ color: C.text }}>49 patches</strong><br />
                Each patch = <strong style={{ color: C.text }}>768 numbers</strong><br />
                Total: <strong style={{ color: C.text }}>49 tokens x 768 dims</strong> = the image, as the model sees it
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════ MULTIMODAL FUSION ANIMATION ═══════════ */
const FusionAnim = () => {
  const [step, setStep] = useState(0); // 0-5 cycling
  useEffect(() => {
    const d = [2000, 2000, 2500, 2000, 2500, 2500];
    const t = setTimeout(() => setStep(s => (s + 1) % 6), d[step]);
    return () => clearTimeout(t);
  }, [step]);

  const labels = ["Vision tokens", "Language tokens", "Cross-attention", "Fused output", "Action tokens", "Full loop"];
  const visToks = ["obj:cup", "color:blue", "pos:left", "shape:round"];
  const langToks = ["pick", "the", "blue", "ball"];
  const fusedToks = ["PICK-cup@left", "blue=match", "grasp:round", "action:REACH"];
  const actionNums = [142, 89, 128, 128, 91, 200, 255];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {labels.map((l, i) => (
          <span key={i} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 11, fontWeight: 700, color: step === i ? "#fff" : C.dim, background: step === i ? C.accent : C.bg3, border: `1px solid ${step === i ? C.accent : C.border}`, transition: "all 0.3s" }}>{l}</span>
        ))}
      </div>

      <div style={{ minHeight: 280 }}>
        {/* Vision row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, opacity: step >= 0 ? 1 : 0.3, transition: "opacity 0.5s" }}>
          <span style={{ fontSize: 12, color: C.cyan, fontWeight: 700, width: 60 }}>Vision:</span>
          <div style={{ display: "flex", gap: 6 }}>
            {visToks.map((t, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, background: C.accent + "22", border: `1px solid ${C.accent}44`, color: C.accentSoft }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Cross attention lines - always present */}
        <div style={{ height: 40, position: "relative", marginBottom: 8, opacity: step >= 2 ? 1 : 0, transition: "opacity 0.5s" }}>
          <svg viewBox="0 0 400 40" style={{ width: "100%", maxWidth: 400, marginLeft: 60 }}>
            {[0,1,2,3].map(i => [0,1,2,3].map(j => (
              <line key={`${i}-${j}`} x1={40 + i * 80} y1="2" x2={40 + j * 80} y2="38" stroke={C.cyan + "33"} strokeWidth="1" strokeDasharray="3 3" />
            )))}
          </svg>
          <span style={{ position: "absolute", right: 0, top: 10, fontSize: 11, color: C.cyan, fontWeight: 600 }}>Cross-Attention</span>
        </div>

        {/* Language row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, opacity: step >= 1 ? 1 : 0.3, transition: "opacity 0.5s" }}>
          <span style={{ fontSize: 12, color: C.green, fontWeight: 700, width: 60 }}>Lang:</span>
          <div style={{ display: "flex", gap: 6 }}>
            {langToks.map((t, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, background: C.green + "22", border: `1px solid ${C.green}44`, color: C.green }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Fused output - always present */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, opacity: step >= 3 ? 1 : 0, transition: "opacity 0.5s" }}>
          <span style={{ fontSize: 12, color: C.orange, fontWeight: 700, width: 60 }}>Fused:</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {fusedToks.map((t, i) => (
              <span key={i} style={{ padding: "6px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, background: C.orange + "22", border: `1px solid ${C.orange}44`, color: C.orange }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Action tokens - always present */}
        <div style={{ background: `linear-gradient(90deg, ${C.pink}18, ${C.orange}18)`, border: `1px solid ${C.pink}33`, borderRadius: 12, padding: "14px 18px", opacity: step >= 4 ? 1 : 0, transition: "opacity 0.5s" }}>
          <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>Action Tokens: [{actionNums.join(", ")}]</div>
          <div style={{ fontSize: 11, color: C.dim }}>x:+2cm, y:-1cm, z:0, roll:0, pitch:-3, yaw:+5, gripper:OPEN</div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════ BINS & ACTION TOKENS ANIMATION ═══════════ */
const BinsAnim = () => {
  const [mode, setMode] = useState("discrete"); // discrete | continuous
  const [binVal, setBinVal] = useState(128);
  const [flowStep, setFlowStep] = useState(0);

  useEffect(() => {
    if (mode === "discrete") {
      const t = setInterval(() => setBinVal(v => { const nv = v + (Math.random() > 0.5 ? 3 : -3); return Math.max(10, Math.min(245, nv)); }), 1500);
      return () => clearInterval(t);
    } else {
      const t = setInterval(() => setFlowStep(s => (s + 1) % 5), 1800);
      return () => clearInterval(t);
    }
  }, [mode]);

  const contVal = ((binVal - 128) / 128).toFixed(4);
  const tokenId = 32000 + binVal;
  const dims = ["x:+0.02", "y:-0.01", "z:-0.05", "roll:0", "pitch:0", "yaw:+0.04", "grip:OPEN"];
  const dimBins = [142, 89, 128, 128, 91, 200, 255];
  const noiseVals = [[0.8,-0.3,0.5,0.1,-0.7,0.2,0.9],[0.4,-0.5,0.3,0.2,-0.4,0.3,0.5],[0.1,-0.2,0.1,0.05,-0.1,0.15,0.2],[0.02,-0.01,-0.05,0.0,0.0,0.04,0.0]];

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["discrete", "continuous"].map(m => (
          <button key={m} onClick={() => setMode(m)} style={{ padding: "8px 20px", borderRadius: 10, fontSize: 12, fontWeight: 700, background: mode === m ? C.accent : C.bg3, color: mode === m ? "#fff" : C.dim, border: `1px solid ${mode === m ? C.accent : C.border}`, cursor: "pointer", textTransform: "capitalize", transition: "all 0.3s" }}>{m} Actions</button>
        ))}
      </div>

      {mode === "discrete" ? (
        <div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
            A robot arm has <strong style={{ color: C.text }}>7 dimensions</strong>: x, y, z, roll, pitch, yaw, gripper. Each continuous value [-1, 1] is uniformly quantized into <strong style={{ color: C.text }}>256 bins</strong>.
          </p>
          {/* Number line */}
          <div style={{ position: "relative", height: 50, marginBottom: 8 }}>
            <div style={{ position: "absolute", top: 20, left: 0, right: 0, height: 4, background: C.bg3, borderRadius: 2 }} />
            <div style={{ position: "absolute", top: 12, left: `${(binVal / 255) * 100}%`, transform: "translateX(-50%)", width: 16, height: 16, borderRadius: "50%", background: C.accent, boxShadow: `0 0 12px ${C.accent}88`, transition: "left 0.8s ease" }} />
            {[0, 63, 127, 191, 255].map((v, i) => (
              <div key={i} style={{ position: "absolute", top: 28, left: `${(v / 255) * 100}%`, transform: "translateX(-50%)" }}>
                <div style={{ width: 2, height: 8, background: C.dim, margin: "0 auto 2px" }} />
                <div style={{ fontSize: 9, color: C.dim, textAlign: "center", whiteSpace: "nowrap" }}>{v} ({((v / 255) * 2 - 1).toFixed(2)})</div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: C.muted, margin: "16px 0" }}>
            Continuous value: <strong style={{ color: C.text }}>{contVal}</strong> {" > "} Bin index: <strong style={{ color: C.accent }}>{binVal}</strong> {" > "} Token ID: <strong style={{ color: C.text }}>{tokenId}</strong>
          </p>
          {/* Full action vector */}
          <div style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 12, padding: "14px 18px", marginTop: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Full action vector for "pick up the blue ball":</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", fontSize: 12 }}>
              {dims.map((d, i) => (
                <span key={i} style={{ color: C.muted }}>{d} <span style={{ padding: "2px 6px", borderRadius: 4, background: C.accent + "22", color: C.accent, fontWeight: 700, fontSize: 11 }}>{dimBins[i]}</span></span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: C.dim, margin: "8px 0 0" }}>These 7 bin indices are appended to the vocabulary as tokens 32000-32255. The transformer predicts them autoregressively, just like predicting words.</p>
          </div>
        </div>
      ) : (
        <div>
          <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, margin: "0 0 16px" }}>
            Instead of discretizing, <strong style={{ color: C.text }}>flow matching</strong> starts from random noise and progressively denoises it into a smooth action trajectory. Like diffusion models, but for joint angles.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["Random noise (t=0)", "Denoising step 1", "Denoising step 2", "Clean trajectory (t=1)"].map((label, si) => {
              const isActive = flowStep >= si;
              const isCurrent = flowStep === si;
              const vals = si < 4 ? noiseVals[si] : noiseVals[3];
              return (
                <div key={si} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: isCurrent ? C.green + "12" : C.bg3, border: `1px solid ${isCurrent ? C.green + "33" : C.border}`, opacity: isActive ? 1 : 0.3, transition: "all 0.5s" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: isCurrent ? C.green : C.dim, width: 140, minWidth: 140 }}>{label}</span>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {vals.map((v, j) => (
                      <span key={j} style={{ padding: "3px 7px", borderRadius: 5, fontSize: 10, fontWeight: 600, background: si === 0 ? C.red + "18" : si === 3 ? C.green + "18" : C.yellow + "12", color: si === 0 ? C.red : si === 3 ? C.green : C.yellow, border: `1px solid ${si === 0 ? C.red + "33" : si === 3 ? C.green + "33" : C.yellow + "22"}` }}>{v.toFixed(2)}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: C.green + "0c", border: `1px solid ${C.green}22` }}>
            <div style={{ fontSize: 12, color: C.green, fontWeight: 700, marginBottom: 4 }}>Result: smooth continuous actions at 50 Hz</div>
            <div style={{ fontSize: 11, color: C.muted }}>No binning, no precision loss. The action expert outputs a full trajectory chunk per inference step.</div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ═══════════ OpenVLA SEE/THINK/ACT SVG (dark theme) ═══════════ */
const OpenVLADiagram = () => (
  <svg viewBox="0 0 700 200" style={{ width: "100%", maxWidth: 700, display: "block", margin: "0 auto" }}>
    <text x="100" y="22" textAnchor="middle" fill={C.cyan} fontSize="13" fontWeight="800" fontFamily="inherit">1. SEE</text>
    <text x="370" y="22" textAnchor="middle" fill={C.accent} fontSize="13" fontWeight="800" fontFamily="inherit">2. THINK</text>
    <text x="600" y="22" textAnchor="middle" fill={C.orange} fontSize="13" fontWeight="800" fontFamily="inherit">3. ACT</text>
    <rect x="20" y="36" width="180" height="145" rx="10" fill={C.cyan+"0c"} stroke={C.cyan+"33"}/>
    <rect x="40" y="52" width="140" height="36" rx="6" fill={C.cyan+"18"} stroke={C.cyan+"44"}/><text x="110" y="73" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">DINOv2</text>
    <text x="110" y="100" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Low-level spatial features</text>
    <rect x="40" y="112" width="140" height="36" rx="6" fill={C.cyan+"18"} stroke={C.cyan+"44"}/><text x="110" y="133" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">SigLIP</text>
    <text x="110" y="160" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Semantic understanding</text>
    <line x1="200" y1="108" x2="260" y2="108" stroke={C.dim} strokeWidth="1.5"/><polygon points="260,108 254,104 254,112" fill={C.dim}/>
    <rect x="280" y="36" width="180" height="24" rx="6" fill={C.bg3} stroke={C.border}/>
    <text x="370" y="52" textAnchor="middle" fill={C.muted} fontSize="9" fontFamily="inherit">"Put eggplant in bowl"</text>
    <rect x="270" y="66" width="200" height="100" rx="10" fill={C.accent+"0c"} stroke={C.accent+"33"}/>
    <rect x="295" y="86" width="150" height="50" rx="8" fill={C.accent+"22"} stroke={C.accent+"55"}/>
    <text x="370" y="110" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="800" fontFamily="inherit">LLaMA-2 7B</text>
    <text x="370" y="125" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Fuses visual + language tokens</text>
    <text x="370" y="155" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Prismatic-7B backbone</text>
    <line x1="470" y1="116" x2="500" y2="116" stroke={C.dim} strokeWidth="1.5"/><polygon points="500,116 494,112 494,120" fill={C.dim}/>
    <rect x="505" y="66" width="180" height="100" rx="10" fill={C.orange+"0c"} stroke={C.orange+"33"}/>
    <text x="595" y="88" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">7-dimensional discrete tokens</text>
    {[1,2,3,4,5,6,7].map((n,i)=>(
      <g key={i}><rect x={520+i*22} y="96" width="18" height="28" rx="4" fill={C.orange+"22"} stroke={C.orange+"44"}/><text x={529+i*22} y="114" textAnchor="middle" fill={C.orange} fontSize="8" fontWeight="700" fontFamily="inherit">A{n}</text></g>
    ))}
    <text x="595" y="148" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Predicted like words in a sentence</text>
  </svg>
);

/* ═══════════ MODEL DIAGRAMS ═══════════ */
const Pi0Diagram = () => (
  <svg viewBox="0 0 600 210" style={{width:"100%",maxWidth:600,display:"block",margin:"0 auto"}}>
    {[["Images",C.cyan,0],["Language",C.green,1],["Robot State",C.yellow,2]].map(([l,c,i])=>(
      <g key={i}><rect x="10" y={35+i*58} width="90" height="34" rx="6" fill={c+"14"} stroke={c+"44"}/><text x="55" y={56+i*58} textAnchor="middle" fill={c} fontSize="10" fontWeight="600" fontFamily="inherit">{l}</text><line x1="100" y1={52+i*58} x2="140" y2={105} stroke={c+"44"} strokeWidth="1"/></g>
    ))}
    <rect x="140" y="45" width="170" height="120" rx="10" fill={C.accent+"12"} stroke={C.accent+"44"}/>
    <text x="225" y="70" textAnchor="middle" fill={C.accentSoft} fontSize="10" fontWeight="800" letterSpacing="1" fontFamily="inherit">VLM BACKBONE</text>
    <rect x="160" y="82" width="130" height="40" rx="6" fill={C.accent+"22"} stroke={C.accent+"55"}/>
    <text x="225" y="106" textAnchor="middle" fill={C.text} fontSize="11" fontWeight="700" fontFamily="inherit">PaliGemma 3B</text>
    <text x="225" y="140" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Vision + Language understanding</text>
    <line x1="310" y1="105" x2="360" y2="105" stroke={C.dim} strokeWidth="1.5"/><polygon points="360,105 354,101 354,109" fill={C.dim}/>
    <rect x="365" y="45" width="170" height="120" rx="10" fill={C.orange+"12"} stroke={C.orange+"44"}/>
    <text x="450" y="70" textAnchor="middle" fill={C.orange} fontSize="10" fontWeight="800" letterSpacing="1" fontFamily="inherit">ACTION EXPERT</text>
    <rect x="385" y="82" width="130" height="40" rx="6" fill={C.orange+"22"} stroke={C.orange+"55"}/>
    <text x="450" y="102" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">Flow Matching</text>
    <text x="450" y="115" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">300M params</text>
    <text x="450" y="142" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Noise to smooth trajectory</text>
    <line x1="535" y1="105" x2="570" y2="105" stroke={C.green+"55"} strokeWidth="1.5"/>
    <text x="585" y="100" fill={C.green} fontSize="8" fontWeight="700" fontFamily="inherit">Continuous</text>
    <text x="585" y="112" fill={C.green} fontSize="8" fontWeight="700" fontFamily="inherit">Actions @ 50Hz</text>
  </svg>
);

const GeminiDiagram = () => (
  <svg viewBox="0 0 600 230" style={{width:"100%",maxWidth:600,display:"block",margin:"0 auto"}}>
    <rect x="200" y="8" width="200" height="30" rx="6" fill={C.accent+"14"} stroke={C.accent+"33"}/><text x="300" y="27" textAnchor="middle" fill={C.accentSoft} fontSize="10" fontWeight="700" fontFamily="inherit">Gemini 2.0 Foundation</text>
    <line x1="300" y1="38" x2="300" y2="54" stroke={C.dim} strokeWidth="1"/>
    <rect x="190" y="54" width="220" height="26" rx="6" fill={C.bg3} stroke={C.border}/><text x="300" y="71" textAnchor="middle" fill={C.muted} fontSize="9" fontFamily="inherit">Robotics-specific Training</text>
    <line x1="230" y1="80" x2="150" y2="102" stroke={C.dim} strokeWidth="1"/><line x1="370" y1="80" x2="450" y2="102" stroke={C.dim} strokeWidth="1"/>
    <rect x="30" y="102" width="240" height="108" rx="10" fill={C.accent+"10"} stroke={C.accent+"33"}/>
    <text x="150" y="121" textAnchor="middle" fill={C.dim} fontSize="8" fontWeight="700" letterSpacing="1.5" fontFamily="inherit">THE REASONING ENGINE</text>
    <text x="70" y="142" fill={C.accentSoft} fontSize="10" fontWeight="700" fontFamily="inherit">Gemini Robotics-ER</text>
    <text x="70" y="158" fill={C.dim} fontSize="8" fontFamily="inherit">Embodied Reasoning (VLM)</text>
    <text x="70" y="176" fill={C.dim} fontSize="8" fontFamily="inherit">Perceives and reasons about the world</text>
    <text x="70" y="192" fill={C.dim} fontSize="8" fontFamily="inherit">Generates structured action plans</text>
    <rect x="330" y="102" width="240" height="108" rx="10" fill={C.orange+"10"} stroke={C.orange+"33"}/>
    <text x="450" y="121" textAnchor="middle" fill={C.dim} fontSize="8" fontWeight="700" letterSpacing="1.5" fontFamily="inherit">THE ACTION MODEL</text>
    <text x="370" y="142" fill={C.orange} fontSize="10" fontWeight="700" fontFamily="inherit">Gemini Robotics</text>
    <text x="370" y="158" fill={C.dim} fontSize="8" fontFamily="inherit">Vision-Language-Action (VLA)</text>
    <text x="370" y="176" fill={C.dim} fontSize="8" fontFamily="inherit">Translates plans into motor commands</text>
    <text x="370" y="192" fill={C.dim} fontSize="8" fontFamily="inherit">Real-time, dexterous execution</text>
    <line x1="270" y1="156" x2="330" y2="156" stroke={C.yellow+"55"} strokeWidth="1.5"/><polygon points="330,156 324,152 324,160" fill={C.yellow+"55"}/>
    <text x="300" y="172" textAnchor="middle" fill={C.yellow} fontSize="7" fontFamily="inherit">Plan</text>
  </svg>
);

const RT2Diagram = () => (
  <svg viewBox="0 0 600 160" style={{width:"100%",maxWidth:600,display:"block",margin:"0 auto"}}>
    <rect x="10" y="40" width="130" height="80" rx="10" fill={C.cyan+"12"} stroke={C.cyan+"33"}/>
    <text x="75" y="62" textAnchor="middle" fill={C.dim} fontSize="8" fontWeight="700" fontFamily="inherit">PRE-TRAINED VLM</text>
    <rect x="25" y="72" width="100" height="30" rx="6" fill={C.cyan+"18"} stroke={C.cyan+"44"}/><text x="75" y="91" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">PaLI-X / PaLM-E</text>
    <text x="75" y="110" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">5B or 55B params</text>
    <line x1="140" y1="80" x2="185" y2="80" stroke={C.dim} strokeWidth="1.5"/><polygon points="185,80 179,76 179,84" fill={C.dim}/>
    <rect x="190" y="30" width="200" height="100" rx="10" fill={C.accent+"12"} stroke={C.accent+"33"}/>
    <text x="290" y="52" textAnchor="middle" fill={C.dim} fontSize="8" fontWeight="700" fontFamily="inherit">CO-FINE-TUNED ON ROBOT DATA</text>
    <rect x="215" y="62" width="150" height="36" rx="6" fill={C.accent+"22"} stroke={C.accent+"55"}/><text x="290" y="82" textAnchor="middle" fill={C.text} fontSize="10" fontWeight="700" fontFamily="inherit">Web + Robot Tokens</text>
    <text x="290" y="115" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Actions encoded as text tokens (256 bins)</text>
    <line x1="390" y1="80" x2="430" y2="80" stroke={C.dim} strokeWidth="1.5"/><polygon points="430,80 424,76 424,84" fill={C.dim}/>
    <rect x="435" y="50" width="150" height="60" rx="10" fill={C.orange+"12"} stroke={C.orange+"33"}/>
    <text x="510" y="72" textAnchor="middle" fill={C.orange} fontSize="10" fontWeight="700" fontFamily="inherit">Discretized Actions</text>
    <text x="510" y="88" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">1-5 Hz control frequency</text>
    <text x="510" y="100" textAnchor="middle" fill={C.dim} fontSize="8" fontFamily="inherit">Emergent reasoning from web data</text>
  </svg>
);

/* ═══════════ Comparison ═══════════ */
const ComparisonPipelines = () => {
  const models = [
    {name:"OpenVLA",steps:[{t:"DINOv2 / SigLIP",c:C.cyan},{t:"LLaMA-2",c:C.accent},{t:"Discrete Tokens",c:C.orange}]},
    {name:"Pi-Zero",steps:[{t:"PaliGemma",c:C.cyan},{t:"Flow Matching",c:C.accent},{t:"Continuous Action",c:C.green}]},
    {name:"RT-2",steps:[{t:"PaLI-X / PaLM-E",c:C.cyan},{t:"(integrated)",c:C.accent},{t:"Discrete Tokens",c:C.orange}]},
    {name:"Gemini",steps:[{t:"ER Planner",c:C.cyan},{t:"Gemini Robotics",c:C.accent},{t:"Continuous Action",c:C.green}]},
  ];
  return (
    <div style={{display:"flex",flexDirection:"column",gap:10}}>
      {models.map((m,mi)=>(
        <FadeIn key={mi} delay={mi*0.08}>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            <div style={{width:80,minWidth:80,fontSize:12,fontWeight:800,color:C.text}}>{m.name}</div>
            <div style={{display:"flex",alignItems:"center",gap:0}}>
              {m.steps.map((s,si)=>(
                <div key={si} style={{display:"flex",alignItems:"center"}}>
                  <div style={{padding:"6px 12px",borderRadius:8,fontSize:10,fontWeight:600,background:s.c+"14",border:`1px solid ${s.c}33`,color:s.c,whiteSpace:"nowrap"}}>{s.t}</div>
                  {si<m.steps.length-1&&<div style={{width:20,height:1,background:C.dim}}/>}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
};

const FeatureTable = () => {
  const hd=["Aspect","OpenVLA","Pi-Zero","RT-2","Gemini Robotics"];
  const hc=[C.dim,C.green,C.orange,C.accent,C.pink];
  const rows=[
    ["Vision-Language Encoder","DINOv2/SigLIP + LLaMA-2","PaliGemma","PaLI-X / PaLM-E","Gemini 2.0"],
    ["Model Style","End-to-end Transformer","VLM + Flow Matching","Co-fine-tuned VLM","Embodied Reasoning VLA"],
    ["Action Output","Discrete tokens","Continuous (flow-based)","Discrete tokens","Continuous action chunks"],
    ["Pretraining","Robot data focused","Mixed robot + VLM","Web + robot","Large VLM + robot fine-tuning"],
    ["Deployment","Open, efficient","Research / proto","Research / large","Commercial / on-device"],
    ["Strength","Accessibility, efficiency","Dexterity, real-world","Semantic generalization","Dexterity + reasoning"],
  ];
  return (
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,margin:"0 auto"}}>
        <thead><tr>{hd.map((h,i)=><th key={i} style={{padding:"10px 12px",textAlign:"left",color:hc[i],fontSize:10,fontWeight:800,letterSpacing:1,borderBottom:`2px solid ${hc[i]}44`,whiteSpace:"nowrap"}}>{h}</th>)}</tr></thead>
        <tbody>{rows.map((r,ri)=><tr key={ri}>{r.map((c,ci)=><td key={ci} style={{padding:"10px 12px",color:ci===0?C.dim:C.text,fontWeight:ci===0?600:400,borderBottom:`1px solid ${C.border}`,lineHeight:1.4}}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
};

/* ═══════════ Latency ═══════════ */
const LatencyBar = ({label,ms,max,color,delay}) => {
  const [v,setV]=useState(false); const ref=useRef();
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:0.3});if(ref.current)o.observe(ref.current);return()=>o.disconnect();},[]);
  return (
    <div ref={ref} style={{marginBottom:12}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,color:C.muted}}>{label}</span><span style={{fontSize:12,fontWeight:800,color,fontVariantNumeric:"tabular-nums"}}>{ms} ms</span></div>
      <div style={{height:8,borderRadius:4,background:C.bg,overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:`linear-gradient(90deg, ${color}cc, ${color}55)`,width:v?`${(ms/max)*100}%`:"0%",transition:`width 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}s`,boxShadow:`0 0 12px ${color}33`}}/></div>
    </div>
  );
};

/* ═══════════ Model Card ═══════════ */
const ModelCard = ({name,org,year,params,actionType,arch,freq,strength,weakness,color,Diagram}) => {
  const [open,setOpen]=useState(false);
  const atC = actionType==="Discrete"?C.accent:actionType==="Continuous"?C.green:C.orange;
  return (
    <FadeIn>
      <div onClick={()=>setOpen(!open)} style={{background:C.card,border:`1px solid ${open?color+"44":C.border}`,borderRadius:16,padding:"24px 20px",cursor:"pointer",transition:"all 0.3s",marginBottom:12,boxShadow:open?`0 0 30px ${color}12`:"none"}}>
        <div style={{display:"flex",alignItems:"center",gap:14,justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <div style={{width:44,height:44,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,background:color+"18",border:`1px solid ${color}33`,color}}>{name.charAt(0)}</div>
            <div><h4 style={{margin:0,fontSize:17,fontWeight:700,color:C.text}}>{name}</h4><p style={{margin:0,fontSize:12,color:C.dim}}>{org} / {year} / {params}</p></div>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}><Pill color={atC}>{actionType}</Pill><span style={{color:C.dim,fontSize:18,transition:"transform 0.3s",transform:open?"rotate(180deg)":"rotate(0)"}}>&#9662;</span></div>
        </div>
        {open&&(
          <div style={{marginTop:20,paddingTop:16,borderTop:`1px solid ${C.border}`}} onClick={e=>e.stopPropagation()}>
            {Diagram&&<div style={{background:C.bg2,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 12px",marginBottom:16,overflow:"auto"}}><Diagram/></div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12}}>
              {[{l:"Architecture",v:arch},{l:"Control Freq",v:freq},{l:"Strength",v:strength},{l:"Weakness",v:weakness}].map((r,i)=>(
                <div key={i} style={{padding:"10px 12px",borderRadius:10,background:C.bg,border:`1px solid ${C.border}`}}>
                  <div style={{fontSize:10,fontWeight:700,color:C.dim,textTransform:"uppercase",letterSpacing:1,marginBottom:4}}>{r.l}</div>
                  <div style={{fontSize:13,color:C.text,lineHeight:1.5}}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </FadeIn>
  );
};

/* ═══════════ Training Step ═══════════ */
const PipelineStep = ({num,title,desc,color}) => (
  <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
    <div style={{width:40,minWidth:40,height:40,borderRadius:"50%",background:color+"18",border:`2px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:900,color,zIndex:1}}>{num}</div>
    <div><h4 style={{margin:"2px 0 6px",fontSize:16,fontWeight:700,color:C.text}}>{title}</h4><p style={{margin:0,fontSize:13,color:C.muted,lineHeight:1.6}}>{desc}</p></div>
  </div>
);

/* ═══════════ NAV ═══════════ */
const NAVS=[
  {id:"hero",l:"Intro"},{id:"evo",l:"Evolution"},{id:"arch",l:"Architecture"},
  {id:"see",l:"SEE/THINK/ACT"},{id:"models",l:"Models"},{id:"compare",l:"Comparison"},
  {id:"train",l:"Training"},{id:"edge",l:"Deployment"},{id:"gaps",l:"Gaps"},
];

/* ═══════════════════════ MAIN ═══════════════════════ */
export default function App(){
  const [active,setActive]=useState("hero");
  useEffect(()=>{
    const h=()=>{let c="hero";for(const n of NAVS){const el=document.getElementById(n.id);if(el&&el.getBoundingClientRect().top<180)c=n.id;}setActive(c);};
    window.addEventListener("scroll",h,{passive:true});return()=>window.removeEventListener("scroll",h);
  },[]);

  const S={maxWidth:1100,margin:"0 auto",padding:"100px 48px"};

  return(
    <div style={{background:C.bg,color:C.text,fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",minHeight:"100vh"}}>

      {/* NAV - centered */}
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:C.bg+"dd",backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,padding:"0 12px"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",height:52,gap:4,overflowX:"auto"}}>
          <span style={{fontWeight:900,fontSize:17,color:C.accent,marginRight:20,letterSpacing:"-0.02em"}}>VLA</span>
          {NAVS.map(n=><a key={n.id} href={`#${n.id}`} style={{padding:"6px 14px",borderRadius:8,fontSize:13,fontWeight:600,color:active===n.id?C.accent:C.dim,background:active===n.id?C.accentGlow:"transparent",textDecoration:"none",whiteSpace:"nowrap",transition:"all 0.2s"}}>{n.l}</a>)}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{...S,paddingTop:140,paddingBottom:60,textAlign:"center"}}>
        <FadeIn>
          <h1 style={{fontSize:"clamp(34px,5vw,58px)",fontWeight:900,margin:"0 0 18px",lineHeight:1.08,letterSpacing:"-0.035em",background:`linear-gradient(135deg, ${C.text} 30%, ${C.accentSoft} 100%)`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Vision Language Action Models</h1>
          <p style={{fontSize:18,color:C.muted,maxWidth:620,margin:"0 auto 32px",lineHeight:1.65}}>How transformers learned to see, understand language, and control robots in one unified model.</p>
          <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
            {["Architecture","Model Comparison","Training Pipeline","Edge Deployment"].map((t,i)=>(
              <span key={i} style={{padding:"8px 20px",borderRadius:8,fontSize:13,fontWeight:600,background:C.card,border:`1px solid ${C.border}`,color:C.muted}}>{t}</span>
            ))}
          </div>
        </FadeIn>
      </section>

      <Divider/>

      {/* EVOLUTION */}
      <section id="evo" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.accent}>01 / Evolution</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>From Hardcoded to Intelligent</h2>
          <p style={{fontSize:16,color:C.muted,maxWidth:660,margin:"0 auto"}}>Four paradigm shifts in how machines interact with the physical world.</p>
        </div></FadeIn>
        <div style={{position:"relative",paddingLeft:32}}>
          <div style={{position:"absolute",left:11,top:20,bottom:20,width:2,background:`linear-gradient(${C.dim}44, ${C.accent}44, ${C.green}44, ${C.orange}66)`,borderRadius:2}}/>
          {[
            {y:"Pre-2020",t:"Traditional Robots",d:"Thousands of lines of handcrafted code per task. Hard-coded trajectories, inverse kinematics. If the object moves 5cm, the robot fails. One task, one program.",c:C.dim},
            {y:"2020-22",t:"Large Language Models",d:"GPT, PaLM, LLaMA learned to predict next tokens from internet-scale text. Powerful reasoning and planning. But no eyes, no hands. Entirely text-based.",c:C.accent},
            {y:"2022-23",t:"Vision-Language Models",d:"CLIP, PaLI, PaliGemma fused images with text. Could perceive and describe the world. Still could not act on it. Perception without action.",c:C.green},
            {y:"2023+",t:"Vision-Language-Action",d:"Same transformer, same attention. But now outputs are motor commands: joint angles, gripper states, velocities. The model sees, thinks, and moves.",c:C.orange},
          ].map((s,i)=>(
            <FadeIn key={i} delay={i*0.08}>
              <div style={{display:"flex",gap:16,padding:"16px 0",alignItems:"flex-start"}}>
                <div style={{width:38,minWidth:38,height:38,borderRadius:"50%",background:s.c+"18",border:`2px solid ${s.c}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,color:s.c,marginLeft:-19,zIndex:1}}>{i+1}</div>
                <div><span style={{fontSize:10,fontWeight:800,color:s.c,letterSpacing:1.5}}>{s.y}</span><h4 style={{margin:"3px 0 4px",fontSize:16,fontWeight:700}}>{s.t}</h4><p style={{margin:0,fontSize:13,color:C.muted,lineHeight:1.6}}>{s.d}</p></div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <Divider/>

      {/* ARCHITECTURE */}
      <section id="arch" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.pink}>02 / Architecture</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>The VLA Architecture</h2>
          <p style={{fontSize:16,color:C.muted,maxWidth:680,margin:"0 auto"}}>A VLM extended with an Action Decoder, running in a closed-loop with the robot's state feeding back into the model.</p>
        </div></FadeIn>
        <FadeIn delay={0.1}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"28px 20px",overflow:"hidden"}}><VLAArchDiagram/></div>
        </FadeIn>
      </section>

      <Divider/>

      {/* SEE THINK ACT */}
      <section id="see" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.cyan}>03 / Deep Dive</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>SEE, THINK, ACT</h2>
        </div></FadeIn>

        {/* ANIMATION 1: Image Tokenization */}
        <FadeIn delay={0.05}>
          <div style={{marginBottom:40}}>
            <h3 style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:6}}>How an Image Becomes Tokens</h3>
            <p style={{fontSize:14,color:C.muted,marginBottom:20}}>A vision encoder chops the image into small squares, then describes each square as a list of numbers.</p>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"24px 24px"}}><ImageTokenAnim/></div>
          </div>
        </FadeIn>

        {/* ANIMATION 2: Multimodal Fusion */}
        <FadeIn delay={0.1}>
          <div style={{marginBottom:40}}>
            <h3 style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:6}}>Multimodal Fusion: Vision Meets Language</h3>
            <p style={{fontSize:14,color:C.muted,marginBottom:20}}>The model combines what it <strong style={{color:C.text}}>sees</strong> with what it's <strong style={{color:C.text}}>told</strong> into one unified understanding.</p>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"24px 24px"}}><FusionAnim/></div>
          </div>
        </FadeIn>

        {/* ANIMATION 3: Bins & Action Tokens */}
        <FadeIn delay={0.15}>
          <div style={{marginBottom:40}}>
            <h3 style={{fontSize:20,fontWeight:700,color:C.text,marginBottom:6}}>Bins and Action Tokens: How Movement Becomes Numbers</h3>
            <p style={{fontSize:14,color:C.muted,marginBottom:20}}>Two approaches to generating robot actions: discrete bins (like RT-2/OpenVLA) vs continuous flow matching (like Pi-Zero).</p>
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"24px 24px"}}><BinsAnim/></div>
          </div>
        </FadeIn>

        {/* OpenVLA reference diagram (dark) */}
        <FadeIn delay={0.2}>
          <p style={{textAlign:"center",fontSize:15,color:C.muted,marginBottom:16,maxWidth:680,marginLeft:"auto",marginRight:"auto"}}>Using OpenVLA as a reference. A dual vision encoder, a 7B language backbone, and discrete action tokens.</p>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"24px 16px",overflow:"auto"}}><OpenVLADiagram/></div>
        </FadeIn>

        {/* SEE / THINK / ACT detail cards */}
        {[
          {t:"SEE",sub:"Dual vision encoders capture both spatial precision and semantic meaning.",c:C.cyan,items:[
            {label:"DINOv2",text:"Self-supervised ViT by Meta. Low-level spatial features: edges, textures, object boundaries. Critical for precise grasping."},
            {label:"SigLIP",text:"Contrastive vision-language model. High-level semantics: knows a 'cup' is graspable, fragile, cylindrical."},
            {label:"Fusion",text:"Both outputs merge into visual tokens that are precise enough for manipulation and smart enough for reasoning."},
          ]},
          {t:"THINK",sub:"A pre-trained LLM backbone reasons over fused vision + language.",c:C.accent,items:[
            {label:"Backbone",text:"LLaMA-2 7B (OpenVLA), PaLM-E 12-540B (RT-2), PaliGemma 3B (Pi-Zero). Visual tokens projected into the same embedding space as text."},
            {label:"Reasoning",text:"'Pick up the smallest object' requires size comparison. 'Move coke to recycling' requires world knowledge. All from web pre-training."},
          ]},
          {t:"ACT",sub:"Two fundamentally different philosophies for generating robot actions.",c:C.orange,items:[
            {label:"Discrete Tokens",text:"RT-2 / OpenVLA: Discretise action space into 256 bins per dimension. Predict next action token like predicting next word. Easy training, coarser precision."},
            {label:"Continuous",text:"Pi-Zero: Flow matching starts from noise, progressively converges to smooth motor trajectories. Like diffusion for joint angles. 50 Hz, sub-mm precision."},
            {label:"Modular",text:"Gemini Robotics: Separate reasoning model generates a plan; dedicated action model executes at high frequency. Best of both worlds."},
          ]},
        ].map((sec,si)=>(
          <FadeIn key={si} delay={0.25+si*0.1}>
            <GlowCard color={sec.c} style={{marginTop:16}}>
              <h4 style={{fontSize:18,fontWeight:800,color:sec.c,margin:"0 0 4px"}}>{sec.t}</h4>
              <p style={{fontSize:13,color:C.muted,lineHeight:1.55,margin:"0 0 14px"}}>{sec.sub}</p>
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {sec.items.map((it,i)=>(
                  <div key={i} style={{padding:"10px 14px",borderRadius:10,fontSize:13,background:sec.c+"0c",border:`1px solid ${sec.c}18`,color:C.muted,lineHeight:1.55}}>
                    <span style={{color:sec.c,fontWeight:700}}>{it.label}</span> {it.text}
                  </div>
                ))}
              </div>
            </GlowCard>
          </FadeIn>
        ))}
      </section>

      <Divider/>

      {/* MODELS */}
      <section id="models" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.green}>04 / Models</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>The Model Landscape</h2>
          <p style={{fontSize:16,color:C.muted,maxWidth:680,margin:"0 auto"}}>Click each model to explore its architecture, strengths, and tradeoffs.</p>
        </div></FadeIn>

        <ModelCard name="RT-2" org="Google DeepMind" year="2023" params="5B / 55B" actionType="Discrete" color={C.accent} Diagram={RT2Diagram}
          arch="Fine-tuned PaLI-X (5B) or PaLM-E (12B). Actions encoded as text tokens with 256 bins per dimension. Leverages web-scale VLM pre-training."
          freq="1-3 Hz (55B) / 5 Hz (5B)"
          strength="Emergent reasoning: picks up 'extinct animal' (plastic dinosaur) without training. 62% success on novel scenarios vs 32% for RT-1."
          weakness="Slow inference. Discrete tokens lose precision. Requires massive compute."/>

        <ModelCard name="RT-2-X" org="Google DeepMind" year="2023" params="55B" actionType="Discrete" color={C.accentSoft}
          arch="RT-2 architecture trained on Open X-Embodiment dataset: 22 robot types, 500+ skills, 150K tasks. Single model controlling robots it has never seen."
          freq="1-3 Hz"
          strength="Cross-embodiment transfer. Distinguishes 'apple NEAR cloth' vs 'apple ON cloth'. RT-1-X triples specialist success rates."
          weakness="Same latency as RT-2. Full 55B needed for best cross-robot transfer."/>

        <ModelCard name="OpenVLA" org="Stanford / UC Berkeley" year="2024" params="7B" actionType="Discrete" color={C.green} Diagram={OpenVLADiagram}
          arch="DINOv2 + SigLIP dual encoder into LLaMA-2 7B backbone. Discrete action tokens. Trained on 970K real-world demos from Open X-Embodiment."
          freq="~5 Hz"
          strength="Open source. 7x fewer params than RT-2-X but superior on generalist benchmarks. LoRA fine-tunable on consumer GPUs (4xA100)."
          weakness="Discrete actions, less precise than continuous. Single-arm focus."/>

        <ModelCard name="Pi-Zero" org="Physical Intelligence" year="2024" params="3.3B" actionType="Continuous" color={C.orange} Diagram={Pi0Diagram}
          arch="Split expert: PaliGemma 3B (VLM) + 300M action expert using flow matching. Starts from noise, denoises into motor trajectories."
          freq="50 Hz"
          strength="Production-grade dexterity. Folds laundry, loads dishwashers, bags groceries. 68+ tasks across 8+ platforms. Pi-Zero 0.6 adds RL + Gemma 3 4B backbone."
          weakness="Less emergent reasoning than RT-2. Proprietary training data. Requires 4080/4090 GPU."/>

        <ModelCard name="Gemini Robotics" org="Google DeepMind" year="2025" params="Undisclosed" actionType="Modular" color={C.pink} Diagram={GeminiDiagram}
          arch="Two-model pipeline: Gemini Robotics-ER (VLM) generates structured plans. Gemini Robotics (VLA) executes low-level control. Reasoning at 2-5 Hz, execution at 20-50 Hz."
          freq="ER: 2-5 Hz / Action: 20-50 Hz"
          strength="Decoupled reasoning and control. Nearly doubles zero-shot success vs Gemini 2.0 Flash (27% to 53%)."
          weakness="Not open source. Complex two-model pipeline. Integration overhead."/>

        <ModelCard name="GR00T N1.5" org="NVIDIA" year="2024-25" params="Varies" actionType="Continuous" color={C.cyan}
          arch="Purpose-built for humanoid robots. Tightly integrated with NVIDIA Isaac Sim for sim-to-real training and Jetson for edge deployment."
          freq="High (optimised for Jetson)"
          strength="Full NVIDIA ecosystem integration: Isaac Sim, Jetson Orin, TensorRT. Designed for humanoid whole-body control."
          weakness="Ecosystem lock-in. Less community adoption than OpenVLA. Primarily humanoid-focused."/>
      </section>

      <Divider/>

      {/* COMPARISON - centered */}
      <section id="compare" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.yellow}>05 / Comparison</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>Architecture Comparison</h2>
        </div></FadeIn>
        <FadeIn delay={0.05}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"24px 20px",marginBottom:24,maxWidth:800,marginLeft:"auto",marginRight:"auto"}}>
            <h4 style={{fontSize:13,fontWeight:700,color:C.dim,letterSpacing:1,textTransform:"uppercase",marginBottom:16,textAlign:"center"}}>Pipeline Side-by-Side</h4>
            <ComparisonPipelines/>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:16,padding:"24px 16px",maxWidth:900,marginLeft:"auto",marginRight:"auto"}}>
            <h4 style={{fontSize:13,fontWeight:700,color:C.dim,letterSpacing:1,textTransform:"uppercase",marginBottom:16,textAlign:"center"}}>Feature Comparison</h4>
            <FeatureTable/>
          </div>
        </FadeIn>
      </section>

      <Divider/>

      {/* TRAINING */}
      <section id="train" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.orange}>06 / Training</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>How VLAs Are Trained</h2>
          <p style={{fontSize:16,color:C.muted,maxWidth:680,margin:"0 auto"}}>A 4-phase pipeline from web-scale pre-training to real-world safety validation.</p>
        </div></FadeIn>
        <div style={{display:"flex",flexDirection:"column",gap:24,position:"relative",paddingLeft:4}}>
          <div style={{position:"absolute",left:23,top:24,bottom:24,width:2,background:`linear-gradient(${C.accent}33, ${C.green}33, ${C.orange}33, ${C.red}33)`}}/>
          <FadeIn delay={0}><PipelineStep num="1" color={C.accent} title="Web-Scale Pre-training" desc="Billions of image-text pairs from the internet. The model learns object semantics, language understanding, and basic physics intuitions. Standard VLM training. Costs millions."/></FadeIn>
          <FadeIn delay={0.1}><PipelineStep num="2" color={C.green} title="Imitation Learning on Robot Demos" desc="A human teleoperates the robot. Every frame + instruction + joint angle recorded as (image, instruction, action) triplets. OpenVLA: 970K+ episodes. Action tokens added to the vocabulary. This is SFT: supervised fine-tuning."/></FadeIn>
          <FadeIn delay={0.2}><PipelineStep num="3" color={C.orange} title="RL + Instruction Tuning" desc="Optional but increasingly important. Pi-Zero 0.6 added real-world RL to boost task success. Instruction tuning improves natural language command following. Same RLHF/DPO workflows from LLM alignment."/></FadeIn>
          <FadeIn delay={0.3}><PipelineStep num="4" color={C.red} title="Validation and Safety" desc="Deploy on real hardware. Measure success rate, action accuracy, generalization, task completion time. Add force limits, workspace bounds, confidence thresholds."/></FadeIn>
        </div>
        <FadeIn delay={0.4}>
          <div style={{marginTop:28,padding:"16px 20px",borderRadius:12,background:C.orangeGlow,border:`1px solid ${C.orange}22`,textAlign:"center"}}>
            <p style={{margin:0,fontSize:13,color:C.orange,lineHeight:1.6}}>
              <strong style={{color:C.text}}>LoRA works here too.</strong> OpenVLA supports efficient fine-tuning via Low-Rank Adaptation on consumer GPUs. Freeze the backbone, train small adapter matrices. A few hours on 4xA100 to adapt to a new robot.
            </p>
          </div>
        </FadeIn>
      </section>

      <Divider/>

      {/* EDGE DEPLOYMENT - ONNX next to TensorRT */}
      <section id="edge" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.red}>07 / Deployment</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>Edge Deployment</h2>
          <p style={{fontSize:16,color:C.muted,maxWidth:680,margin:"0 auto"}}>Training runs on A100s. The robot has a Jetson Orin, 30W, and no WiFi.</p>
        </div></FadeIn>

        <FadeIn>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))",gap:8,marginBottom:28}}>
            {[{v:"< 50ms",l:"Latency"},{v:"< 30W",l:"Power"},{v:"< 8 GB",l:"Memory"},{v:"Zero",l:"Cloud Dependency"}].map((c,i)=>(
              <div key={i} style={{padding:"16px 12px",borderRadius:12,textAlign:"center",background:C.card,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:20,fontWeight:900,color:C.text}}>{c.v}</div>
                <div style={{fontSize:10,color:C.dim,marginTop:3}}>{c.l}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:10,marginBottom:10}}>
            <GlowCard color={C.accent}><h5 style={{margin:"0 0 6px",fontSize:14,fontWeight:700,color:C.accent}}>Quantization</h5><p style={{margin:0,fontSize:12,color:C.muted,lineHeight:1.55}}>INT8/INT4 reduces weights to 8 or 4-bit integers. 4x size reduction, 2-3x speedup, minimal accuracy loss.</p></GlowCard>
            <GlowCard color={C.orange}><h5 style={{margin:"0 0 6px",fontSize:14,fontWeight:700,color:C.orange}}>Pruning + Distillation</h5><p style={{margin:0,fontSize:12,color:C.muted,lineHeight:1.55}}>Remove 30% weights. Train 90M student from 7B teacher. A100 to Jetson NX.</p></GlowCard>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:10,marginBottom:24}}>
            <GlowCard color={C.green}><h5 style={{margin:"0 0 6px",fontSize:14,fontWeight:700,color:C.green}}>TensorRT</h5><p style={{margin:0,fontSize:12,color:C.muted,lineHeight:1.55}}>NVIDIA inference optimizer. Fuses ops, optimizes memory layout, selects best kernels. 50%+ latency cut.</p></GlowCard>
            <GlowCard color={C.cyan}><h5 style={{margin:"0 0 6px",fontSize:14,fontWeight:700,color:C.cyan}}>ONNX Runtime</h5><p style={{margin:0,fontSize:12,color:C.muted,lineHeight:1.55}}>Hardware-agnostic inference. Portable across Jetson, Qualcomm RB5, MediaTek.</p></GlowCard>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <GlowCard color={C.red} style={{marginBottom:20}}>
            <h4 style={{margin:"0 0 4px",fontSize:15,fontWeight:700,color:C.text}}>Inference Latency: OpenVLA 7B</h4>
            <p style={{margin:"0 0 16px",fontSize:11,color:C.dim}}>Same model across deployment targets</p>
            <LatencyBar label="Cloud GPU (A100)" ms={210} max={220} color={C.dim} delay={0}/>
            <LatencyBar label="Jetson AGX Orin FP32" ms={87} max={220} color={C.accent} delay={0.12}/>
            <LatencyBar label="Jetson Orin INT8" ms={44} max={220} color={C.accentSoft} delay={0.24}/>
            <LatencyBar label="Jetson NX INT8 + Pruned" ms={31} max={220} color={C.orange} delay={0.36}/>
            <LatencyBar label="Orin + TensorRT + INT4" ms={18} max={220} color={C.green} delay={0.48}/>
            <div style={{marginTop:10,display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <span style={{fontSize:12,color:C.green,fontWeight:700}}>11.7x speedup</span>
              <span style={{fontSize:12,color:C.orange,fontWeight:700}}>-62% power</span>
              <span style={{fontSize:12,color:C.accent,fontWeight:700}}>30 Hz control</span>
            </div>
          </GlowCard>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h4 style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:1,textTransform:"uppercase",marginBottom:10}}>Full Deployment Stack</h4>
          <div style={{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap",justifyContent:"center"}}>
            {["Camera (5ms)",">","Preprocess (3ms)",">","TensorRT (18ms)",">","ROS2 / DDS (2ms)",">","Motor Ctrl (5ms)"].map((s,i)=>(
              <span key={i} style={{padding:s===">"?"0 2px":"7px 12px",borderRadius:8,fontSize:11,fontWeight:600,background:s===">"?"transparent":C.card,border:s===">"?"none":`1px solid ${C.border}`,color:s===">"?C.dim:C.text}}>{s}</span>
            ))}
          </div>
          <p style={{textAlign:"center",fontSize:11,color:C.dim,marginTop:8}}>Total loop: ~33ms = <span style={{color:C.green,fontWeight:700}}>30 Hz closed-loop control</span></p>
        </FadeIn>
      </section>

      <Divider/>

      {/* POTENTIAL GAPS */}
      <section id="gaps" style={S}>
        <FadeIn><div style={{textAlign:"center",marginBottom:40}}>
          <Pill color={C.red}>08 / Potential Gaps</Pill>
          <h2 style={{fontSize:32,fontWeight:800,margin:"14px 0 8px",letterSpacing:"-0.02em"}}>Where the Field Stands</h2>
          <p style={{fontSize:16,color:C.muted,maxWidth:680,margin:"0 auto"}}>Unsolved challenges and active research directions shaping the next generation of VLA systems.</p>
        </div></FadeIn>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            {t:"Sim-to-Real Gap",d:"Models trained in simulation often fail on real hardware. Lighting, physics, and contact dynamics all differ. Domain randomisation helps but does not fully bridge this gap.",c:C.red},
            {t:"Distribution Shift",d:"Training data comes from clean labs. Deployment happens in cluttered, changing environments with unexpected objects the model has never encountered.",c:C.orange},
            {t:"Safety Guarantees",d:"A 7-DOF arm moving at speed can injure someone. Current VLAs have no inherent safety properties. External force limits, workspace bounds, and human override fill this gap.",c:C.pink},
            {t:"Long-Horizon Tasks",d:"5-10 step tasks work reliably. 30+ step sequences like 'make a sandwich' remain unreliable as errors compound at each step.",c:C.yellow},
            {t:"On-Device Adaptation",d:"When the model encounters something truly novel, it cannot learn on the fly. Real-time adaptation from a handful of demonstrations is an active research frontier.",c:C.accent},
          ].map((p,i)=>(
            <FadeIn key={i} delay={i*0.06}>
              <div style={{background:C.card,border:`1px solid ${p.c}18`,borderRadius:14,padding:"18px 20px",display:"flex",gap:16,alignItems:"flex-start"}}>
                <div style={{width:4,minWidth:4,height:40,borderRadius:2,background:p.c,marginTop:2}}/>
                <div><h5 style={{margin:"0 0 4px",fontSize:14,fontWeight:700,color:C.text}}>{p.t}</h5><p style={{margin:0,fontSize:13,color:C.muted,lineHeight:1.6}}>{p.d}</p></div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.4}>
          <div style={{marginTop:36}}>
            <h4 style={{fontSize:12,fontWeight:700,color:C.dim,letterSpacing:1,textTransform:"uppercase",marginBottom:14,textAlign:"center"}}>Research Timeline</h4>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(155px, 1fr))",gap:10}}>
              {[
                {y:"2024-25",t:"Domain-Specific VLAs",d:"Surgery, warehouse, drones",c:C.accent},
                {y:"2025-26",t:"On-Device Learning",d:"5-10 demo adaptation",c:C.green},
                {y:"2026-27",t:"Multi-Robot Coordination",d:"Shared model, fleet control",c:C.orange},
                {y:"2028+",t:"Embodied AGI Foundations",d:"General-purpose physical intelligence",c:C.pink},
              ].map((f,i)=>(
                <div key={i} style={{padding:"14px 12px",borderRadius:12,textAlign:"center",background:C.card,border:`1px solid ${f.c}18`}}>
                  <div style={{fontSize:10,fontWeight:800,color:f.c,letterSpacing:1}}>{f.y}</div>
                  <div style={{fontSize:13,fontWeight:700,color:C.text,margin:"5px 0 3px"}}>{f.t}</div>
                  <div style={{fontSize:11,color:C.muted}}>{f.d}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <div style={{height:80}}/>
    </div>
  );
}