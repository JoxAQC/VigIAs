
import type { Alert, HotSpot, Resources } from './types';

// Helper function to generate random coordinates within SJL, Lima, Peru
const getRandomCoordinates = () => {
  // Bounding box for San Juan de Lurigancho
  const minLat = -12.08;
  const maxLat = -11.91;
  const minLng = -77.05;
  const maxLng = -76.92;
  return {
    lat: Math.random() * (maxLat - minLat) + minLat,
    lng: Math.random() * (maxLng - minLng) + minLng,
  };
};

const alertTypes: Alert['tipo'][] = ['PANICO_1TOQUE', 'VEHICULO_SOSPECHOSO', 'ACTIVIDAD_SOSPECHOSA', 'ACCIDENTE', 'INCENDIO'];
const classifications: Alert['clasificacion'][] = ['Robo a Casa', 'Conflicto en la Vía Pública', 'Accidente de Tránsito', 'Vandalismo', 'Violencia de Género', 'Otro'];
const priorities: Alert['prioridad'][] = ['ALTA', 'MEDIA', 'BAJA'];
const statuses: Alert['estado'][] = ['VALIDADO_CRITICO', 'EN_PROGRESO', 'ATENDIDO', 'CERRADO'];

const generateMockDescription = (tipo: Alert['tipo'], clasificacion: Alert['clasificacion']) => {
    const original = `Reporte de ${clasificacion.toLowerCase()} a través de alerta tipo ${tipo.toLowerCase()}. Se solicita asistencia inmediata.`;
    const gemini = `Análisis de alerta: Correlación de datos sugiere un ${clasificacion.toLowerCase()}. La activación de '${tipo}' indica urgencia. Se recomienda despacho de la unidad más cercana y notificación a la central de monitoreo. Patrones recientes en la zona: Ninguno.`;
    return { original, gemini };
}

export const ALERTAS_SIMULADAS: Alert[] = Array.from({ length: 50 }, (_, i) => {
  const tipo = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  const clasificacion = classifications[Math.floor(Math.random() * classifications.length)];
  const descriptions = generateMockDescription(tipo, clasificacion);
  return {
    id: `A${(i + 1).toString().padStart(3, '0')}`,
    tipo,
    ubicacion: getRandomCoordinates(),
    clasificacion,
    prioridad: priorities[Math.floor(Math.random() * priorities.length)],
    timestamp: new Date(Date.now() - Math.random() * 72 * 60 * 60 * 1000).toISOString(),
    estado: statuses[Math.floor(Math.random() * statuses.length)],
    descripcion_original: descriptions.original,
    descripcion_gemini: descriptions.gemini,
  };
});

ALERTAS_SIMULADAS.unshift({
  id: 'A001',
  tipo: 'PANICO_1TOQUE',
  ubicacion: { lat: -12.0089, lng: -76.9920 },
  clasificacion: 'Robo a Casa',
  prioridad: 'ALTA',
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  estado: 'VALIDADO_CRITICO',
  descripcion_original: "Persona en casa, escuchó ruidos extraños, presionó botón de pánico.",
  descripcion_gemini: "Se reporta un posible allanamiento o intrusión domiciliaria. La víctima activó una alerta de pánico sin poder proporcionar más detalles verbales. Se recomienda despliegue de unidad cercana y verificación visual."
});


export const PUNTOS_CALIENTES_SIMULADOS: HotSpot[] = [
  {
    zona: 'Mangomarca Baja',
    ubicacion: { lat: -12.0092, lng: -76.9928 },
    nivel_riesgo: 'CRÍTICO',
    incidentes_24h: 15,
    camaras_disponibles: 2,
    tendencia: 'Aumento del 20% en la última hora',
  },
  {
    zona: 'Canto Grande',
    ubicacion: { lat: -11.9745, lng: -76.9851 },
    nivel_riesgo: 'ALTO',
    incidentes_24h: 11,
    camaras_disponibles: 5,
    tendencia: 'Estable',
  },
  {
    zona: 'Zárate',
    ubicacion: { lat: -12.0450, lng: -76.9950 },
    nivel_riesgo: 'ALTO',
    incidentes_24h: 9,
    camaras_disponibles: 3,
    tendencia: 'Disminución del 10% en las últimas 3 horas',
  },
  {
    zona: 'Las Flores',
    ubicacion: { lat: -12.0195, lng: -77.0001 },
    nivel_riesgo: 'MODERADO',
    incidentes_24h: 5,
    camaras_disponibles: 8,
    tendencia: 'Estable',
  },
    {
    zona: 'Mariscal Cáceres',
    ubicacion: { lat: -12.0010, lng: -76.9560 },
    nivel_riesgo: 'CRÍTICO',
    incidentes_24h: 18,
    camaras_disponibles: 1,
    tendencia: 'Aumento del 35% en la última hora',
  },
];

export const RECURSOS_SIMULADOS: Resources = {
  serenazgo: {
    disponibles: 42,
    total: 50,
  },
  policia: {
    disponibles: 78,
    total: 90,
  },
  camaras: {
    operativas: 125,
    total: 150,
  },
};
