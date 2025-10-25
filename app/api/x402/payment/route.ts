import { NextResponse } from 'next/server';
import { payaiClient } from '@/lib/payai-client';
import { getExplorerUrl, createPaymentRequest } from '@/lib/x402-utils';

export async function POST(request: Request) {
  try {
    const {
      serviceId,
      endpoint,
      amount,
      currency = 'USDC',
      network = 'base-sepolia',
      userAddress,
      recipientAddress,
      transactionHash,
    } = await request.json();

    // Validate required fields
    if (!serviceId || !endpoint || !amount || !userAddress) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { status: 400 }
      );
    }

    // Create payment request
    const paymentRequest = createPaymentRequest(
      serviceId,
      endpoint,
      amount,
      currency,
      network,
      recipientAddress || process.env.WALLET_ADDRESS || '0x'
    );

    // If transaction hash is provided, verify the payment
    if (transactionHash) {
      try {
        // Verify payment with PayAI facilitator
        const verificationResult = await payaiClient.verifyPayment({
          transactionHash,
          network,
          amount: paymentRequest.amount,
          currency: paymentRequest.currency,
          recipient: paymentRequest.recipientAddress,
          serviceId: paymentRequest.serviceId,
        });

        if (verificationResult.success) {
          // Payment verified - now call the actual service
          const serviceResponse = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'x402-payment-verified': 'true',
              'x402-transaction': transactionHash,
              'x402-network': network,
            },
          });

          let serviceData;
          try {
            serviceData = await serviceResponse.json();
          } catch {
            serviceData = { message: 'Service response received', statusCode: serviceResponse.status };
          }

          return NextResponse.json({
            success: true,
            paymentVerified: true,
            serviceResponse: serviceData,
            transaction: {
              hash: transactionHash,
              network,
              explorerUrl: getExplorerUrl(transactionHash, network),
              amount: paymentRequest.amount,
              currency: paymentRequest.currency,
            },
            timestamp: new Date().toISOString(),
          });
        } else {
          return NextResponse.json(
            { 
              success: false,
              error: 'Payment verification failed',
              details: verificationResult.error 
            },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
          { 
            success: false,
            error: 'Payment verification failed',
            details: error instanceof Error ? error.message : 'Unknown error'
          },
          { status: 500 }
        );
      }
    } else {
      // No transaction hash - return payment requirements
      return NextResponse.json({
        success: true,
        paymentRequired: true,
        paymentRequest,
        instructions: {
          message: 'Payment required to access this service',
          amount: `${amount} ${currency}`,
          network,
          recipient: paymentRequest.recipientAddress,
          nextStep: 'Send payment and include transaction hash in next request',
        },
        timestamp: new Date().toISOString(),
      });
    }

  } catch (error) {
    console.error('Payment processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const transactionHash = searchParams.get('tx');
    const network = searchParams.get('network') || 'base-sepolia';

    if (!transactionHash) {
      return NextResponse.json(
        { error: 'Transaction hash required' },
        { status: 400 }
      );
    }

    // Check transaction status
    // In a real implementation, this would query the blockchain
    const mockTransactionStatus = {
      hash: transactionHash,
      network,
      status: 'confirmed',
      blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
      confirmations: Math.floor(Math.random() * 50) + 12,
      gasUsed: '21000',
      gasPrice: '0.000000001',
      timestamp: new Date().toISOString(),
      explorerUrl: getExplorerUrl(transactionHash, network),
    };

    return NextResponse.json({
      success: true,
      transaction: mockTransactionStatus,
    });

  } catch (error) {
    console.error('Transaction status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
