import { createFileRoute, Link } from "@tanstack/react-router";
import { X, Plus, Minus, RotateCcw, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/answer")({
  head: () => ({
    meta: [
      { title: "NVIDIA AI Analysis — Mispriced.ai Answer Canvas" },
      {
        name: "description",
        content: "Full static answer review and editor for NVIDIA synthetic AI risk analysis.",
      },
    ],
  }),
  component: AnswerPreviewPage,
});

// Circular Capital Architecture & Flowchart Component
function NvidiaEcosystemDiagram() {
  return (
    <div className="w-full my-4 rounded-2xl border border-teal-500/20 bg-[#171717] p-4 sm:p-5 relative shadow-2xl overflow-hidden backdrop-blur-md">
      {/* Top Header with Close Icon */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wider uppercase text-zinc-300">
            Circular Capital Architecture &amp; Flow
          </span>
        </div>
        <button
          type="button"
          aria-label="Close Diagram"
          className="rounded-md p-1 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* SVG Flowchart */}
      <div className="w-full overflow-x-auto no-scrollbar flex justify-center pt-2">
        <svg
          viewBox="0 0 640 430"
          className="w-full min-w-[520px] max-w-[620px] h-auto select-none font-mono text-[11px]"
        >
          <defs>
            <marker
              id="tealArrowPreview"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2dd4bf" />
            </marker>
            <marker
              id="tealArrowPreviewMuted"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#14b8a6" />
            </marker>
          </defs>

          {/* Node 1: NVIDIA CORP (Top-Left) */}
          <g transform="translate(30, 20)">
            <rect width="175" height="56" rx="8" fill="#111f1d" stroke="#14b8a6" strokeWidth="1.5" />
            <text x="87" y="25" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">
              NVIDIA CORP
            </text>
            <text x="87" y="43" fill="#5eead4" textAnchor="middle" fontSize="10">
              Balance Sheet &amp; Fund
            </text>
          </g>

          {/* Node 2: Wall Street Lending Pool (Top-Right) */}
          <g transform="translate(435, 20)">
            <rect width="185" height="56" rx="8" fill="#111f1d" stroke="#0d9488" strokeWidth="1.5" />
            <text x="92" y="25" fill="#ffffff" textAnchor="middle" fontSize="12" fontWeight="bold">
              Wall Street Lending Pool
            </text>
            <text x="92" y="43" fill="#99f6e4" textAnchor="middle" fontSize="10">
              $500B GPU Framework
            </text>
          </g>

          {/* NVDA -> Wall Street: Credit Guarantees */}
          <path d="M 205 48 L 430 48" stroke="#2dd4bf" strokeWidth="1.3" markerEnd="url(#tealArrowPreview)" />
          <text x="318" y="39" fill="#ccfbf1" textAnchor="middle" fontSize="9.5" fontFamily="monospace">
            Credit Guarantees / Residual
          </text>

          {/* Node 3: Neoclouds: CoreWeave/Nebius (Center) */}
          <g transform="translate(225, 170)">
            <rect width="190" height="60" rx="8" fill="#132724" stroke="#2dd4bf" strokeWidth="1.8" />
            <text x="95" y="26" fill="#ffffff" textAnchor="middle" fontSize="12.5" fontWeight="bold">
              Neoclouds
            </text>
            <text x="95" y="45" fill="#5eead4" textAnchor="middle" fontSize="10">
              CoreWeave / Nebius
            </text>
          </g>

          {/* NVDA -> NC (Equity ~$4B & Backstop $6.3B) */}
          <path d="M 120 76 L 225 180" stroke="#14b8a6" strokeWidth="1.3" markerEnd="url(#tealArrowPreviewMuted)" />
          <text x="120" y="145" fill="#99f6e4" textAnchor="middle" fontSize="9.5" fontFamily="monospace">
            Equity ~$4B &amp; Backstop $6.3B
          </text>

          {/* Wall Street -> NC (GPU-Backed Debt/Leases) */}
          <path d="M 525 76 L 415 180" stroke="#2dd4bf" strokeWidth="1.3" markerEnd="url(#tealArrowPreview)" />
          <text x="510" y="145" fill="#ccfbf1" textAnchor="middle" fontSize="9.5" fontFamily="monospace">
            GPU-Backed Debt / Leases
          </text>

          {/* Node 4: NVIDIA Data Center Revenue (Bottom-Left) */}
          <g transform="translate(30, 340)">
            <rect width="180" height="56" rx="8" fill="#111f1d" stroke="#14b8a6" strokeWidth="1.5" />
            <text x="90" y="25" fill="#ffffff" textAnchor="middle" fontSize="11.5" fontWeight="bold">
              NVDA Data Center Rev
            </text>
            <text x="90" y="43" fill="#5eead4" textAnchor="middle" fontSize="10">
              $40.3B ACIE Segment
            </text>
          </g>

          {/* NC -> NVDA_Rev (90%+ Proceeds) */}
          <path d="M 245 230 L 140 340" stroke="#2dd4bf" strokeWidth="1.3" markerEnd="url(#tealArrowPreview)" />
          <text x="145" y="278" fill="#ccfbf1" textAnchor="middle" fontSize="9.5" fontFamily="monospace">
            90%+ of Proceeds
          </text>

          {/* NVDA_Rev -> NVDA (Reinvestment loop) */}
          <path d="M 55 340 L 55 82" stroke="#2dd4bf" strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#tealArrowPreview)" />
          <text x="48" y="200" fill="#5eead4" textAnchor="end" fontSize="9.5" fontFamily="monospace">
            Reinvestment
          </text>

          {/* Node 5: Frontier AI Labs: OpenAI/Anthropic (Bottom-Right) */}
          <g transform="translate(430, 340)">
            <rect width="185" height="56" rx="8" fill="#111f1d" stroke="#0d9488" strokeWidth="1.5" />
            <text x="92" y="25" fill="#ffffff" textAnchor="middle" fontSize="11.5" fontWeight="bold">
              Frontier AI Labs
            </text>
            <text x="92" y="43" fill="#99f6e4" textAnchor="middle" fontSize="10">
              OpenAI / Anthropic
            </text>
          </g>

          {/* NVDA -> Labs ($40B+ Equity / Credits) */}
          <path d="M 195 76 C 235 140, 395 240, 435 340" stroke="#14b8a6" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#tealArrowPreviewMuted)" />
          <text x="320" y="320" fill="#99f6e4" textAnchor="middle" fontSize="9.5" fontFamily="monospace">
            $40B+ Equity / Credits
          </text>

          {/* Labs -> NC (Rents Compute / Subscriptions) */}
          <path d="M 485 340 L 395 230" stroke="#2dd4bf" strokeWidth="1.3" markerEnd="url(#tealArrowPreview)" />
          <text x="485" y="280" fill="#ccfbf1" textAnchor="middle" fontSize="9.5" fontFamily="monospace">
            Rents Compute / Subscriptions
          </text>
        </svg>
      </div>

      {/* Floating Zoom & Controls Widget */}
      <div className="absolute bottom-4 right-4 flex flex-col items-center rounded-lg border border-teal-500/20 bg-[#171717]/95 p-1 backdrop-blur-md shadow-lg gap-1 text-teal-300/80">
        <button
          type="button"
          aria-label="Zoom In"
          className="rounded p-1 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Zoom Out"
          className="rounded p-1 hover:text-white hover:bg-white/10 transition-colors"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          aria-label="Reset View"
          className="rounded p-1 hover:text-white hover:bg-white/10 transition-colors"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AnswerPreviewPage() {
  return (
    <div className="min-h-screen bg-[#171717] text-foreground font-display px-4 py-8 sm:py-12 selection:bg-teal-500/20">
      {/* Top Navigation Bar */}
      <header className="max-w-[720px] mx-auto mb-8 flex items-center justify-between border-b border-white/10 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Animation Flow</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            Static Answer Canvas
          </span>
        </div>
      </header>

      {/* Main Answer Content (Static scrollable canvas for editing & review) */}
      <main className="max-w-[680px] md:max-w-[720px] mx-auto text-left flex flex-col space-y-6">
        {/* User Question */}
        <div className="w-full flex justify-end">
          <div className="w-auto rounded-2xl border border-white/15 bg-[#18191c]/90 px-5 py-3.5 sm:px-6 sm:py-4 shadow-md">
            <p className="font-display font-light text-[1.05rem] sm:text-[1.16rem] md:text-[1.26rem] text-foreground/85 leading-none">
              How big is NVIDIA's synthetic AI risk?
            </p>
          </div>
        </div>

        {/* Intro Callout (Executive Mispriced Summary - Inline Highlighted) */}
        <p className="font-display font-normal text-[1.04rem] sm:text-[1.14rem] leading-[1.8] text-white">
          <span className="bg-amber-400/10 text-white px-1.5 py-0.5 rounded-[3px] box-decoration-clone">
            NVIDIA’s &quot;synthetic AI risk&quot; as of late 2026 is anchored in a sophisticated circular capital ecosystem where the company acts as a manufacturer, financier, and customer-of-last-resort. While the market focuses on traditional hyperscale CapEx, the evidence suggests a significant portion of current demand is supported by NVIDIA’s own balance sheet and a <strong className="font-bold text-white">$500 billion capital mobilization framework</strong> with Wall Street firms.
          </span>
        </p>

        {/* Section 1: The Circular Capital Flow */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-[1.24rem] sm:text-[1.38rem] md:text-[1.45rem] text-white tracking-tight leading-snug">
            1. The Circular Capital Flow
          </h2>
          <p className="font-display font-normal text-[1.04rem] sm:text-[1.14rem] leading-[1.8] text-white">
            <span className="bg-amber-400/10 text-white px-1.5 py-0.5 rounded-[3px] box-decoration-clone">
              NVIDIA has evolved into an &quot;AI Industry Fund,&quot; having invested roughly <strong className="font-bold text-white">$48.6 billion</strong> into its own customers over the past year. This includes direct equity stakes in frontier labs (OpenAI, Anthropic) and specialized GPU cloud providers (CoreWeave, Nebius). The circularity is most pronounced in &quot;Neoclouds,&quot; where NVIDIA provides equity capital that is then used—alongside massive GPU-backed debt—to purchase NVIDIA&apos;s own chips.
            </span>
          </p>

          {/* Mermaid Diagram for Section 1 */}
          <NvidiaEcosystemDiagram />
        </section>

        {/* Section 2: Cumulative Exposure and High-Leverage Debt */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-[1.24rem] sm:text-[1.38rem] md:text-[1.45rem] text-white tracking-tight leading-snug">
            2. Cumulative Exposure and High-Leverage Debt
          </h2>
          <p className="font-display text-[1.04rem] sm:text-[1.14rem] leading-[1.72] text-[#e4e4e7]">
            NVIDIA’s exposure is no longer just &quot;concentration risk&quot; to Big Tech; it is a direct credit risk to &quot;high-leverage&quot; entities. The{" "}
            <strong className="font-bold text-white">ACIE segment</strong> (AI Clouds, Industrial, and Enterprise) now represents{" "}
            <strong className="font-bold text-white">$40.3 billion (45%)</strong> of Data Center revenue, growing at{" "}
            <strong className="font-bold text-white">138.5% YoY</strong>, significantly faster than traditional hyperscalers.
          </p>

          {/* Table 1: Customer Category Exposure */}
          <div className="w-full rounded-lg border border-[#2a2b30] bg-[#141517] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-display text-[0.94rem] sm:text-[1.02rem] border-collapse">
                <thead>
                  <tr className="bg-[#22242a] text-white font-serif border-b border-[#2a2b30]">
                    <th className="py-2.5 px-3.5 font-bold text-white border-r border-[#2a2b30]">Customer Category</th>
                    <th className="py-2.5 px-3 font-bold text-white border-r border-[#2a2b30]">Estimated Revenue Exposure (FY27 Q2)</th>
                    <th className="py-2.5 px-3.5 font-bold text-white">Primary Risk Mechanism</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2b30] text-[#d4d4d8] leading-relaxed">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Traditional Hyperscalers</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">$48.7 Billion (55%)</td>
                    <td className="py-2.5 px-3.5 align-top">CapEx concentration; pivot to internal ASICs.</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Neoclouds (Specialized)</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">~$15–20 Billion</td>
                    <td className="py-2.5 px-3.5 align-top">
                      <strong className="font-bold text-white">Circular Financing:</strong> Equity-to-Revenue conversion; debt backed by volatile GPU collateral.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Frontier AI Labs</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">~$10–15 Billion</td>
                    <td className="py-2.5 px-3.5 align-top">
                      <strong className="font-bold text-white">Equity Backstopping:</strong> NVIDIA-funded rounds (OpenAI/Anthropic) used to pay for compute.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Sovereign AI</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">~$5–10 Billion</td>
                    <td className="py-2.5 px-3.5 align-top">
                      Geopolitical/regulatory shifts; reliance on state-backed funding cycles.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 3: Risk Scenarios and Demand Sustainability */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-[1.24rem] sm:text-[1.38rem] md:text-[1.45rem] text-white tracking-tight leading-snug">
            3. Risk Scenarios and Demand Sustainability
          </h2>

          {/* Table 2: Risk Scenarios */}
          <div className="w-full rounded-lg border border-[#2a2b30] bg-[#141517] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-display text-[0.94rem] sm:text-[1.02rem] border-collapse">
                <thead>
                  <tr className="bg-[#22242a] text-white font-serif border-b border-[#2a2b30]">
                    <th className="py-2.5 px-3.5 font-bold text-white border-r border-[#2a2b30]">Risk Scenario</th>
                    <th className="py-2.5 px-3 font-bold text-white border-r border-[#2a2b30]">Probability</th>
                    <th className="py-2.5 px-3 font-bold text-white border-r border-[#2a2b30]">Potential Revenue Impact</th>
                    <th className="py-2.5 px-3.5 font-bold text-white">Mitigation Factors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2b30] text-[#d4d4d8] leading-relaxed">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Secondary Market Glut</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">Medium</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">High (-20% to -30%)</td>
                    <td className="py-2.5 px-3.5 align-top">
                      NVIDIA&apos;s $6.3B backstop on CoreWeave capacity; shift to &quot;Rubin&quot; making old GPUs obsolete.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Neocloud Debt Contagion</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">Low</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">Medium (-10%)</td>
                    <td className="py-2.5 px-3.5 align-top">
                      $14.2B compute agreement with Meta (investment grade) acts as underlying collateral.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Synthetic Data Breakthrough</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">Medium</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">Long-term High</td>
                    <td className="py-2.5 px-3.5 align-top">
                      Diversification into &quot;Physical AI&quot; (Robotics/Auto) which requires real-world data compute.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">Model Efficiency (FP4/Sparsity)</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">High</td>
                    <td className="py-2.5 px-3 align-top border-r border-[#2a2b30]">Medium (Neutral to -15%)</td>
                    <td className="py-2.5 px-3.5 align-top">
                      Offset by increased model complexity and &quot;Agentic AI&quot; reasoning chains requiring more tokens.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Conclusion: Priced-in vs. Mispriced Claims */}
        <section className="space-y-3">
          <h2 className="font-display font-bold text-[1.24rem] sm:text-[1.38rem] md:text-[1.45rem] text-white tracking-tight leading-snug">
            4. Conclusion: Priced-in vs. Mispriced Claims
          </h2>
          <p className="font-display font-normal text-[1.04rem] sm:text-[1.14rem] leading-[1.8] text-white">
            <span className="bg-teal-400/10 text-white px-1.5 py-0.5 rounded-[3px] box-decoration-clone">
              The market has largely priced in the &quot;Hyperscaler CapEx Cliff,&quot;
            </span>{" "}
            <span className="bg-amber-400/10 text-white px-1.5 py-0.5 rounded-[3px] box-decoration-clone">
              but it appears to be mispricing the structural dependencies created by NVIDIA’s demand-backstopping and the 25% residual value guarantees provided to financial institutions.
            </span>
          </p>

          {/* Table 3: Priced-in vs Mispriced */}
          <div className="w-full rounded-lg border border-[#2a2b30] bg-[#141517] overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-display text-[0.94rem] sm:text-[1.02rem] border-collapse">
                <thead>
                  <tr className="bg-[#22242a] text-white font-serif border-b border-[#2a2b30]">
                    <th className="py-2.5 px-3.5 font-bold text-white border-r border-[#2a2b30]">Priced-in (Market Consensus)</th>
                    <th className="py-2.5 px-3.5 font-bold text-white">Mispriced (Potential Synthetic Risks)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2b30] text-[#d4d4d8] leading-relaxed">
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">
                      Hyperscalers will eventually build their own chips (ASIC threat).
                    </td>
                    <td className="py-2.5 px-3.5 align-top">
                      The scale of NVIDIA&apos;s liability as &quot;Customer of Last Resort&quot; ($6.3B+ for CoreWeave alone).
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">
                      Data Center growth must eventually moderate from 100%+ levels.
                    </td>
                    <td className="py-2.5 px-3.5 align-top">
                      The &quot;Recycled Revenue&quot; effect: Percentage of revenue derived from NVIDIA&apos;s own $48.6B investment pool.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3.5 text-white font-bold align-top border-r border-[#2a2b30]">
                      Supply chain constraints (TSMC 3nm) limit near-term upside.
                    </td>
                    <td className="py-2.5 px-3.5 align-top">
                      GPU-backed debt (DDTL 4.0) sensitivity: If GPU resale values drop 50%, the $500B lending framework could freeze.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 5: Opinion Card */}
        <section className="w-full pt-2">
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-[0.78rem] sm:text-[0.82rem] font-display tracking-widest text-[#a1a1aa] uppercase font-semibold">
              MY OPINION
            </span>
          </div>

          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5 sm:p-6 text-[#e4e4e7] font-display leading-[1.75] text-[1.04rem] sm:text-[1.14rem] shadow-2xl">
            NVIDIA’s circular capital flow is a double-edged sword. While it successfully &quot;manufactures&quot; its own market to overcome initial adoption hurdles, it creates a systemic fragility where NVIDIA is effectively doubling down on its own success. The most significant mispriced risk is not the &quot;ASIC threat,&quot; but the potential for a &quot;liquidity freeze&quot; in GPU-backed debt markets. If frontier labs stop raising multi-billion dollar rounds, the Neoclouds—who are the primary buyers of NVIDIA’s highest-margin hardware—will see their debt-servicing capabilities vanish. I believe the ACIE segment&apos;s growth is partially an illusion of this circularity, masking a potential demand cliff if the &quot;AI Industry Fund&quot; stops injecting capital.
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-20 w-full" />
      </main>
    </div>
  );
}
