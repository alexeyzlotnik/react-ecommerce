#!/bin/bash

echo "🚀 Building monolith for Render deployment..."

# Exit on any error
set -e

echo "🧹 Cleaning up any existing node_modules..."
rm -rf node_modules package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json
rm -rf backend/node_modules backend/package-lock.json

echo "📦 Installing root dependencies..."
npm install

echo "📦 Installing frontend dependencies (clean install)..."
cd frontend
npm install
echo "🔨 Building frontend..."
npm run build
cd ..

echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "🔨 Building backend..."
npm run build
cd ..

echo "✅ Monolith build complete!"
echo "📤 Ready to deploy to Render!"