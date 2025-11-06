"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { ALERTAS_SIMULADAS } from "@/lib/mockData"

const incidentData = ALERTAS_SIMULADAS.reduce((acc, alert) => {
  const classification = alert.clasificacion;
  const existing = acc.find(item => item.classification === classification);
  if (existing) {
    existing.count++;
  } else {
    acc.push({ classification, count: 1 });
  }
  return acc;
}, [] as { classification: string; count: number }[]).sort((a,b) => b.count - a.count);


const chartConfig = {
  count: {
    label: "Incidentes",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

export function IncidentChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-[#37a6ba] text-primary-foreground rounded-t-lg">
        <CardTitle>Clasificación de Incidentes</CardTitle>
        <CardDescription className="text-primary-foreground/90">Distribución de alertas por tipo de incidente.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart accessibilityLayer data={incidentData} layout="vertical" margin={{ left: 20, right: 20 }}>
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="classification"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              className="fill-muted-foreground"
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
