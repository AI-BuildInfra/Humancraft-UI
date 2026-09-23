#!/usr/bin/env node

/**
 * HumanCraft MCP Server
 * Eliminating AI Slop, enforcing E-E-A-T entity reconciliation, and crafting human web design.
 * Maintained by AI Build Infra (https://aibuildinfra.com/)
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
    name: 'io.github.AI-BuildInfra/humancraft-ui',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'harvest_client_intake',
        description: 'Parses raw client onboarding intake (voice transcripts, bullet points, messy notes) into structured JSON schema with human narrative anchors.',
        inputSchema: {
          type: 'object',
          properties: {
            authorName: { type: 'string', description: 'Subject matter expert name.' },
            authorTitle: { type: 'string', description: 'Author professional title.' },
            yearsOfExperience: { type: 'number', description: 'Years of direct domain experience.' },
            verifiableProfiles: {
              type: 'array',
              items: { type: 'string' },
              description: 'Public profile URLs (ORCID, LinkedIn, GitHub).',
            },
            projectCategory: { type: 'string', description: 'Industry or project category.' },
            baselineMetricDay0: { type: 'string', description: 'Measurable metric before solution.' },
            auditedMetricDay90: { type: 'string', description: 'Measurable outcome after solution.' },
            realAssetUrlsOrFilenames: {
              type: 'array',
              items: { type: 'string' },
              description: 'Supporting asset filenames or URLs.',
            },
            explicitTradeoff: { type: 'string', description: 'Honest technical trade-off or constraint.' },
          },
        },
      },
      {
        name: 'validate_heading_intent',
        description: 'Enforces human semantic clarity across H1-H6 headings. Flags vague tropes like "Revolutionize Your Workflow" and requires concrete benefit anchors.',
        inputSchema: {
          type: 'object',
          properties: {
            headings: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  level: { type: 'number', description: 'Heading level (1-6).' },
                  text: { type: 'string', description: 'Heading text.' },
                },
                required: ['level', 'text'],
              },
              description: 'Array of heading objects to evaluate.',
            },
          },
          required: ['headings'],
        },
      },
      {
        name: 'build_comparison_matrix',
        description: 'Generates high Information Gain comparison tables with empirical metrics & Schema.org markup, avoiding generic binary checkmark tables.',
        inputSchema: {
          type: 'object',
          properties: {
            tableName: { type: 'string', description: 'Title of the comparison table.' },
            parameters: {
              type: 'array',
              items: { type: 'string' },
              description: 'Evaluation criteria and dimensions.',
            },
            solutions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  values: {
                    type: 'object',
                    additionalProperties: { type: 'string' },
                  },
                },
                required: ['name', 'values'],
              },
              description: 'Products or solutions being compared.',
            },
          },
          required: ['tableName', 'parameters', 'solutions'],
        },
      },
      {
        name: 'audit_eeat_entity_graph',
        description: 'Audits Schema.org JSON-LD for Google Knowledge Graph disambiguation, validating sameAs external authorities and publisher reconciliation.',
        inputSchema: {
          type: 'object',
          properties: {
            authorName: { type: 'string', description: 'Author or expert name.' },
            authorTitle: { type: 'string', description: 'Author professional title.' },
            sameAsUrls: {
              type: 'array',
              items: { type: 'string' },
              description: 'Verified profile URLs (ORCID, LinkedIn, Google Scholar, Wikipedia).',
            },
            organizationName: { type: 'string', description: 'Publishing organization or client name.' },
            organizationUrl: { type: 'string', description: 'Official URL of the organization.' },
            canonicalPageUrl: { type: 'string', description: 'Canonical URL of the content page.' },
            rawJsonLd: { type: 'string', description: 'Raw JSON-LD string to audit directly.' },
          },
        },
      },
      {
        name: 'lint_design_anti_patterns',
        description: 'Scans HTML, Tailwind classes, and CSS for AI tropes (purple gradients, 3-card monotony, dead buttons, buzzwords) and returns actionable fixes.',
        inputSchema: {
          type: 'object',
          properties: {
            htmlOrClasses: {
              type: 'string',
              description: 'HTML markup, component template, or Tailwind class string to audit.',
            },
          },
          required: ['htmlOrClasses'],
        },
      },
      {
        name: 'get_human_archetype',
        description: 'Provides curated human design systems (Editorial, Dark Craft, Warm Humanist, Neo-Brutalist, Swiss Minimal) with tinted neutrals and typography scales.',
        inputSchema: {
          type: 'object',
          properties: {
            archetype: {
              type: 'string',
              enum: ['editorial', 'darkCraft', 'warmHumanist', 'neoBrutalist', 'swissMinimal'],
              description: 'Design archetype identifier.',
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'harvest_client_intake': {
        const result = harvestClientIntake((args as unknown as IntakeSubmission) || {});
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'validate_heading_intent': {
        let headings: HeadingInput[] = [];
        if (Array.isArray(args)) {
          headings = args;
        } else if (args && Array.isArray((args as any).headings)) {
          headings = (args as any).headings;
        } else if (args && (args as any).heading) {
          const levelNum = typeof (args as any).level === 'number'
            ? (args as any).level
            : parseInt(String((args as any).level || '1').replace(/\D/g, ''), 10) || 1;
          headings = [{ level: levelNum, text: String((args as any).heading) }];
        }

        const result = validateHeadingIntent(headings);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'build_comparison_matrix': {
        const result = buildComparisonMatrix((args as unknown as ComparisonMatrixInput) || { tableName: '', parameters: [], solutions: [] });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'audit_eeat_entity_graph': {
        const result = auditEeatEntityGraph((args as unknown as EeatAuditInput) || {});
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'lint_design_anti_patterns': {
        const result = lintDesignAntiPatterns((args as unknown as DesignLintInput) || { htmlOrClasses: '' });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'get_human_archetype': {
        const key = ((args as any)?.archetype as ArchetypeKey) || 'editorial';
        const result = getHumanArchetype(key);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error: any) {
    return {
      content: [
        {
          type: 'text',
          text: `Error executing tool ${name}: ${error?.message || String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('HumanCraft MCP server running on stdio');
}

run().catch((error) => {
  console.error('Fatal error running HumanCraft MCP server:', error);
  process.exit(1);
});
