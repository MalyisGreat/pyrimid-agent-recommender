import {
  affiliateId,
  catalogUrl,
  docsUrl,
  getBaseUrl,
  getRecommendations,
  payoutWallet,
  repoUrl,
  sendJson,
  withCors
} from './_shared.js';

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    withCors(response);
    response.status(204).end();
    return;
  }

  if (request.method !== 'GET') {
    sendJson(response, 405, {error: 'Method not allowed'});
    return;
  }

  const baseUrl = getBaseUrl(request);
  const need = typeof request.query.need === 'string' && request.query.need.trim()
    ? request.query.need.trim()
    : 'paid mcp tool';
  const limit = Math.min(Math.max(Number.parseInt(request.query.limit || '3', 10) || 3, 1), 10);

  try {
    const {products} = await getRecommendations(need, limit);

    sendJson(response, 200, {
      service: 'Maly Codex Pyrimid Recommender',
      purpose: 'Recommend paid MCP/API products from Pyrimid catalog using @pyrimid/sdk with affiliate attribution.',
      query: {need, limit},
      integration: {
        sdk: '@pyrimid/sdk',
        sdk_version: '0.2.6',
        integration_path: 'embedded PyrimidResolver',
        sdk_methods_used: ['new PyrimidResolver', 'findProducts', 'getCatalog fallback'],
        catalog_url: catalogUrl,
        affiliate_id: affiliateId,
        payout_wallet_base_usdc: payoutWallet,
        source_repo: repoUrl,
        docs: docsUrl
      },
      affiliate: {
        id: affiliateId,
        payout_wallet_base_usdc: payoutWallet,
        purchase_header: {'X-Affiliate-ID': affiliateId}
      },
      safety: {
        custody: 'No private keys, seed phrases, or buyer credentials are requested, stored, or transmitted.',
        spending: 'This endpoint only discovers and recommends products. A buyer agent must pay from its own wallet runtime.',
        payment_state: 'No payment is made by this service.'
      },
      agent_metadata: `${baseUrl}/.well-known/agent.json`,
      x402_metadata: `${baseUrl}/.well-known/x402.json`,
      recommendations: products
    });
  } catch (error) {
    sendJson(response, 502, {
      error: 'Pyrimid recommendation failed',
      message: error instanceof Error ? error.message : String(error),
      integration: {
        sdk: '@pyrimid/sdk',
        catalog_url: catalogUrl,
        affiliate_id: affiliateId
      }
    });
  }
}
