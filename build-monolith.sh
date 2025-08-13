#!/bin/bash

echo "🚀 Building monolith for Render deployment..."

# Exit on any error
set -e

echo "📦 Installing root dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
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