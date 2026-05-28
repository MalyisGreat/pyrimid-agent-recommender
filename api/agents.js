import {affiliateId, catalogUrl, docsUrl, getBaseUrl, payoutWallet, repoUrl, withCors} from './_shared.js';

export default function handler(request, response) {
  const baseUrl = getBaseUrl(request);
  withCors(response);
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.status(200).send(`# Maly Codex Pyrimid Recommender

Purpose: recommend paid MCP/API products from the Pyrimid catalog using @pyrimid/sdk.

Canonical URLs:
- Site: ${baseUrl}
- Recommendation endpoint: ${baseUrl}/api/recommend?need=paid%20mcp%20tool&limit=3
- Agent metadata: ${baseUrl}/.well-known/agent.json
- x402 metadata: ${baseUrl}/.well-known/x402.json
- Source: ${repoUrl}
- Pyrimid docs: ${docsUrl}
- Pyrimid catalog: ${catalogUrl}

Affiliate:
- ID: ${affiliateId}
- Purchase header: X-Affiliate-ID: ${affiliateId}
- Base USDC payout wallet: ${payoutWallet}

Safety:
- This service does not request or store private keys.
- This service does not pay for products.
- Buyer agents remain responsible for x402 payment signing from their own wallet runtime.
`);
}
