import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockCustomers, Customer } from "@/data/mockCustomers";
import { useState } from "react";
import { 
  AlertTriangle, 
  Phone, 
  Mail, 
  Calendar, 
  Star, 
  FileWarning,
  CreditCard,
  User,
  Lightbulb,
  CheckCircle2,
  ArrowUpDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const Atendimento = () => {
  const [sortBy, setSortBy] = useState<"churn" | "nome">("churn");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const sortedCustomers = [...mockCustomers].sort((a, b) => {
    if (sortBy === "churn") {
      return b.churnProbability - a.churnProbability;
    }
    return a.nome.localeCompare(b.nome);
  });

  const getRiskBadge = (probability: number) => {
    if (probability >= 0.7) {
      return <Badge variant="destructive">Alto Risco</Badge>;
    }
    if (probability >= 0.4) {
      return <Badge className="bg-chart-4 text-foreground">Risco Moderado</Badge>;
    }
    return <Badge className="bg-primary">Baixo Risco</Badge>;
  };

  const highRiskCount = mockCustomers.filter(c => c.churnProbability >= 0.7).length;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Central de Atendimento</h1>
            <p className="text-muted-foreground">
              Clientes ordenados por probabilidade de churn com ações recomendadas
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span className="font-medium text-destructive">{highRiskCount} em alto risco</span>
            </div>
            <Button
              variant="outline"
              onClick={() => setSortBy(sortBy === "churn" ? "nome" : "churn")}
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Ordenar por {sortBy === "churn" ? "Nome" : "Risco"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {sortedCustomers.map((customer) => (
            <Dialog key={customer.id}>
              <DialogTrigger asChild>
                <Card 
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    customer.churnProbability >= 0.7 && "border-destructive/50 hover:border-destructive",
                    customer.churnProbability >= 0.4 && customer.churnProbability < 0.7 && "border-chart-4/50 hover:border-chart-4"
                  )}
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{customer.nome}</h3>
                          <p className="text-sm text-muted-foreground">{customer.plano}</p>
                        </div>
                      </div>
                      {getRiskBadge(customer.churnProbability)}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {(customer.churnProbability * 100).toFixed(0)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Prob. Churn</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={cn(
                              "h-4 w-4",
                              star <= customer.satisfacao
                                ? "text-chart-4 fill-chart-4"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-foreground">
                          R$ {customer.valorMensal.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">/mês</p>
                      </div>
                    </div>

                    {customer.motivosChurn.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground">
                          Principal motivo: <span className="text-foreground">{customer.motivosChurn[0]}</span>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <span className="text-xl">{customer.nome}</span>
                      <div className="flex items-center gap-2 mt-1">
                        {getRiskBadge(customer.churnProbability)}
                        <span className="text-sm font-normal text-muted-foreground">
                          {(customer.churnProbability * 100).toFixed(0)}% probabilidade de churn
                        </span>
                      </div>
                    </div>
                  </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh]">
                  <div className="space-y-6 pr-4">
                    {/* Contact Info */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{customer.telefone}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-3 text-center">
                          <CreditCard className="h-5 w-5 text-primary mx-auto mb-1" />
                          <p className="text-lg font-bold">R$ {customer.valorMensal}</p>
                          <p className="text-xs text-muted-foreground">{customer.plano}</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3 text-center">
                          <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                          <p className="text-lg font-bold">{customer.tempoContrato} meses</p>
                          <p className="text-xs text-muted-foreground">Contrato</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3 text-center">
                          <FileWarning className="h-5 w-5 text-chart-4 mx-auto mb-1" />
                          <p className="text-lg font-bold">{customer.chamadosAbertos}</p>
                          <p className="text-xs text-muted-foreground">Chamados</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-3 text-center">
                          <AlertTriangle className="h-5 w-5 text-destructive mx-auto mb-1" />
                          <p className="text-lg font-bold">{customer.atrasosPagamento}</p>
                          <p className="text-xs text-muted-foreground">Atrasos</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Motivos */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          Motivos de Risco Identificados
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {customer.motivosChurn.length > 0 ? (
                            customer.motivosChurn.map((motivo, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                                {motivo}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-muted-foreground">Nenhum motivo de risco identificado</li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Ações Recomendadas */}
                    <Card className="border-primary/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-primary" />
                          Ações Recomendadas para Retenção
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {customer.acoesRecomendadas.map((acao, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{acao}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Phone className="h-4 w-4 mr-2" />
                        Ligar Agora
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Email
                      </Button>
                    </div>
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Atendimento;
