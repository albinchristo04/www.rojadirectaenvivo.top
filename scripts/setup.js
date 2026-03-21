#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

console.log('🚀 Setting up Rojadirecta En Vivo...\n');

try {
  // Step 1: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Step 2: Fetch initial data
  console.log('\n📡 Fetching match data...');
  try {
    execSync('node scripts/fetch-data.js', { stdio: 'inherit' });
  } catch (error) {
    console.log('⚠️  Could not fetch data. Will retry on first build.');
  }
  
  // Step 3: Create .env.example
  console.log('\n⚙️  Creating environment configuration...');
  const envExample = `# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_api_token_here
CLOUDFLARE_ACCOUNT_ID=your_account_id_here

# Site URL
SITE_URL=https://rojadirectaenvivo.top
`;
  writeFileSync('.env.example', envExample);
  console.log('✓ Created .env.example');
  
  // Step 4: Update astro.config.mjs with site URL
  console.log('\n🔧 Updating Astro configuration...');
  const astroConfig = readFileSync('astro.config.mjs', 'utf8')
    .replace(
      "export default defineConfig({",
      "export default defineConfig({\n  site: process.env.SITE_URL || 'http://localhost:4321',"
    );
  writeFileSync('astro.config.mjs', astroConfig);
  console.log('✓ Updated astro.config.mjs');
  
  console.log('\n✅ Setup complete!\n');
  console.log('📝 Next steps:');
  console.log('   1. Copy .env.example to .env and add your Cloudflare credentials');
  console.log('   2. Add CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID to GitHub secrets');
  console.log('   3. Run `npm run dev` to start development server');
  console.log('   4. Run `npm run build` to build for production\n');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
