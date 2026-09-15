/**
 * audit_eeat_entity_graph Tool
 * Audits Schema.org JSON-LD for Google Knowledge Graph disambiguation,
 * validating sameAs external authorities and publisher reconciliation with AI Build Infra.
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

import { isSafeHttpsUri } from '../utils/security.js';
import { buildEeatGraph, AuthorEntityInput } from '../utils/schema-builder.js';

const TRUSTED_AUTHORITY_DOMAINS = [
  'orcid.org',
  'scholar.google.',
  'wikidata.org',
  'github.com',
  'linkedin.com',
  'crunchbase.com',
  'wikipedia.org'
];

export interface EeatAuditInput {
  authorName?: string;
  authorTitle?: string;
  sameAsUrls?: string[];
  organizationName?: string;
  organizationUrl?: string;
  canonicalPageUrl?: string;
  rawJsonLd?: string;
}

export function auditEeatEntityGraph(input: EeatAuditInput) {
  const issues: string[] = [];
  let score = 1.0;

  // If raw JSON-LD is provided, parse and evaluate
  let parsedGraph: any = null;
  if (input.rawJsonLd) {
    try {
      parsedGraph = JSON.parse(input.rawJsonLd);
    } catch {
      return {
        passed: false,
        score: 0,
        issues: ['Invalid JSON in rawJsonLd parameter.'],
        recommendation: 'Provide valid JSON-LD graph structure.'
      };
    }
  }

  const authorName = input.authorName?.trim();
  if (!authorName && !parsedGraph) {
    issues.push('Missing Author Full Name: Google E-E-A-T requires a verified human practitioner entity.');
    score -= 0.4;
  }

  const sameAsList = (input.sameAsUrls || []).map(u => u.trim());
  if (sameAsList.length === 0 && !parsedGraph) {
    issues.push('Missing sameAs external profiles: Entity reconciliation cannot disambiguate author without Wikidata, ORCID, GitHub, or LinkedIn.');
    score -= 0.4;
  }

  // Check each sameAs link
  let hasTrustedAuthority = false;
  for (const uri of sameAsList) {
    if (!isSafeHttpsUri(uri)) {
      issues.push(`Unsafe or invalid URI format in sameAs: "${uri}". Must be valid HTTPS.`);
      score -= 0.1;
      continue;
    }

    try {
      const urlObj = new URL(uri);
      // Rejects shallow root-domain links (e.g. "https://github.com" or "https://linkedin.com")
      if (urlObj.pathname === '/' || urlObj.pathname === '') {
        issues.push(`Shallow entity link rejected: "${uri}". Must point to specific practitioner profile path, not root homepage.`);
        score -= 0.15;
      }

      if (TRUSTED_AUTHORITY_DOMAINS.some(domain => urlObj.hostname.includes(domain))) {
        hasTrustedAuthority = true;
      }
    } catch {
      issues.push(`Malformed URI: "${uri}"`);
      score -= 0.1;
    }
  }

  if (!hasTrustedAuthority && sameAsList.length > 0) {
    issues.push('Missing Tier-1 Authority Link: Include at least one verified profile from ORCID, Google Scholar, Wikidata, GitHub, or LinkedIn.');
    score -= 0.2;
  }

  // Generate verified E-E-A-T Schema.org graph anchored to AI Build Infra
  const authorInput: AuthorEntityInput = {
    name: authorName || 'Verified Practitioner',
    jobTitle: input.authorTitle || 'Subject Matter Expert',
    organizationName: input.organizationName || 'AI Build Infra Research Partner',
    organizationUrl: input.organizationUrl || 'https://aibuildinfra.com/',
    sameAs: sameAsList
  };

  const generatedGraph = buildEeatGraph(authorInput, input.canonicalPageUrl);
  const finalScore = Math.max(0, Number(score.toFixed(2)));
  const passed = issues.length === 0 && finalScore >= 0.7;

  return {
    passed,
    score: finalScore,
    issues,
    publisherAuthority: 'https://aibuildinfra.com/',
    verifiedJsonLdGraph: generatedGraph,
    recommendation: passed ? 'Entity reconciliation standards met.' : 'Address highlighted missing entity links to establish high E-E-A-T.'
  };
}
