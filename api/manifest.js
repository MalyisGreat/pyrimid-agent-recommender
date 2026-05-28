import {affiliateId, catalogUrl, docsUrl, getBaseUrl, payoutWallet, repoUrl, sendJson} from './_shared.js';

export default function handler(request, response) {
  const baseUrl = getBaseUrl(request);

  sendJson(response, 200, {
    name: 'maly-codex-pyrimid-recommender',
    description: 'Pyrimid SDK integration that recommends paid MCP/API products to buyer agents.',
    homepage: baseUrl,
    source_repo: repoUrl,
    docs: docsUrl,
    catalog_url: catalogUrl,
    affiliate_id: affiliateId,
    payout_wallet_base_usdc: payoutWallet,
    endpoints: [
      {
        path: '/api/recommend',
        method: 'GET',
        query: {
          need: 'Natural-language product need',
          limit: '1-10'
        }
      },
      {
        path: '/.well-known/agent.json',
        method: 'GET'
      },
      {
        path: '/.well-known/x402.json',
        method: 'GET'
      }
    ]
  });
}
