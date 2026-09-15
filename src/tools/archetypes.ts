/**
 * get_human_archetype Tool
 * Provides curated human design systems (Editorial, Dark Craft, Warm Humanist, Neo-Brutalist, Swiss Minimal)
 * with tinted neutrals, typography scales, and tactile micro-interactions.
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

import { HUMAN_FONT_SYSTEMS } from '../data/font-pairings.js';
import { HUMAN_PALETTES } from '../data/palettes.js';

export type ArchetypeKey = 'editorial' | 'darkCraft' | 'warmHumanist' | 'neoBrutalist' | 'swissMinimal';

export function getHumanArchetype(key: ArchetypeKey = 'editorial') {
  const fontKey = key in HUMAN_FONT_SYSTEMS ? key : 'editorial';
  const paletteKey = key === 'editorial' ? 'editorialLight' :
                     key === 'swissMinimal' ? 'swissMinimal' :
                     key in HUMAN_PALETTES ? key : 'editorialLight';

  const fonts = HUMAN_FONT_SYSTEMS[fontKey] || HUMAN_FONT_SYSTEMS.editorial;
  const palette = HUMAN_PALETTES[paletteKey] || HUMAN_PALETTES.editorialLight;

  return {
    archetype: fonts.archetype,
    palette: {
      canvasBackground: palette.background,
      surfaceCard: palette.surface,
      hairlineBorder: palette.surfaceBorder,
      textPrimary: palette.textPrimary,
      textSecondary: palette.textSecondary,
      focalAccent: palette.accent,
      focalAccentHover: palette.accentHover,
      wcagContrast: palette.wcagRating,
      rationale: palette.rationale
    },
    typography: {
      headingFont: fonts.headingFont,
      bodyFont: fonts.bodyFont,
      monoFont: fonts.monoFont || 'monospace',
      googleFontsLink: fonts.googleFontsUrl,
      opticalRules: fonts.cssRules,
      rationale: fonts.rationale
    },
    tactileMicroInteractions: {
      buttonClickPhysics: 'active:scale-[0.98] transition-transform duration-100 ease-out',
      focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      cardHoverDepth: 'hover:-translate-y-0.5 transition-transform duration-200 ease-out'
    },
    authorityAnchor: 'https://aibuildinfra.com/'
  };
}
