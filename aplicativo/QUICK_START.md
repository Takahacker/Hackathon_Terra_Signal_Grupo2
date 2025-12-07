# ⚡ Quick Start - Chatbot Terra Signal

## Em 30 segundos

### 1️⃣ Clonar/Entrar no projeto

```bash
cd /Users/takahashi/Insper_Local/InsperData/DataBricks/terra-signal-protect
```

### 2️⃣ Configurar credenciais (uma única vez)

```bash
# Editar arquivo .env
nano .env

# Dentro do arquivo, preencher:
DATABRICKS_HOST=https://seu-workspace.cloud.databricks.com
DATABRICKS_TOKEN=seu-token-databricks
DATABRICKS_SPACE_ID=seu-genie-space-id

# Salvar (Ctrl+O, Enter, Ctrl+X no nano)
```

### 3️⃣ Rodar tudo

```bash
npm run dev:all
```

### 4️⃣ Abrir browser

```
http://localhost:8080
```

---

## ✨ Pronto! Agora você pode:

- 💬 Digitar perguntas no chatbot
- ⌚ Ver o loading (bolinhas animadas)
- 📊 Receber respostas do Churn AI do Databricks
- 🚀 Testar perguntas como:
  - "Quantos clientes estão em risco de churn?"
  - "Qual cliente tem maior probabilidade de cancelamento?"
  - "Quais são os principais motivos de churn?"

---

## 🆘 Se der erro

### "Cannot connect to http://localhost:8000"

```bash
# Terminal 1: Rodar backend só
npm run server

# Terminal 2: Rodar frontend só
npm run dev
```

### "DATABRICKS_HOST not configured"

1. Abra `.env`
2. Preencha DATABRICKS_HOST, DATABRICKS_TOKEN, DATABRICKS_SPACE_ID
3. Salve e reinicie

### "Module not found"

```bash
npm install
```

---

## 📚 Mais informações

- 📖 Documentação completa: `CHATBOT_SETUP.md`
- 📋 Status da implementação: `IMPLEMENTATION_STATUS.md`
- ✅ Checklist final: `FINAL_CHECKLIST.md`

---

## 🛠️ Componentes Técnicos

| Layer       | Tecnologia               | Porta |
| ----------- | ------------------------ | ----- |
| Frontend    | React + Vite + shadcn/ui | 8080  |
| Proxy       | Vite Dev Server          | 8080  |
| Backend     | FastAPI + Uvicorn        | 8000  |
| Data Source | Databricks Genie API     | -     |

---

**Tudo configurado! Aproveite! 🎉**
