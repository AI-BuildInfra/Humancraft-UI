/**
 * Curated Human Typography Pairings with Optical Rules
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

export interface FontSystem {
  archetype: string;
  headingFont: string;
  bodyFont: string;
  monoFont?: string;
  googleFontsUrl: string;
  cssRules: {
    headingTracking: string;
    headingLeading: string;
    bodyLeading: string;
  };
  rationale: string;
}

export const HUMAN_FONT_SYSTEMS: Record<string, FontSystem> = {
  editorial: {
    archetype: "Editorial Tech & High-Trust Thought Leadership",
    headingFont: "'Newsreader', Georgia, serif",
    bodyFont: "'Plus Jakarta Sans', system-ui, sans-serif",
    monoFont: "'JetBrains Mono', monospace",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap",
    cssRules: {
      headingTracking: "-0.03em",
      headingLeading: "1.15",
      bodyLeading: "1.65"
    },
    rationale: "High-contrast editorial serif signals deep authority and journalism craft; geometric sans ensures fatigue-free readability."
  },
  darkCraft: {
    archetype: "Tactile Dark Craft (Raycast / Linear style)",
    headingFont: "'Space Grotesk', system-ui, sans-serif",
    bodyFont: "'Inter', -apple-system, sans-serif",
    monoFont: "'Geist Mono', 'Fira Code', monospace",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap",
    cssRules: {
      headingTracking: "-0.04em",
      headingLeading: "1.08",
      bodyLeading: "1.55"
    },
    rationale: "Tight grotesque headings convey mechanical precision and engineering focus; mono accents provide developer credibility."
  },
  warmHumanist: {
    archetype: "Warm Humanist / Organic (Notion / Aesop style)",
    headingFont: "'Fraunces', Georgia, serif",
    bodyFont: "'Outfit', system-ui, sans-serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Outfit:wght@400;500;600&display=swap",
    cssRules: {
      headingTracking: "-0.02em",
      headingLeading: "1.2",
      bodyLeading: "1.7"
    },
    rationale: "Soft, warm serif curves counter clinical AI coldness, establishing emotional rapport and approachable craft."
  },
  neoBrutalist: {
    archetype: "Neo-Brutalist / Playful Rebel (Figma / Gumroad style)",
    headingFont: "'Syne', system-ui, sans-serif",
    bodyFont: "'DM Sans', sans-serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Syne:wght@700;800&display=swap",
    cssRules: {
      headingTracking: "-0.05em",
      headingLeading: "0.98",
      bodyLeading: "1.5"
    },
    rationale: "Ultra-bold, unconventional display forms shatter the standard SaaS template formula."
  }
};
