
"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ALERTAS_SIMULADAS } from "@/lib/mockData";
import type { Alert } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Truck, Eye } from "lucide-react";
import { AlertDetailsDialog } from "./AlertDetailsDialog";
import { PriorityBadge } from "./PriorityBadge";

const ITEMS_PER_PAGE = 7;

export function AlertsTable() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>(
    [...ALERTAS_SIMULADAS].sort((a, b) => {
      const priorityOrder = { ALTA: 0, MEDIA: 1, BAJA: 2 };
      if (priorityOrder[a.prioridad] !== priorityOrder[b.prioridad]) {
        return priorityOrder[a.prioridad] - priorityOrder[b.prioridad];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    })
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentAlerts = alerts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleManageAlert = (id: string, lat: number, lng: number) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, estado: "EN_PROGRESO" } : alert
      )
    );
    toast({
      title: "Alerta Gestionada",
      description: `Unidad de Serenazgo asignada a la ubicación ${lat.toFixed(4)}, ${lng.toFixed(4)}.`,
    });
  };

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Registro de Alertas</CardTitle>
          <CardDescription>
            Listado de alertas de seguridad recibidas. Ordenado por prioridad.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Prioridad</TableHead>
                  <TableHead>Clasificación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-center hidden md:table-cell">Análisis</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.id}</TableCell>
                    <TableCell>
                      <PriorityBadge priority={alert.prioridad} />
                    </TableCell>
                    <TableCell>{alert.clasificacion}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{alert.estado.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(alert)}
                      >
                        <Eye className="mr-2 h-4 w-4" /> Ver detalles
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleManageAlert(alert.id, alert.ubicacion.lat, alert.ubicacion.lng)}
                        disabled={alert.estado !== "VALIDADO_CRITICO"}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Gestionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
      <AlertDetailsDialog
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        alert={selectedAlert}
      />
    </>
  );
}
