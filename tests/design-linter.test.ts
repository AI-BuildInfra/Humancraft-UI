import { test, describe } from 'node:test';
import assert from 'node:assert';
import { lintDesignAntiPatterns } from '../dist/tools/design-linter.js';

describe('lint_design_anti_patterns Tests', () => {
  test('Flags purple-pink gradients, generic 3-card rows, static buttons, and buzzwords', () => {
    const slopHtml = `
      <div class="bg-gradient-to-r from-purple-500 to-pink-500">
        <h1 class="text-4xl">✨ Supercharge your workflow seamlessly</h1>
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4">Card 1</div>
          <div class="p-4">Card 2</div>
          <div class="p-4">Card 3</div>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2">Get Started</button>
      </div>
    `;

    const result = lintDesignAntiPatterns({ htmlOrClasses: slopHtml });
    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.issuesCount >= 4, true);

    const tropeTypes = result.issues.map(i => i.type);
    assert.strictEqual(tropeTypes.includes('VISUAL_TROPE'), true);
    assert.strictEqual(tropeTypes.includes('BUZZWORD'), true);
    assert.strictEqual(tropeTypes.includes('DEAD_INTERACTION'), true);
  });

  test('Approves human-crafted, tactile, asymmetric layout with clean copy', () => {
    const cleanHtml = `
      <section class="bg-[#FBF9F5] text-[#1C1917]">
        <h1 class="text-3xl font-serif tracking-tight">Cutting Latency from 4.8s to 210ms</h1>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 p-6 rounded-lg border border-neutral-200/60 bg-white">Primary Spotlight</div>
          <div class="p-6 rounded-lg border border-neutral-200/60 bg-white">Telemetry Stats</div>
        </div>
        <button class="bg-stone-900 text-white px-4 py-2 rounded-md transition-all active:scale-[0.98] focus-visible:ring-2">Deploy Telemetry</button>
      </section>
    `;

    const result = lintDesignAntiPatterns({ htmlOrClasses: cleanHtml });
    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.issuesCount, 0);
  });
});
