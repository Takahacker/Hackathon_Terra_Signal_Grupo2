#!/bin/bash

# Script para rodar o chatbot (Backend + Frontend)

echo "🚀 Terra Signal Protect - Chatbot com Churn AI"
echo "=================================================="
echo ""

# Verificar se .env existe
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    echo "📝 Criando .env a partir de .env.example..."
    cp .env.example .env
    echo "⚠️  Edite o arquivo .env com suas credenciais do Databricks:"
    echo "   - DATABRICKS_HOST"
    echo "   - DATABRICKS_TOKEN"
    echo "   - DATABRICKS_SPACE_ID"
    echo ""
    exit 1
fi

# Verificar credenciais
if grep -q "seu-" .env; then
    echo "❌ Credenciais do Databricks não configuradas!"
    echo "📝 Edite o arquivo .env e preencha:"
    echo "   - DATABRICKS_HOST"
    echo "   - DATABRICKS_TOKEN"
    echo "   - DATABRICKS_SPACE_ID"
    echo ""
    exit 1
fi

# Verificar se dependencies estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências Node.js..."
    npm install
fi

echo "✅ Dependências OK"
echo ""
echo "🎯 Iniciando aplicação..."
echo "   Backend:  http://localhost:8000"
echo "   Frontend: http://localhost:8080"
echo ""
echo "Pressione Ctrl+C para parar"
echo ""

# Rodar backend e frontend em paralelo
npm run dev:all
