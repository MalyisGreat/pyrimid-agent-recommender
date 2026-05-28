import {PyrimidResolver} from '@pyrimid/sdk/resolver';

export const affiliateId = 'maly-codex-agent';
export const payoutWallet = '0x85FDDaCFB64b6486094B45bA9a235e674a590497';
export const catalogUrl = 'https://pyrimid.ai/api/v1/catalog';
export const docsUrl = 'https://pyrimid.ai/quickstart';
export const repoUrl = 'https://github.com/MalyisGreat/pyrimid-agent-recommender';

export function getBaseUrl(request) {
  const host = request.headers['x-forwarded-host'] || request.headers.host || 'localhost:3000';
  const proto = request.headers['x-forwarded-proto'] || (host.includes('localhost') ? 'http' : 'https');
  return `${proto}://${host}`;
}

export function withCors(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function createResolver() {
  return new PyrimidResolver({
    affiliateId,
    catalogUrl,
    cacheTtlMs: 60_000,
    preferVerifiedVendors: true,
    maxPriceUsdc: 10_000_000
  });
}

export function formatUsdc(atomicUsdc) {
  return `$${(Number(atomicUsdc || 0) / 1_000_000).toFixed(2)}`;
}

export function productToRecommendation(product) {
  const protocolFee = Math.floor(product.price_usdc / 100);
  const remaining = product.price_usdc - protocolFee;
  const affiliateEarned = Math.floor((remaining * product.affiliate_bps) / 10_000);
  const vendorEarned = remaining - affiliateEarned;

  return {
    vendor_id: product.vendor_id,
    vendor_name: product.vendor_name,
    vendor_erc8004: product.vendor_erc8004,
    product_id: product.product_id,
    description: product.description,
    category: product.category,
    tags: product.tags,
    endpoint: product.endpoint,
    method: product.method,
    price_usdc_atomic: product.price_usdc,
    price_display: product.price_display || formatUsdc(product.price_usdc),
    affiliate_bps: product.affiliate_bps,
    purchase_headers: {
      'X-Affiliate-ID': affiliateId
    },
    expected_first_response: {
      status: 402,
      reason: 'Buyer agents receive x402 payment requirements before purchase.'
    },
    estimated_split_atomic: {
      protocol_fee: protocolFee,
      affiliate_commission: affiliateEarned,
      vendor_receives: vendorEarned
    }
  };
}

export async function getRecommendations(need, limit) {
  const resolver = createResolver();
  const products = await resolver.findProducts(need, limit);
  const resolvedProducts = products.length > 0
    ? products
    : (await resolver.getCatalog()).slice(0, limit);

  return {
    resolver,
    products: resolvedProducts.map(productToRecommendation)
  };
}

export function sendJson(response, statusCode, payload) {
  withCors(response);
  response.status(statusCode).json({
    ...payload,
    generated_at: new Date().toISOString()
  });
}
