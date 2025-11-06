
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ALERTAS_SIMULADAS, PUNTOS_CALIENTES_SIMULADOS } from "@/lib/mockData";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Flame, Siren } from "lucide-react";
import { Badge } from "../ui/badge";
import { PriorityBadge } from "./PriorityBadge";
import type { Alert } from "@/lib/types";

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

export function InteractiveMap() {
  const mapImage = PlaceHolderImages.find((img) => img.id === "sjl-map");
  if (!mapImage) return null;

  const recentAlerts = ALERTAS_SIMULADAS.filter(
    (a) => new Date(a.timestamp) > new Date(Date.now() - 1 * 60 * 60 * 1000)
  ).slice(0, 15); // Show last hour alerts, max 15

  return (
    <Card className="shadow-lg h-[450px] md:h-full">
      <CardHeader>
        <CardTitle>Mapa de Incidencia en Tiempo Real</CardTitle>
        <CardDescription>Alertas recientes y puntos calientes en SJL.</CardDescription>
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
                    <Flame className="h-8 w-8 text-destructive fill-destructive drop-shadow-lg" />
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
          {recentAlerts.map((alert) => {
            const pos = getPositionOnMap(alert.ubicacion.lat, alert.ubicacion.lng);
            return (
              <Popover key={alert.id}>
                <PopoverTrigger
                  asChild
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                   <button>
                      <Siren className="h-5 w-5 text-primary-foreground fill-primary drop-shadow-md" />
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
