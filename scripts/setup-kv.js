#!/usr/bin/env node

/**
 * Setup script for Vercel KV
 * This script creates a Vercel KV store for the Nova snapshot functionality
 * 
 * Usage:
 *   1. Make sure you're logged in: vercel login
 *   2. Link your project: vercel link
 *   3. Run this script: node scripts/setup-kv.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Vercel KV for Nova snapshot...\n');

try {
  // Check if vercel CLI is available
  try {
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (e) {
    console.error('❌ Vercel CLI not found. Please install it: npm install -g vercel');
    process.exit(1);
  }

  // Check if logged in
  let isLoggedIn = false;
  try {
    execSync('vercel whoami', { stdio: 'pipe' });
    isLoggedIn = true;
  } catch (e) {
    console.log('🔐 Not logged in to Vercel. Attempting to login...');
    console.log('   Please complete the authentication in your browser...');
    try {
      execSync('vercel login', { stdio: 'inherit' });
      isLoggedIn = true;
    } catch (loginError) {
      console.error('❌ Login failed. Please run: vercel login');
      console.error('   Then run this script again: npm run setup-kv');
      process.exit(1);
    }
  }

  // Check if project is linked
  const vercelDir = path.join(process.cwd(), '.vercel');
  if (!fs.existsSync(vercelDir)) {
    console.log('📦 Linking project to Vercel...');
    execSync('vercel link --yes', { stdio: 'inherit' });
  }

  // Create KV store
  console.log('\n💾 Creating Vercel KV store...');
  try {
    execSync('vercel kv create nova-snapshot-store', { stdio: 'inherit' });
    console.log('\n✅ KV store created successfully!');
  } catch (e) {
    console.error('\n❌ Failed to create KV store. You may need to create it manually in the Vercel dashboard.');
    console.error('   Go to: https://vercel.com/dashboard/stores');
    console.error('   Then link it to your project.');
    process.exit(1);
  }

  // Pull environment variables to get KV connection details
  console.log('\n📥 Pulling environment variables...');
  try {
    execSync('vercel env pull .env.local', { stdio: 'inherit' });
    console.log('\n✅ Environment variables updated!');
  } catch (e) {
    console.warn('\n⚠️  Could not pull environment variables. They will be set automatically on Vercel.');
  }

  console.log('\n✨ Setup complete! Your KV store is ready to use.');
  console.log('\n📝 Next steps:');
  console.log('   1. Deploy to Vercel: vercel --prod');
  console.log('   2. KV environment variables (KV_REST_API_URL, KV_REST_API_TOKEN) will be automatically injected');
  console.log('   3. The @vercel/kv package will automatically use these variables');
  
} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}

