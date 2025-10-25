'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { validateServiceEndpoint, validatePaymentAmount } from '@/lib/x402-utils';

interface ServiceRegistrationProps {
  onClose: () => void;
}

export function ServiceRegistration({ onClose }: ServiceRegistrationProps) {
  const { address, isConnected } = useAccount();
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
        // Type guard to ensure parentValue is an object
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#1E1E1E]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1E1E1E]">Register x402 Service</h2>
            <p className="text-[#1E1E1E]/70">Add your API to the x402 marketplace</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FAFAFA] rounded transition-colors text-[#1E1E1E]"
          >
            ✕
          </button>
        </div>

        {/* Connection Status */}
        {!isConnected && (
          <div className="mb-6 p-4 bg-[#FF7B00]/10 border-2 border-[#FF7B00] rounded-lg">
            <p className="text-[#FF7B00] text-sm">
              <strong>Wallet Required:</strong> Please connect your wallet to register a service.
            </p>
          </div>
        )}

        {/* Success/Error Messages */}
        {submitResult && (
          <div className={`mb-6 p-4 rounded-lg border-2 ${
            submitResult.success 
              ? 'border-[#FF7B00] bg-[#FF7B00]/10' 
              : 'border-[#1E1E1E] bg-[#1E1E1E]/10'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {submitResult.success ? '✓' : '✗'}
              </span>
              <div>
                <h4 className={`font-medium ${
                  submitResult.success ? 'text-[#FF7B00]' : 'text-[#1E1E1E]'
                }`}>
                  {submitResult.success ? 'Registration Successful!' : 'Registration Failed'}
                </h4>
                <p className={`text-sm ${
                  submitResult.success ? 'text-[#FF7B00]/80' : 'text-[#1E1E1E]/80'
                }`}>
                  {submitResult.message}
                </p>
                {submitResult.serviceId && (
                  <p className="text-xs text-[#FF7B00]/80 mt-1">
                    Service ID: {submitResult.serviceId}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
              Service Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., AI Content Generator"
              className={`w-full px-4 py-3 border-2 rounded focus:ring-2 focus:ring-[#FF7B00] focus:border-transparent ${
                errors.name ? 'border-[#1E1E1E]' : 'border-[#1E1E1E]'
              }`}
            />
            {errors.name && <p className="text-[#1E1E1E] text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe what your service does and how it helps users..."
              rows={3}
              className={`w-full px-4 py-3 border-2 rounded focus:ring-2 focus:ring-[#FF7B00] focus:border-transparent ${
                errors.description ? 'border-[#1E1E1E]' : 'border-[#1E1E1E]'
              }`}
            />
            {errors.description && <p className="text-[#1E1E1E] text-sm mt-1">{errors.description}</p>}
          </div>

          {/* API Endpoint */}
          <div>
            <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
              API Endpoint *
            </label>
            <input
              type="url"
              value={formData.endpoint}
              onChange={(e) => handleInputChange('endpoint', e.target.value)}
              placeholder="https://api.yourservice.com/endpoint"
              className={`w-full px-4 py-3 border-2 rounded focus:ring-2 focus:ring-[#FF7B00] focus:border-transparent ${
                errors.endpoint ? 'border-[#1E1E1E]' : 'border-[#1E1E1E]'
              }`}
            />
            {errors.endpoint && <p className="text-[#1E1E1E] text-sm mt-1">{errors.endpoint}</p>}
            <p className="text-[#1E1E1E]/60 text-xs mt-1">
              Your API must implement x402 payment middleware
            </p>
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
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
                className={`w-full px-4 py-3 border-2 rounded focus:ring-2 focus:ring-[#FF7B00] focus:border-transparent ${
                  errors.price ? 'border-[#1E1E1E]' : 'border-[#1E1E1E]'
                }`}
              />
              {errors.price && <p className="text-[#1E1E1E] text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
                Currency
              </label>
              <select
                value={formData.price.currency}
                onChange={(e) => handleInputChange('price.currency', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#1E1E1E] rounded focus:ring-2 focus:ring-[#FF7B00] focus:border-transparent"
              >
                {currencies.map(currency => (
                  <option key={currency.id} value={currency.id}>
                    {currency.name}
                  </option>
                ))}
              </select>
              {errors.currency && <p className="text-[#1E1E1E] text-sm mt-1">{errors.currency}</p>}
            </div>
          </div>

          {/* Network and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
                Network
              </label>
              <select
                value={formData.network}
                onChange={(e) => handleInputChange('network', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#1E1E1E] rounded focus:ring-2 focus:ring-[#FF7B00] focus:border-transparent"
              >
                {networks.map(network => (
                  <option key={network.id} value={network.id}>
                    {network.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1E1E1E] mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#1E1E1E] rounded focus:ring-2 focus:ring-[#FF7B00] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Connected Wallet Info */}
          {isConnected && address && (
            <div className="p-4 bg-[#FAFAFA] rounded-lg border-2 border-[#1E1E1E]">
              <h4 className="font-medium text-[#1E1E1E] mb-2">Connected Wallet</h4>
              <p className="text-[#1E1E1E] text-sm font-mono">{address}</p>
              <p className="text-[#1E1E1E]/60 text-xs mt-1">
                Payments will be sent to this address
              </p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!isConnected || isSubmitting}
              className={`flex-1 px-4 py-3 rounded font-medium transition-colors ${
                !isConnected || isSubmitting
                  ? 'bg-[#1E1E1E]/30 text-[#1E1E1E]/50 cursor-not-allowed'
                  : 'bg-[#FF7B00] text-white hover:bg-[#1E1E1E]'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Register Service'}
            </button>
            
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-[#FAFAFA] text-[#1E1E1E] rounded hover:bg-[#1E1E1E] hover:text-white transition-colors border-2 border-[#1E1E1E]"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-6 p-4 bg-[#FAFAFA] rounded-lg border-2 border-[#1E1E1E]">
          <h4 className="font-medium text-[#1E1E1E] mb-2">Next Steps</h4>
          <ol className="text-[#1E1E1E]/80 text-sm space-y-1 list-decimal list-inside">
            <li>Your service will be reviewed within 24 hours</li>
            <li>Ensure your API implements x402 payment middleware</li>
            <li>Test your integration using our code generator</li>
            <li>Once approved, your service will appear in the marketplace</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
