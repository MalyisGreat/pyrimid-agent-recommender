import {affiliateId, catalogUrl, getBaseUrl, payoutWallet, repoUrl, withCors} from './_shared.js';

export default function handler(request, response) {
  const baseUrl = getBaseUrl(request);
  withCors(response);
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.status(200).send(`# Maly Codex Pyrimid Recommender

This is a public agent integration for Pyrimid. It uses @pyrimid/sdk and PyrimidResolver to find paid MCP/API products from ${catalogUrl}.

Use:
\`\`\`
GET ${baseUrl}/api/recommend?need=paid%20mcp%20tool&limit=3
\`\`\`

The response includes product endpoint, price, expected HTTP 402 behavior, split preview, and the affiliate purchase header:
\`\`\`
X-Affiliate-ID: ${affiliateId}
\`\`\`

Payout wallet for accepted MYA/Pyrimid bounty work:
\`\`\`
${payoutWallet}
\`\`\`

Source code: ${repoUrl}
`);
}
