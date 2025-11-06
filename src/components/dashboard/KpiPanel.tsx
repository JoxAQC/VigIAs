import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Siren, Flame, Shield, Video, CheckCircle } from "lucide-react";
import { ALERTAS_SIMULADAS, PUNTOS_CALIENTES_SIMULADOS, RECURSOS_SIMULADOS } from "@/lib/mockData";

export function KpiPanel() {
  const criticalAlertsToday = ALERTAS_SIMULADAS.filter(
    (a) => a.prioridad === 'ALTA' && new Date(a.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
  ).length;

  const activeHotspots = PUNTOS_CALIENTES_SIMULADOS.length;
  const managedAlerts = ALERTAS_SIMULADAS.filter(a => a.estado === 'ATENDIDO' || a.estado === 'CERRADO').length;

  const kpis = [
    {
      title: "Alertas Críticas (Hoy)",
      value: criticalAlertsToday,
      icon: <Siren className="h-6 w-6 text-destructive" />,
      color: "text-destructive",
    },
    {
      title: "Puntos Calientes Activos",
      value: activeHotspots,
      icon: <Flame className="h-6 w-6 text-amber-500" />,
      color: "text-amber-500",
    },
    {
      title: "Recursos de Serenazgo",
      value: `${RECURSOS_SIMULADOS.serenazgo.disponibles}/${RECURSOS_SIMULADOS.serenazgo.total}`,
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      color: "text-blue-500",
    },
    {
      title: "Cámaras Operativas",
      value: `${RECURSOS_SIMULADOS.camaras.operativas}/${RECURSOS_SIMULADOS.camaras.total}`,
      icon: <Video className="h-6 w-6 text-green-500" />,
      color: "text-green-500",
    },
    {
        title: "Alertas Gestionadas",
        value: managedAlerts,
        icon: <CheckCircle className="h-6 w-6 text-primary" />,
        color: "text-primary",
      },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-5">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            {kpi.icon}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
