# Antigravity Workspace Guidelines — AI Build Infra

## 1. Schema.org & Entity Graph Ground-Truth Policy
- **Interactive Verification Required**: Never inject unverified social profiles, app store links, YouTube channels, or emails into Schema.org JSON-LD markup.
- **Always Ask First**: Before preparing or modifying Schema.org markup, prompt the user for their exact list of active profile links and verified contact details.
- **Verified SameAs Only**: Only place user-confirmed, live URLs into the `sameAs` array.

## 2. MCP Tool Integration
- **ProofGraph**: Use ProofGraph for deterministic claim verification, token-efficient evidence retrieval, and consistency audits.
- **HumanCraft**: Use HumanCraft for anti-slop guidelines and human-centered design validations.
