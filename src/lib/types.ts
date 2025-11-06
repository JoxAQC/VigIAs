export type Alert = {
  id: string;
  tipo: 'PANICO_1TOQUE' | 'VEHICULO_SOSPECHOSO' | 'ACTIVIDAD_SOSPECHOSA' | 'ACCIDENTE' | 'INCENDIO';
  ubicacion: { lat: number; lng: number };
  clasificacion: 'Robo a Casa' | 'Conflicto en la Vía Pública' | 'Accidente de Tránsito' | 'Vandalismo' | 'Violencia de Género' | 'Otro';
  prioridad: 'ALTA' | 'MEDIA' | 'BAJA';
  timestamp: string;
  estado: 'VALIDADO_CRITICO' | 'EN_PROGRESO' | 'ATENDIDO' | 'CERRADO';
  descripcion_original: string;
  descripcion_gemini: string;
};

export type HotSpot = {
  zona: string;
  ubicacion: { lat: number; lng: number };
  nivel_riesgo: 'CRÍTICO' | 'ALTO' | 'MODERADO';
  incidentes_24h: number;
  camaras_disponibles: number;
  tendencia: string;
};

export type Resources = {
  serenazgo: {
    disponibles: number;
    total: number;
  };
  policia: {
    disponibles: number;
    total: number;
  };
  camaras: {
    operativas: number;
    total: number;
  };
};
