import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats } from "@/data/mockCustomers";
import { 
  Users, 
  AlertTriangle, 
  TrendingDown, 
  CheckCircle2,
  DollarSign,
  Star
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["hsl(161, 93%, 30%)", "hsl(172, 66%, 50%)", "hsl(141, 69%, 58%)", "hsl(82, 77%, 55%)"];

const Dashboard = () => {
  const stats = [
    {
      title: "Total de Clientes",
      value: dashboardStats.totalClientes.toLocaleString("pt-BR"),
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Clientes em Risco",
      value: dashboardStats.clientesRisco.toLocaleString("pt-BR"),
      icon: AlertTriangle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Taxa de Churn",
      value: `${dashboardStats.taxaChurn}%`,
      icon: TrendingDown,
      color: "text-chart-5",
      bgColor: "bg-muted/20",
    },
    {
      title: "Retenções no Mês",
      value: dashboardStats.retencaoMes.toString(),
      icon: CheckCircle2,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Receita em Risco",
      value: `R$ ${dashboardStats.receitaEmRisco.toLocaleString("pt-BR")}`,
      icon: DollarSign,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
    {
      title: "Satisfação Média",
      value: dashboardStats.satisfacaoMedia.toFixed(1),
      icon: Star,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard de Churn</h1>
          <p className="text-muted-foreground">
            Visão geral das métricas de retenção e análise de risco
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Churn Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tendência de Churn Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardStats.churnMensal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="churn" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    name="Taxa de Churn (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="retidos" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Clientes Retidos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Churn por Motivo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Principais Motivos de Churn</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardStats.churnPorMotivo}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ motivo, porcentagem }) => `${motivo}: ${porcentagem}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="porcentagem"
                  >
                    {dashboardStats.churnPorMotivo.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Risco por Plano */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risco de Churn por Plano</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardStats.riscoPorPlano}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="plano" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Legend />
                <Bar dataKey="risco" fill="hsl(var(--destructive))" name="Risco (%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="hsl(var(--primary))" name="Total Clientes" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
