import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  MessageSquare, 
  Calculator, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap,
  ArrowRight
} from "lucide-react";
import logo from "@/assets/logo.png";
import databricksLogo from "@/assets/databricks-logo.png";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Analítico",
    description: "Visualize métricas de churn em tempo real com gráficos interativos e insights acionáveis.",
    link: "/dashboard",
  },
  {
    icon: MessageSquare,
    title: "Chatbot Inteligente",
    description: "Consulte a base de clientes usando linguagem natural e obtenha respostas instantâneas.",
    link: "/chatbot",
  },
  {
    icon: Calculator,
    title: "Calculadora de Churn",
    description: "Insira dados do cliente e obtenha previsões precisas de probabilidade de cancelamento.",
    link: "/calculadora",
  },
  {
    icon: Users,
    title: "Central de Atendimento",
    description: "Acesse clientes em risco com ações recomendadas para retenção efetiva.",
    link: "/atendimento",
  },
];

const benefits = [
  {
    icon: TrendingUp,
    title: "Aumento de Retenção",
    value: "35%",
    description: "Melhoria média na taxa de retenção de clientes",
  },
  {
    icon: Shield,
    title: "Precisão do Modelo",
    value: "92%",
    description: "Acurácia na predição de churn",
  },
  {
    icon: Zap,
    title: "Tempo de Resposta",
    value: "< 1s",
    description: "Análise em tempo real para decisões rápidas",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Preveja o <span className="text-primary">Churn</span> antes que aconteça
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl">
                Utilize inteligência artificial para identificar clientes em risco de cancelamento, 
                entender os motivos e agir proativamente com ações de retenção personalizadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/dashboard">
                    Acessar Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/atendimento">Ver Clientes em Risco</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <img 
                  src={logo} 
                  alt="Terra Signal" 
                  className="relative w-64 h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-4xl font-bold text-primary mb-2">{benefit.value}</h3>
                <p className="text-lg font-semibold text-foreground mb-1">{benefit.title}</p>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ferramentas Poderosas para Retenção
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Soluções integradas que capacitam sua equipe a tomar decisões baseadas em dados
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <Button asChild variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80">
                        <Link to={feature.link}>
                          Acessar <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Pronto para reduzir seu churn?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Comece agora a usar nossa plataforma e transforme dados em ações de retenção efetivas.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/calculadora">
              Testar Calculadora de Churn
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Powered by Section */}
      <section className="py-8 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-muted-foreground">Powered by</p>
            <img 
              src={databricksLogo} 
              alt="Databricks" 
              className="h-10 object-contain"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
