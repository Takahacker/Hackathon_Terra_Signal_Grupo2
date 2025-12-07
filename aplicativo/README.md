# Terra Signal Protect - Churn AI Chatbot

Dashboard e chatbot para análise de risco de churn usando Databricks Genie Space.

## 🎯 Features

- 📊 **Dashboard** - Visualização de métricas de churn
- 💬 **Chatbot** - Interface para consultas ao Churn AI
- 📈 **Calculadora** - Análise customizada de cenários
- 🎨 **Interface Responsiva** - Design moderno com ShadCN UI
- 🔌 **Integração Databricks** - Conecta com Genie Space + SQL Warehouse

## 🚀 Quick Start

### Local Development

```sh
# 1. Clone e instale
git clone <YOUR_GIT_URL>
cd terra-signal-protect
npm install
pip install -r requirements.txt

# 2. Configure .env
cp .env.example .env
# Edite com suas credenciais Databricks

# 3. Execute
npm run dev:all
# Backend: http://localhost:8000
# Frontend: http://localhost:8080
```

### Deploy Databricks

1. Leia [`DATABRICKS_DEPLOY.md`](./DATABRICKS_DEPLOY.md)
2. Use o [`DEPLOY_CHECKLIST.md`](./DEPLOY_CHECKLIST.md)
3. Push para main → Deploy automático

## 📁 Estrutura

```
terra-signal-protect/
├── src/
│   ├── pages/          # React pages (Chatbot, Dashboard, etc)
│   ├── components/     # Componentes reutilizáveis
│   └── lib/           # Utilities
├── server.py          # FastAPI backend + Genie integration
├── app.yaml           # Databricks Apps config
├── deploy.sh          # Script de inicialização
└── package.json       # Node.js dependencies
```

## 📝 Configuração

### Variáveis de Ambiente (.env)

```env
DATABRICKS_HOST=https://seu-workspace.databricks.com
DATABRICKS_TOKEN=seu-token-pessoal
DATABRICKS_SPACE_ID=seu-genie-space-id
DATABRICKS_WAREHOUSE_ID=seu-warehouse-id
```

## 📚 Documentação

- [`DATABRICKS_DEPLOY.md`](./DATABRICKS_DEPLOY.md) - Guia completo de deploy
- [`DEPLOY_CHECKLIST.md`](./DEPLOY_CHECKLIST.md) - Checklist de validação
- [`CHATBOT_SETUP.md`](./CHATBOT_SETUP.md) - Configuração do Chatbot
- [`QUICK_START.md`](./QUICK_START.md) - Início rápido

## 🔧 Scripts

```bash
npm run dev          # Frontend dev (port 8080)
npm run dev:all      # Backend + Frontend
npm run server       # Backend only (port 8000)
npm run build        # Build para produção
npm run lint         # Verificar código
```

## 🌐 URLs

| Ambiente   | Frontend              | API                       |
| ---------- | --------------------- | ------------------------- |
| Local Dev  | http://localhost:8080 | http://localhost:8000/api |
| Databricks | https://seu-app-url/  | https://seu-app-url/api   |

## ✅ Arquitetura

```
┌──────────────────────┐
│  Databricks Apps     │
│   (Port 8000)        │
├──────────────────────┤
│ FastAPI Backend      │
│ - /api/churn-ai      │
│ - /api/health        │
│ - /api/churn-ai-dbg  │
├──────────────────────┤
│ React Frontend (SPA) │
│ - / (root)           │
│ - /chatbot           │
│ - /dashboard         │
└──────────────────────┘
        ↓↑
    Databricks Genie Space
    + SQL Warehouse
```

## 🔗 Referências

- [Databricks Apps](https://docs.databricks.com/en/dev-tools/apps/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [React 18](https://react.dev)
- [Vite](https://vitejs.dev/)
- [ShadCN UI](https://ui.shadcn.com/)

---

**Última atualização**: Dezembro 2025  
**Versão**: 2.0 (Deploy Integrado)
