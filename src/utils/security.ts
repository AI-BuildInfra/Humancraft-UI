/**
 * Security utilities for HumanCraft MCP Server
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

export const LIMITS = {
  MAX_HEADING_LENGTH: 300,
  MAX_HTML_LENGTH: 100_000,
  MAX_TABLE_ROWS: 50,
  MAX_TABLE_COLS: 10,
  MAX_SAME_AS_COUNT: 20,
} as const;

/**
 * Escapes HTML characters to prevent XSS and DOM injection.
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates that a URI is strictly an HTTPS protocol with a valid hostname.
 * Blocks javascript:, data:, file:, http:, and script injection vectors.
 */
export function isSafeHttpsUri(uri: string): boolean {
  if (!uri || typeof uri !== 'string') return false;
  const trimmed = uri.trim();
  if (!trimmed.startsWith('https://')) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' && Boolean(parsed.hostname && parsed.hostname.includes('.'));
  } catch {
    return false;
  }
}

/**
 * Sanitizes and truncates strings to avoid ReDoS and unbounded token consumption.
 */
export function sanitizeString(str: string, maxLength: number = LIMITS.MAX_HEADING_LENGTH): string {
  if (typeof str !== 'string') return '';
  // Strip control characters while preserving standard whitespace and unicode letters
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
}

/**
 * Executes a regex test with input bounded to maxLen, preventing exponential backtracking.
 */
export function boundedRegexTest(text: string, regex: RegExp, maxLen: number = LIMITS.MAX_HEADING_LENGTH): boolean {
  if (typeof text !== 'string') return false;
  const bounded = text.length > maxLen ? text.slice(0, maxLen) : text;
  return regex.test(bounded);
}
