'use client';

import { useState, useEffect, useRef } from 'react';
import { useAppKit, useAppKitAccount } from '@reown/appkit/react';
import { useDisconnect as useAppKitDisconnect } from '@reown/appkit/react';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
  timestamp: number;
}

export default function AgentPage() {
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useAppKitDisconnect();
  const { open } = useAppKit();
  
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    // Add welcome message
    setMessages([{
      id: '1',
      role: 'agent',
      content: 'Welcome to Nova Native Agent! I\'m your AI assistant for Nova402. I can help you with Nova platform questions, x402 services, and general topics. What would you like to know?',
      timestamp: Date.now()
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const connectWallet = () => {
    open(); // Use AppKit modal instead of direct connector
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    // Call API to get LLM response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'assistant',
              content: m.content
            })),
            {
              role: 'user',
              content: currentInput
            }
          ]
        }),
      });

      const data = await response.json();

      if (response.ok && data.message) {
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: data.message,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, agentMessage]);
      } else {
        // Use the error message from the API if available
        const errorMessage = data.error === 'MISSING_API_KEY' || data.error === 'AUTH_ERROR'
          ? data.message || 'ANTHROPIC_API_KEY is not configured. On Vercel, make sure it\'s set in your project settings (Settings → Environment Variables) and redeploy.'
          : data.message || 'Sorry, I encountered an error processing your request.';
        
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('Error calling API:', error);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: error?.message || 'Sorry, I encountered an error. Please try again.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, agentMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black">
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/" className="flex items-center gap-3 group">
                <Image
                  src="/logosvg.svg"
                  alt="Nova402"
                  width={72}
                  height={72}
                  className="w-[72px] h-[72px] transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-2xl font-normal text-white font-title tracking-wide">Nova402</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-black border-r border-white/10 flex flex-col overflow-hidden`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/10">
          <Link href="/dapp" className="flex items-center gap-2">
            <Image
              src="/logosvg.svg"
              alt="Nova402"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="text-lg font-normal text-white font-title">Nova402</span>
          </Link>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={() => {
              setMessages([{
                id: Date.now().toString(),
                role: 'agent',
                content: 'Welcome to Nova Native Agent! I\'m your AI assistant for Nova402. I can help you with Nova platform questions, x402 services, and general topics. What would you like to know?',
                timestamp: Date.now()
              }]);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 bg-[#b2a962] text-white rounded-lg text-sm font-light hover:bg-[#c4b876] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-gray-500 text-sm font-light text-center py-8">
            Chat history coming soon
          </div>
        </div>

        {/* Settings */}
        <div className="p-4 border-t border-white/10">
          {isConnected ? (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-[#b2a962] rounded-full"></div>
              <span className="text-white font-light">{formatAddress(address!)}</span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="w-full px-3 py-2 bg-white/5 text-white rounded-lg text-sm font-light hover:bg-white/10 transition-all"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-white/10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-light text-white">Nova Native Agent</h1>
          </div>

          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 text-white rounded-lg text-sm font-light border border-white/10">
                  <div className="w-2 h-2 bg-[#b2a962] rounded-full animate-pulse"></div>
                  <span>{formatAddress(address!)}</span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="text-gray-400 hover:text-white transition-colors text-sm font-light px-3"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="px-4 py-2 bg-[#b2a962] text-white rounded-lg text-sm font-light hover:bg-[#c4b876] transition-all duration-300"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {messages.map((message) => (
              <div key={message.id} className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  {/* Role Label */}
                  <div className={`text-xs font-light mb-2 ${message.role === 'user' ? 'text-right text-[#b2a962]' : 'text-left text-gray-500'}`}>
                    {message.role === 'user' ? 'You' : 'Nova Agent'}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`p-4 rounded-lg backdrop-blur-sm ${
                      message.role === 'user'
                        ? 'bg-[#b2a962]/20 border border-[#b2a962]/30 text-white'
                        : 'bg-white/5 border border-white/10 text-gray-300'
                    }`}
                  >
                    <p className="text-sm font-light leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {/* Timestamp */}
                  <div className={`text-xs text-gray-600 font-light mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="mb-6 flex justify-start">
                <div className="max-w-[80%]">
                  <div className="text-xs font-light mb-2 text-left text-gray-500">
                    Nova Agent
                  </div>
                  <div className="p-4 rounded-lg backdrop-blur-sm bg-white/5 border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Nova Agent anything about x402 services..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#b2a962]/50 transition-all resize-none font-light"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute bottom-3 right-3 p-2 bg-[#b2a962] text-white rounded-lg hover:bg-[#c4b876] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

