import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getMint } from '@solana/spl-token';
import fs from 'fs';
import path from 'path';

const NOVA_V1_MINT = new PublicKey('Bt7rUdZ62TwyHB5HsBjLhFqQ3VDg42VUb5Ttwiqvpump');
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://mainnet.helius-rpc.com/?api-key=112de5d5-6530-46c2-b382-527e71c48e68';

const SNAPSHOT_FILE = path.join(process.cwd(), 'data', 'nova-snapshot.json');
const SNAPSHOT_TIME = new Date('2025-11-09T17:00:00Z'); // 5pm UTC Nov 9, 2025

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get snapshot data
function getSnapshotData() {
  ensureDataDir();
  if (!fs.existsSync(SNAPSHOT_FILE)) {
    return { balances: {}, timestamp: null };
  }
  try {
    const data = fs.readFileSync(SNAPSHOT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    return { balances: {}, timestamp: null };
  }
}

// Save snapshot data
function saveSnapshotData(data: any) {
  ensureDataDir();
  fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(data, null, 2));
}

// GET: Fetch snapshot balance for a wallet
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address required' }, { status: 400 });
  }

  const snapshotData = getSnapshotData();
  const balance = snapshotData.balances[address] || '0';

  return NextResponse.json({
    address,
    balance,
    snapshotTime: snapshotData.timestamp,
    isSnapshotActive: snapshotData.timestamp !== null
  });
}

// POST: Take snapshot of all holders
export async function POST(req: NextRequest) {
  try {
    // Verify snapshot hasn't been taken yet
    const existingSnapshot = getSnapshotData();
    if (existingSnapshot.timestamp) {
      return NextResponse.json({
        error: 'Snapshot already taken',
        timestamp: existingSnapshot.timestamp
      }, { status: 400 });
    }

    const connection = new Connection(SOLANA_RPC_URL, 'confirmed');
    
    // Get mint info
    const mintInfo = await getMint(connection, NOVA_V1_MINT);
    const decimals = mintInfo.decimals;

    // Get all token accounts for this mint
    // Note: This is a simplified approach. For production, you might want to use
    // a more efficient method or pre-fetch known holders
    const allAccounts = await connection.getProgramAccounts(
      new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'), // Token Program
      {
        filters: [
          {
            dataSize: 165, // Token account data size
          },
          {
            memcmp: {
              offset: 0,
              bytes: NOVA_V1_MINT.toBase58(),
            },
          },
        ],
      }
    );

    const balances: Record<string, string> = {};

    for (const account of allAccounts) {
      try {
        const accountData = account.account.data;
        // Parse token account to get owner and amount
        // This is simplified - you may need to use a proper parser
        const balance = await connection.getTokenAccountBalance(
          new PublicKey(account.pubkey)
        );
        
        if (parseInt(balance.value.amount) > 0) {
          // Get owner from token account
          const ownerPubkey = await connection.getAccountInfo(account.pubkey);
          // For now, we'll use a different approach - get all token accounts and their owners
          const tokenAccountInfo = await connection.getParsedAccountInfo(account.pubkey);
          if (tokenAccountInfo.value && 'parsed' in tokenAccountInfo.value) {
            const parsed = tokenAccountInfo.value.parsed as any;
            if (parsed.info && parsed.info.owner) {
              const owner = parsed.info.owner;
              const balanceAmount = parseInt(balance.value.amount);
              const formattedBalance = (balanceAmount / Math.pow(10, decimals)).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6
              });
              balances[owner] = formattedBalance;
            }
          }
        }
      } catch (e) {
        console.error('Error processing account:', e);
        continue;
      }
    }

    const snapshotData = {
      balances,
      timestamp: new Date().toISOString(),
      snapshotTime: SNAPSHOT_TIME.toISOString()
    };

    saveSnapshotData(snapshotData);

    return NextResponse.json({
      success: true,
      timestamp: snapshotData.timestamp,
      holdersCount: Object.keys(balances).length
    });
  } catch (error: any) {
    console.error('Error taking snapshot:', error);
    return NextResponse.json(
      { error: 'Failed to take snapshot', details: error.message },
      { status: 500 }
    );
  }
}

