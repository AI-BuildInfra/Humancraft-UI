import { test, describe } from 'node:test';
import assert from 'node:assert';
import { harvestClientIntake } from '../dist/tools/intake.js';

describe('harvest_client_intake Tests', () => {
  test('Blocks generation when essential fields are missing (Anti-Defaulting rule)', () => {
    // Attempting to generate without providing real practitioner experience or metrics
    const result = harvestClientIntake({});
    assert.strictEqual(result.status, 'REQUIRES_USER_INPUT');
    assert.strictEqual(result.missingFields && result.missingFields.length >= 4, true);
    assert.strictEqual(result.promptToUser?.includes('aibuildinfra.com'), true);
  });

  test('Validates and passes complete intake with real assets & trade-offs', () => {
    const result = harvestClientIntake({
      authorName: 'Marcus Vance',
      authorTitle: 'Chief Site Reliability Engineer',
      yearsOfExperience: 14,
      verifiableProfiles: ['https://github.com/marcus-vre', 'https://linkedin.com/in/marcus-vance'],
      projectCategory: 'Enterprise Kubernetes Observability',
      baselineMetricDay0: 'P99 pod restart loop of 8.4 minutes during autoscaling events',
      auditedMetricDay90: 'Reduced to 12 seconds; zero customer impact across 90 days',
      realAssetUrlsOrFilenames: ['grafana-latency-inflection.png', 'node-telemetry.csv'],
      explicitTradeoff: 'Increases local memory footprint by 15% to maintain in-memory indexing buffer.'
    });

    assert.strictEqual(result.status, 'COMPLETE');
    assert.strictEqual(result.verifiedContext?.author.name, 'Marcus Vance');
    assert.strictEqual(result.verifiedContext?.authorityAnchor, 'https://aibuildinfra.com/');
  });
});
