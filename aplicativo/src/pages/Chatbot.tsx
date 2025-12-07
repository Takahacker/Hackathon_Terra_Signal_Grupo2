import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "Quantos clientes estão em risco alto de churn?",
  "Qual cliente tem maior probabilidade de cancelamento?",
  "Quais são os principais motivos de churn?",
  "Mostre clientes do plano Premium em risco",
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Olá! Sou o assistente da Terra Signal, conectado ao Churn AI no Databricks. Posso ajudá-lo a analisar riscos de churn, consultar informações sobre clientes e sugerir ações de retenção. Como posso ajudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callGenie = async (query: string): Promise<string> => {
    try {
      // In Databricks Apps, call Genie via local proxy (app resource handles auth)
      // Resource key "genie-space" maps to Genie Space resource configured in app.yaml
      const response = await fetch(
        `/_resources/genie-space/api/2.0/genie/spaces/01f0d241004216c9a1bf4f466bed0c9d/start-conversation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: query }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Genie error:", response.status, errText);
        throw new Error(`Erro ao chamar Genie: ${response.status}`);
      }

      const startData = await response.json();
      const conversationId = startData.conversation.id;
      const messageId = startData.message.id;

      // Poll para resultado
      let pollCount = 0;
      const maxPolls = 30;
      const pollInterval = 1000; // 1s

      while (pollCount < maxPolls) {
        const msgResponse = await fetch(
          `/_resources/genie-space/api/2.0/genie/spaces/01f0d241004216c9a1bf4f466bed0c9d/conversations/${conversationId}/messages/${messageId}`
        );

        if (!msgResponse.ok) {
          throw new Error(`Erro ao consultar mensagem: ${msgResponse.status}`);
        }

        const msgData = await msgResponse.json();
        console.log(`Poll #${pollCount + 1}: status=${msgData.status}`);

        if (msgData.status === "COMPLETED") {
          // Extrair resposta texto do Genie
          let content = "Sem resposta recebida";

          if (msgData.content) {
            content = msgData.content;
          } else if (msgData.message) {
            content = msgData.message;
          } else if (msgData.attachments && msgData.attachments.length > 0) {
            // Se há attachments com query, pode processar
            content = "Resposta gerada (verifique os dados na consulta)";
          }

          return content;
        }

        if (msgData.status === "FAILED" || msgData.status === "CANCELLED") {
          throw new Error(`Genie falhou: ${msgData.status}`);
        }

        // Wait before next poll
        await new Promise((resolve) => setTimeout(resolve, pollInterval));
        pollCount++;
      }

      throw new Error("Timeout aguardando resposta do Genie");
    } catch (error) {
      console.error("Erro ao chamar Genie:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar resposta";
      throw new Error(`Desculpe, houve um erro: ${errorMessage}`);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await callGenie(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorContent =
        error instanceof Error ? error.message : "Erro ao processar a solicitação";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: errorContent,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (question: string) => {
    setInput(question);
  };

  const renderMessageContent = (content: string) => {
    try {
      // Dividir por linhas
      const lines = content.split('\n');
      
      return lines.map((line, lineIndex) => {
        // Dividir cada linha por ** para encontrar os trechos em negrito
        const parts = line.split(/(\*\*[^*]*\*\*)/);
        
        const lineParts = parts
          .filter((part) => part && part.length > 0) // Remove strings vazias
          .map((part, partIndex) => {
            if (part && part.startsWith('**') && part.endsWith('**')) {
              // Remove os ** e renderiza em strong
              const boldText = part.slice(2, -2);
              return <strong key={`bold-${lineIndex}-${partIndex}`}>{boldText}</strong>;
            }
            // Renderiza o texto normal
            return <span key={`text-${lineIndex}-${partIndex}`}>{part}</span>;
          });

        return (
          <div key={`line-${lineIndex}`}>
            {lineParts}
          </div>
        );
      });
    } catch (error) {
      console.error('Erro ao renderizar conteúdo:', error);
      return <div>{content}</div>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Chatbot de Consultas</h1>
          <p className="text-muted-foreground">
            Faça perguntas sobre a base de clientes usando linguagem natural
          </p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Assistente Terra Signal
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted/50 text-foreground"
                      )}
                    >
                      <div className="space-y-1">
                        {(() => {
                          try {
                            return renderMessageContent(message.content);
                          } catch (error) {
                            console.error('Erro renderizando mensagem:', error);
                            return <p>{message.content}</p>;
                          }
                        })()}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <User className="h-4 w-4 text-secondary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted/50 rounded-lg px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Suggestions */}
            <div className="px-4 py-2 border-t bg-muted/20">
              <p className="text-xs text-muted-foreground mb-2">Sugestões:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestion(question)}
                    className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground hover:bg-primary/10 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua pergunta..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  disabled={isLoading}
                />
                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Chatbot;
