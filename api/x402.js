import {affiliateId, catalogUrl, getBaseUrl, payoutWallet, repoUrl, sendJson} from './_shared.js';

export default function handler(request, response) {
  const baseUrl = getBaseUrl(request);

  sendJson(response, 200, {
    service: 'Maly Codex Pyrimid Recommender',
    role: 'discovery-only affiliate recommender',
    x402: {
      network: 'base',
      asset: 'USDC',
      catalog_url: catalogUrl,
      payment_behavior: 'Recommended product endpoints return HTTP 402 until a buyer provides valid x402 payment proof.',
      purchase_header: {'X-Affiliate-ID': affiliateId}
    },
    affiliate: {
      id: affiliateId,
      payout_wallet_base_usdc: payoutWallet
    },
    proof: {
      recommend_endpoint: `${baseUrl}/api/recommend?need=paid%20mcp%20tool&limit=3`,
      source_repo: repoUrl
    }
  });
}
