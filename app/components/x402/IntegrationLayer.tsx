'use client';

import { useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { validateServiceEndpoint, validatePaymentAmount } from '@/lib/x402-utils';

export function IntegrationLayer() {
  const { address, isConnected } = useAppKitAccount();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    endpoint: '',
    price: {
      amount: '',
      currency: 'USDC' as 'USDC' | 'SOL',
    },
    network: 'base-sepolia',
    category: 'Other',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    serviceId?: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { id: 'AI', name: 'AI & Machine Learning' },
    { id: 'Content', name: 'Content & Writing' },
    { id: 'Development', name: 'Development Tools' },
    { id: 'Data', name: 'Data & Analytics' },
    { id: 'Other', name: 'Other Services' },
  ];

  const networks = [
    { id: 'base', name: 'Base Mainnet', testnet: false },
    { id: 'base-sepolia', name: 'Base Sepolia (Testnet)', testnet: true },
    { id: 'solana-mainnet', name: 'Solana Mainnet', testnet: false },
    { id: 'solana-devnet', name: 'Solana Devnet (Testnet)', testnet: true },
  ];

  const currencies = [
    { id: 'USDC', name: 'USDC', networks: ['base', 'base-sepolia'] },
    { id: 'SOL', name: 'SOL', networks: ['solana-mainnet', 'solana-devnet'] },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.endpoint.trim()) {
      newErrors.endpoint = 'API endpoint is required';
    } else if (!validateServiceEndpoint(formData.endpoint)) {
      newErrors.endpoint = 'Please enter a valid HTTPS URL';
    }

    if (!formData.price.amount) {
      newErrors.price = 'Price is required';
    } else if (!validatePaymentAmount(formData.price.amount)) {
      newErrors.price = 'Price must be between $0.001 and $1000';
    }

    // Check currency compatibility with network
    const selectedCurrency = currencies.find(c => c.id === formData.price.currency);
    if (selectedCurrency && !selectedCurrency.networks.includes(formData.network)) {
      newErrors.currency = `${formData.price.currency} is not supported on ${formData.network}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      setErrors({ wallet: 'Please connect your wallet first' });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/x402/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          developerAddress: address,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({
          success: true,
          message: data.message,
          serviceId: data.serviceId,
        });
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          endpoint: '',
          price: { amount: '', currency: 'USDC' },
          network: 'base-sepolia',
          category: 'Other',
        });
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Registration failed',
        });
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'Network error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => {
        const parentValue = prev[parent as keyof typeof prev];
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value,
            },
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg p-8">
        <div>
          <h2 className="text-3xl font-light text-white mb-3">Service Registration</h2>
          <p className="text-gray-400 font-light text-lg leading-relaxed">
            Register your API service to the x402 marketplace. Enable payment-native infrastructure and monetize your services instantly.
          </p>
        </div>
      </div>

      {/* Wallet Connection Alert */}
      {!isConnected && (
        <div className="bg-[#b2a962]/10 border border-[#b2a962]/30 rounded-lg p-6">
          <p className="text-[#b2a962] font-light">
            <strong className="font-normal">Wallet Required:</strong> Please connect your wallet to register a service.
          </p>
        </div>
      )}

      {/* Success/Error Messages */}
      {submitResult && (
        <div className={`p-6 rounded-lg border ${
          submitResult.success 
            ? 'border-[#b2a962]/30 bg-[#b2a962]/10' 
            : 'border-red-500/30 bg-red-500/10'
        }`}>
          <div className="flex items-center gap-4">
            <span className="text-3xl">
              {submitResult.success ? '✓' : '✗'}
            </span>
            <div>
              <h4 className={`text-lg font-light ${
                submitResult.success ? 'text-[#b2a962]' : 'text-red-400'
              }`}>
                {submitResult.success ? 'Registration Successful!' : 'Registration Failed'}
              </h4>
              <p className={`text-sm font-light mt-1 ${
                submitResult.success ? 'text-[#b2a962]/80' : 'text-red-400/80'
              }`}>
                {submitResult.message}
              </p>
              {submitResult.serviceId && (
                <p className="text-sm text-[#b2a962]/80 mt-2 font-light font-mono">
                  Service ID: {submitResult.serviceId}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-light text-white mb-2">
              Service Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., AI Content Generator"
              className={`w-full px-4 py-3 border rounded bg-white/5 text-white placeholder-gray-500 font-light focus:outline-none focus:ring-2 focus:ring-[#b2a962] focus:border-transparent ${
                errors.name ? 'border-red-500/50' : 'border-white/20'
              }`}
            />
            {errors.name && <p className="text-red-400 text-sm mt-1 font-light">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-light text-white mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what your service does and how it helps users..."
              rows={4}
              className={`w-full px-4 py-3 border rounded bg-white/5 text-white placeholder-gray-500 font-light focus:outline-none focus:ring-2 focus:ring-[#b2a962] focus:border-transparent ${
                errors.description ? 'border-red-500/50' : 'border-white/20'
              }`}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1 font-light">{errors.description}</p>}
          </div>

          {/* API Endpoint */}
          <div>
            <label className="block text-sm font-light text-white mb-2">
              API Endpoint *
            </label>
            <input
              type="url"
              value={formData.endpoint}
              onChange={(e) => handleInputChange('endpoint', e.target.value)}
              placeholder="https://api.yourservice.com/endpoint"
              className={`w-full px-4 py-3 border rounded bg-white/5 text-white placeholder-gray-500 font-light focus:outline-none focus:ring-2 focus:ring-[#b2a962] focus:border-transparent ${
                errors.endpoint ? 'border-red-500/50' : 'border-white/20'
              }`}
            />
            {errors.endpoint && <p className="text-red-400 text-sm mt-1 font-light">{errors.endpoint}</p>}
            <p className="text-gray-500 text-xs mt-2 font-light">
              Your API must implement x402 payment middleware
            </p>
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-light text-white mb-2">
                Price per Request *
              </label>
              <input
                type="number"
                step="0.001"
                min="0.001"
                max="1000"
                value={formData.price.amount}
                onChange={(e) => handleInputChange('price.amount', e.target.value)}
                placeholder="0.01"
                className={`w-full px-4 py-3 border rounded bg-white/5 text-white placeholder-gray-500 font-light focus:outline-none focus:ring-2 focus:ring-[#b2a962] focus:border-transparent ${
                  errors.price ? 'border-red-500/50' : 'border-white/20'
                }`}
              />
              {errors.price && <p className="text-red-400 text-sm mt-1 font-light">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-light text-white mb-2">
                Currency
              </label>
              <select
                value={formData.price.currency}
                onChange={(e) => handleInputChange('price.currency', e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded bg-white/5 text-white font-light focus:outline-none focus:ring-2 focus:ring-[#b2a962] focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency.id} value={currency.id} className="bg-black">
                    {currency.name}
                  </option>
                ))}
              </select>
              {errors.currency && <p className="text-red-400 text-sm mt-1 font-light">{errors.currency}</p>}
            </div>
          </div>

          {/* Network and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-light text-white mb-2">
                Network
              </label>
              <select
                value={formData.network}
                onChange={(e) => handleInputChange('network', e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded bg-white/5 text-white font-light focus:outline-none focus:ring-2 focus:ring-[#b2a962] focus:border-transparent"
              >
                {networks.map(network => (
                  <option key={network.id} value={network.id} className="bg-black">
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-light text-white mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border border-white/20 rounded bg-white/5 text-white font-light focus:outline-none focus:ring-2 focus:ring-[#b2a962] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id} className="bg-black">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Connected Wallet Info */}
          {isConnected && address && (
            <div className="p-6 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-light text-white mb-2">Connected Wallet</h4>
              <p className="text-gray-400 text-sm font-mono font-light">{address}</p>
              <p className="text-gray-500 text-xs mt-2 font-light">
                Payments will be sent to this address
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!isConnected || isSubmitting}
              className={`flex-1 px-6 py-4 rounded font-light transition-colors ${
                !isConnected || isSubmitting
                  ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                  : 'bg-[#b2a962] text-white hover:bg-[#c4b876]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Register Service'}
            </button>
          </div>
        </form>
      </div>

      {/* Info Section */}
      <div className="bg-black/40 backdrop-blur-sm border border-white/[0.15] rounded-lg p-8">
        <h4 className="font-light text-white mb-4 text-lg">Next Steps</h4>
        <ol className="text-gray-400 text-sm space-y-3 list-decimal list-inside font-light leading-relaxed">
          <li>Your service will be reviewed within 24 hours</li>
          <li>Ensure your API implements x402 payment middleware</li>
          <li>Test your integration using our code generator</li>
          <li>Once approved, your service will appear in the marketplace</li>
        </ol>
      </div>
    </div>
  );
}

