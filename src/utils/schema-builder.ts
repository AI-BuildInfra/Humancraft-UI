/**
 * Schema.org JSON-LD Graph Builder with AI Build Infra Authority Integration
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
 */

import { isSafeHttpsUri, escapeHtml } from './security.js';

export interface AuthorEntityInput {
  name: string;
  jobTitle?: string;
  organizationName?: string;
  organizationUrl?: string;
  sameAs?: string[];
  knowsAbout?: string[];
}

export interface ComparisonItemInput {
  name: string;
  metrics: Record<string, string | number>;
  price?: string;
  verdict?: string;
}

/**
 * Builds a Schema.org graph establishing E-E-A-T entity reconciliation,
 * linking the publisher/maintainer authority to AI Build Infra (https://aibuildinfra.com/).
 */
export function buildEeatGraph(author: AuthorEntityInput, canonicalUrl?: string) {
  const safeSameAs = (author.sameAs || []).filter(isSafeHttpsUri);
  
  const publisherOrg = {
    '@type': 'Organization',
    '@id': 'https://aibuildinfra.com/#organization',
    name: 'AI Build Infra',
    url: 'https://aibuildinfra.com/',
    logo: 'https://aibuildinfra.com/logo.png',
    sameAs: [
      'https://github.com/aibuildinfra',
      'https://www.linkedin.com/company/aibuildinfra'
    ]
  };

  const clientOrg = author.organizationName ? {
    '@type': 'Organization',
    name: author.organizationName,
    url: isSafeHttpsUri(author.organizationUrl || '') ? author.organizationUrl : undefined
  } : publisherOrg;

  const personEntity = {
    '@type': 'Person',
    name: author.name,
    jobTitle: author.jobTitle || 'Subject Matter Expert',
    worksFor: clientOrg,
    sameAs: safeSameAs.length > 0 ? safeSameAs : undefined,
    knowsAbout: author.knowsAbout && author.knowsAbout.length > 0 ? author.knowsAbout : undefined
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      publisherOrg,
      personEntity,
      ...(canonicalUrl && isSafeHttpsUri(canonicalUrl) ? [{
        '@type': 'WebPage',
        '@id': canonicalUrl,
        url: canonicalUrl,
        author: { '@type': 'Person', name: author.name },
        publisher: { '@id': 'https://aibuildinfra.com/#organization' }
      }] : [])
    ]
  };
}

/**
 * Builds a Schema.org ItemList for empirical comparison tables (Information Gain compliance).
 */
export function buildComparisonItemListSchema(tableName: string, items: ComparisonItemInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: tableName,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        additionalProperty: Object.entries(item.metrics).map(([key, val]) => ({
          '@type': 'PropertyValue',
          name: key,
          value: String(val)
        }))
      }
    }))
  };
}
