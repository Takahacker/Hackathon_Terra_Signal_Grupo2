#!/bin/bash

# Deploy script for Databricks Apps
# Runs backend (FastAPI) and serves frontend (React build) together

set -e

echo "🚀 Terra Signal Protect - Iniciando Deploy Databricks"
echo "========================================================"
echo ""

echo "📂 Diretório atual:"
pwd
echo ""

echo "📂 Listando arquivos de /app:"
ls -la
echo ""

echo "🔍 Procurando server.py em até 3 níveis..."
find . -maxdepth 3 -name 'server.py' -print || echo "server.py não encontrado"
echo ""

# 1. Install Node.js dependencies if not already installed
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências Node.js..."
    npm install --production
    echo "✅ Dependências Node.js instaladas"
fi

# 2. Build React frontend
if [ ! -d "dist" ]; then
    echo "🔨 Compilando frontend React..."
    npm run build
    echo "✅ Frontend compilado com sucesso"
else
    echo "✅ Frontend já compilado (dist/ encontrado)"
fi

# 3. Run backend server
echo ""
echo "🎯 Iniciando servidor..."
echo "   Backend:  http://localhost:8000/api"
echo "   Frontend: http://localhost:8000"
echo ""

exec python server.py