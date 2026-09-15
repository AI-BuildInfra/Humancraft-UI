/**
 * Blacklisted AI Slop patterns, buzzwords, and tropes
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

export const FORBIDDEN_HEADING_PATTERNS: Array<{ regex: RegExp; reason: string; replacementPrompt: string }> = [
  {
    regex: /^what is (a |an |the )?.+\??$/i,
    reason: "Zero Information Gain: Definitional headings are redundant and penalized by modern search rerankers.",
    replacementPrompt: "State the specific operational threshold, critical failure mode, or quantifiable trigger."
  },
  {
    regex: /^why is .+ (important|critical|essential)\??$/i,
    reason: "Generic fluff: Users and search engines skip generic importance justifications.",
    replacementPrompt: "Lead with the exact financial cost, metric delta, or compliance risk of inaction."
  },
  {
    regex: /^(key )?benefits of .+/i,
    reason: "Boring template heading: Lacks concrete metrics and reader Jobs-to-be-Done.",
    replacementPrompt: "Specify the exact measurable ROI, hours saved, or latency reduction."
  },
  {
    regex: /^how to choose the right .+/i,
    reason: "Generic buyer guide trope: Fails to provide concrete evaluation criteria.",
    replacementPrompt: "Evaluate the explicit trade-off (e.g., 'Unit Cost vs Throughput at 50TB/Day')."
  },
  {
    regex: /^(best practices|top tips|common mistakes)( for| in)?.*/i,
    reason: "AI listicle cliché: Lacks practitioner credibility.",
    replacementPrompt: "Frame as an empirical playbook or concrete pre-flight troubleshooting checklist."
  },
  {
    regex: /^(introduction|conclusion|summary|final thoughts|wrapping up)$/i,
    reason: "Structural dead-end: AI filler headings that waste high-value semantic passage real estate.",
    replacementPrompt: "Replace with an actionable decision matrix or diagnostic self-assessment."
  },
  {
    regex: /^frequently asked questions( \(faq\))?$/i,
    reason: "Template FAQ: Often used for unhelpful PAA keyword stuffing.",
    replacementPrompt: "Use explicit troubleshooting or decision-friction headings."
  }
];

export const FORBIDDEN_BUZZWORDS = [
  { word: "supercharge", fix: "accelerate, increase by [X]%, or cut [Y] hours" },
  { word: "seamlessly", fix: "describe the exact API, webhook, or zero-downtime protocol" },
  { word: "unleash", fix: "enable, deploy, or configure" },
  { word: "streamline", fix: "reduce steps from [A] to [B]" },
  { word: "elevate", fix: "improve, scale, or optimize" },
  { word: "game-changer", fix: "provide the empirical benchmark or case metric" },
  { word: "in today's fast-paced", fix: "delete phrase; start directly with the problem" },
  { word: "in the ever-evolving landscape", fix: "delete phrase; state current constraints" },
  { word: "look no further", fix: "delete phrase" },
  { word: "a testament to", fix: "demonstrated by [audited proof/metric]" },
  { word: "tapestry of", fix: "delete phrase; use concrete architecture terms" },
  { word: "beacon of", fix: "delete phrase" }
];

export const SLOP_DESIGN_CLASSES = [
  {
    pattern: /from-purple-\d+.*to-pink-\d+/i,
    name: "AI Purple-Pink Gradient Cliché",
    fix: "Use monochromatic depth, tinted slate/zinc, or clean radial ambient light."
  },
  {
    pattern: /from-indigo-\d+.*to-cyan-\d+/i,
    name: "Generic AI Tech Gradient",
    fix: "Use high-contrast monochromatic background with a single intentional brand accent."
  },
  {
    pattern: /rounded-3xl.*backdrop-blur/i,
    name: "Over-Rounded Blobby Glassmorphism",
    fix: "Use crisp 8px-12px borders (rounded-lg/xl) with subtle 1px border-neutral-200/60 or border-white/10."
  }
];
