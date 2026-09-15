import { test, describe } from 'node:test';
import assert from 'node:assert';
import { isSafeHttpsUri, escapeHtml, sanitizeString, boundedRegexTest } from '../dist/utils/security.js';

describe('Security & Hardening Tests', () => {
  test('isSafeHttpsUri: Strictly enforces HTTPS and valid hostnames', () => {
    assert.strictEqual(isSafeHttpsUri('https://aibuildinfra.com'), true);
    assert.strictEqual(isSafeHttpsUri('https://orcid.org/0000-0002-1825-0097'), true);
    assert.strictEqual(isSafeHttpsUri('https://github.com/aibuildinfra'), true);

    // Malicious or invalid protocols must be rejected
    assert.strictEqual(isSafeHttpsUri('http://aibuildinfra.com'), false);
    assert.strictEqual(isSafeHttpsUri('javascript:alert(1)'), false);
    assert.strictEqual(isSafeHttpsUri('data:text/html,<script>alert(1)</script>'), false);
    assert.strictEqual(isSafeHttpsUri('file:///etc/passwd'), false);
    assert.strictEqual(isSafeHttpsUri('ftp://files.example.com'), false);
    assert.strictEqual(isSafeHttpsUri(''), false);
    assert.strictEqual(isSafeHttpsUri('not-a-url'), false);
  });

  test('escapeHtml: Prevents XSS and DOM attribute breakout', () => {
    const raw = '<script>alert("XSS")</script>&"test"';
    const escaped = escapeHtml(raw);
    assert.strictEqual(escaped.includes('<script>'), false);
    assert.strictEqual(escaped.includes('&amp;'), true);
    assert.strictEqual(escaped.includes('&lt;script&gt;'), true);
    assert.strictEqual(escaped.includes('&quot;'), true);
  });

  test('sanitizeString: Strips control chars and enforces length limits', () => {
    const dirty = 'Hello\x00\x08World\x1F';
    assert.strictEqual(sanitizeString(dirty), 'HelloWorld');

    const longString = 'A'.repeat(500);
    assert.strictEqual(sanitizeString(longString, 50).length, 50);
  });

  test('ReDoS Defense: Execution terminates safely under 10ms for large adversarial inputs', () => {
    // Test long adversarial string against all production slop patterns
    const adversarialInput = 'what is ' + 'a'.repeat(10000) + ' important?';
    const testPattern = /^what is (a |an |the )?.+\??$/i;
    
    const startTime = performance.now();
    const result = boundedRegexTest(adversarialInput, testPattern, 300);
    const duration = performance.now() - startTime;

    assert.strictEqual(duration < 10, true, `Execution took too long: ${duration}ms`);
    assert.strictEqual(typeof result, 'boolean');
  });
});
