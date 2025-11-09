const https = require('https');
const { execSync } = require('child_process');

// Get Vercel token from CLI config
function getVercelToken() {
  try {
    const os = require('os');
    const path = require('path');
    const fs = require('fs');
    
    // Try multiple possible locations
    const possiblePaths = [
      path.join(os.homedir(), '.vercel', 'auth.json'),
      path.join(os.homedir(), 'AppData', 'Local', 'Vercel', 'auth.json'),
      path.join(process.env.APPDATA || '', 'Vercel', 'auth.json'),
      path.join(process.env.LOCALAPPDATA || '', 'Vercel', 'auth.json'),
    ];
    
    for (const configPath of possiblePaths) {
      if (fs.existsSync(configPath)) {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        if (config.token) {
          return config.token;
        }
        // Try different structure
        if (config.tokens && config.tokens.length > 0) {
          return config.tokens[0].token;
        }
      }
    }
    
    // Try to get from environment
    if (process.env.VERCEL_TOKEN) {
      return process.env.VERCEL_TOKEN;
    }
  } catch (e) {
    console.error('Could not find Vercel token:', e.message);
  }
  return null;
}

async function createKVStore() {
  const token = getVercelToken();
  if (!token) {
    console.error('❌ Could not find Vercel authentication token.');
    console.error('   Please ensure you are logged in: vercel login');
    process.exit(1);
  }

  const projectId = 'prj_YRE70JqISZgkNazS4S4JYrcc2pOk'; // From .vercel/project.json
  const orgId = 'team_z1SNwqqp5X2mgd9B0dgFrPgP';

  const options = {
    hostname: 'api.vercel.com',
    path: `/v1/stores`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify({
      name: 'nova-snapshot-store',
      projectId: projectId,
    }));
    req.end();
  });
}

async function linkKVStoreToProject(storeId) {
  const token = getVercelToken();
  const projectId = 'prj_YRE70JqISZgkNazS4S4JYrcc2pOk';

  const options = {
    hostname: 'api.vercel.com',
    path: `/v1/projects/${projectId}/stores/${storeId}`,
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🚀 Creating Vercel KV store via API...\n');

  try {
    // Create store
    console.log('📦 Creating KV store: nova-snapshot-store...');
    const store = await createKVStore();
    console.log('✅ KV store created:', store.id);

    // Link to project
    console.log('\n🔗 Linking KV store to project...');
    await linkKVStoreToProject(store.id);
    console.log('✅ KV store linked to project!');

    // Pull environment variables
    console.log('\n📥 Pulling environment variables...');
    try {
      execSync('vercel env pull .env.local', { stdio: 'inherit' });
      console.log('✅ Environment variables updated!');
    } catch (e) {
      console.warn('⚠️  Could not pull env vars. They will be available on next deploy.');
    }

    console.log('\n✨ Setup complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Deploy to Vercel: vercel --prod');
    console.log('   2. KV environment variables will be automatically injected');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\n💡 Alternative: Create KV store manually in Vercel dashboard:');
    console.error('   https://vercel.com/dashboard/stores');
    console.error('   Then link it to your project.');
    process.exit(1);
  }
}

main();

