import handler from '../api/recommend.js';

const request = {
  method: 'GET',
  query: {
    need: 'paid mcp tool',
    limit: '3'
  },
  headers: {
    host: 'localhost:3000',
    'x-forwarded-proto': 'http'
  }
};

const headers = new Map();
let statusCode = 200;
let payload;
const response = {
  setHeader(name, value) {
    headers.set(name.toLowerCase(), value);
  },
  status(code) {
    statusCode = code;
    return this;
  },
  json(body) {
    payload = body;
    return this;
  },
  end() {
    return this;
  }
};

await handler(request, response);

if (statusCode !== 200) {
  throw new Error(`Expected 200, received ${statusCode}: ${JSON.stringify(payload)}`);
}

if (payload.integration?.sdk !== '@pyrimid/sdk') {
  throw new Error('Smoke response does not prove @pyrimid/sdk integration.');
}

if (!Array.isArray(payload.recommendations) || payload.recommendations.length === 0) {
  throw new Error('Smoke response returned no product recommendations.');
}

if (payload.affiliate?.purchase_header?.['X-Affiliate-ID'] !== 'maly-codex-agent') {
  throw new Error('Smoke response is missing affiliate purchase header.');
}

console.log(JSON.stringify({
  ok: true,
  recommendation_count: payload.recommendations.length,
  first_product: payload.recommendations[0].product_id,
  affiliate_id: payload.affiliate.id
}, null, 2));
