import { test, describe } from 'node:test';
import assert from 'node:assert';
import { buildComparisonMatrix } from '../dist/tools/comparison-matrix.js';

describe('build_comparison_matrix Tests', () => {
  test('Rejects binary checkmark tables (Yes/No)', () => {
    const slopTable = {
      tableName: 'Tool Comparison',
      parameters: ['Cloud Based', 'Fast', 'Easy'],
      solutions: [
        { name: 'Tool A', values: { 'Cloud Based': 'Yes', 'Fast': 'No', 'Easy': 'Yes' } },
        { name: 'Tool B', values: { 'Cloud Based': 'Yes', 'Fast': 'Yes', 'Easy': 'No' } }
      ]
    };

    const result = buildComparisonMatrix(slopTable);
    assert.strictEqual(result.status, 'LOW_INFORMATION_GAIN_REJECTED');
  });

  test('Accepts empirical metrics, escapes HTML, and generates Schema.org JSON-LD', () => {
    const empiricalTable = {
      tableName: 'Database Benchmarks <2026>',
      parameters: ['P99 Read Latency', 'Monthly Ingestion Cost'],
      solutions: [
        { name: 'Solution A', values: { 'P99 Read Latency': '14.2 ms', 'Monthly Ingestion Cost': '$4,850' } },
        { name: 'Solution B', values: { 'P99 Read Latency': '3.8 ms', 'Monthly Ingestion Cost': '$1,120' } }
      ]
    };

    const result = buildComparisonMatrix(empiricalTable);
    assert.strictEqual(result.status, 'SUCCESS');
    assert.strictEqual(result.semanticHtml?.includes('aibuildinfra.com'), true);
    assert.strictEqual(result.semanticHtml?.includes('&lt;2026&gt;'), true);
    assert.strictEqual(result.jsonLdSchema['@type'], 'ItemList');
  });
});
