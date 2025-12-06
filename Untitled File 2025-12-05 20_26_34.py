from openai import OpenAI
import os

DATABRICKS_TOKEN = os.environ.get("DATABRICKS_TOKEN")

client = OpenAI(
  api_key=DATABRICKS_TOKEN, # your personal access token
  base_url='https://<workspace_id>.databricks.com/serving-endpoints', # your Databricks workspace instance
)

chat_completion = client.chat.completions.create(
  messages=[
    {
      "role": "system",
      "content": "You are an AI assistant",
    },
    {
      "role": "user",
      "content": "What is a mixture of experts model?",
    }
  ],
  model="databricks-meta-llama-3-1-405b-instruct",
  max_tokens=256
)

print(chat_completion.choices[0].message.content)