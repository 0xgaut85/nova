# Nova Snapshot Setup Guide

## Setting up Upstash Redis for Nova Snapshot

The Nova claim page uses Upstash Redis (via Vercel Marketplace) to store snapshot balances.

### Step 1: Add Upstash Redis to your Vercel project

1. Go to your Vercel project dashboard: https://vercel.com/gauthiers-projects-fae77e6c/nova
2. Click on the **"Storage"** tab (or go to Marketplace)
3. Find **"Upstash"** in the Marketplace
4. Click **"Add Integration"**
5. Select **"Serverless DB (Redis, Vector, Queue, Search)"**
6. Choose **"Redis"** as the database type
7. Name it: `nova-snapshot-redis` (or any name you prefer)
8. Select your region (choose closest to your users)
9. Click **"Create"**

### Step 2: Link to your project

The Upstash integration will automatically:
- Create a Redis database
- Link it to your "nova" project
- Inject environment variables:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`

### Step 3: Deploy

After adding Upstash Redis, deploy your project:

```bash
vercel --prod
```

The environment variables will be automatically available in your deployment.

### Step 4: Verify

Once deployed, the snapshot functionality will:
- **Before 5pm UTC Nov 9, 2025**: Store real-time balances in Redis as users check
- **At/After 5pm UTC**: Lock the snapshot and return stored balances only

### Testing Locally

To test locally, you'll need to add the environment variables to `.env.local`:

```bash
vercel env pull .env.local
```

This will pull all environment variables including the Upstash Redis credentials.

## How it works

1. **Before snapshot time**: Every time a user checks their balance, it's fetched from Solana and stored in Redis
2. **At snapshot time**: The snapshot is automatically locked (timestamp is set)
3. **After snapshot**: Only stored balances are returned, even if users sell tokens

The snapshot data structure in Redis:
- Key: `nova:snapshot:data` → `{ balances: { address: balance, ... } }`
- Key: `nova:snapshot:timestamp` → ISO timestamp string

