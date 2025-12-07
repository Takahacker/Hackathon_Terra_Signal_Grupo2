# Terra Signal Protect - Chatbot com Churn AI

Este projeto é uma aplicação React + FastAPI que integra o Churn AI do Databricks Genie.

## Requisitos

- Node.js (v18+)
- Python (v3.9+)
- pip (para instalar dependências Python)

## Setup

### 1. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as credenciais do Databricks:

```bash
cp .env.example .env
```

Edite `.env` e configure:

```
DATABRICKS_HOST=https://seu-workspace.cloud.databricks.com
DATABRICKS_TOKEN=seu-token-databricks
DATABRICKS_SPACE_ID=seu-genie-space-id
```

### 2. Instalar dependências Node.js

```bash
npm install
```

### 3. Instalar dependências Python

```bash
pip install fastapi uvicorn requests pydantic python-dotenv
# ou use requirements.txt se existir:
pip install -r requirements.txt
```

## Executar em Desenvolvimento

### Opção 1: Rodar ambos (backend + frontend) em paralelo

```bash
npm run dev:all
```

Isso inicia:

- Backend FastAPI em `http://localhost:8000`
- Frontend Vite em `http://localhost:8080`
- Proxy automático de `/api/*` para o backend

### Opção 2: Rodar separadamente em dois terminais

Terminal 1 (Backend):

```bash
npm run server
# ou
python server.py
```

Terminal 2 (Frontend):

```bash
npm run dev
```

## Endpoints da API

- `POST /api/churn-ai` - Envia uma pergunta e recebe análise do Churn AI

  ```json
  {
    "question": "Quantos clientes estão em risco de churn?"
  }
  ```

  Resposta:

  ```json
  {
    "answer": "Resposta do Genie..."
  }
  ```

- `GET /api/health` - Health check do servidor

## Estrutura do Projeto

```
.
├── src/
│   ├── pages/
│   │   └── Chatbot.tsx       # Página do chatbot (React)
│   ├── components/           # Componentes reutilizáveis
│   └── ...
├── server.py                 # Backend FastAPI
├── vite.config.ts            # Configuração do Vite com proxy
├── package.json              # Scripts e dependências Node
├── .env.example              # Template de variáveis
└── README.md                 # Este arquivo
```

## Fluxo da Aplicação

1. **Frontend (React/Vite)**

   - Usuário digita uma pergunta no chatbot
   - Requisição POST para `/api/churn-ai`

2. **Vite Dev Server**

   - Detecta `/api/*` e faz proxy para `http://localhost:8000`

3. **Backend (FastAPI)**

   - Recebe a pergunta
   - Chama o Genie do Databricks via API REST
   - Realiza polling até obter resposta (máx 60s)
   - Retorna resposta JSON

4. **Frontend (novamente)**
   - Recebe resposta e renderiza no chat
   - Formata com markdown (`**negrito**` → `<strong>`)

## Troubleshooting

### Erro: "Cannot find module 'uvicorn'"

```bash
pip install uvicorn
```

### Erro: "DATABRICKS_HOST / TOKEN / SPACE_ID não configurados"

Certifique-se de criar o arquivo `.env` com as credenciais corretas.

### Timeout na resposta do Genie

O padrão é 60 segundos. Aumentar em `server.py` na função `ask_genie(max_wait=120)`.

### CORS errors

O backend já tem CORS habilitado para aceitar requisições do frontend em desenvolvimento.

## Build para Produção

```bash
npm run build
```

Os arquivos estáticos serão gerados em `dist/`.

## Deployment no Databricks Apps

O arquivo `app.yaml` já está configurado para fazer deploy da aplicação no Databricks Apps.
