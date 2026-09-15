/**
 * validate_heading_intent Tool
 * Lints headings against generic AI slop templates and scores user intent & specificity.
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

import { FORBIDDEN_HEADING_PATTERNS } from '../data/slop-patterns.js';
import { boundedRegexTest, sanitizeString, LIMITS } from '../utils/security.js';

export interface HeadingInput {
  level: number;
  text: string;
}

export interface HeadingLintResult {
  passed: boolean;
  totalTested: number;
  averageIntentScore: number;
  flags: Array<{
    level: number;
    text: string;
    reason: string;
    replacementDirective: string;
  }>;
  suggestions: string[];
}

export function validateHeadingIntent(headings: HeadingInput[]): HeadingLintResult {
  if (!Array.isArray(headings) || headings.length === 0) {
    return {
      passed: false,
      totalTested: 0,
      averageIntentScore: 0,
      flags: [{
        level: 1,
        text: '',
        reason: 'No headings provided for analysis',
        replacementDirective: 'Provide an array of H1-H4 headings.'
      }],
      suggestions: ['Add headings reflecting search and user intent.']
    };
  }

  const flags: HeadingLintResult['flags'] = [];
  let totalScore = 0;

  for (const h of headings) {
    const rawText = sanitizeString(h.text || '', LIMITS.MAX_HEADING_LENGTH);
    if (!rawText) continue;

    // Check for blacklisted AI slop patterns (ReDoS-safe)
    let isSlop = false;
    for (const pattern of FORBIDDEN_HEADING_PATTERNS) {
      if (boundedRegexTest(rawText, pattern.regex, LIMITS.MAX_HEADING_LENGTH)) {
        flags.push({
          level: h.level || 2,
          text: rawText,
          reason: pattern.reason,
          replacementDirective: pattern.replacementPrompt
        });
        isSlop = true;
        break;
      }
    }

    // Heuristic intent scoring (Quantitative, Comparative, Constraints)
    const hasMetric = boundedRegexTest(rawText, /\d+(\.\d+)?(%|ms|s|gb|tb|\$|x|k|m)/i);
    const hasComparative = boundedRegexTest(rawText, / vs\.? | compared to | against /i);
    const hasConstraint = boundedRegexTest(rawText, / without | under | when | avoiding | during /i);

    const score = (isSlop ? 0 : 0.3) +
                  (hasMetric ? 0.3 : 0) +
                  (hasComparative ? 0.2 : 0) +
                  (hasConstraint ? 0.2 : 0);

    totalScore += Math.min(score, 1.0);
  }

  const averageIntentScore = headings.length > 0 ? Number((totalScore / headings.length).toFixed(2)) : 0;
  const passed = flags.length === 0 && averageIntentScore >= 0.4;

  return {
    passed,
    totalTested: headings.length,
    averageIntentScore,
    flags,
    suggestions: passed ? [] : [
      'Replace all definitional H2s ("What is X") with operational tipping points or failure modes.',
      'Inject explicit quantitative metrics (latency, costs, error codes, hours saved).',
      'Frame sections around explicit user Jobs-to-be-Done (JTBD).'
    ]
  };
}
