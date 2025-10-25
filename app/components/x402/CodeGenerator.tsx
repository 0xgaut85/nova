'use client';

import { useState, useEffect } from 'react';
import { X402Service } from '@/lib/payai-client';

interface CodeGeneratorProps {
  serviceId: string;
  onClose: () => void;
}

export function CodeGenerator({ serviceId, onClose }: CodeGeneratorProps) {
  const [service, setService] = useState<X402Service | null>(null);
  const [selectedFramework, setSelectedFramework] = useState<'axios' | 'fetch' | 'express' | 'python'>('axios');
  const [loading, setLoading] = useState(true);

  const frameworks = [
    { id: 'axios', name: 'Axios (JavaScript)', icon: '' },
    { id: 'fetch', name: 'Fetch API (JavaScript)', icon: '' },
    { id: 'express', name: 'Express Middleware', icon: '' },
    { id: 'python', name: 'Python (httpx)', icon: '' },
  ];

  useEffect(() => {
    fetchService();
  }, [serviceId]);

  const fetchService = async () => {
    try {
      const response = await fetch('/api/x402/discover');
      const data = await response.json();
      
      if (data.success) {
        const foundService = data.services.find((s: X402Service) => s.id === serviceId);
        setService(foundService || null);
      }
    } catch (error) {
      console.error('Failed to fetch service details:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateCode = () => {
    if (!service) return '';

    const endpoint = service.endpoint;
    const price = service.price.amount;
    const network = service.price.network;

    switch (selectedFramework) {
      case 'axios':
        return `import axios from 'axios';

// x402 payment integration with ${service.name}
const makeX402Request = async () => {
  try {
    const response = await axios.get('${endpoint}', {
      headers: {
        'Accept': 'application/json',
        'x402-payment': 'auto',
        'x402-network': '${network}',
      },
      // x402 payment will be handled automatically
      // on HTTP 402 Payment Required response
    });
    
    console.log('Service response:', response.data);
    console.log('Payment cost: $${price} ${service.price.currency}');
    
    return response.data;
  } catch (error) {
    if (error.response?.status === 402) {
      console.log('Payment required - processing x402 payment...');
      // Payment handling is automatic with x402 client
    } else {
      console.error('Request failed:', error);
    }
    throw error;
  }
};

// Usage
makeX402Request()
  .then(data => console.log('Success:', data))
  .catch(error => console.error('Error:', error));`;

      case 'fetch':
        return `// x402 payment integration with ${service.name}
const makeX402Request = async () => {
  try {
    const response = await fetch('${endpoint}', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x402-payment': 'auto',
        'x402-network': '${network}',
      }
    });

    if (response.status === 402) {
      console.log('Payment required - processing x402 payment...');
      // Handle HTTP 402 Payment Required
      const paymentInfo = await response.json();
      console.log('Payment details:', paymentInfo);
      
      // x402 client would handle payment here
      // and retry the request automatically
      return null;
    }

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    }

    const data = await response.json();
    console.log('Service response:', data);
    console.log('Payment cost: $${price} ${service.price.currency}');
    
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
};

// Usage
makeX402Request()
  .then(data => {
    if (data) console.log('Success:', data);
  })
  .catch(error => console.error('Error:', error));`;

      case 'express':
        return `import express from 'express';
import { paymentMiddleware } from 'x402-express';

const app = express();

// Configure x402 payment middleware
app.use(
  paymentMiddleware(
    process.env.WALLET_ADDRESS, // Your wallet address
    {
      'GET ${new URL(endpoint).pathname}': {
        price: '$${price}',
        network: '${network}',
      }
    },
    {
      url: 'https://facilitator.payai.network'
    }
  )
);

// Protected route - requires x402 payment
app.get('${new URL(endpoint).pathname}', (req, res) => {
  res.json({
    service: '${service.name}',
    message: 'This content required a $${price} x402 payment',
    data: {
      // Your service response here
      example: 'This is paid content'
    }
  });
});

app.listen(3000, () => {
  console.log('x402-enabled server running on port 3000');
});`;

      case 'python':
        return `import httpx
import asyncio

# x402 payment integration with ${service.name}
async def make_x402_request():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                '${endpoint}',
                headers={
                    'Accept': 'application/json',
                    'x402-payment': 'auto',
                    'x402-network': '${network}',
                }
            )
            
            if response.status_code == 402:
                print('Payment required - processing x402 payment...')
                payment_info = response.json()
                print(f'Payment details: {payment_info}')
                # x402 client would handle payment here
                return None
            
            response.raise_for_status()
            data = response.json()
            print(f'Service response: {data}')
            print(f'Payment cost: $${price} ${service.price.currency}')
            
            return data
            
        except httpx.HTTPStatusError as error:
            print(f'HTTP {error.response.status_code}: {error.response.text}')
            raise
        except Exception as error:
            print(f'Request failed: {error}')
            raise

# Usage
async def main():
    try:
        result = await make_x402_request()
        if result:
            print(f'Success: {result}')
    except Exception as error:
        print(f'Error: {error}')

# Run the example
asyncio.run(main())`;

      default:
        return '// Select a framework to generate code';
    }
  };

  const copyToClipboard = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6">
          <p className="text-red-600">Service not found</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Integration Code</h2>
            <p className="text-gray-600">{service.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Service Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Endpoint:</span>
              <p className="font-mono text-xs break-all">{service.endpoint}</p>
            </div>
            <div>
              <span className="text-gray-500">Price:</span>
              <p className="font-semibold">${service.price.amount} {service.price.currency}</p>
            </div>
            <div>
              <span className="text-gray-500">Network:</span>
              <p className="font-semibold">{service.price.network}</p>
            </div>
            <div>
              <span className="text-gray-500">Category:</span>
              <p className="font-semibold">{service.category}</p>
            </div>
          </div>
        </div>

        {/* Framework Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Select Framework:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {frameworks.map(framework => (
              <button
                key={framework.id}
                onClick={() => setSelectedFramework(framework.id as any)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  selectedFramework === framework.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg mb-1">{framework.icon}</div>
                <div className="text-sm font-medium text-gray-900">{framework.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Generated Code */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Generated Code</h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
            >
              📋 Copy
            </button>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {generateCode()}
            </pre>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Environment Variables</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm mb-2">Add these to your .env file:</p>
            <pre className="text-yellow-900 text-sm font-mono">
{`PAYAI_FACILITATOR_URL=https://facilitator.payai.network
X402_NETWORK=${service.price.network}
WALLET_ADDRESS=your_wallet_address_here`}
            </pre>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Next Steps:</h4>
          <ol className="text-blue-800 text-sm space-y-1 list-decimal list-inside">
            <li>Install the required x402 client library</li>
            <li>Set up your environment variables</li>
            <li>Configure your wallet for {service.price.network} network</li>
            <li>Test the integration using our Echo Merchant first</li>
            <li>Go live with the actual service endpoint</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
