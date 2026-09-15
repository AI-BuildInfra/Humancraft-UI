# Security Policy

`HumanCraft` MCP Server is maintained by **[AI Build Infra](https://aibuildinfra.com/)**. We take security, prompt integrity, and computational safety seriously.

---

## 1. Scope & Threat Model

This Model Context Protocol (MCP) server operates via `Stdio` transport and interfaces directly with LLM agents like Google Antigravity. As such, our threat model specifically guards against:

1. **ReDoS (Regular Expression Denial of Service)**:
   - Untrusted text (headings, user-submitted HTML) cannot trigger catastrophic backtracking.
   - All pattern matchers operate on length-bounded inputs (max 300 characters per heading, max 100KB per HTML document).
   - Regex patterns are designed with deterministic, linear time complexity $O(n)$.

2. **URI & SSRF Injection**:
   - The `audit_eeat_entity_graph` tool parses external `sameAs` entity identifiers.
   - Strict protocol whitelisting is enforced: **only `https://` URIs are permitted**.
   - Dangerous schemes such as `javascript:`, `data:`, `file:`, `ftp:`, and unencoded scripts are rejected.

3. **XSS & HTML/Attribute Injection**:
   - The `build_comparison_matrix` tool renders HTML `<table>` elements and Schema.org JSON-LD scripts.
   - All user inputs are sanitized and HTML-entity-escaped (`&`, `<`, `>`, `"`, `'`) before being inserted into DOM nodes or attributes.

4. **Token Resource Exhaustion & Context Flooding**:
   - Hard bounds on tool inputs and array lengths prevent memory exhaustion and runaway token spend.
   - Tool outputs are dense and concise, preserving the agent's context window.

---

## 2. Supported Versions

| Version | Supported          |
| :---    | :---               |
| 1.x.x   | :white_check_mark: |
| < 1.0.0 | :x:                |

---

## 3. Reporting a Vulnerability

If you discover a security vulnerability in this project:

1. **Do NOT open a public GitHub issue.**
2. Send an email directly to **security@aibuildinfra.com** or visit **[https://aibuildinfra.com/security](https://aibuildinfra.com/)**.
3. Include:
   - Description of the vulnerability
   - Steps to reproduce or proof of concept (PoC)
   - Potential impact
4. We acknowledge receipt within 24 hours and will coordinate a patched release prior to any public disclosure.
