
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Loader2, Info, FileText } from 'lucide-react';
import type { Alert } from '@/lib/types';
import { enhanceAlertDescription } from '@/ai/flows/enhance-alert-descriptions';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PriorityBadge } from './PriorityBadge';

interface AlertDetailsDialogProps {
  alert: Alert | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function AlertDetailsDialog({ alert, isOpen, onOpenChange }: AlertDetailsDialogProps) {
  const [enhancedDescription, setEnhancedDescription] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when alert changes
    if (alert) {
      setEnhancedDescription(null);
      setIsEnhancing(false);
      setError(null);
    }
  }, [alert]);

  const handleEnhance = async () => {
    if (!alert) return;
    setIsEnhancing(true);
    setError(null);
    setEnhancedDescription(null);
    try {
      const result = await enhanceAlertDescription({ originalDescription: alert.descripcion_original });
      setEnhancedDescription(result.enhancedDescription);
    } catch (e) {
      console.error(e);
      setError('Error al mejorar la descripción. Por favor, inténtelo de nuevo.');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  if (!alert) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Detalles de Alerta: {alert.id}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            Clasificación: {alert.clasificacion} | Prioridad: <PriorityBadge priority={alert.prioridad} />
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <ScrollArea className="h-80 w-full">
            <div className="space-y-4 pr-6">
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />Descripción Original</h4>
                    <p className="text-sm text-muted-foreground">{alert.descripcion_original}</p>
                </div>

                <Separator />
                
                <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Info className="h-4 w-4 text-blue-500" />Análisis Pre-procesado (Mock)</h4>
                    <p className="text-sm text-muted-foreground">{alert.descripcion_gemini}</p>
                </div>

                <Separator />

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-accent" />Análisis con IA (En Vivo)</h4>
                        <Button onClick={handleEnhance} disabled={isEnhancing} size="sm">
                            {isEnhancing ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Sparkles className="mr-2 h-4 w-4" />
                            )}
                            {isEnhancing ? 'Analizando...' : 'Generar Análisis'}
                        </Button>
                    </div>

                    {!enhancedDescription && !isEnhancing && (
                        <div className="text-sm text-muted-foreground p-4 border rounded-md min-h-[100px] flex items-center justify-center border-dashed">
                            Haga clic en 'Generar Análisis' para obtener información de la IA.
                        </div>
                    )}
                    
                    {isEnhancing && (
                        <div className="text-sm text-muted-foreground p-4 border rounded-md min-h-[100px] flex items-center justify-center">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generando análisis mejorado...
                        </div>
                    )}
                    
                    {error && <p className="text-sm text-destructive">{error}</p>}
                    
                    {enhancedDescription && (
                        <div className="text-sm text-muted-foreground p-4 border-primary/50 border rounded-md bg-primary/5 min-h-[100px]">
                            {enhancedDescription}
                        </div>
                    )}
                </div>
            </div>
          </ScrollArea>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
