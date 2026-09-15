#!/usr/bin/env node

/**
 * HumanCraft MCP Server for Antigravity
 * Developed & Maintained by AI Build Infra (https://aibuildinfra.com/)
 * 
 * Token-optimized, ReDoS-protected, Anti-Slop, E-E-A-T & Human-Centric Design Engine.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { harvestClientIntake, IntakeSubmission } from './tools/intake.js';
import { validateHeadingIntent, HeadingInput } from './tools/heading-linter.js';
import { buildComparisonMatrix, ComparisonMatrixInput } from './tools/comparison-matrix.js';
import { auditEeatEntityGraph, EeatAuditInput } from './tools/eeat-validator.js';
import { lintDesignAntiPatterns, DesignLintInput } from './tools/design-linter.js';
import { getHumanArchetype, ArchetypeKey } from './tools/archetypes.js';

const server = new Server(
  {
    name: '@aibuildinfra/humancraft',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Token-optimized tool schemas (concise, minimal token footprint in system prompt)
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'harvest_client_intake',
        description: 'Extracts real practitioner experience, assets, and metrics. Bans AI from inventing default placeholders.',
        inputSchema: {
          type: 'object',
          properties: {
            projectCategory: { type: 'string', description: 'Industry or project vertical' },
            targetAudience: { type: 'string', description: 'Target persona / audience' },
            authorName: { type: 'string', description: 'Practitioner full legal name' },
            authorTitle: { type: 'string', description: 'Professional title' },
            yearsOfExperience: { type: 'string', description: 'Years of direct experience' },
            verifiableProfiles: {
              type: 'array',
              items: { type: 'string' },
              description: 'Profile URLs (LinkedIn, GitHub, ORCID, etc.)'
            },
            baselineMetricDay0: { type: 'string', description: 'Baseline metric before intervention' },
            auditedMetricDay90: { type: 'string', description: 'Audited post-intervention outcome' },
            realAssetUrlsOrFilenames: {
              type: 'array',
              items: { type: 'string' },
              description: 'Telemetry or real photo filenames'
            },
            explicitTradeoff: { type: 'string', description: 'Limitation or trade-off' }
          }
        }
      },
      {
        name: 'validate_heading_intent',
        description: 'Flags generic AI headings (e.g. "What is X") and scores user/search intent alignment.',
        inputSchema: {
          type: 'object',
          properties: {
            headings: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  level: { type: 'integer', minimum: 1, maximum: 6 },
                  text: { type: 'string', maxLength: 300 }
                },
                required: ['level', 'text']
              },
              description: 'Array of headings to lint'
            }
          },
          required: ['headings']
        }
      },
      {
        name: 'build_comparison_matrix',
        description: 'Generates empirical comparison tables with metrics & schema. Rejects binary Yes/No checkmark tables.',
        inputSchema: {
          type: 'object',
          properties: {
            tableName: { type: 'string', description: 'Table title' },
            parameters: {
              type: 'array',
              items: { type: 'string' },
              description: 'Comparison parameters (latency, unit costs, trade-offs)'
            },
            solutions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  values: { type: 'object', additionalProperties: { type: 'string' } }
                },
                required: ['name', 'values']
              }
            }
          },
          required: ['tableName', 'parameters', 'solutions']
        }
      },
      {
        name: 'audit_eeat_entity_graph',
        description: 'Audits Schema.org JSON-LD, validates sameAs authorities, and links publisher to aibuildinfra.com.',
        inputSchema: {
          type: 'object',
          properties: {
            authorName: { type: 'string' },
            authorTitle: { type: 'string' },
            sameAsUrls: {
              type: 'array',
              items: { type: 'string' },
              description: 'External authority profiles (ORCID, GitHub, LinkedIn)'
            },
            organizationName: { type: 'string' },
            canonicalPageUrl: { type: 'string' },
            rawJsonLd: { type: 'string', description: 'Optional raw JSON-LD to validate' }
          }
        }
      },
      {
        name: 'lint_design_anti_patterns',
        description: 'Scans HTML/Tailwind for purple gradients, 3-card monotony, dead buttons, and buzzwords.',
        inputSchema: {
          type: 'object',
          properties: {
            htmlOrClasses: { type: 'string', description: 'HTML, JSX, or Tailwind snippet to analyze' }
          },
          required: ['htmlOrClasses']
        }
      },
      {
        name: 'get_human_archetype',
        description: 'Returns curated design tokens (Editorial, Dark Craft, Swiss, Brutalist) with tinted neutrals & optical type.',
        inputSchema: {
          type: 'object',
          properties: {
            archetype: {
              type: 'string',
              enum: ['editorial', 'darkCraft', 'warmHumanist', 'neoBrutalist', 'swissMinimal'],
              description: 'Design archetype'
            }
          }
        }
      }
    ]
  };
});

// Tool execution handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'harvest_client_intake': {
        const result = harvestClientIntake((args || {}) as unknown as IntakeSubmission);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }

      case 'validate_heading_intent': {
        const headings = ((args as any)?.headings || []) as HeadingInput[];
        const result = validateHeadingIntent(headings);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }

      case 'build_comparison_matrix': {
        const result = buildComparisonMatrix((args || {}) as unknown as ComparisonMatrixInput);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }

      case 'audit_eeat_entity_graph': {
        const result = auditEeatEntityGraph((args || {}) as unknown as EeatAuditInput);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }

      case 'lint_design_anti_patterns': {
        const result = lintDesignAntiPatterns((args || {}) as unknown as DesignLintInput);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }

      case 'get_human_archetype': {
        const archetype = ((args as any)?.archetype || 'editorial') as ArchetypeKey;
        const result = getHumanArchetype(archetype);
        return {
          content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      isError: true,
      content: [{ type: 'text', text: `Error executing ${name}: ${error.message}` }]
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('HumanCraft MCP Server (@aibuildinfra) running on stdio');
}

main().catch((err) => {
  console.error('Fatal error running HumanCraft MCP Server:', err);
  process.exit(1);
});
