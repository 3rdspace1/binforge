# BinForge

**Ship signed, reproducible TypeScript binaries from your CI in minutes — no Rust, no Go, no rewrite.**

## Ideal Customer Profile (ICP)

BinForge is designed for Node/TypeScript platform, tooling, and SaaS teams who need fast-startup CLIs, internal tools, and edge-adjacent utilities but want to stay in the TypeScript ecosystem.

## Pricing

| Tier       | Price (NZD) | Includes                                                                 |
|------------|-------------|--------------------------------------------------------------------------|
| Starter    | $0          | Public repos, 10 builds/mo, signed artifacts, 7-day R2 retention, community support. |
| Pro        | $69         | Private repos, 100 builds/mo, reproducible build manifests, 90-day retention, GitHub Action, email support. |
| Team       | $249        | Unlimited private builds, org namespaces, SSO, audit logs, custom retention, priority support. |
| Enterprise | Custom      | Self-hosted runner option, SLA, custom signing keys, dedicated onboarding, annual invoicing. |

## Setup Commands

To set up BinForge, you'll need to use Cloudflare's Wrangler CLI. Below are the commands to get you started:

1. **Create KV Namespace**
   ```bash
   wrangler kv:namespace create "BINFORGE_KV"
   ```

2. **Set Secrets**
   ```bash
   wrangler secret put AIMLAPI_KEY
   ```
   Follow the prompts to securely enter your API key.

3. **Deploy**
   ```bash
   wrangler deploy
   ```

## 30-Day Milestone List

1. **Day 1-5: Initial Setup**
   - Set up Cloudflare Workers and KV namespaces.
   - Configure GitHub Actions for CI integration.

2. **Day 6-10: Build Pipeline Configuration**
   - Implement build orchestrator logic.
   - Test build queue dispatch and reproducibility manifest generation.

3. **Day 11-15: Artifact Management**
   - Set up R2 for artifact storage.
   - Implement artifact signing and URL generation.

4. **Day 16-20: Authentication and Security**
   - Configure API Gateway for authentication and rate limiting.
   - Implement webhook endpoints for build status notifications.

5. **Day 21-25: Testing and QA**
   - Conduct end-to-end testing of the build lifecycle.
   - Perform load testing and optimize performance.

6. **Day 26-30: Documentation and Support**
   - Finalize user documentation and setup guides.
   - Prepare support channels and community resources.

By following this plan, you will have a fully operational BinForge setup ready to ship TypeScript binaries efficiently and securely.