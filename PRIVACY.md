# Privacy Policy

**Effective Date:** September 18, 2026  
**Project:** HumanCraft MCP Server (`@aibuildinfra/humancraft`)  
**Maintainer:** [AI Build Infra](https://aibuildinfra.com/)

---

## 1. Overview
HumanCraft UI is an open-source Model Context Protocol (MCP) server engineered for **Google Antigravity** and MCP-compatible AI clients. This Privacy Policy details our strict commitment to data privacy, local execution, and security.

---

## 2. Zero Data Collection
* **Local Stdio Execution**: HumanCraft UI runs entirely on your local machine using standard input/output (`stdio`).
* **No Telemetry or Tracking**: The server does not collect, track, or transmit usage metrics, analytics, IP addresses, or device identifiers.
* **No Remote Storage**: Your prompts, heading texts, design code, and practitioner credentials processed through the tools are never stored, logged, or sent to external servers.

---

## 3. Tool Processing & Data Handling
All 6 tools (`harvest_client_intake`, `validate_heading_intent`, `build_comparison_matrix`, `audit_eeat_entity_graph`, `lint_design_anti_patterns`, `get_human_archetype`) execute **in-memory** on your host device:
* Data is processed synchronously and discarded when the tool execution finishes.
* No external API calls are made during tool execution.

---

## 4. Third-Party Services
HumanCraft UI does not integrate with or transmit data to any third-party marketing, advertising, or data brokerage platforms.

---

## 5. Security & Threat Model
* **ReDoS Hardening**: Pattern matching runs on bounded substrings ($<10\text{ ms}$).
* **Protocol Safety**: Strict HTTPS URL validation for entity graphs.
* **XSS Sanitization**: HTML entity escaping on dynamic table and markup outputs.

---

## 6. Contact & Inquiries
For questions regarding this policy or the HumanCraft MCP Server, contact:
* **Website**: [https://aibuildinfra.com/](https://aibuildinfra.com/)
* **GitHub Issues**: [https://github.com/Shree-varshan-430/Humancraft-UI/issues](https://github.com/Shree-varshan-430/Humancraft-UI/issues)
