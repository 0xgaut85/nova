import { NextResponse } from 'next/server';
import { payaiClient } from '@/lib/payai-client';

export async function POST(request: Request) {
  try {
    const paymentData = await request.json();
    
    // Verify payment via PayAI facilitator
    const result = await payaiClient.verifyPayment(paymentData);
    
    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: result.error || 'Payment verification failed' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: true,
      data: result.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Payment verification API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionHash = searchParams.get('tx');
    const network = searchParams.get('network');
    
    if (!transactionHash) {
      return NextResponse.json(
        { error: 'Transaction hash required' },
        { status: 400 }
      );
    }

    // In a real implementation, this would query the blockchain
    // For now, return mock verification status
    return NextResponse.json({
      success: true,
      transactionHash,
      network,
      status: 'confirmed',
      blockNumber: Math.floor(Math.random() * 1000000),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Transaction status API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
