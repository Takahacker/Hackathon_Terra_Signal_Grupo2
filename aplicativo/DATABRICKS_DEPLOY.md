# Deploy Databricks - Terra Signal Protect

## 📋 Visão Geral

Este projeto está configurado para fazer deploy no Databricks Apps com:

- **Backend**: FastAPI + Genie Space (Databricks)
- **Frontend**: React + TypeScript + Vite
- **Integração**: Backend serve os arquivos estáticos do frontend

## 🚀 Estrutura de Deploy

```
┌─────────────────────────┐
│  Databricks Apps (8000) │
├─────────────────────────┤
│   FastAPI Backend       │
│   - /api/churn-ai       │
│   - /api/health         │
│   - /api/churn-ai-debug │
├─────────────────────────┤
│   React Frontend (SPA)  │
│   - / (raiz)            │
│   - /assets/*           │
└─────────────────────────┘
```

## 📦 Fluxo de Deploy

1. **Compilação Frontend**

   - `npm install` - Instala dependências Node.js
   - `npm run build` - Compila React para `dist/`

2. **Execução Backend**

   - Python carrega dependências de `requirements.txt`
   - FastAPI inicia na porta 8000
   - Serve APIs em `/api/*`
   - Serve frontend em `/` (SPA fallback)

3. **Arquivos Chave**
   - `app.yaml` - Configuração do Databricks
   - `deploy.sh` - Script de inicialização
   - `server.py` - Backend FastAPI
   - `vite.config.ts` - Configuração build React

## ⚙️ Configuração Local

### 1. Instalar dependências

```bash
npm install
pip install -r requirements.txt
```

### 2. Configurar variáveis de ambiente

Crie arquivo `.env`:

```env
DATABRICKS_HOST=https://seu-workspace.databricks.com
DATABRICKS_TOKEN=seu-token-pessoal
DATABRICKS_SPACE_ID=id-do-genie-space
DATABRICKS_WAREHOUSE_ID=id-do-warehouse
```

### 3. Executar localmente

**Opção 1: Backend + Frontend juntos**

```bash
npm run dev:all
# Backend: http://localhost:8000/api
# Frontend: http://localhost:8080
```

**Opção 2: Apenas Backend**

```bash
npm run server
# http://localhost:8000
```

**Opção 3: Apenas Frontend**

```bash
npm run dev
# http://localhost:8080
```

## 🌐 Deploy no Databricks

### Pré-requisitos

- ✅ Genie Space criado no Databricks
- ✅ SQL Warehouse ativo
- ✅ Token de acesso pessoal
- ✅ Variáveis de ambiente configuradas

### Passos

1. **Clone/atualize o repositório**

   ```bash
   git clone https://github.com/seu-repo/terra-signal-protect
   cd terra-signal-protect
   ```

2. **Faça build do frontend localmente (opcional, deploy fará automático)**

   ```bash
   npm run build
   ```

3. **Push para o repositório**

   ```bash
   git add -A
   git commit -m "Deploy: atualizar frontend e backend"
   git push
   ```

4. **No Databricks**
   - Vá para **Compute > Apps**
   - Clique em **Create App**
   - Aponte para `app.yaml` deste repositório
   - Configure variáveis de ambiente (DATABRICKS_HOST, TOKEN, SPACE_ID, WAREHOUSE_ID)
   - Clique em **Deploy**

## 📝 Variáveis de Ambiente (Databricks)

Configure estas no Databricks Apps:

| Variável                  | Descrição         | Exemplo                                     |
| ------------------------- | ----------------- | ------------------------------------------- |
| `DATABRICKS_HOST`         | URL do workspace  | `https://dbc-abcd1234.cloud.databricks.com` |
| `DATABRICKS_TOKEN`        | Token de acesso   | (PAT pessoal)                               |
| `DATABRICKS_SPACE_ID`     | ID do Genie Space | `abcd1234-efgh-5678-ijkl-9999mmm00000`      |
| `DATABRICKS_WAREHOUSE_ID` | ID SQL Warehouse  | `abc123def456`                              |

## 🔗 URLs

Após deploy no Databricks:

- **Frontend**: `https://seu-app-url/`
- **API Health**: `https://seu-app-url/api/health`
- **Churn AI**: POST `https://seu-app-url/api/churn-ai`
- **Churn AI Debug**: POST `https://seu-app-url/api/churn-ai-debug`

## 📊 Teste a Integração

```bash
# 1. Health check
curl http://localhost:8000/api/health

# 2. Teste da API (local)
curl -X POST http://localhost:8000/api/churn-ai \
  -H "Content-Type: application/json" \
  -d '{"question":"Quantos clientes estão em risco alto?"}'

# 3. Interface web
# Abra http://localhost:8000 no navegador
```

## 🔧 Troubleshooting

### Erro: `dist/ não encontrado`

```bash
npm run build
```

### Erro: Variáveis de ambiente não carregadas

```bash
# Verificar .env
cat .env

# Recarregar no Databricks
# Delete a app e recrie com novas variáveis
```

### Erro: Backend não conecta ao Genie

1. Verificar `DATABRICKS_HOST` (inclua `https://`)
2. Verificar `DATABRICKS_TOKEN` (validade + permissões)
3. Verificar `DATABRICKS_SPACE_ID` (ID correto do Genie Space)

### Frontend não carrega após deploy

1. Verificar console (F12)
2. Confirmar que `dist/` foi criado
3. Testar `GET /` no Databricks

## 📝 Scripts Disponíveis

```json
{
  "dev": "Executa Vite dev server (frontend)",
  "dev:all": "Executa backend + frontend em paralelo",
  "server": "Executa apenas backend FastAPI",
  "build": "Compila frontend para produção",
  "build:dev": "Compila frontend em modo dev",
  "lint": "Valida código TypeScript/ESLint",
  "preview": "Visualiza build de produção"
}
```

## 📚 Referências

- [Databricks Apps Docs](https://docs.databricks.com/en/dev-tools/apps/index.html)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev)

---

**Última atualização**: Dezembro 2025
**Versão**: 2.0 (Deploy integrado)
