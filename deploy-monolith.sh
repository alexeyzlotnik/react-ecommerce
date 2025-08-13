#!/bin/bash

echo "🚀 Building and deploying monolith..."

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build the entire monolith
echo "🔨 Building monolith..."
npm run build:backend

# Create public directory if it doesn't exist
mkdir -p backend/public

# Copy frontend build to backend
echo "📁 Copying frontend build to backend..."
cp -r frontend/dist/* backend/public/

echo "✅ Monolith build complete!"
echo "📤 Ready to deploy to Render, Railway, or Fly.io"
echo ""
echo "To deploy to Render:"
echo "1. Push this code to GitHub"
echo "2. Connect your repo to Render"
echo "3. Use render.yaml for automatic configuration"
echo ""
echo "To deploy to Railway:"
echo "1. Push this code to GitHub"
echo "2. Connect your repo to Railway"
echo "3. Set build command: npm run build:backend"
echo "4. Set start command: npm start"