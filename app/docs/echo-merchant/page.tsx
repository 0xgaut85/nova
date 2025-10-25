'use client';

import Link from 'next/link';

export default function EchoMerchantPage() {
  return (
    <div className="prose prose-sm max-w-none">
      <h1 className="text-4xl font-light italic text-black mb-4">
        Echo Merchant
      </h1>

      <p className="text-base text-black/80 leading-relaxed mb-8">
        A free testing service to validate your x402 client implementation. Test payment flows without spending real crypto.
      </p>

      <div className="bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl rounded-2xl p-6 border border-black/5 shadow-xl mb-8 not-prose">
        <h2 className="text-lg font-light italic text-black mb-2">What is Echo Merchant?</h2>
        <p className="text-sm text-black/80 leading-relaxed">
          Echo Merchant is a publicly available x402 test server that responds with HTTP 402 but doesn't require actual payment. 
          Perfect for testing your client implementation before deploying to production.
        </p>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Endpoints</h2>

      <div className="space-y-3 mb-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-600 rounded text-xs font-light italic">GET</span>
            <code className="text-sm font-mono text-black">https://echo.payai.network/echo</code>
          </div>
          <p className="text-sm text-black/80 m-0">
            Returns the request body as JSON response. Use this to test basic x402 flow.
          </p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 bg-green-500/10 text-green-600 rounded text-xs font-light italic">POST</span>
            <code className="text-sm font-mono text-black">https://echo.payai.network/echo</code>
          </div>
          <p className="text-sm text-black/80 m-0">
            Echoes back the POST body. Test payment flow with request payloads.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Testing Your Client</h2>

      <p className="text-sm text-black/80 mb-4">
        Use Echo Merchant to verify your x402 client handles the payment flow correctly:
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            1
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Make Initial Request</h3>
            <p className="text-sm text-black/80 m-0">
              Your client makes a request to Echo Merchant without payment proof
            </p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            2
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Receive 402 Response</h3>
            <p className="text-sm text-black/80 m-0">
              Server responds with HTTP 402 and payment headers
            </p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            3
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Parse Payment Instructions</h3>
            <p className="text-sm text-black/80 m-0">
              Your client should parse the payment headers correctly
            </p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            4
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Simulate Payment</h3>
            <p className="text-sm text-black/80 m-0">
              Echo Merchant accepts any payment proof format for testing
            </p>
          </div>
        </div>

        <div className="flex gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-5 border border-black/5">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-[#FF7B00] to-[#FF9500] text-white rounded-lg flex items-center justify-center text-sm font-light italic">
            5
          </div>
          <div>
            <h3 className="text-sm font-light italic text-black mb-1">Retry & Get Response</h3>
            <p className="text-sm text-black/80 m-0">
              Retry with payment proof header and receive the actual response
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Example with cURL</h2>

      <p className="text-sm text-black/80 mb-4">
        Test the basic flow with cURL:
      </p>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-4">
        <p className="text-xs font-light italic text-black/80 mb-2">Initial Request (no payment)</p>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose">
          <pre className="whitespace-pre-wrap">
{`curl -v https://echo.payai.network/echo`}
          </pre>
        </div>
        <p className="text-xs text-black/80 mt-3 m-0">
          Response: HTTP 402 with payment headers
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-black/5 mb-8">
        <p className="text-xs font-light italic text-black/80 mb-2">Retry with Payment Proof</p>
        <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 not-prose">
          <pre className="whitespace-pre-wrap">
{`curl https://echo.payai.network/echo \\
  -H "X-Payment-Proof: test-proof-123" \\
  -H "X-Payment-Network: base-sepolia"`}
          </pre>
        </div>
        <p className="text-xs text-black/80 mt-3 m-0">
          Response: HTTP 200 with echoed content
        </p>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Example with JavaScript</h2>

      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs text-white/90 mb-8 overflow-x-auto not-prose">
        <pre className="whitespace-pre-wrap">
{`const response1 = await fetch('https://echo.payai.network/echo');

if (response1.status === 402) {
  // Parse payment instructions
  const paymentHeader = response1.headers.get('X-Accept-Payment');
  const paymentAddress = response1.headers.get('X-Payment-Address');
  
  console.log('Payment required:', paymentHeader);
  
  // Retry with mock payment proof
  const response2 = await fetch('https://echo.payai.network/echo', {
    headers: {
      'X-Payment-Proof': 'test-signature-123',
      'X-Payment-Network': 'base-sepolia'
    }
  });
  
  const data = await response2.json();
  console.log('Success:', data);
}`}
        </pre>
      </div>

      <h2 className="text-2xl font-light italic text-black mb-4 mt-8">Next Steps</h2>

      <p className="text-sm text-black/80 mb-4">
        Once you've validated your x402 client against Echo Merchant:
      </p>

      <ul className="text-sm text-black/80 space-y-2 mb-8">
        <li>Use proper x402 client libraries for production</li>
        <li>Connect to real services on Dock402 marketplace</li>
        <li>Implement actual blockchain transaction signing</li>
        <li>Handle payment confirmations and errors properly</li>
      </ul>

      <div className="bg-gradient-to-r from-[#FF7B00] to-[#FF9500] rounded-2xl p-6 text-white not-prose">
        <h3 className="text-lg font-light italic mb-2">Ready for Production?</h3>
        <p className="text-sm opacity-90 mb-4">
          Learn how to integrate real x402 clients into your applications.
        </p>
        <Link
          href="/docs/clients"
          className="inline-block px-5 py-2.5 bg-white text-[#FF7B00] rounded-xl text-sm font-light italic hover:shadow-lg transition-all"
        >
          Client Integration Guide
        </Link>
      </div>
    </div>
  );
}


