# ✅ Checklist - Deploy Databricks Integrado

## 📋 Pré-Deploy (Local)

### Configuração

- [ ] Arquivo `.env` criado com todas as variáveis
  - [ ] `DATABRICKS_HOST` configurado (com `https://`)
  - [ ] `DATABRICKS_TOKEN` configurado
  - [ ] `DATABRICKS_SPACE_ID` configurado
  - [ ] `DATABRICKS_WAREHOUSE_ID` configurado
- [ ] `npm install` executado com sucesso
- [ ] `pip install -r requirements.txt` executado com sucesso

### Build

- [ ] `npm run build` executa sem erros
- [ ] Diretório `dist/` foi criado
- [ ] Arquivos em `dist/index.html`, `dist/assets/` existem

### Testes Locais

- [ ] Backend inicia: `npm run server` → http://localhost:8000 acessível
- [ ] Health check funciona: `curl http://localhost:8000/api/health`
- [ ] Frontend + Backend: `npm run dev:all` → http://localhost:8080 acessível
- [ ] Chatbot carrega na interface web

## 🚀 Preparação para Deploy

### Arquivos Críticos Atualizados

- [ ] `app.yaml` - aponta para `deploy.sh`
- [ ] `deploy.sh` - script criado e com permissão de execução (+x)
- [ ] `requirements.txt` - inclui `python-dotenv`
- [ ] `server.py` - importa `StaticFiles` e monta frontend em `/`
- [ ] `vite.config.ts` - build configurado corretamente

### Documentação

- [ ] `DATABRICKS_DEPLOY.md` - criado com instruções completas
- [ ] README atualizado com novas informações

### Git

- [ ] Todas mudanças commitadas
- [ ] Branch atualizado: `git push`

## 🌐 Deploy no Databricks

### Criação da App

- [ ] Acesso ao workspace Databricks
- [ ] Menu: Compute > Apps
- [ ] Nova app criada apontando para este repositório
- [ ] Branch selecionado: `main`
- [ ] `app.yaml` selecionado como config

### Variáveis de Ambiente (Databricks)

Configure estas no campo "Environment Variables" da app:

```
DATABRICKS_HOST=https://seu-workspace.databricks.com
DATABRICKS_TOKEN=seu-token-pessoal
DATABRICKS_SPACE_ID=seu-genie-space-id
DATABRICKS_WAREHOUSE_ID=seu-warehouse-id
NODE_ENV=production
NPM_CONFIG_PRODUCTION=false
PYTHONUNBUFFERED=1
```

- [ ] `DATABRICKS_HOST` - URL completa com `https://`
- [ ] `DATABRICKS_TOKEN` - Token válido e com permissões
- [ ] `DATABRICKS_SPACE_ID` - ID do Genie Space (UUID)
- [ ] `DATABRICKS_WAREHOUSE_ID` - ID do SQL Warehouse
- [ ] `NODE_ENV` = production
- [ ] `NPM_CONFIG_PRODUCTION` = false (para instalar devDependencies)
- [ ] `PYTHONUNBUFFERED` = 1 (para logs em tempo real)

### Deploy

- [ ] Clique em "Deploy" ou "Update"
- [ ] Espere ~2-3 minutos para build
- [ ] Verifique logs para erros

## ✔️ Pós-Deploy (Validação)

### Logs da App

- [ ] Logs mostram: "📦 Instalando dependências"
- [ ] Logs mostram: "🔨 Compilando frontend"
- [ ] Logs mostram: "🎯 Iniciando servidor"
- [ ] Nenhum erro de Python ou Node.js

### Acesso à App

- [ ] URL pública acessível
- [ ] Página carrega (não mostra erro 404)
- [ ] CSS/assets carregam corretamente

### Testes Funcionais

- [ ] Página inicial (Chatbot, Dashboard, etc) aparece
- [ ] Navegação entre abas funciona
- [ ] Backend está pronto (não há erros de conexão)

### Teste API

- [ ] Health check: `curl https://seu-app-url/api/health`
- [ ] Churn AI: Faça pergunta no chatbot
- [ ] Verifique resposta do Genie Space

### Logs de Requisição

- [ ] Logs mostram: `[API] Recebida pergunta:`
- [ ] Logs mostram: `[GENIE] Conversa iniciada`
- [ ] Resposta retorna em tempo razoável

## 🔧 Troubleshooting

### Erro: "dist/ não encontrado"

**Solução**: Fazer novo push com `npm run build` executado

### Erro: "DATABRICKS_HOST / TOKEN não configurados"

**Solução**: Verificar variáveis de ambiente em Compute > Apps > Config

### Erro: "Timeout aguardando resposta do Genie"

**Solução**:

- [ ] Genie Space está ativo no Databricks?
- [ ] Token tem permissão no Genie Space?
- [ ] Space ID está correto?

### Erro: "404 Not Found" na interface

**Solução**:

- [ ] Verificar em Logs > ver se `StaticFiles` montou em `/`
- [ ] Fazer novo deploy: `git push` → novo build

### Frontend carrega mas API não funciona

**Solução**:

- [ ] Verificar CORS está liberado (está `["*"]` no server.py)
- [ ] Testardebug endpoint: `/api/churn-ai-debug`
- [ ] Verificar console (F12) para erros CORS

## 📊 Validação Final

```bash
# Health check
curl https://seu-app-url/api/health
# Esperado: {"status":"ok"}

# Debug endpoint (retorna JSON bruto)
curl -X POST https://seu-app-url/api/churn-ai-debug \
  -H "Content-Type: application/json" \
  -d '{"question":"teste"}'

# Teste completo (interface web)
# 1. Abra https://seu-app-url
# 2. Faça pergunta no Chatbot
# 3. Aguarde resposta do Databricks
```

## ✅ Sucesso!

Se todos os pontos passaram:

- ✅ Frontend React carregando
- ✅ Backend FastAPI funcionando
- ✅ Integração com Genie Space ativa
- ✅ API respondendo corretamente
- ✅ Logs sem erros

**Deploy integrado completo e funcional!** 🎉

---

**Data**: Dezembro 2025  
**Versão**: 2.0 (Deploy Integrado)
