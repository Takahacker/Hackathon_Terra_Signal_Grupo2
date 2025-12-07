import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Calculator, AlertTriangle, CheckCircle, TrendingDown, Lightbulb, User, FileText, CreditCard, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import databricksLogo from "@/assets/databricks-logo.png";

interface ChurnReasonResult {
  reason: string;
  reasonLabel: string;
  probability: number;
}

interface ChurnResult {
  churnProbability: number;
  churnFlag: 0 | 1;
  riskLevel: "low" | "medium" | "high";
  reasons: ChurnReasonResult[];
  acoes: string[];
}

const reasonLabels: Record<string, string> = {
  preco: "Preço / Custo elevado",
  qualidade_servico: "Qualidade do serviço / Rede",
  atendimento: "Atendimento / Suporte",
  concorrencia: "Concorrência / Melhor oferta",
  problemas_tecnicos: "Problemas técnicos recorrentes",
  mudanca_endereco: "Mudança de endereço / região",
  inadimplencia: "Questões financeiras / Inadimplência",
};

const acoesRecomendadas: Record<string, string[]> = {
  preco: [
    "Oferecer desconto de fidelidade ou promoção temporária",
    "Apresentar plano com melhor custo-benefício",
    "Destacar benefícios exclusivos que justificam o valor",
  ],
  qualidade_servico: [
    "Agendar visita técnica para verificar instalação",
    "Oferecer upgrade de velocidade sem custo adicional",
    "Monitorar qualidade do serviço nas próximas semanas",
  ],
  atendimento: [
    "Escalar para gerente de relacionamento dedicado",
    "Oferecer canal prioritário de atendimento",
    "Realizar follow-up após cada interação",
  ],
  concorrencia: [
    "Apresentar tabela comparativa de benefícios",
    "Oferecer condições especiais de permanência",
    "Destacar diferenciais exclusivos da Terra Signal",
  ],
  problemas_tecnicos: [
    "Agendar manutenção preventiva completa",
    "Substituir equipamentos por versão mais recente",
    "Oferecer suporte técnico prioritário",
  ],
  mudanca_endereco: [
    "Verificar cobertura no novo endereço",
    "Oferecer migração facilitada sem custos",
    "Suspender temporariamente até definição",
  ],
  inadimplencia: [
    "Oferecer parcelamento de débitos",
    "Propor renegociação com condições flexíveis",
    "Sugerir plano mais acessível",
  ],
};

const Calculadora = () => {
  const [formData, setFormData] = useState({
    // Dados cadastrais
    customerID: "",
    gender: "",
    SeniorCitizen: "",
    Partner: "",
    Dependents: "",
    // Relacionamento com operadora
    tenure: "",
    PhoneService: "",
    MultipleLines: "",
    InternetService: "",
    OnlineSecurity: "",
    OnlineBackup: "",
    DeviceProtection: "",
    TechSupport: "",
    StreamingTV: "",
    StreamingMovies: "",
    // Contrato e cobrança
    Contract: "",
    PaperlessBilling: "",
    PaymentMethod: "",
    MonthlyCharges: "",
    TotalCharges: "",
    // Feedback
    CustomerFeedback: "",
  });

  const [result, setResult] = useState<ChurnResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateChurn = async () => {
    setIsCalculating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulated ML model scoring - churn_risk_model
    let churnScore = 0.25;

    // Tenure (less time = more risk)
    const tenure = parseInt(formData.tenure) || 12;
    if (tenure < 6) churnScore += 0.15;
    else if (tenure < 12) churnScore += 0.08;
    else if (tenure > 36) churnScore -= 0.15;

    // Contract type
    if (formData.Contract === "Month-to-month") churnScore += 0.2;
    else if (formData.Contract === "One year") churnScore += 0.05;
    else if (formData.Contract === "Two year") churnScore -= 0.1;

    // Monthly charges
    const monthlyCharges = parseFloat(formData.MonthlyCharges) || 70;
    if (monthlyCharges > 100) churnScore += 0.1;
    else if (monthlyCharges < 30) churnScore -= 0.05;

    // Payment method
    if (formData.PaymentMethod === "Electronic check") churnScore += 0.1;

    // Internet service
    if (formData.InternetService === "Fiber optic") churnScore += 0.05;

    // No tech support + internet
    if (formData.TechSupport === "No" && formData.InternetService !== "No") {
      churnScore += 0.1;
    }

    // No online security + internet
    if (formData.OnlineSecurity === "No" && formData.InternetService !== "No") {
      churnScore += 0.05;
    }

    // Senior citizen
    if (formData.SeniorCitizen === "1") churnScore += 0.05;

    // No dependents or partner
    if (formData.Partner === "No" && formData.Dependents === "No") {
      churnScore += 0.05;
    }

    // Paperless billing
    if (formData.PaperlessBilling === "Yes") churnScore += 0.05;

    // Normalize
    churnScore = Math.max(0, Math.min(1, churnScore));

    // Simulated churn_reason_model
    const reasons: ChurnReasonResult[] = [];
    const feedback = formData.CustomerFeedback.toLowerCase();

    // Price reason
    let precoProb = 0.3;
    if (monthlyCharges > 80) precoProb += 0.2;
    if (feedback.includes("caro") || feedback.includes("preço") || feedback.includes("custo")) precoProb += 0.3;
    reasons.push({ reason: "preco", reasonLabel: reasonLabels.preco, probability: Math.min(precoProb, 0.95) });

    // Service quality
    let qualidadeProb = 0.25;
    if (feedback.includes("lento") || feedback.includes("queda") || feedback.includes("instável") || feedback.includes("conexão")) {
      qualidadeProb += 0.35;
    }
    if (formData.InternetService === "Fiber optic") qualidadeProb -= 0.1;
    reasons.push({ reason: "qualidade_servico", reasonLabel: reasonLabels.qualidade_servico, probability: Math.max(0.1, Math.min(qualidadeProb, 0.95)) });

    // Support/Atendimento
    let atendimentoProb = 0.2;
    if (formData.TechSupport === "No") atendimentoProb += 0.15;
    if (feedback.includes("atendimento") || feedback.includes("suporte") || feedback.includes("demora")) {
      atendimentoProb += 0.3;
    }
    reasons.push({ reason: "atendimento", reasonLabel: reasonLabels.atendimento, probability: Math.min(atendimentoProb, 0.95) });

    // Competition
    let concorrenciaProb = 0.15;
    if (feedback.includes("outra") || feedback.includes("concorr") || feedback.includes("melhor oferta")) {
      concorrenciaProb += 0.4;
    }
    if (formData.Contract === "Month-to-month") concorrenciaProb += 0.1;
    reasons.push({ reason: "concorrencia", reasonLabel: reasonLabels.concorrencia, probability: Math.min(concorrenciaProb, 0.95) });

    // Technical problems
    let tecnicosProb = 0.15;
    if (feedback.includes("técnico") || feedback.includes("modem") || feedback.includes("roteador") || feedback.includes("instalação")) {
      tecnicosProb += 0.35;
    }
    if (formData.DeviceProtection === "No") tecnicosProb += 0.1;
    reasons.push({ reason: "problemas_tecnicos", reasonLabel: reasonLabels.problemas_tecnicos, probability: Math.min(tecnicosProb, 0.95) });

    // Address change
    let enderecoProb = 0.08;
    if (feedback.includes("mudança") || feedback.includes("mudar") || feedback.includes("endereço")) {
      enderecoProb += 0.4;
    }
    reasons.push({ reason: "mudanca_endereco", reasonLabel: reasonLabels.mudanca_endereco, probability: Math.min(enderecoProb, 0.95) });

    // Financial issues
    let inadimplenciaProb = 0.12;
    if (feedback.includes("pagar") || feedback.includes("dívida") || feedback.includes("atraso") || feedback.includes("financeiro")) {
      inadimplenciaProb += 0.35;
    }
    if (formData.PaymentMethod === "Electronic check") inadimplenciaProb += 0.1;
    reasons.push({ reason: "inadimplencia", reasonLabel: reasonLabels.inadimplencia, probability: Math.min(inadimplenciaProb, 0.95) });

    // Sort by probability
    reasons.sort((a, b) => b.probability - a.probability);

    // Get recommended actions based on top reasons
    const topReasons = reasons.slice(0, 3).filter((r) => r.probability > 0.2);
    const acoes: string[] = [];
    topReasons.forEach((r) => {
      const reasonActions = acoesRecomendadas[r.reason];
      if (reasonActions) {
        acoes.push(...reasonActions.slice(0, 2));
      }
    });
    if (acoes.length === 0) {
      acoes.push("Manter relacionamento e acompanhamento regular");
    }

    const riskLevel = churnScore >= 0.6 ? "high" : churnScore >= 0.35 ? "medium" : "low";

    setResult({
      churnProbability: churnScore,
      churnFlag: churnScore >= 0.5 ? 1 : 0,
      riskLevel,
      reasons,
      acoes: [...new Set(acoes)],
    });
    setIsCalculating(false);
  };

  const getRiskConfig = (level: "low" | "medium" | "high") => {
    switch (level) {
      case "high":
        return {
          color: "text-destructive",
          bgColor: "bg-destructive/10",
          borderColor: "border-destructive",
          icon: AlertTriangle,
          label: "Alto Risco",
        };
      case "medium":
        return {
          color: "text-chart-4",
          bgColor: "bg-chart-4/10",
          borderColor: "border-chart-4",
          icon: TrendingDown,
          label: "Risco Moderado",
        };
      case "low":
        return {
          color: "text-primary",
          bgColor: "bg-primary/10",
          borderColor: "border-primary",
          icon: CheckCircle,
          label: "Baixo Risco",
        };
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calculadora de Churn</h1>
          <p className="text-muted-foreground">
            Insira os dados do cliente para calcular a probabilidade de cancelamento e identificar os principais motivos de risco
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Form - spans 2 columns */}
          <div className="xl:col-span-2 space-y-6">
            {/* Dados Cadastrais */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  1. Dados Cadastrais do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerID">ID do Cliente</Label>
                    <Input
                      id="customerID"
                      placeholder="Ex: 7590-VHVEG"
                      value={formData.customerID}
                      onChange={(e) => handleInputChange("customerID", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gênero</Label>
                    <Select value={formData.gender} onValueChange={(v) => handleInputChange("gender", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Masculino</SelectItem>
                        <SelectItem value="Female">Feminino</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Idoso (60+)</Label>
                    <RadioGroup value={formData.SeniorCitizen} onValueChange={(v) => handleInputChange("SeniorCitizen", v)} className="flex gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id="senior-no" />
                        <Label htmlFor="senior-no" className="font-normal">Não</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="senior-yes" />
                        <Label htmlFor="senior-yes" className="font-normal">Sim</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Tem Parceiro(a)</Label>
                    <RadioGroup value={formData.Partner} onValueChange={(v) => handleInputChange("Partner", v)} className="flex gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="partner-yes" />
                        <Label htmlFor="partner-yes" className="font-normal">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="partner-no" />
                        <Label htmlFor="partner-no" className="font-normal">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Tem Dependentes</Label>
                    <RadioGroup value={formData.Dependents} onValueChange={(v) => handleInputChange("Dependents", v)} className="flex gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="dep-yes" />
                        <Label htmlFor="dep-yes" className="font-normal">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="dep-no" />
                        <Label htmlFor="dep-no" className="font-normal">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Relacionamento com Operadora */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  2. Relacionamento com a Operadora
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tenure">Tempo de Casa (meses)</Label>
                    <Input
                      id="tenure"
                      type="number"
                      placeholder="Ex: 24"
                      value={formData.tenure}
                      onChange={(e) => handleInputChange("tenure", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Serviço de Telefone</Label>
                    <RadioGroup value={formData.PhoneService} onValueChange={(v) => handleInputChange("PhoneService", v)} className="flex gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="phone-yes" />
                        <Label htmlFor="phone-yes" className="font-normal">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="phone-no" />
                        <Label htmlFor="phone-no" className="font-normal">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Múltiplas Linhas</Label>
                    <Select value={formData.MultipleLines} onValueChange={(v) => handleInputChange("MultipleLines", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Sim</SelectItem>
                        <SelectItem value="No">Não</SelectItem>
                        <SelectItem value="No phone service">Sem serviço de telefone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tipo de Internet</Label>
                    <Select value={formData.InternetService} onValueChange={(v) => handleInputChange("InternetService", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DSL">DSL</SelectItem>
                        <SelectItem value="Fiber optic">Fibra Óptica</SelectItem>
                        <SelectItem value="No">Não possui</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Segurança Online</Label>
                    <Select value={formData.OnlineSecurity} onValueChange={(v) => handleInputChange("OnlineSecurity", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Sim</SelectItem>
                        <SelectItem value="No">Não</SelectItem>
                        <SelectItem value="No internet service">Sem internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Backup Online</Label>
                    <Select value={formData.OnlineBackup} onValueChange={(v) => handleInputChange("OnlineBackup", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Sim</SelectItem>
                        <SelectItem value="No">Não</SelectItem>
                        <SelectItem value="No internet service">Sem internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Proteção de Dispositivo</Label>
                    <Select value={formData.DeviceProtection} onValueChange={(v) => handleInputChange("DeviceProtection", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Sim</SelectItem>
                        <SelectItem value="No">Não</SelectItem>
                        <SelectItem value="No internet service">Sem internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Suporte Técnico</Label>
                    <Select value={formData.TechSupport} onValueChange={(v) => handleInputChange("TechSupport", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Sim</SelectItem>
                        <SelectItem value="No">Não</SelectItem>
                        <SelectItem value="No internet service">Sem internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Streaming de TV</Label>
                    <Select value={formData.StreamingTV} onValueChange={(v) => handleInputChange("StreamingTV", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Sim</SelectItem>
                        <SelectItem value="No">Não</SelectItem>
                        <SelectItem value="No internet service">Sem internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Streaming de Filmes</Label>
                    <Select value={formData.StreamingMovies} onValueChange={(v) => handleInputChange("StreamingMovies", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Sim</SelectItem>
                        <SelectItem value="No">Não</SelectItem>
                        <SelectItem value="No internet service">Sem internet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contrato e Cobrança */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  3. Contrato e Cobrança
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo de Contrato</Label>
                    <Select value={formData.Contract} onValueChange={(v) => handleInputChange("Contract", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Month-to-month">Mensal</SelectItem>
                        <SelectItem value="One year">1 Ano</SelectItem>
                        <SelectItem value="Two year">2 Anos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Fatura Digital</Label>
                    <RadioGroup value={formData.PaperlessBilling} onValueChange={(v) => handleInputChange("PaperlessBilling", v)} className="flex gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="paperless-yes" />
                        <Label htmlFor="paperless-yes" className="font-normal">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="paperless-no" />
                        <Label htmlFor="paperless-no" className="font-normal">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Método de Pagamento</Label>
                    <Select value={formData.PaymentMethod} onValueChange={(v) => handleInputChange("PaymentMethod", v)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Electronic check">Débito Eletrônico</SelectItem>
                        <SelectItem value="Mailed check">Boleto</SelectItem>
                        <SelectItem value="Bank transfer (automatic)">Transferência Bancária</SelectItem>
                        <SelectItem value="Credit card (automatic)">Cartão de Crédito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="MonthlyCharges">Valor Mensal (R$)</Label>
                    <Input
                      id="MonthlyCharges"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 89.90"
                      value={formData.MonthlyCharges}
                      onChange={(e) => handleInputChange("MonthlyCharges", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="TotalCharges">Total Cobrado (R$)</Label>
                    <Input
                      id="TotalCharges"
                      type="number"
                      step="0.01"
                      placeholder="Ex: 2150.00"
                      value={formData.TotalCharges}
                      onChange={(e) => handleInputChange("TotalCharges", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  4. Feedback do Cliente (opcional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="CustomerFeedback">Comentários, reclamações ou elogios recentes</Label>
                  <Textarea
                    id="CustomerFeedback"
                    placeholder="Ex: Cliente reclamou que o preço está muito caro comparado com a concorrência. Mencionou instabilidade na conexão durante o horário de pico."
                    value={formData.CustomerFeedback}
                    onChange={(e) => handleInputChange("CustomerFeedback", e.target.value)}
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground">
                    Este campo é usado pelo modelo de motivos para enriquecer a análise contextual.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Calculate Button */}
            <Button onClick={calculateChurn} className="w-full" size="lg" disabled={isCalculating}>
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                  Processando modelos...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular Risco de Churn
                </>
              )}
            </Button>

            {/* Powered by Databricks */}
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Powered by</span>
              <img src={databricksLogo} alt="Databricks" className="h-5 object-contain" />
            </div>
          </div>

          {/* Results Column */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Probability Card */}
                <Card className={cn("border-2", getRiskConfig(result.riskLevel).borderColor)}>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className={cn("inline-flex p-4 rounded-full mb-4", getRiskConfig(result.riskLevel).bgColor)}>
                        {(() => {
                          const Icon = getRiskConfig(result.riskLevel).icon;
                          return <Icon className={cn("h-8 w-8", getRiskConfig(result.riskLevel).color)} />;
                        })()}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Probabilidade de Churn</p>
                      <p className={cn("text-5xl font-bold", getRiskConfig(result.riskLevel).color)}>
                        {(result.churnProbability * 100).toFixed(0)}%
                      </p>
                      <p className={cn("text-lg font-medium mt-2", getRiskConfig(result.riskLevel).color)}>
                        {getRiskConfig(result.riskLevel).label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        churn_flag: {result.churnFlag}
                      </p>
                    </div>

                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all duration-1000 rounded-full",
                          result.riskLevel === "high"
                            ? "bg-destructive"
                            : result.riskLevel === "medium"
                            ? "bg-chart-4"
                            : "bg-primary"
                        )}
                        style={{ width: `${result.churnProbability * 100}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Motivos Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="h-5 w-5 text-chart-4" />
                      Motivos Mais Prováveis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.reasons.slice(0, 5).map((reason, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span className="text-sm flex items-center gap-2">
                            <span className={cn(
                              "w-2 h-2 rounded-full",
                              reason.probability >= 0.5 ? "bg-destructive" :
                              reason.probability >= 0.3 ? "bg-chart-4" : "bg-muted-foreground"
                            )} />
                            {reason.reasonLabel}
                          </span>
                          <span className={cn(
                            "text-sm font-semibold",
                            reason.probability >= 0.5 ? "text-destructive" :
                            reason.probability >= 0.3 ? "text-chart-4" : "text-muted-foreground"
                          )}>
                            {(reason.probability * 100).toFixed(0)}%
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Ações Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Lightbulb className="h-5 w-5 text-primary" />
                      Ações Recomendadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.acoes.map((acao, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          {acao}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full min-h-[400px] flex items-center justify-center sticky top-8">
                <CardContent className="text-center py-16">
                  <Calculator className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    Preencha os dados do cliente
                  </p>
                  <p className="text-sm text-muted-foreground">
                    O resultado da análise aparecerá aqui após calcular
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Calculadora;
