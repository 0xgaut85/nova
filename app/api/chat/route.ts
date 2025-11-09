import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Helper functions to fetch data from our utilities
async function getX402Services() {
  try {
    // Use absolute URL or import the API logic directly
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/x402/discover`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
    console.log('Services fetched:', data.services?.length || 0);
    return data.success ? data.services : [];
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return empty array on error instead of failing
    return [];
  }
}

async function getTokenList() {
  try {
    // Directly import and use the discover API logic to avoid HTTP calls
    const { GET } = await import('../../api/x402/discover/route');
    const request = new Request('http://localhost:3000/api/x402/discover');
    const response = await GET(request);
    const data = await response.json();
    
    if (data.success && data.services) {
      // Filter for tokens only
      const tokens = data.services.filter((service: any) => service.category === 'Tokens');
      console.log('Tokens found:', tokens.length);
      console.log('Token names:', tokens.map((t: any) => t.name));
      return tokens;
    }
    console.log('No tokens found in response');
    return [];
  } catch (error) {
    console.error('Error fetching tokens:', error);
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    // Validate API key before proceeding
    if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY.trim() === '') {
      console.error('ANTHROPIC_API_KEY is not set or is empty');
      return NextResponse.json({ 
        message: 'ANTHROPIC_API_KEY is not configured. Please set it in your environment variables.',
        error: 'MISSING_API_KEY'
      }, { status: 500 });
    }
    
    // Debug: Check if API key is loaded
    console.log('API Key exists:', !!process.env.ANTHROPIC_API_KEY);
    console.log('API Key length:', process.env.ANTHROPIC_API_KEY?.length);
    
    const { messages } = await req.json();

    // System prompt with Nova and x402 context
    const systemPrompt = `You are Nova Native Agent, an AI assistant for Nova402. You're a friendly, intelligent, and helpful conversational AI that can discuss anything while having special expertise in Nova402 and the x402 ecosystem.

Your personality:
- Friendly and approachable
- Conversational and natural
- Helpful and patient
- Knowledgable about many topics
- Special focus on Nova402 and x402 when relevant

About Nova402:
- Nova402 is building x402 protocol infrastructure for the emerging API economy
- Every API call becomes a micropayment transaction, enabling true usage-based pricing with instant on-chain settlement
- Nova402 provides infrastructure for payment-native internet services
- The project aims to enable the API economy to become payment-native
- Nova is the infrastructure layer of the x402 protocol
- Platform features: Service Discovery, Risk-Free Testing, Request-Based Pricing, Instant Code Generation

About x402 Protocol:
- x402 is the HTTP 402 payment protocol reimagined for the blockchain era
- HTTP 402 "Payment Required" was defined in HTTP/1.1 but never implemented until x402
- Services are payment-native, meaning each request can require payment
- The ecosystem includes AI services, APIs, content generation, data services, and more
- Users pay per request using cryptocurrency (USDC on EVM chains, SOL on Solana)
- x402 enables instant payments without prior relationships or subscriptions
- Sub-second settlement, true micropayments, borderless commerce
- Supports multiple chains: Base, Solana, Polygon, BSC, Sei, Peaq

Payment Flow (x402 Protocol):
1. Client sends HTTP request to x402-protected API endpoint
2. Server returns HTTP 402 with payment instructions (amount, address, accepted tokens)
3. Client creates and signs blockchain transaction to payment address
4. Client retries request with transaction signature as payment proof in headers
5. Server verifies payment on-chain and returns resource if valid

Nova Hub Utilities:
- Nova Service Hub: Discover, test, and consume x402 services. A marketplace/aggregator where users can mint tokens, pay and use services. Users can browse services, test them free, connect wallet, and integrate using code generation
- Token Mint: Browse and mint new x402 tokens. Like "PumpFun" for x402 - focused on browsing tokens and minting/buying them
- x402 Indexer: Real-time visibility into all x402 services (excludes tokens). Track and monitor the entire ecosystem with detailed service information
- Integration Layer: Register new services and integrate x402 into your own APIs. Form to add services to the marketplace
- Nova Native Agent (you): An AI agent with access to all services in the x402 ecosystem and general knowledge

Documentation Available:
- Introduction: Platform overview, features, usage flow, monetization guide
- x402 Protocol: Protocol vision, request flow, core advantages, multi-chain support
- Quick Start: Deploy first service in 5 minutes, choose Express.js or Python
- Server Guides: Express.js (Node.js) and Python (FastAPI/Flask) implementation
- Client Integration: How to consume x402-protected APIs
- Payment Flow: Detailed explanation of the 402 payment process
- Echo Merchant: Free testing service for x402 protocol
- Examples: Code examples and integration patterns
- Facilitators: Third-party verification and settlement services
- Deployment: Production deployment guides
- API Reference: Technical API documentation

Core Principles:
- Usage-Based Pricing: Pay exactly for what you consume
- Frictionless Testing: Explore and test services before spending
- Instant Settlement: Payments settle in under a second on-chain
- Multi-Chain Native: Built for a multi-chain future

Your capabilities:
- Have natural conversations about anything
- Answer questions on any topic
- Help with Nova platform questions and features
- Explain x402 services, protocol, and how they work
- Guide users in using the Nova ecosystem
- Help discover relevant x402 services for their needs
- Explain payment flows and integration steps
- Provide coding help, implementation guides, API references
- Be a general-purpose AI assistant
- Reference documentation pages when appropriate
- Use tools to fetch real-time data from Nova utilities when asked

Important: Be conversational, friendly, and natural. You're an AI assistant that people enjoy talking to. You know everything about Nova402, its utilities, documentation, and the x402 protocol. Reference specific pages, features, and capabilities when relevant. When users ask for lists of services or tokens, use your tools to fetch real data.`;

    // Define tools for Claude
    const tools = [
      {
        name: 'get_x402_services',
        description: 'Fetches the current list of available x402 services from the Nova Service Hub. Use this when users ask about available services, what services exist, or want to see the service marketplace.',
        input_schema: {
          type: 'object',
          properties: {},
          required: []
        }
      },
      {
        name: 'get_token_list',
        description: 'Fetches the current list of available x402 tokens. Use this when users ask about tokens, what tokens are available, or want to browse the token marketplace.',
        input_schema: {
          type: 'object',
          properties: {},
          required: []
        }
      }
    ];

    // Call Claude API with tools
    let response = await anthropic.messages.create({
      model: 'claude-haiku-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      messages: messages,
      tools: tools,
    });

    // Handle tool use
    while (response.stop_reason === 'tool_use') {
      const toolUse = response.content.find((block: any) => block.type === 'tool_use');
      
      if (!toolUse) break;

      let toolResult: any;

      // Execute the tool
      if (toolUse.name === 'get_x402_services') {
        const services = await getX402Services();
        toolResult = {
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: JSON.stringify(services)
        };
      } else if (toolUse.name === 'get_token_list') {
        const tokens = await getTokenList();
        toolResult = {
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: JSON.stringify(tokens)
        };
      }

      // Continue conversation with tool result
      const updatedMessages = [
        ...messages,
        {
          role: 'assistant',
          content: response.content
        },
        {
          role: 'user',
          content: [toolResult]
        }
      ];

      response = await anthropic.messages.create({
        model: 'claude-haiku-4-20250514',
        max_tokens: 2048,
        system: systemPrompt,
        messages: updatedMessages,
        tools: tools,
      });
    }

    const content = response.content.find((block: any) => block.type === 'text');
    
    if (content.type === 'text') {
      return NextResponse.json({ 
        message: content.text 
      });
    }

    return NextResponse.json({ 
      message: 'Sorry, I encountered an error processing your request.' 
    }, { status: 500 });
    
  } catch (error: any) {
    console.error('Anthropic API error:', error);
    
    // Check if it's an authentication error (missing/invalid API key)
    if (error?.status === 401 || error?.message?.includes('api_key') || error?.message?.includes('authentication')) {
      return NextResponse.json({ 
        message: 'Invalid or missing ANTHROPIC_API_KEY. Please check your environment variables.',
        error: 'AUTH_ERROR'
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      message: error?.message || 'I encountered an error processing your request. Please try again.',
      error: 'API_ERROR'
    }, { status: 500 });
  }
}

