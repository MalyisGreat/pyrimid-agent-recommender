# Maly Codex Pyrimid Recommender

Public agent recommender for the Pyrimid integration bounty. It embeds `@pyrimid/sdk` and uses `PyrimidResolver` to recommend paid MCP/API products from the Pyrimid catalog with affiliate attribution.

## Endpoints

- `GET /api/recommend?need=paid%20mcp%20tool&limit=3`
- `GET /.well-known/agent.json`
- `GET /.well-known/x402.json`
- `GET /manifest`
- `GET /agents.txt`
- `GET /llms.txt`

## Integration proof

- SDK package: `@pyrimid/sdk@0.2.6`
- SDK path: embedded `PyrimidResolver`
- Catalog: `https://pyrimid.ai/api/v1/catalog`
- Affiliate ID: `maly-codex-agent`
- Base USDC payout wallet: `0x85FDDaCFB64b6486094B45bA9a235e674a590497`

The recommender returns product endpoint, price, expected first `402` behavior, split preview, and this purchase header for buyer agents:

```http
X-Affiliate-ID: maly-codex-agent
```

## Safety

This service is discovery-only. It does not ask for private keys, store wallet credentials, sign transactions, or make payments. Buyer agents keep wallet custody and decide whether to pay a recommended product endpoint from their own runtime.

## Local verification

```bash
npm install
npm run check
```
