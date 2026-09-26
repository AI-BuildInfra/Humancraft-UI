---
trigger: always_on
description: Mandatory ground-truth link and email verification protocol for Schema.org and Knowledge Graphs
---

# Ground-Truth Entity & Schema.org Verification Protocol

Whenever generating, optimizing, or editing **Schema.org JSON-LD**, **E-E-A-T entity graphs**, or **Organization metadata**:

## 1. Zero-Assumption Rule (Strict Anti-Hallucination)
- **NEVER assume or hallucinate** social media links, store links (Play Store / App Store), YouTube channels, Crunchbase profiles, or contact email addresses.
- **NEVER use generic placeholder templates** (e.g. `contact@`, `youtube.com/@...`, `facebook.com/...`) without explicit confirmation from the user.

## 2. Mandatory Interactive Intake
Before writing or proposing Schema.org markup:
1. **Ask the User Directly**: Prompt the user to provide their active, exact profile URLs and official email.
2. **Collect Active Accounts Only**:
   - GitHub organization / repository URLs
   - Registry profiles (npm, MCP Registry, Glama, M8ven, PyPI)
   - Accreditation & Directory profiles (DesignRush, Clutch, Crunchbase)
   - Verified active social profiles
3. **Verify Each URL**:
   - Check URL formatting and domain validity.
   - Disallow non-existent links to prevent Google Knowledge Graph and AI search engine penalties.

## 3. Strict Verification Output
Only properties verified by the user or existing in active codebase configurations shall be rendered into `<script type="application/ld+json">`.
