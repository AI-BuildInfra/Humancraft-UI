import { test, describe } from 'node:test';
import assert from 'node:assert';
import { validateHeadingIntent } from '../dist/tools/heading-linter.js';

describe('validate_heading_intent Tests', () => {
  test('Flags and rejects generic AI slop headings', () => {
    const slopHeadings = [
      { level: 1, text: 'What is Database Optimization?' },
      { level: 2, text: 'Why is Performance Important?' },
      { level: 2, text: 'Key Benefits of Our Software' },
      { level: 2, text: 'How to Choose the Right Tool' },
      { level: 2, text: 'Conclusion' }
    ];

    const result = validateHeadingIntent(slopHeadings);
    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.flags.length >= 4, true);
    assert.strictEqual(result.averageIntentScore < 0.4, true);
  });

  test('Approves high-intent, outcome-oriented headings with quantitative metrics', () => {
    const intentHeadings = [
      { level: 1, text: 'When Single-Node Write Throughput Drops Below 10k TPS: The Sharding Tipping Point' },
      { level: 2, text: 'Cutting SOC 2 Audit Preparation from 300 Hours to Under 40' },
      { level: 2, text: 'Ingestion Cost vs Query Latency at 50TB/Day: Evaluating ClickHouse vs Snowflake' },
      { level: 2, text: 'Mitigating OOMKilled Errors in High-Memory JVM Pods Under Peak Traffic' }
    ];

    const result = validateHeadingIntent(intentHeadings);
    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.flags.length, 0);
    assert.strictEqual(result.averageIntentScore >= 0.5, true);
  });
});
