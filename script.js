"use strict";

/* =========================================
    PRESUPUESTO DE MATERIALES
   ========================================= */


const materiales = [
  ["ESP32 DevKit 38 pines", 1, 135, 135],
  ["Lector de huella AS608 / R307", 1, 230, 230],
  ["Chapa electromecánica solenoide", 1, 110, 110],
  ["Ventilador de 12 V", 1, 60, 60],
  ["Pantalla OLED SSD1306", 1, 50, 50],
  ["Luz de crecimiento LED", 1, 40, 40],
  ["Cargador de 12 V", 1, 55, 55],
  ["Cargador de 5 V", 1, 40, 40],
  ["Regulador de voltaje", 1, 17, 17],
  ["Shield de expansión para ESP32", 1, 55, 55],
  ["Cable plano 28 AWG", 1, 39, 39],
  ["Cable DuPont, 5 metros", 1, 160, 160],
  ["Adaptadores DuPont, caja", 1, 68, 68],
  ["Cableado de interconexión", 1, 18, 18],
  ["Sensor DHT11", 1, 35, 35],
  ["Sensor BH1750", 1, 35, 35],
  ["Sonda de humedad FC-28", 1, 31, 31],
  ["Sensor ultrasónico HC-SR04", 1, 25, 25],
  ["Sensor PIR HC-SR501", 2, 25, 50],
  ["Sensor MQ-135", 1, 31, 31],
  ["Sensor MQ-7", 1, 31, 31],
  ["Módulo L298N", 1, 33, 33],
  ["Módulo de relé de dos canales", 1, 34, 34],
  ["Bomba de agua sumergible", 1, 25, 25],
  ["Conversor bidireccional de niveles", 1, 23, 23],
  ["Módulo de buzzer pasivo", 1, 15, 15],
  ["Diodos 1N4007", 2, 5, 10],
  ["Resistencias de 10 kΩ", 5, 1, 5],
  ["Resistencias de 20 kΩ", 5, 1, 5],
  ["Borneras de distribución", 2, 10, 20],
  ["Conectores Jack DC", 3, 4, 12],
  ["Conectores Jack DC hembra", 2, 7, 14],
  ["Placa perforada 5 × 5 cm", 1, 8, 8],
  ["Protoboard de 40 puntos", 1, 9, 9],
  ["LED indicadores", 2, 5, 10],
  ["Manguera para riego", 2, 4, 8],
  ["Termoencogible", 1, 5, 5]
];

/* Convierte un número a formato monetario en quetzales. */
function formatoMoneda(valor) {
  return "Q " + Number(valor).toLocaleString("es-GT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

/* Construye las filas de la tabla sin escribirlas manualmente en HTML. */
function cargarMateriales() {
  const tabla = document.getElementById("materialsTable");

  if (!tabla) return;

  tabla.replaceChildren();

  materiales.forEach(function(material) {
    const [nombre, cantidad, precio, subtotal] = material;

    const fila = document.createElement("tr");

    [nombre, cantidad, formatoMoneda(precio), formatoMoneda(subtotal)]
      .forEach(function(valor) {
        const celda = document.createElement("td");
        celda.textContent = valor;
        fila.appendChild(celda);
      });

    tabla.appendChild(fila);
  });

}

cargarMateriales();


/* =========================================
    ACTIVIDADES DEL CRONOGRAMA
   ========================================= */


const fases = [
  {
    nombre: "Fase 1 · Diseño y propuesta",
    actividades: [
      "Diseño del proyecto",
      "Selección de los componentes",
      "Cotización de los componentes",
      "Lista de materiales y presupuesto",
      "Entrega de fase 1"
    ]
  },
  {
    nombre: "Fase 2 · Análisis del proyecto",
    actividades: [
      "Distribución de tareas del equipo",
      "Análisis de riesgos y contingencias",
      "Ventajas y desventajas del proyecto",
      "Entrega de fase 2"
    ]
  },
  {
    nombre: "Fase 3 · Ensamble",
    actividades: [
      "Construcción de maqueta del invernadero",
      "Preparación de espacios para componentes",
      "Instalación de componentes electrónicos",
      "Cableado de sensores y actuadores",
      "Pruebas individuales de componentes"
    ]
  },
  {
    nombre: "Fase 4 · Programación de los componentes",
    actividades: [
      "Programación del ESP32",
      "Configuración de sensores",
      "Configuración de actuadores",
      "Pruebas de comunicación con ESP32",
      "Entrega de prototipo (en un 80%)"
    ]
  },
  {
    nombre: "Fase 5 · Pruebas y entrega",
    actividades: [
      "Arreglos estéticos a la maqueta",
      "Pruebas generales",
      "Configuración del Wi-Fi en el ESP32",
      "Conexión y visualización con RainMaker",
      "Pruebas de sensores mediante RainMaker",
      "Pruebas generales del sistema",
      "Revisión final y documentación",
      "Entrega final"
    ]
  }
];

/* Muestra las actividades debajo del diagrama Gantt. */
function cargarFases() {
  const contenedor = document.getElementById("phaseDetails");

  if (!contenedor) return;

  contenedor.replaceChildren();

  fases.forEach(function(fase) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "phase-detail";

    const titulo = document.createElement("b");
    titulo.textContent = fase.nombre;

    const lista = document.createElement("ul");

    fase.actividades.forEach(function(actividad) {
      const elemento = document.createElement("li");
      elemento.textContent = actividad;
      lista.appendChild(elemento);
    });

    tarjeta.append(titulo, lista);
    contenedor.appendChild(tarjeta);
  });
}

cargarFases();


/* =========================================
    RIESGOS DEL PROYECTO
   ========================================= */


const riesgos = [
  { codigo: "A1", nombre: "Falla del sensor de humedad", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Riego por pulsos, medición entre pulsos y validación de la lectura.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "A2", nombre: "Bomba con depósito vacío", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Bloqueo del riego por debajo del 15 % del nivel y reintento diferido.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "A3", nombre: "Desbordamiento del depósito", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "El llenado es manual en esta fase; el abastecimiento automático queda previsto.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "A4", nombre: "Falsos disparos de la alarma", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Tres detecciones separadas al menos 15 segundos en una ventana de 60 segundos, tras estabilización.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "A5", nombre: "Fuerza bruta en el lector biométrico", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Bloqueo durante 60 segundos tras cinco intentos fallidos, con conteo y aviso.", nivel: "high", responsable: "Equipo del proyecto" },
  { codigo: "A6", nombre: "Cambios en las personas autorizadas", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Revocación remota de una huella por identificador.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "A7", nombre: "Corte eléctrico prolongado", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Batería de respaldo y conector de emergencia previstos para la instalación definitiva.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "A8", nombre: "Lecturas inválidas de sensores", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Validación de rango, descarte de lectura y notificación.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "A9", nombre: "Pérdida de conexión inalámbrica", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "El control local continúa sin bloquearse a la espera de la red.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "A10", nombre: "Borrado de configuración", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Persistencia de umbrales, huellas y estado en memoria no volátil.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "A11", nombre: "Picos de corriente inductivos", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Diodos internos del L298N y diodo 1N4007 en paralelo con la bobina de la chapa.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "A12", nombre: "Riego manual sin teléfono móvil", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "El pulsador físico local está previsto para la instalación definitiva.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "A13", nombre: "Exposición del lector al clima", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Visera protectora instalada sobre el lector.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "B1", nombre: "Retraso en una fase crítica", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Seguimiento del cronograma y redistribución de tareas.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "B2", nombre: "Dependencia entre subsistemas", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Integración por etapas y pruebas de los módulos.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "B3", nombre: "Redistribución por ausencia de integrante", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Redistribución de tareas dentro del equipo.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "C1", nombre: "Retraso de componentes importados", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Se utilizó una solución alternativa para continuar el cronograma.", nivel: "high", responsable: "Equipo del proyecto" },
  { codigo: "C2", nombre: "Variación de precio o desabastecimiento", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Comparación de precios y sustituciones compatibles.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "D1", nombre: "Margen de contingencia insuficiente", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "El margen de contingencia previsto no llegó a utilizarse.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "E1", nombre: "Curva de aprendizaje del equipo", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "La dedicación adicional al diagnóstico de interfaces quedó documentada.", nivel: "high", responsable: "Equipo del proyecto" },
  { codigo: "E2", nombre: "Concentración del conocimiento técnico", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Documentación técnica y repositorio del proyecto.", nivel: "high", responsable: "Equipo del proyecto" },
  { codigo: "F1", nombre: "Conflicto entre librerías", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Se corrigió la inicialización del bus I2C compartido.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "F2", nombre: "Fallo en actualización remota de firmware", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Riesgo de software contemplado en el análisis consolidado.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "G1", nombre: "Protección de datos biométricos", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "La plantilla permanece en el módulo lector y no se transmite por la red.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "G2", nombre: "Exposición de credenciales", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Riesgo de seguridad de información contemplado en el análisis consolidado.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "H1", nombre: "Degradación por clima de la región", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Protección física de los componentes expuestos.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "I1", nombre: "Fallo del prototipo en la demostración", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Pruebas de validación e integración realizadas antes de la presentación.", nivel: "high", responsable: "Equipo del proyecto" },
  { codigo: "I2", nombre: "Cobertura inalámbrica en la defensa", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "La operación local no depende de la conectividad; telemetría sí.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "J1", nombre: "Soporte técnico posterior a la entrega", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Documentación técnica para facilitar el mantenimiento.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "J2", nombre: "Disponibilidad de repuestos", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Componentes y repuestos identificados en el presupuesto.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "K1", nombre: "Salida de emergencia con chapa cerrada", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Para instalación definitiva se requiere apertura manual interior.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "K2", nombre: "Pérdida de firmware sin respaldo", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Repositorio de control de versiones con firmware y documentación.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "K3", nombre: "Cambio de alcance solicitado", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Riesgo de gestión registrado en el análisis consolidado.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "L1", nombre: "Adaptación de niveles por exceso", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "El HC-SR501 se conecta directamente porque su salida ya es compatible con 3.3 V.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "L2", nombre: "Chapa energizada al desconectar la placa", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Resistencia de 10 kΩ entre el pin de control y la alimentación del relé, instalada y verificada.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "L3", nombre: "Presupuesto de corriente del puerto USB", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Ensayo a plena carga realizado; cargador externo disponible como alternativa.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "L4", nombre: "Transistor sin corte en el buzzer", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Se elevó la señal de control mediante el conversor de nivel.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "L5", nombre: "Librería reconfigurando el bus", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "La pantalla se inicializa sin reconfigurar el periférico y se fija una velocidad común.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "L6", nombre: "Doble gobierno de un actuador", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Una sola función toma la decisión del ventilador con las cuatro lecturas.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "L7", nombre: "Reintentos sin intervalo en el riego", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Se incorporó un tiempo para el próximo intento y verificación previa del nivel.", nivel: "low", responsable: "Equipo del proyecto" },
  { codigo: "L8", nombre: "Sincronización del registro de huellas", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Rediseño del registro y verificación de integridad entre ambos almacenes.", nivel: "medium", responsable: "Equipo del proyecto" },
  { codigo: "L9", nombre: "Terminales reservados de la placa", impacto: "Riesgo documentado en el análisis consolidado del informe final.", mitigacion: "Los seis terminales asociados a la memoria flash se excluyeron del diseño.", nivel: "medium", responsable: "Equipo del proyecto" }
];

/* Texto que verá el visitante para cada nivel. */
const etiquetasRiesgo = {
  low: "Bajo",
  medium: "Medio",
  high: "Alto",
  critical: "Crítico"
};

/* Genera las tarjetas desplegables de riesgos. */
function cargarRiesgos(filtro = "all") {
  const contenedor = document.getElementById("riskList");

  if (!contenedor) return;

  contenedor.replaceChildren();

  const riesgosFiltrados = riesgos.filter(function(riesgo) {
    return filtro === "all" || riesgo.nivel === filtro;
  });

  riesgosFiltrados.forEach(function(riesgo) {
    const tarjeta = document.createElement("details");
    tarjeta.className = "risk-item";

    const resumen = document.createElement("summary");

    const punto = document.createElement("span");
    punto.className = "risk-dot";

    const colores = {
      low: "var(--risk-low)",
      medium: "var(--risk-medium)",
      high: "var(--risk-high)",
      critical: "var(--risk-critical)"
    };

    punto.style.background = colores[riesgo.nivel];

    const principal = document.createElement("span");
    principal.className = "risk-item-main";

    const titulo = document.createElement("b");
    titulo.textContent = `${riesgo.codigo} · ${riesgo.nombre}`;

    const detalle = document.createElement("small");
    detalle.textContent =
      `${etiquetasRiesgo[riesgo.nivel]} · Responsable: ${riesgo.responsable}`;

    principal.append(titulo, detalle);
    resumen.append(punto, principal);

    const contenido = document.createElement("div");
    contenido.className = "risk-detail";

    const impacto = document.createElement("p");
    const etiquetaImpacto = document.createElement("strong");
    etiquetaImpacto.textContent = "Impacto: ";
    impacto.append(etiquetaImpacto, document.createTextNode(riesgo.impacto));

    const mitigacion = document.createElement("p");
    const etiquetaMitigacion = document.createElement("strong");
    etiquetaMitigacion.textContent = "Medida de mitigación: ";
    mitigacion.append(
      etiquetaMitigacion,
      document.createTextNode(riesgo.mitigacion)
    );

    contenido.append(impacto, mitigacion);
    tarjeta.append(resumen, contenido);
    contenedor.appendChild(tarjeta);
  });
}

cargarRiesgos();

/* Mantiene los contadores de la interfaz sincronizados con los 42 riesgos del informe. */
(function actualizarContadoresRiesgo() {
  const niveles = { low: 0, medium: 0, high: 0, critical: 0 };
  riesgos.forEach(function (riesgo) { niveles[riesgo.nivel] += 1; });
  document.querySelectorAll(".filter-chip").forEach(function (boton) {
    const nivel = boton.dataset.filter;
    const contador = boton.querySelector("span");
    if (!contador) return;
    contador.textContent = nivel === "all" ? String(riesgos.length) : String(niveles[nivel] || 0);
  });
})();


/* =========================================
    FILTROS DE LA MATRIZ DE RIESGOS
   ========================================= */


function seleccionarNivelRiesgo(nivel) {
  document.querySelectorAll(".filter-chip").forEach(function(boton) {
    boton.classList.toggle(
      "active",
      boton.dataset.filter === nivel
    );
  });

  cargarRiesgos(nivel);
}

/* Filtros: todos, bajo, medio, alto y crítico. */
document.querySelectorAll(".filter-chip").forEach(function(boton) {
  boton.addEventListener("click", function() {
    seleccionarNivelRiesgo(boton.dataset.filter);
  });
});

/* Al seleccionar una celda de la matriz se filtra el listado. */
document.querySelectorAll("[data-risk-filter]").forEach(function(celda) {
  celda.addEventListener("click", function() {
    seleccionarNivelRiesgo(celda.dataset.riskFilter);
  });
});

/* Permite volver al listado completo. */
const botonTodos = document.getElementById("clearRiskFilter");

if (botonTodos) {
  botonTodos.addEventListener("click", function() {
    seleccionarNivelRiesgo("all");
  });
}


/* =========================================
    MENÚ PARA PANTALLAS PEQUEÑAS
   ========================================= */

const botonMenu = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("mainNav");

if (botonMenu && menuPrincipal) {

  /* Abre y cierra el menú. */
  botonMenu.addEventListener("click", function() {
    const abierto = menuPrincipal.classList.toggle("open");

    botonMenu.setAttribute("aria-expanded", String(abierto));

    botonMenu.setAttribute(
      "aria-label",
      abierto ? "Cerrar menú" : "Abrir menú"
    );
  });

  /* Cierra el menú al elegir una sección. */
  menuPrincipal.querySelectorAll("a").forEach(function(enlace) {
    enlace.addEventListener("click", function() {
      menuPrincipal.classList.remove("open");
      botonMenu.setAttribute("aria-expanded", "false");
      botonMenu.setAttribute("aria-label", "Abrir menú");
    });
  });
}