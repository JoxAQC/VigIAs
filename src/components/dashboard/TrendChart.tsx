"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
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
  ChartConfig
} from "@/components/ui/chart"
import { ALERTAS_SIMULADAS } from "@/lib/mockData"

const now = new Date();
const last24Hours = new Date(now.getTime() - (24 * 60 * 60 * 1000));

const trendData = Array.from({ length: 24 }, (_, i) => {
    const hourStart = new Date(last24Hours.getTime() + (i * 60 * 60 * 1000));
    return {
        hour: `${hourStart.getHours()}:00`,
        alta: 0,
        media: 0,
        baja: 0
    };
});

ALERTAS_SIMULADAS.forEach(alert => {
    const alertDate = new Date(alert.timestamp);
    if(alertDate >= last24Hours) {
        const hourIndex = Math.floor((alertDate.getTime() - last24Hours.getTime()) / (60 * 60 * 1000));
        if (hourIndex >= 0 && hourIndex < 24) {
            if(alert.prioridad === 'ALTA') trendData[hourIndex].alta++;
            if(alert.prioridad === 'MEDIA') trendData[hourIndex].media++;
            if(alert.prioridad === 'BAJA') trendData[hourIndex].baja++;
        }
    }
});


const chartConfig = {
  alta: {
    label: "Alta",
    color: "#c9096b",
  },
  media: {
    label: "Media",
    color: "#f1a12c",
  },
  baja: {
    label: "Baja",
    color: "#92b922",
  },
} satisfies ChartConfig

export function TrendChart() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-[#37a6ba] text-primary-foreground rounded-t-lg">
        <CardTitle>Tendencia de Alertas (Últimas 24h)</CardTitle>
        <CardDescription className="text-primary-foreground/90">Volumen de alertas por prioridad a lo largo del día.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={trendData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value, index) => index % 4 === 0 ? value : ""}
              className="fill-muted-foreground"
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
                <linearGradient id="fillAlta" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-alta)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-alta)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="fillMedia" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-media)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-media)" stopOpacity={0.1}/>
                </linearGradient>
                 <linearGradient id="fillBaja" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-baja)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-baja)" stopOpacity={0.1}/>
                </linearGradient>
            </defs>
            <Area
              dataKey="baja"
              type="natural"
              fill="url(#fillBaja)"
              stroke="var(--color-baja)"
              stackId="a"
            />
             <Area
              dataKey="media"
              type="natural"
              fill="url(#fillMedia)"
              stroke="var(--color-media)"
              stackId="a"
            />
            <Area
              dataKey="alta"
              type="natural"
              fill="url(#fillAlta)"
              stroke="var(--color-alta)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
