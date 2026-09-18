import { test, describe } from 'node:test';
import assert from 'node:assert';
import { getHumanArchetype } from '../dist/tools/archetypes.js';

describe('get_human_archetype Tests', () => {
  test('Returns curated editorial archetype tokens with typography and palette', () => {
    const result = getHumanArchetype('editorial');
    assert.strictEqual(typeof result.archetype, 'string');
    assert.strictEqual(result.archetype, 'Editorial Tech & High-Trust Thought Leadership');
    assert.strictEqual(typeof result.palette, 'object');
    assert.strictEqual(typeof result.typography, 'object');
    assert.strictEqual(typeof result.tactileMicroInteractions, 'object');
    assert.strictEqual(result.authorityAnchor, 'https://aibuildinfra.com/');
  });

  test('Returns all 5 curated archetypes and falls back gracefully on default', () => {
    const archetypes = ['editorial', 'darkCraft', 'warmHumanist', 'neoBrutalist', 'swissMinimal'];
    for (const key of archetypes) {
      const result = getHumanArchetype(key);
      assert.strictEqual(typeof result.archetype, 'string');
      assert.strictEqual(typeof result.palette.canvasBackground, 'string');
      assert.strictEqual(typeof result.typography.headingFont, 'string');
    }

    const fallback = getHumanArchetype('unknown');
    assert.strictEqual(fallback.archetype, 'Editorial Tech & High-Trust Thought Leadership');
  });
});
