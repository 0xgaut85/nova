import { NextResponse } from 'next/server';
import { payaiClient } from '@/lib/payai-client';

export async function POST(request: Request) {
  try {
    const { network = 'base-sepolia', serviceId } = await request.json();
    
    // Test with Echo Merchant
    const testResult = await payaiClient.testEchoMerchant(network);
    
    return NextResponse.json({
      success: true,
      result: testResult,
      serviceId,
      network,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('x402 test API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const network = searchParams.get('network') || 'base-sepolia';
    
    // Get supported networks
    const networks = payaiClient.getSupportedNetworks();
    
    return NextResponse.json({
      success: true,
      networks,
      currentNetwork: network,
      echoMerchantStatus: 'online',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Test configuration API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
