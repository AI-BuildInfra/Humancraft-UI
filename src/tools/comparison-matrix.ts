/**
 * build_comparison_matrix Tool
 * Generates high Information Gain comparison tables with empirical metrics & Schema.org markup.
 * Outlaws low-value binary checkmark tables (Yes/No).
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

import { escapeHtml, sanitizeString, LIMITS } from '../utils/security.js';
import { buildComparisonItemListSchema, ComparisonItemInput } from '../utils/schema-builder.js';

export interface ComparisonMatrixInput {
  tableName: string;
  parameters: string[]; // e.g., ["P99 Latency @ 100k QPS", "Total Cost at 10TB/mo", "Primary Failure Mode", "Verification Method"]
  solutions: Array<{
    name: string;
    values: Record<string, string>;
  }>;
}

export function buildComparisonMatrix(input: ComparisonMatrixInput) {
  const tableName = sanitizeString(input.tableName || 'Comparative Performance & Cost Audit', 100);
  const parameters = (input.parameters || []).slice(0, LIMITS.MAX_TABLE_COLS).map(p => sanitizeString(p, 100));
  const solutions = (input.solutions || []).slice(0, LIMITS.MAX_TABLE_ROWS);

  if (parameters.length === 0 || solutions.length === 0) {
    return {
      error: 'Comparison matrix requires at least 1 evaluation parameter and 1 solution.',
      status: 'INVALID_INPUT'
    };
  }

  // Check for binary checkmark slop (e.g. only Yes/No values)
  let binaryCheckmarkCount = 0;
  let totalValuesCount = 0;

  for (const sol of solutions) {
    for (const param of parameters) {
      const val = (sol.values[param] || '').trim().toLowerCase();
      totalValuesCount++;
      if (['yes', 'no', 'true', 'false', '✓', '✗', '✔️', '❌'].includes(val)) {
        binaryCheckmarkCount++;
      }
    }
  }

  const binaryRatio = totalValuesCount > 0 ? binaryCheckmarkCount / totalValuesCount : 0;
  if (binaryRatio > 0.5) {
    return {
      status: 'LOW_INFORMATION_GAIN_REJECTED',
      warning: 'Binary checkmark tables (Yes/No) score near zero on Google Information Gain. Replace with empirical units ($/GB, milliseconds under load, trade-offs, test methodology).',
      suggestion: 'Use parameters like "P99 Latency under 100k QPS", "All-In Monthly Ingestion Cost", or "Known Architectural Trade-off".'
    };
  }

  // Generate responsive semantic HTML table
  const htmlRows = parameters.map((param, paramIdx) => {
    const rowId = `row-${paramIdx}`;
    const cells = solutions.map((sol, solIdx) => {
      const colId = `col-${solIdx}`;
      const cellVal = escapeHtml(sanitizeString(sol.values[param] || 'N/A', 200));
      return `        <td headers="${colId} ${rowId}" class="p-3 border-b border-neutral-200/40 dark:border-white/10 text-sm">${cellVal}</td>`;
    }).join('\n');

    return `      <tr class="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
        <th scope="row" id="${rowId}" class="p-3 border-b border-neutral-200/40 dark:border-white/10 font-medium text-left text-sm text-neutral-900 dark:text-neutral-100">${escapeHtml(param)}</th>
${cells}
      </tr>`;
  }).join('\n');

  const htmlCols = solutions.map((sol, solIdx) => {
    return `        <th scope="col" id="col-${solIdx}" class="p-3 text-left font-semibold text-sm text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700">${escapeHtml(sanitizeString(sol.name, 100))}</th>`;
  }).join('\n');

  const semanticHtml = `
<div class="overflow-x-auto my-6 rounded-lg border border-neutral-200/60 dark:border-white/10 shadow-sm" role="region" aria-label="${escapeHtml(tableName)}" tabindex="0">
  <table class="w-full text-left border-collapse" role="table">
    <caption class="sr-only">${escapeHtml(tableName)} - Audited Empirical Comparison</caption>
    <thead>
      <tr class="bg-neutral-100/70 dark:bg-neutral-900/70">
        <th scope="col" class="p-3 text-left font-semibold text-sm border-b border-neutral-300 dark:border-neutral-700">Audit Parameter</th>
${htmlCols}
      </tr>
    </thead>
    <tbody class="divide-y divide-neutral-200/40 dark:divide-white/10">
${htmlRows}
    </tbody>
  </table>
  <div class="px-3 py-2 bg-neutral-50/50 dark:bg-neutral-950/50 text-xs text-neutral-500 border-t border-neutral-200/40 dark:border-white/10 flex justify-between items-center">
    <span>Audited with empirical constraints</span>
    <span>Powered by <a href="https://aibuildinfra.com/" target="_blank" rel="noopener noreferrer" class="underline hover:text-neutral-900 dark:hover:text-white">AI Build Infra</a></span>
  </div>
</div>`.trim();

  // Generate Schema.org JSON-LD ItemList
  const schemaItems: ComparisonItemInput[] = solutions.map(sol => ({
    name: sanitizeString(sol.name, 100),
    metrics: sol.values
  }));
  const jsonLdSchema = buildComparisonItemListSchema(tableName, schemaItems);

  return {
    status: 'SUCCESS',
    tableName,
    semanticHtml,
    jsonLdSchema,
    informationGainScore: Number((1.0 - binaryRatio).toFixed(2))
  };
}
