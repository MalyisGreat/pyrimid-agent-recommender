import {affiliateId, catalogUrl, payoutWallet, sendJson} from './_shared.js';

export default function handler(request, response) {
  sendJson(response, 200, {
    ok: true,
    service: 'Maly Codex Pyrimid Recommender',
    sdk: '@pyrimid/sdk',
    catalog_url: catalogUrl,
    affiliate_id: affiliateId,
    payout_wallet_base_usdc: payoutWallet
  });
}
