import {affiliateId, catalogUrl, docsUrl, getBaseUrl, payoutWallet, repoUrl, sendJson} from './_shared.js';

export default function handler(request, response) {
  const baseUrl = getBaseUrl(request);

  sendJson(response, 200, {
    name: 'Maly Codex Pyrimid Recommender',
    description: 'Agent-facing recommender that uses @pyrimid/sdk to find paid MCP/API products in the Pyrimid catalog.',
    url: baseUrl,
    source_repo: repoUrl,
    payout_wallet_base_usdc: payoutWallet,
    integrations: [
      {
        name: 'Pyrimid',
        sdk: '@pyrimid/sdk',
        catalog_url: catalogUrl,
        docs: docsUrl,
        affiliate_id: affiliateId
      }
    ],
    endpoints: {
      recommend: `${baseUrl}/api/recommend?need=paid%20mcp%20tool&limit=3`,
      health: `${baseUrl}/api/health`,
      manifest: `${baseUrl}/manifest`,
      x402: `${baseUrl}/.well-known/x402.json`
    },
    capabilities: [
      'paid product discovery',
      'x402 payment preview metadata',
      'affiliate-attributed purchase headers',
      'Base USDC payout metadata'
    ],
    safety: {
      custody: 'non-custodial recommender only',
      private_keys: 'never requested',
      payments: 'buyer agents pay from their own wallet runtime'
    }
  });
}
