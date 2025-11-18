
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ALERTAS_SIMULADAS, PUNTOS_CALIENTES_SIMULADOS } from "@/lib/mockData";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Flame, Siren } from "lucide-react";
import { Badge } from "../ui/badge";
import { PriorityBadge } from "./PriorityBadge";
import type { Alert, HotSpot } from "@/lib/types";
import { cn } from "@/lib/utils";

// Bounding box for the map image
const MAP_BOUNDS = {
  minLat: -12.08,
  maxLat: -11.91,
  minLng: -77.05,
  maxLng: -76.92,
};

const getPositionOnMap = (lat: number, lng: number) => {
  const top = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * 100;
  const left = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * 100;
  return { top: `${top}%`, left: `${left}%` };
};

const getSirenColor = (priority: Alert['prioridad']) => {
    switch (priority) {
        case 'ALTA':
            return 'text-[#c9096b]';
        case 'MEDIA':
            return 'text-[#f1a12c]';
        case 'BAJA':
            return 'text-[#92b922]';
        default:
            return 'text-primary';
    }
}

const getHotspotColor = (riskLevel: HotSpot['nivel_riesgo']) => {
    switch (riskLevel) {
        case 'CRÍTICO':
            return 'text-[#c9096b] fill-[#c9096b]';
        case 'ALTO':
            return 'text-[#f1a12c] fill-[#f1a12c]';
        case 'MODERADO':
            return 'text-[#92b922] fill-[#92b922]';
        default:
            return 'text-destructive fill-destructive';
    }
}

export function InteractiveMap() {
  const mapImage = PlaceHolderImages.find((img) => img.id === "sjl-map");
  if (!mapImage) return null;

  // Show all alerts that are not closed
  const activeAlerts = ALERTAS_SIMULADAS.filter(
    (a) => a.estado !== 'CERRADO' && a.estado !== 'ATENDIDO'
  );

  return (
    <Card className="shadow-lg h-[450px] md:h-full">
      <CardHeader className="bg-[#37a6ba] text-primary-foreground rounded-t-lg">
        <CardTitle>Mapa de Incidencia en Tiempo Real</CardTitle>
        <CardDescription className="text-primary-foreground/90">Alertas activas y puntos calientes en SJL.</CardDescription>
      </CardHeader>
      <CardContent className="h-full pb-12">
        <div className="relative w-full h-full rounded-lg overflow-hidden border">
          <Image
            src={mapImage.imageUrl}
            alt={mapImage.description}
            fill
            style={{ objectFit: "cover" }}
            data-ai-hint={mapImage.imageHint}
            priority
          />
          {PUNTOS_CALIENTES_SIMULADOS.map((hotspot) => {
            const pos = getPositionOnMap(hotspot.ubicacion.lat, hotspot.ubicacion.lng);
            return (
              <Popover key={hotspot.zona}>
                <PopoverTrigger
                  asChild
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <button className="animate-pulse">
                    <Flame className={cn("h-8 w-8 drop-shadow-lg", getHotspotColor(hotspot.nivel_riesgo))} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Punto Caliente: {hotspot.zona}</h4>
                      <p className="text-sm text-muted-foreground">
                        Nivel de Riesgo: <Badge variant="destructive">{hotspot.nivel_riesgo}</Badge>
                      </p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Incidentes (24h):</strong> {hotspot.incidentes_24h}</p>
                      <p><strong>Cámaras en zona:</strong> {hotspot.camaras_disponibles}</p>
                      <p><strong>Tendencia:</strong> {hotspot.tendencia}</p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
          {activeAlerts.map((alert) => {
            const pos = getPositionOnMap(alert.ubicacion.lat, alert.ubicacion.lng);
            return (
              <Popover key={alert.id}>
                <PopoverTrigger
                  asChild
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                   <button>
                      <Siren className={cn("h-5 w-5 drop-shadow-md", getSirenColor(alert.prioridad))} />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Alerta: {alert.id}</h4>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        Prioridad: <PriorityBadge priority={alert.prioridad} />
                      </p>
                    </div>
                    <div className="text-sm">
                      <p><strong>Tipo:</strong> {alert.tipo}</p>
                      <p><strong>Clasificación:</strong> {alert.clasificacion}</p>
                       <p><strong>Estado:</strong> <Badge variant="outline">{alert.estado.replace("_", " ")}</Badge></p>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
