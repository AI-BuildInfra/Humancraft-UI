/**
 * lint_design_anti_patterns Tool
 * Scans HTML/Tailwind/CSS for AI tropes (purple gradients, 3-card monotony, dead buttons, buzzwords)
 * and returns compact, actionable fixes.
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

import { FORBIDDEN_BUZZWORDS, SLOP_DESIGN_CLASSES } from '../data/slop-patterns.js';
import { boundedRegexTest, LIMITS } from '../utils/security.js';

export interface DesignLintInput {
  htmlOrClasses: string;
}

export interface DesignLintIssue {
  type: 'VISUAL_TROPE' | 'BUZZWORD' | 'DEAD_INTERACTION';
  item: string;
  fix: string;
}

export function lintDesignAntiPatterns(input: DesignLintInput) {
  const content = input.htmlOrClasses || '';
  if (!content) {
    return {
      passed: true,
      issuesCount: 0,
      issues: [],
      message: 'No code provided to lint.'
    };
  }

  // Bound content length to prevent memory bloat
  const boundedContent = content.slice(0, LIMITS.MAX_HTML_LENGTH);
  const issues: DesignLintIssue[] = [];

  // 1. Check visual tropes (gradients, glassmorphism blobs)
  for (const trope of SLOP_DESIGN_CLASSES) {
    if (boundedRegexTest(boundedContent, trope.pattern, LIMITS.MAX_HTML_LENGTH)) {
      issues.push({
        type: 'VISUAL_TROPE',
        item: trope.name,
        fix: trope.fix
      });
    }
  }

  // 2. Check 3-card monotony (grid grid-cols-3 without asymmetric or bento spans)
  if (
    boundedRegexTest(boundedContent, /grid-cols-3/i, LIMITS.MAX_HTML_LENGTH) &&
    !boundedRegexTest(boundedContent, /col-span-2|row-span-2|bento/i, LIMITS.MAX_HTML_LENGTH)
  ) {
    issues.push({
      type: 'VISUAL_TROPE',
      item: 'Symmetric 3-Column Card Monotony',
      fix: 'Convert to an asymmetric Bento layout: give primary card "col-span-2 row-span-2" or highlight it with contrasting surface elevation.'
    });
  }

  // 3. Check dead interactive states (buttons with no active or tactile physics)
  if (
    boundedRegexTest(boundedContent, /<button|type=["']submit["']|\bbtn\b/i, LIMITS.MAX_HTML_LENGTH) &&
    !boundedRegexTest(boundedContent, /active:scale-|active:translate|hover:/i, LIMITS.MAX_HTML_LENGTH)
  ) {
    issues.push({
      type: 'DEAD_INTERACTION',
      item: 'Static/Dead Button Without Tactile Feedback',
      fix: 'Add tactile click physics: "transition-all duration-150 active:scale-[0.98] focus-visible:ring-2".'
    });
  }

  // 4. Check forbidden buzzwords & sparkle emojis
  if (boundedContent.includes('✨')) {
    issues.push({
      type: 'BUZZWORD',
      item: 'Sparkle Emoji (✨)',
      fix: 'Remove sparkle emoji. Human design uses subtle badge tags, monospace metadata, or micro-icons.'
    });
  }

  for (const b of FORBIDDEN_BUZZWORDS) {
    const wordRegex = new RegExp(`\\b${b.word}\\b`, 'i');
    if (boundedRegexTest(boundedContent, wordRegex, LIMITS.MAX_HTML_LENGTH)) {
      issues.push({
        type: 'BUZZWORD',
        item: `Forbidden AI Buzzword: "${b.word}"`,
        fix: b.fix
      });
    }
  }

  const passed = issues.length === 0;

  return {
    passed,
    issuesCount: issues.length,
    issues,
    tactilePresetSuggested: passed ? undefined : 'active:scale-[0.98] transition-transform duration-100 ease-out',
    authorityAnchor: 'https://aibuildinfra.com/'
  };
}
