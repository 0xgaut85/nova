import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getMint } from '@solana/spl-token';
import { Redis } from '@upstash/redis';

const NOVA_V1_MINT = new PublicKey('Bt7rUdZ62TwyHB5HsBjLhFqQ3VDg42VUb5Ttwiqvpump');
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://mainnet.helius-rpc.com/?api-key=112de5d5-6530-46c2-b382-527e71c48e68';

const SNAPSHOT_TIME = new Date('2025-11-09T17:00:00Z'); // 5pm UTC Nov 9, 2025
const SNAPSHOT_KEY = 'nova:snapshot:data';
const SNAPSHOT_TIMESTAMP_KEY = 'nova:snapshot:timestamp';

// Initialize Redis client (Upstash)
const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

// Get snapshot data from Redis
async function getSnapshotData() {
  try {
    const data = await redis.get<{ balances: Record<string, string> }>(SNAPSHOT_KEY);
    const timestamp = await redis.get<string>(SNAPSHOT_TIMESTAMP_KEY);
    return {
      balances: data?.balances || {},
      timestamp: timestamp || null
    };
  } catch (e) {
    console.error('Error getting snapshot data from Redis:', e);
    return { balances: {}, timestamp: null };
  }
}

// Save snapshot data to Redis
async function saveSnapshotData(data: { balances: Record<string, string>, timestamp: string | null }) {
  try {
    await redis.set(SNAPSHOT_KEY, { balances: data.balances });
    if (data.timestamp) {
      await redis.set(SNAPSHOT_TIMESTAMP_KEY, data.timestamp);
    }
  } catch (e) {
    console.error('Error saving snapshot data to Redis:', e);
    throw e;
  }
}

// Check if snapshot time has passed
function isSnapshotTimePassed() {
  return new Date() >= SNAPSHOT_TIME;
}

// GET: Get balance (snapshot if time passed, real-time if before)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address required' }, { status: 400 });
  }

  const snapshotData = await getSnapshotData();
  const snapshotTimePassed = isSnapshotTimePassed();

  // If snapshot time has passed, return stored snapshot balance (don't fetch new)
  if (snapshotTimePassed) {
    // Lock snapshot if not already locked
    if (!snapshotData.timestamp) {
      snapshotData.timestamp = SNAPSHOT_TIME.toISOString();
      await saveSnapshotData(snapshotData);
    }

    if (snapshotData.balances[address]) {
      return NextResponse.json({
        address,
        balance: snapshotData.balances[address],
        isSnapshot: true,
        snapshotTime: snapshotData.timestamp
      });
    } else {
      // Snapshot time passed but no balance stored for this address
      // This means they never checked before snapshot - we can't get accurate balance
      // Return 0 or fetch current (but note it may not be accurate)
      return NextResponse.json({
        address,
        balance: '0',
        isSnapshot: true,
        snapshotTime: snapshotData.timestamp,
        note: 'Balance not captured at snapshot time'
      });
    }
  }

  // Before snapshot time - fetch real-time balance and store it for snapshot
  try {
    const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
    const senderPubkey = new PublicKey(address);
    const senderTokenAccount = await getAssociatedTokenAddress(
      NOVA_V1_MINT,
      senderPubkey
    );

    let decimals = 6;
    try {
      const mintInfo = await getMint(connection, NOVA_V1_MINT);
      decimals = mintInfo.decimals;
    } catch (e) {
      console.log('Could not get mint info, using default 6 decimals');
    }

    try {
      const balance = await connection.getTokenAccountBalance(senderTokenAccount);
      const balanceAmount = parseInt(balance.value.amount);
      const formattedBalance = (balanceAmount / Math.pow(10, decimals)).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6
      });

      // Store balance for snapshot (update if already exists, or create new)
      snapshotData.balances[address] = formattedBalance;
      await saveSnapshotData(snapshotData);

      return NextResponse.json({
        address,
        balance: formattedBalance,
        isSnapshot: false,
        snapshotTime: null
      });
    } catch (balanceError: any) {
      if (balanceError.message?.includes('could not find account')) {
        // Store 0 balance for snapshot
        snapshotData.balances[address] = '0';
        await saveSnapshotData(snapshotData);
        return NextResponse.json({
          address,
          balance: '0',
          isSnapshot: false
        });
      }
      throw balanceError;
    }
  } catch (error: any) {
    console.error('Error fetching balance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Manually trigger snapshot for all addresses that have checked
export async function POST(req: NextRequest) {
  try {
    const snapshotData = await getSnapshotData();
    
    if (!isSnapshotTimePassed()) {
      return NextResponse.json({
        error: 'Snapshot time has not passed yet',
        snapshotTime: SNAPSHOT_TIME.toISOString(),
        currentTime: new Date().toISOString()
      }, { status: 400 });
    }

    // Lock all stored balances by setting timestamp
    if (!snapshotData.timestamp) {
      snapshotData.timestamp = SNAPSHOT_TIME.toISOString();
      await saveSnapshotData(snapshotData);
    }

    return NextResponse.json({
      message: 'Snapshot locked',
      timestamp: snapshotData.timestamp,
      holdersCount: Object.keys(snapshotData.balances).length
    });
  } catch (error: any) {
    console.error('Error in snapshot endpoint:', error);
    return NextResponse.json(
      { error: 'Failed to process snapshot', details: error.message },
      { status: 500 }
    );
  }
}

