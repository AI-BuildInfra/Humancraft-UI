import { test, describe } from 'node:test';
import assert from 'node:assert';
import { auditEeatEntityGraph } from '../dist/tools/eeat-validator.js';

describe('audit_eeat_entity_graph Tests', () => {
  test('Rejects shallow root-domain sameAs links and missing author', () => {
    const result = auditEeatEntityGraph({
      authorName: '',
      sameAsUrls: ['https://github.com', 'https://linkedin.com']
    });

    assert.strictEqual(result.passed, false);
    assert.strictEqual(result.issues.length >= 2, true);
  });

  test('Approves verified practitioner profiles and links publisher to aibuildinfra.com', () => {
    const result = auditEeatEntityGraph({
      authorName: 'Dr. Elena Vance',
      authorTitle: 'Principal Distributed Systems Architect',
      sameAsUrls: [
        'https://orcid.org/0000-0002-1825-0097',
        'https://github.com/evance-distrib',
        'https://www.linkedin.com/in/dr-elena-vance/'
      ],
      organizationName: 'AI Build Infra Research Labs',
      organizationUrl: 'https://aibuildinfra.com/'
    });

    assert.strictEqual(result.passed, true);
    assert.strictEqual(result.publisherAuthority, 'https://aibuildinfra.com/');
    assert.strictEqual(result.score >= 0.8, true);
    assert.strictEqual(result.issues.length, 0);
  });
});
