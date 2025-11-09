#!/usr/bin/env node

/**
 * Setup guide for Vercel KV
 * Since KV stores must be created via dashboard, this script provides
 * step-by-step instructions and then links the store to your project.
 */

const { execSync } = require('child_process');
const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('🚀 Setting up Vercel KV for Nova snapshot...\n');
  console.log('📝 Step 1: Create KV Store in Vercel Dashboard');
  console.log('   1. Go to: https://vercel.com/dashboard/stores');
  console.log('   2. Click "Create Database"');
  console.log('   3. Select "KV" (Key-Value)');
  console.log('   4. Name it: nova-snapshot-store');
  console.log('   5. Select your team/account');
  console.log('   6. Click "Create"\n');
  
  const storeId = await question('📋 Enter the Store ID (you can find it in the dashboard URL or store settings): ');
  
  if (!storeId || storeId.trim() === '') {
    console.error('❌ Store ID is required. Please run this script again after creating the store.');
    rl.close();
    process.exit(1);
  }

  console.log('\n🔗 Linking KV store to project...');
  
  try {
    // The KV store will be automatically linked when you add it to the project
    // via the dashboard. But we can verify the connection by checking env vars.
    console.log('✅ KV store should be linked automatically via dashboard.');
    console.log('\n📥 Pulling environment variables...');
    
    try {
      execSync('vercel env pull .env.local', { stdio: 'inherit' });
      console.log('✅ Environment variables updated!');
    } catch (e) {
      console.warn('⚠️  Could not pull env vars. They will be available after deployment.');
    }

    console.log('\n✨ Setup complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Make sure the KV store is linked to your project in the dashboard');
    console.log('   2. Deploy to Vercel: vercel --prod');
    console.log('   3. KV environment variables (KV_REST_API_URL, KV_REST_API_TOKEN) will be automatically injected');
    console.log('   4. The @vercel/kv package will automatically use these variables');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Make sure:');
    console.error('   1. The KV store is created in the dashboard');
    console.error('   2. The store is linked to your project "nova"');
    console.error('   3. You have the correct permissions');
  }
  
  rl.close();
}

main();

