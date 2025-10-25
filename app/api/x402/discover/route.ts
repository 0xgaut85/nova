import { NextResponse } from 'next/server';
import { payaiClient } from '@/lib/payai-client';

export async function GET() {
  try {
    const result = await payaiClient.discoverServices();
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to discover services' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      services: result.data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Service discovery API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { category, network } = await request.json();
    
    // Get all services first
    const result = await payaiClient.discoverServices();
    
    if (!result.success || !result.data) {
      return NextResponse.json(
        { error: result.error || 'Failed to discover services' },
        { status: 500 }
      );
    }

    // Filter by category and network if provided
    let filteredServices = result.data;
    
    if (category && category !== 'All') {
      filteredServices = filteredServices.filter(service => 
        service.category === category
      );
    }
    
    if (network) {
      filteredServices = filteredServices.filter(service => 
        service.price.network === network
      );
    }

    return NextResponse.json({
      success: true,
      services: filteredServices,
      filters: { category, network },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Service filtering API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
