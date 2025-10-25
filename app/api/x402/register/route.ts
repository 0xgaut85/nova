import { NextResponse } from 'next/server';
import { validateServiceEndpoint, generateServiceId, validatePaymentAmount } from '@/lib/x402-utils';

export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      endpoint,
      price,
      network,
      category,
      developerAddress,
    } = await request.json();

    // Validate required fields
    if (!name || !description || !endpoint || !price || !network || !developerAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate endpoint URL
    if (!validateServiceEndpoint(endpoint)) {
      return NextResponse.json(
        { error: 'Invalid endpoint URL. Must use HTTPS.' },
        { status: 400 }
      );
    }

    // Validate payment amount
    if (!validatePaymentAmount(price.amount)) {
      return NextResponse.json(
        { error: 'Invalid payment amount. Must be between $0.001 and $1000.' },
        { status: 400 }
      );
    }

    // Validate developer address format
    const isValidAddress = (address: string) => {
      // Basic validation - starts with 0x for Ethereum-like or valid base58 for Solana
      return /^0x[a-fA-F0-9]{40}$/.test(address) || /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    };

    if (!isValidAddress(developerAddress)) {
      return NextResponse.json(
        { error: 'Invalid developer address format' },
        { status: 400 }
      );
    }

    // Generate service ID
    const serviceId = generateServiceId(name, developerAddress);

    // Create service registration object
    const serviceRegistration = {
      id: serviceId,
      name: name.trim(),
      description: description.trim(),
      endpoint: endpoint.trim(),
      price: {
        amount: price.amount,
        currency: price.currency || 'USDC',
      },
      network,
      category: category || 'Other',
      developerAddress,
      createdAt: Date.now(),
      status: 'pending', // Will be reviewed before approval
      submittedBy: {
        ip: request.headers.get('x-forwarded-for') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    };

    // In a real implementation, this would be saved to a database
    // For now, we'll simulate the registration process
    console.log('New service registration:', serviceRegistration);

    // TODO: Save to database
    // await saveServiceRegistration(serviceRegistration);

    // TODO: Send notification to admin for review
    // await notifyAdminForReview(serviceRegistration);

    return NextResponse.json({
      success: true,
      serviceId,
      message: 'Service registration submitted successfully. It will be reviewed within 24 hours.',
      status: 'pending',
      estimatedReviewTime: '24 hours',
    });

  } catch (error) {
    console.error('Service registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const developerAddress = searchParams.get('developer');

    // In a real implementation, this would query the database
    // For now, return mock data showing the registration system works
    const mockRegistrations = [
      {
        id: 'service-abc123',
        name: 'AI Content Generator',
        description: 'Generate high-quality content using advanced AI',
        endpoint: 'https://api.example.com/content',
        price: { amount: '0.02', currency: 'USDC' },
        network: 'base',
        category: 'AI',
        developerAddress: '0x742d35Cc6634C0532925a3b8D6C14D8A6D6B81b2',
        createdAt: Date.now() - 86400000, // 1 day ago
        status: 'approved',
      },
      {
        id: 'service-def456',
        name: 'Code Review Bot',
        description: 'Automated code review and security analysis',
        endpoint: 'https://api.example.com/code-review',
        price: { amount: '0.05', currency: 'USDC' },
        network: 'base',
        category: 'Development',
        developerAddress: '0x742d35Cc6634C0532925a3b8D6C14D8A6D6B81b2',
        createdAt: Date.now() - 43200000, // 12 hours ago
        status: 'pending',
      },
    ];

    let filteredRegistrations = mockRegistrations;

    // Filter by status if provided
    if (status) {
      filteredRegistrations = filteredRegistrations.filter(reg => reg.status === status);
    }

    // Filter by developer address if provided
    if (developerAddress) {
      filteredRegistrations = filteredRegistrations.filter(
        reg => reg.developerAddress.toLowerCase() === developerAddress.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      registrations: filteredRegistrations,
      total: filteredRegistrations.length,
    });

  } catch (error) {
    console.error('Failed to fetch registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
