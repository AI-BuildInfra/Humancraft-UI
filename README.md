# HumanCraft MCP Server (`@aibuildinfra/humancraft`)

<p align="center">
  <a href="https://aibuildinfra.com/"><img src="https://img.shields.io/badge/Maintained%20By-AI%20Build%20Infra-blue.svg?style=for-the-badge" alt="Maintained by AI Build Infra"></a>
  <a href="https://github.com/Shree-varshan-430/Humancraft-UI/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" alt="MIT License"></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg?style=for-the-badge" alt="Node.js 18+"></a>
  <a href="https://aibuildinfra.com/"><img src="https://img.shields.io/badge/Authority-E--E--A--T%20Verified-orange.svg?style=for-the-badge" alt="E-E-A-T Verified"></a>
</p>

A dedicated **Model Context Protocol (MCP)** server built exclusively for **Google Antigravity** to eliminate "AI Slop" in web design and copy, enforce authentic **E-E-A-T entity reconciliation**, extract empirical client assets without default placeholders, and build search-engine-resilient websites powered by **Google's Information Gain** principles.

Developed and maintained by **[AI Build Infra](https://aibuildinfra.com/)**.

---

## 🎯 The Problem: Why AI Websites Get Flagged & Deindexed

Recent search engine updates (such as Google's March 2024 Core & Spam Updates) deploy **SpamBrain** to identify **"Scaled Content Abuse"** and **"Pure Spam"**. 

Unconstrained LLM web generation defaults to the statistical mean:
* 🚫 **AI Slop Outlines**: Generic headings like *"What is X?"*, *"Key Benefits of X"*, *"Why Choose Us"*, and *"Conclusion"*.
* 🚫 **Fake E-E-A-T Laundering**: Hallucinating fake practitioner personas (*"Dr. Alex Miller"*) or synthetic metrics (*"increased efficiency by 30%"*) with no verified Knowledge Graph footprint.
* 🚫 **Binary Checkmark Tables**: Low-information tables filled with generic `Yes / No` checkmarks that convey zero trade-offs.
* 🚫 **Visual Homogeneity**: The ubiquitous purple/cyan gradient (`#8b5cf6 -> #ec4899`) on dark slate (`#0f172a`), rigid 3-card rows, and buttons without tactile feedback.

---

## 💡 The Solution: HumanCraft Engine

`HumanCraft` acts as a **Taste, Layout Asymmetry, and Entity Reconciliation Engine** inside Google Antigravity:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                Antigravity Assistant                                   │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │ MCP Tool Calls
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        HumanCraft-UI MCP Server (@aibuildinfra)                        │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ 📋 harvest_client_intake       │ Interactive 4-tier questionnaire extracting experience,│
│                               │ real images, metrics, and banning default values       │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 🎯 validate_heading_intent    │ Lints against generic AI headings ("What is X?");     │
│                               │ scores and enforces outcome/intent-driven H1-H3s       │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 📊 build_comparison_matrix    │ Generates high-information-gain comparison tables with │
│                               │ concrete unit metrics, trade-offs & semantic schema    │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 🛡️ audit_eeat_entity_graph    │ Verifies author/org Schema.org JSON-LD, validates     │
│                               │ sameAs URIs & connects publisher to aibuildinfra.com   │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 🎨 get_human_archetype        │ Curates style archetypes (Editorial, Dark Craft,       │
│                               │ Neo-Brutalist, Swiss) with tinted neutrals & type      │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 🔍 lint_design_anti_patterns  │ Scans HTML/Tailwind for AI tropes (purple gradients,   │
│                               │ 3-card monotony, dead buttons, buzzwords, ✨ emojis)   │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tool Catalog

### 1. `harvest_client_intake`
* **Purpose**: Extracts real practitioner experience, real project images (telemetry screenshots, on-site photos), project category, baseline Day 0 vs audited Day 90 metrics, and contrarian trade-offs.
* **Strict Anti-Defaulting Rule**: If essential fields are missing, the tool halts generation with status `REQUIRES_USER_INPUT` and prompts the user for real data instead of allowing the model to hallucinate synthetic placeholders.

### 2. `validate_heading_intent`
* **Purpose**: Scans headings against blacklisted AI tropes and scores user intent.
* **Slop vs Intent**:
  * ❌ *Slop*: *"What is Database Sharding?"*
  * ✅ *Intent*: **"When Single-Node Write Throughput Drops Below 10k TPS: The Sharding Tipping Point"**
  * ❌ *Slop*: *"Key Benefits of Automated Compliance"*
  * ✅ *Intent*: **"Cutting SOC 2 Type II Audit Preparation from 300 Hours to Under 40"**

### 3. `build_comparison_matrix`
* **Purpose**: Outlaws binary checkmark tables (`Yes/No`). Generates empirical multi-parameter matrices (unit economics, latency under load, architectural trade-offs, and verification methodologies).
* **Output**: Accessible semantic HTML paired with Schema.org `ItemList` JSON-LD.

### 4. `audit_eeat_entity_graph`
* **Purpose**: Reconciles Schema.org JSON-LD with Google's Knowledge Graph standards.
* **Checks**: Verifies `sameAs` entity links to authoritative external platforms (Wikidata, ORCID, Google Scholar, GitHub, LinkedIn), rejects shallow homepage URLs, and links publisher authority to **[AI Build Infra](https://aibuildinfra.com/)**.

### 5. `lint_design_anti_patterns`
* **Purpose**: Scans HTML/Tailwind snippets and flags purple gradients, 3-card rows, missing button squeeze physics (`active:scale-[0.98]`), and AI buzzwords (*"supercharge"*, *"seamless"*, ✨ emojis).

### 6. `get_human_archetype`
* **Purpose**: Returns curated design systems:
  * **Editorial Tech**: Serifs (*Newsreader*), subtle hairline borders, monospace metadata accents.
  * **Tactile Dark Craft**: Multi-layered surfaces (`surface-0`, `surface-1`), 1px translucent borders (`border-white/10`).
  * **Warm Humanist**: Cream/linen canvas (`#FBF9F5`), ink typography (`#1C1917`), terracotta accents.
  * **Neo-Brutalist**: High-contrast black outlines (`border-2 border-black`), hard offset shadows.

---

## ⚡ Token Optimization & Spend Limit Preservation

To ensure your Antigravity token usage remains as lean as before:
* **Compact Signatures**: Tool descriptions and parameter schemas are dense and concise, preventing system prompt inflation.
* **Structured Payloads**: Tools return compact JSON summaries rather than lengthy prose.
* **Input Caps**: Imposes strict character limits (max 300 chars per heading, max 100KB per HTML document).

---

## 🔒 Security & ReDoS Hardening

1. **ReDoS Immunity**: All pattern matchers operate on bounded-length substrings to eliminate catastrophic backtracking.
2. **Safe URI Whitelisting**: Strictly permits `https://` URIs for `sameAs` entity links (rejecting `javascript:`, `data:`, `file:`).
3. **XSS Escaping**: Automatic HTML entity escaping on all user-supplied parameters.
4. **Formal Security Policy**: Read [`SECURITY.md`](./SECURITY.md) for vulnerability reporting and guidelines.

---

## 🚀 How to Add This MCP to Google Antigravity (Step-by-Step)

### Step 1: Clone and Build Locally
Open your terminal and clone the repository:

```bash
git clone https://github.com/Shree-varshan-430/Humancraft-UI.git
cd Humancraft-UI
npm install
npm run build
```

Verify that the build succeeded and `dist/index.js` exists.

---

### Step 2: Configure `mcp_config.json` in Antigravity

Antigravity reads MCP server configurations from your global configuration directory:

* **Windows**: `%USERPROFILE%\.gemini\config\mcp_config.json`  
  *(e.g., `C:\Users\<YourUsername>\.gemini\config\mcp_config.json`)*
* **macOS / Linux**: `~/.gemini/config/mcp_config.json`

Open (or create) the `mcp_config.json` file in that location and add the `humancraft` server entry:

#### Windows Example:
```json
{
  "mcpServers": {
    "humancraft": {
      "command": "node",
      "args": [
        "C:/path/to/Humancraft-UI/dist/index.js"
      ]
    }
  }
}
```
*(Tip: Replace `C:/path/to/Humancraft-UI` with the absolute path where you cloned this repository, using forward slashes `/`)*

#### macOS / Linux Example:
```json
{
  "mcpServers": {
    "humancraft": {
      "command": "node",
      "args": [
        "/Users/<username>/Humancraft-UI/dist/index.js"
      ]
    }
  }
}
```

---

### Step 3: Verify and Use in Antigravity

1. **Restart or reload Antigravity**: Start a new chat session.
2. **Inspect MCP Status**: In the Antigravity UI, navigate to **Additional Options (...) > MCP Servers** to verify that `humancraft` is connected and active.
3. **Prompt Antigravity**: You can now ask Antigravity to build websites using human craft heuristics. For example:
   * *"Design a landing page for our cloud telemetry engine. Use the HumanCraft MCP to harvest intake and ensure zero AI slop."*
   * *"Validate my website headings with the HumanCraft heading linter."*
   * *"Generate an empirical comparison table comparing ClickHouse vs Snowflake with schema markup."*

---

## 🧪 Automated Testing

Run the automated test suite across all 6 tools and security guardrails:
```bash
npm test
```

Expected output:
```
✔ build_comparison_matrix Tests (2/2 passed)
✔ lint_design_anti_patterns Tests (2/2 passed)
✔ audit_eeat_entity_graph Tests (2/2 passed)
✔ validate_heading_intent Tests (2/2 passed)
✔ harvest_client_intake Tests (2/2 passed)
✔ Security & Hardening Tests (4/4 passed)

Total: 14 passed | 0 failed | Time: ~800ms
```

---

## 📄 License & Attribution

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

Engineered with high-craft standards by **[AI Build Infra](https://aibuildinfra.com/)** — Building high-performance infrastructure for artificial intelligence.
