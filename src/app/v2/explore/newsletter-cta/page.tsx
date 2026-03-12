export const metadata = { title: "Newsletter CTA — 13 Variations" };

const mono = "'IBM Plex Mono', ui-monospace, monospace";
const serif = "Georgia, serif";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginTop: 56, marginBottom: 12, fontFamily: mono }}>
      {children}
    </div>
  );
}

function EmailWrap({ children }: { children: React.ReactNode }) {
  return <div style={{ background: "#ffffff", padding: "0 40px 40px" }}>{children}</div>;
}

export default function NewsletterCTAPreview() {
  return (
    <div style={{ background: "#f4f4f2", minHeight: "100vh", padding: "40px 20px", fontFamily: mono }}>
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#000", marginBottom: 4, fontFamily: serif }}>
          Newsletter CTA Block — 13 Variations
        </div>
        <div style={{ fontSize: 11, color: "#999", marginBottom: 40 }}>
          All email-safe (tables + inline styles). Kit.com compatible.
        </div>

        {/* Simulated email body context */}
        <div style={{ background: "#ffffff", padding: "32px 40px", marginBottom: 8 }}>
          <p style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.7, color: "#333", margin: 0 }}>
            ...and that&apos;s why the best teams treat growth like a system, not a collection of tactics. If you only remember one thing from this edition: <strong>the channel doesn&apos;t matter if the positioning is wrong.</strong>
          </p>
        </div>

        {/* ═══ 1. THE MENU — Newspaper Classified ═══ */}
        <Label>1 — The Menu (newspaper classified)</Label>
        <EmailWrap>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td style={{ borderTop: "2px solid #000", borderBottom: "1px solid #000", padding: "6px 0", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", fontFamily: mono }}>
                  From the Demand Curve kitchen
                </td>
                <td style={{ borderTop: "2px solid #000", borderBottom: "1px solid #000", padding: "6px 0", fontSize: 10, textAlign: "right", letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", fontFamily: mono }}>
                  Menu
                </td>
              </tr>
            </tbody>
          </table>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse", marginTop: 16 }}>
            <tbody>
              {[
                { name: "Growth Program", desc: "50+ playbooks. AI co-pilot. Build your growth engine yourself.", stat: "4,000+ enrolled", cta: "Start free trial →" },
                { name: "Growth Studio", desc: "We design and build your growth system for you. Strategy → execution.", stat: "Limited spots", cta: "Book a call →" },
                { name: "Saturation", desc: "AI is rewriting how buyers find you. We make sure you show up.", stat: "AI search agency", cta: "Get your AI search audit →" },
                { name: "GrowthPair", desc: "Hire vetted growth talent at 40–80% below market rate.", stat: "Avg. 62% savings", cta: "Find talent →" },
                { name: "Sponsor this newsletter", desc: "Put your brand in front of 105,000+ growth leaders.", stat: "105K+ readers", cta: "Learn more →" },
              ].map((item, i, arr) => (
                <tr key={i}>
                  <td style={{ padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none", verticalAlign: "top", width: "55%" }}>
                    <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: "#000", marginBottom: 3 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, fontFamily: mono }}>{item.desc}</div>
                  </td>
                  <td style={{ padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none", verticalAlign: "top", textAlign: "right", width: "20%" }}>
                    <div style={{ fontSize: 11, color: "#999", fontFamily: mono }}>{item.stat}</div>
                  </td>
                  <td style={{ padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none", verticalAlign: "top", textAlign: "right", width: "25%" }}>
                    <a href="#" style={{ fontSize: 12, color: "#000", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>{item.cta}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ borderTop: "1px solid #000", borderBottom: "2px solid #000", padding: "6px 0", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", textAlign: "center", fontFamily: mono }}>
            ◆ &nbsp; Demand Curve &nbsp; ◆
          </div>
        </EmailWrap>

        {/* ═══ 2. DARK CARD ═══ */}
        <Label>2 — Dark card (high contrast)</Label>
        <EmailWrap>
          <div style={{ background: "#0a0a0a", padding: "24px 28px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", marginBottom: 16, fontFamily: mono }}>How we help you grow</div>
            <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { name: "Growth Program", desc: "Build it yourself", cta: "Start free →" },
                  { name: "Growth Studio", desc: "We build it for you", cta: "Book a call →" },
                  { name: "Saturation", desc: "Own AI search results", cta: "AI search audit →" },
                  { name: "GrowthPair", desc: "Hire growth talent", cta: "Find talent →" },
                  { name: "Sponsor", desc: "Reach 105K+ leaders", cta: "Learn more →" },
                ].map((item, i, arr) => (
                  <tr key={i}>
                    <td style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #222" : "none", verticalAlign: "middle" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: serif }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: "#666", fontFamily: mono }}>{item.desc}</div>
                    </td>
                    <td style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid #222" : "none", textAlign: "right", verticalAlign: "middle" }}>
                      <a href="#" style={{ fontSize: 11, color: "#fff", textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>{item.cta}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EmailWrap>

        {/* ═══ 3. TWO-PATH FORK ═══ */}
        <Label>3 — Two-path fork (simplest)</Label>
        <EmailWrap>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td colSpan={2} style={{ borderTop: "2px solid #000", borderBottom: "1px solid #ddd", padding: "8px 0", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", fontFamily: mono }}>
                  Ready to build your growth system?
                </td>
              </tr>
              <tr>
                <td style={{ padding: "20px 20px 20px 0", verticalAlign: "top", width: "50%", borderRight: "1px solid #eee" }}>
                  <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8, fontFamily: mono }}>Build it yourself</div>
                  <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: "#000", marginBottom: 6 }}>Growth Program</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 12, fontFamily: mono }}>50+ playbooks, frameworks, and an AI co-pilot.</div>
                  <a href="#" style={{ fontSize: 12, color: "#000", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>Start free trial →</a>
                </td>
                <td style={{ padding: "20px 0 20px 20px", verticalAlign: "top", width: "50%" }}>
                  <div style={{ fontSize: 11, color: "#999", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8, fontFamily: mono }}>We build it for you</div>
                  <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: "#000", marginBottom: 6 }}>Growth Studio</div>
                  <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, marginBottom: 12, fontFamily: mono }}>Strategy, systems, and execution from 4,500+ startups.</div>
                  <a href="#" style={{ fontSize: 12, color: "#000", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>Book a call →</a>
                </td>
              </tr>
              <tr>
                <td colSpan={2} style={{ borderTop: "1px solid #eee", padding: "10px 0 0", fontSize: 11, color: "#999", fontFamily: mono }}>
                  <a href="#" style={{ color: "#666", textDecoration: "underline", textUnderlineOffset: "2px" }}>Own AI search with Saturation</a>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <a href="#" style={{ color: "#666", textDecoration: "underline", textUnderlineOffset: "2px" }}>Hiring growth talent?</a>
                  &nbsp;&nbsp;·&nbsp;&nbsp;
                  <a href="#" style={{ color: "#666", textDecoration: "underline", textUnderlineOffset: "2px" }}>Become a sponsor</a>
                </td>
              </tr>
            </tbody>
          </table>
        </EmailWrap>

        {/* ═══ 4. THE PS — Justin's personal note ═══ */}
        <Label>4 — The PS (personal note from Justin)</Label>
        <EmailWrap>
          <div style={{ borderTop: "1px solid #eee", paddingTop: 24, marginTop: 8 }}>
            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.7, color: "#555", margin: "0 0 12px" }}>
              <strong style={{ color: "#000" }}>PS —</strong> If this edition made you think &quot;we need to fix our growth system,&quot; here&apos;s how I can help:
            </p>
            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.7, color: "#555", margin: "0 0 8px" }}>
              → <a href="#" style={{ color: "#000", fontWeight: 600 }}>Growth Program</a> if you want to build it yourself (7-day free trial)
            </p>
            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.7, color: "#555", margin: "0 0 8px" }}>
              → <a href="#" style={{ color: "#000", fontWeight: 600 }}>Growth Studio</a> if you want us to build it for you
            </p>
            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.7, color: "#555", margin: "0 0 8px" }}>
              → <a href="#" style={{ color: "#000", fontWeight: 600 }}>Saturation</a> if you need to show up in AI search results
            </p>
            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.7, color: "#555", margin: "0 0 20px" }}>
              → <a href="#" style={{ color: "#000", fontWeight: 600 }}>GrowthPair</a> if you&apos;re hiring growth talent (40-80% less)
            </p>
            <p style={{ fontFamily: serif, fontSize: 13, color: "#999", margin: 0 }}>
              — Justin
            </p>
          </div>
        </EmailWrap>

        {/* ═══ 5. SINGLE SPOTLIGHT ═══ */}
        <Label>5 — Single spotlight (rotates weekly — showing Saturation this week)</Label>
        <EmailWrap>
          <div style={{ border: "2px solid #000", padding: "28px 32px" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 12, fontFamily: mono }}>
              This week&apos;s pick
            </div>
            <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 700, color: "#000", marginBottom: 8 }}>
              Saturation
            </div>
            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.7, color: "#555", margin: "0 0 16px" }}>
              AI is rewriting how buyers discover products. ChatGPT, Perplexity, Gemini — your customers are asking AI for recommendations instead of Googling. Saturation makes sure your brand shows up when they do.
            </p>
            <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ background: "#000", padding: "10px 24px" }}>
                    <a href="#" style={{ color: "#fff", fontSize: 13, fontWeight: 600, textDecoration: "none", fontFamily: mono }}>Get your AI search audit →</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </EmailWrap>

        {/* ═══ 6. PROOF STACK ═══ */}
        <Label>6 — Proof stack (stats over descriptions)</Label>
        <EmailWrap>
          <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
            <tbody>
              <tr>
                <td colSpan={2} style={{ borderTop: "2px solid #000", borderBottom: "1px solid #000", padding: "6px 0", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#666", fontFamily: mono }}>
                  The numbers speak
                </td>
              </tr>
              {[
                { name: "Growth Program", stat: "14x", statLabel: "avg. ROI in 6 months", cta: "Start free →" },
                { name: "Growth Studio", stat: "$2M → $11M", statLabel: "ARR for one client in 18mo", cta: "Book a call →" },
                { name: "Saturation", stat: "AI search", statLabel: "own the answers buyers see", cta: "AI search audit →" },
                { name: "GrowthPair", stat: "62%", statLabel: "avg. below market rate", cta: "Find talent →" },
              ].map((item, i, arr) => (
                <tr key={i}>
                  <td style={{ padding: "16px 0", borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none", verticalAlign: "top" }}>
                    <div style={{ fontFamily: mono, fontSize: 11, color: "#999", marginBottom: 4 }}>{item.name}</div>
                    <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: "#000", lineHeight: 1 }}>{item.stat}</div>
                    <div style={{ fontFamily: mono, fontSize: 11, color: "#888", marginTop: 4 }}>{item.statLabel}</div>
                  </td>
                  <td style={{ padding: "16px 0", borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none", verticalAlign: "bottom", textAlign: "right" }}>
                    <a href="#" style={{ fontSize: 12, color: "#000", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>{item.cta}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </EmailWrap>

        {/* ═══ 7. TERMINAL ═══ */}
        <Label>7 — Terminal readout</Label>
        <EmailWrap>
          <div style={{ background: "#111", padding: "20px 24px", fontFamily: mono, fontSize: 12, lineHeight: 2.2 }}>
            <div style={{ color: "#555" }}>$ demand-curve --status</div>
            <div style={{ color: "#888" }}>
              <span style={{ color: "#4ade80" }}>●</span> <a href="#" style={{ color: "#fff", textDecoration: "none" }}>GROWTH_PROGRAM</a> <span style={{ color: "#555" }}>····</span> 4,000+ enrolled <span style={{ color: "#555" }}>···</span> <a href="#" style={{ color: "#4ade80", textDecoration: "underline", textUnderlineOffset: "3px" }}>start free →</a>
            </div>
            <div style={{ color: "#888" }}>
              <span style={{ color: "#facc15" }}>●</span> <a href="#" style={{ color: "#fff", textDecoration: "none" }}>GROWTH_STUDIO</a> <span style={{ color: "#555" }}>···</span> limited spots <span style={{ color: "#555" }}>····</span> <a href="#" style={{ color: "#facc15", textDecoration: "underline", textUnderlineOffset: "3px" }}>book call →</a>
            </div>
            <div style={{ color: "#888" }}>
              <span style={{ color: "#f472b6" }}>●</span> <a href="#" style={{ color: "#fff", textDecoration: "none" }}>SATURATION</a> <span style={{ color: "#555" }}>······</span> AI search agency <span style={{ color: "#555" }}>··</span> <a href="#" style={{ color: "#f472b6", textDecoration: "underline", textUnderlineOffset: "3px" }}>search audit →</a>
            </div>
            <div style={{ color: "#888" }}>
              <span style={{ color: "#60a5fa" }}>●</span> <a href="#" style={{ color: "#fff", textDecoration: "none" }}>GROWTHPAIR</a> <span style={{ color: "#555" }}>······</span> 62% avg savings <span style={{ color: "#555" }}>··</span> <a href="#" style={{ color: "#60a5fa", textDecoration: "underline", textUnderlineOffset: "3px" }}>find talent →</a>
            </div>
            <div style={{ color: "#888" }}>
              <span style={{ color: "#c084fc" }}>●</span> <a href="#" style={{ color: "#fff", textDecoration: "none" }}>SPONSOR</a> <span style={{ color: "#555" }}>·········</span> 105K+ readers <span style={{ color: "#555" }}>···</span> <a href="#" style={{ color: "#c084fc", textDecoration: "underline", textUnderlineOffset: "3px" }}>learn more →</a>
            </div>
            <div style={{ color: "#555", marginTop: 4 }}>$<span style={{ animation: "blink 1s step-end infinite" }}> _</span></div>
          </div>
        </EmailWrap>

        {/* ═══ 8. SCORECARD ═══ */}
        <Label>8 — Scorecard (self-select by stage)</Label>
        <EmailWrap>
          <div style={{ borderTop: "2px solid #000", paddingTop: 16 }}>
            <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 700, color: "#000", marginBottom: 16 }}>Where are you right now?</div>
            <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { stage: "🏗️ Building", question: "Still figuring out your growth model?", offer: "Growth Program", cta: "Start building →" },
                  { stage: "📈 Scaling", question: "Know what works, need to scale it?", offer: "Growth Studio", cta: "Scale with us →" },
                  { stage: "🤖 AI Discovery", question: "Need to show up in AI search results?", offer: "Saturation", cta: "AI search audit →" },
                  { stage: "🔍 Hiring", question: "Need growth talent on the team?", offer: "GrowthPair", cta: "Find your hire →" },
                ].map((item, i, arr) => (
                  <tr key={i}>
                    <td style={{ padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none", verticalAlign: "top", background: i === 0 ? "#fafaf8" : "transparent" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#000", marginBottom: 2, fontFamily: serif }}>{item.stage}</div>
                      <div style={{ fontSize: 13, color: "#666", fontFamily: serif }}>{item.question}</div>
                    </td>
                    <td style={{ padding: "14px 16px", borderBottom: i < arr.length - 1 ? "1px solid #eee" : "none", verticalAlign: "middle", textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "#999", fontFamily: mono, marginBottom: 2 }}>{item.offer}</div>
                      <a href="#" style={{ fontSize: 12, color: "#000", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>{item.cta}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EmailWrap>

        {/* ═══ 9. WHAT READERS DID THIS WEEK ═══ */}
        <Label>9 — Social proof (what readers did this week)</Label>
        <EmailWrap>
          <div style={{ borderTop: "1px solid #eee", paddingTop: 20 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 16, fontFamily: mono }}>
              What readers did this week
            </div>
            <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse" }}>
              <tbody>
                {[
                  { num: "47", action: "founders started the Growth Program", cta: "Join them →" },
                  { num: "3", action: "startups kicked off with the Growth Studio", cta: "Book a call →" },
                  { num: "8", action: "brands ran AI search audits with Saturation", cta: "Get yours →" },
                  { num: "12", action: "growth hires made through GrowthPair", cta: "Find talent →" },
                ].map((item, i) => (
                  <tr key={i}>
                    <td style={{ padding: "8px 0", verticalAlign: "baseline", width: 48 }}>
                      <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 700, color: "#000", lineHeight: 1 }}>{item.num}</div>
                    </td>
                    <td style={{ padding: "8px 0", verticalAlign: "baseline" }}>
                      <span style={{ fontFamily: serif, fontSize: 15, color: "#555" }}>{item.action}</span>
                      {" "}
                      <a href="#" style={{ fontSize: 12, color: "#000", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>{item.cta}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </EmailWrap>

        {/* ═══ 10. RECEIPT ═══ */}
        <Label>10 — The receipt (order-style layout)</Label>
        <EmailWrap>
          <div style={{ border: "1px dashed #ccc", padding: "24px 28px" }}>
            <div style={{ textAlign: "center", fontFamily: mono, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: 16 }}>
              ── Demand Curve ──
            </div>
            <table width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse", fontFamily: mono }}>
              <tbody>
                {[
                  { name: "Growth Program", detail: "50+ modules", cta: "free trial" },
                  { name: "Growth Studio", detail: "done for you", cta: "book call" },
                  { name: "Saturation", detail: "AI search", cta: "search audit" },
                  { name: "GrowthPair", detail: "40-80% less", cta: "find talent" },
                  { name: "Sponsor", detail: "105K+ reach", cta: "learn more" },
                ].map((item, i, arr) => (
                  <tr key={i}>
                    <td style={{ borderBottom: i < arr.length - 1 ? "1px dashed #ddd" : "none", padding: "8px 0", fontSize: 13, color: "#000" }}>{item.name}</td>
                    <td style={{ borderBottom: i < arr.length - 1 ? "1px dashed #ddd" : "none", padding: "8px 0", fontSize: 12, color: "#888", textAlign: "center" }}>{item.detail}</td>
                    <td style={{ borderBottom: i < arr.length - 1 ? "1px dashed #ddd" : "none", padding: "8px 0", fontSize: 12, textAlign: "right" }}><a href="#" style={{ color: "#000", textDecoration: "underline", textUnderlineOffset: "3px" }}>{item.cta}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ borderTop: "1px dashed #ccc", marginTop: 12, paddingTop: 12, textAlign: "center", fontSize: 10, color: "#bbb", fontFamily: mono }}>
              THANK YOU FOR READING · EDITION #247
            </div>
          </div>
        </EmailWrap>

        {/* ═══ 11. PILL BUTTONS ═══ */}
        <Label>11 — Pill buttons (scannable, no descriptions)</Label>
        <EmailWrap>
          <div style={{ borderTop: "1px solid #eee", paddingTop: 20 }}>
            <div style={{ fontFamily: serif, fontSize: 16, fontWeight: 700, color: "#000", marginBottom: 16 }}>Want to go deeper?</div>
            <table cellPadding={0} cellSpacing={0} style={{ borderCollapse: "separate", borderSpacing: "8px 8px" }}>
              <tbody>
                <tr>
                  {[
                    { label: "Growth Program →", bg: "#000", color: "#fff" },
                    { label: "Growth Studio →", bg: "#f5f5f3", color: "#000" },
                    { label: "Saturation →", bg: "#f5f5f3", color: "#000" },
                    { label: "GrowthPair →", bg: "#f5f5f3", color: "#000" },
                  ].map((btn, i) => (
                    <td key={i}>
                      <a href="#" style={{ display: "inline-block", background: btn.bg, color: btn.color, padding: "10px 20px", fontSize: 12, fontWeight: 600, textDecoration: "none", fontFamily: mono, borderRadius: 4 }}>
                        {btn.label}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </EmailWrap>

        {/* ═══ 12. NUMBERED LIST ═══ */}
        <Label>12 — Numbered list (editorial, scannable)</Label>
        <EmailWrap>
          <div style={{ borderTop: "2px solid #000", paddingTop: 16 }}>
            <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, color: "#000", marginBottom: 16 }}>Four ways to work with us</div>
            {[
              { num: "01", name: "Growth Program", desc: "Build your own growth system with 50+ playbooks and an AI co-pilot.", cta: "Start free trial →" },
              { num: "02", name: "Growth Studio", desc: "We architect and build your growth system for you. Strategy through execution.", cta: "Book a call →" },
              { num: "03", name: "Saturation", desc: "AI is rewriting buyer discovery. We make sure your brand shows up in AI search results.", cta: "Get your AI search audit →" },
              { num: "04", name: "GrowthPair", desc: "Hire vetted growth talent at 40–80% below market rate.", cta: "Find talent →" },
            ].map((item, i) => (
              <table key={i} width="100%" cellPadding={0} cellSpacing={0} style={{ borderCollapse: "collapse", marginBottom: 16 }}>
                <tbody>
                  <tr>
                    <td style={{ width: 36, verticalAlign: "top", paddingTop: 2 }}>
                      <div style={{ fontFamily: mono, fontSize: 11, color: "#bbb" }}>{item.num}</div>
                    </td>
                    <td style={{ verticalAlign: "top" }}>
                      <div style={{ fontFamily: serif, fontSize: 15, fontWeight: 700, color: "#000", marginBottom: 2 }}>{item.name}</div>
                      <div style={{ fontFamily: serif, fontSize: 14, color: "#777", lineHeight: 1.5, marginBottom: 4 }}>{item.desc}</div>
                      <a href="#" style={{ fontSize: 12, color: "#000", fontWeight: 600, textDecoration: "underline", textUnderlineOffset: "3px", fontFamily: mono }}>{item.cta}</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </EmailWrap>

        {/* ═══ 13. THE INLINE CALLOUT ═══ */}
        <Label>13 — Inline callout (blends into article)</Label>
        <div style={{ background: "#ffffff", padding: "0 40px 40px" }}>
          <p style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.7, color: "#333", margin: "0 0 20px" }}>
            ...and that&apos;s the framework. The companies that grow consistently aren&apos;t the ones with the best tactics — they&apos;re the ones that build systems.
          </p>
          <div style={{ borderLeft: "3px solid #000", paddingLeft: 20, marginBottom: 20 }}>
            <p style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.6, color: "#000", margin: "0 0 8px", fontWeight: 600 }}>
              Want to build your own growth system?
            </p>
            <p style={{ fontFamily: serif, fontSize: 14, lineHeight: 1.6, color: "#666", margin: "0 0 8px" }}>
              The <a href="#" style={{ color: "#000", fontWeight: 600 }}>Growth Program</a> has 50+ playbooks covering exactly what we talked about today. Or let the <a href="#" style={{ color: "#000", fontWeight: 600 }}>Growth Studio</a> build it for you. And if AI search is on your radar, <a href="#" style={{ color: "#000", fontWeight: 600 }}>Saturation</a> will make sure you show up.
            </p>
          </div>
          <p style={{ fontFamily: serif, fontSize: 17, lineHeight: 1.7, color: "#333", margin: 0 }}>
            Next week, we&apos;re diving into the channel-market fit framework...
          </p>
        </div>

        <div style={{ height: 80 }} />
      </div>
    </div>
  );
}
