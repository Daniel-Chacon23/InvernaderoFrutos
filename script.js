"use strict";

/* =========================================
    PRESUPUESTO DE MATERIALES
   ========================================= */


const materiales = [
  ["Termoencogible (Termofit)", 1, 5, 5],
  ["Pulsador físico", 1, 5, 5],
  ["Manguera para riego (2 m)", 2, 4, 8],
  ["LED indicador", 2, 5, 10],
  ["Módulo LED RGB", 1, 12, 12],
  ["Conectores Jack DC hembra", 3, 4, 12],
  ["Conversor de nivel lógico (4 ch)", 1, 15, 15],
  ["Módulo de buzzer", 1, 15, 15],
  ["Cableado (jumpers)", 1, 18, 18],
  ["Fuente de poder 5V (USB)", 1, 20, 20],
  ["Módulo relé (1 canal)", 1, 20, 20],
  ["Módulo relé adicional", 1, 20, 20],
  ["Kit de protección electrónica", 1, 20, 20],
  ["Sensor ultrasónico HC-SR04", 1, 25, 25],
  ["Bomba de agua 12V", 1, 25, 25],
  ["Sensor PIR", 1, 25, 25],
  ["Módulo MAX485", 1, 25, 25],
  ["Sensor de calidad de aire MQ135", 1, 31, 31],
  ["Sensor de monóxido de carbono MQ7", 1, 31, 31],
  ["Módulo L298N", 1, 33, 33],
  ["Sensor BH1750", 1, 35, 35],
  ["Ribbon Cable 28AWG", 1, 39, 39],
  ["Fuente de poder 12V", 1, 40, 40],
  ["Luz de crecimiento (1 m)", 1, 40, 40],
  ["Shield de expansión ESP32", 1, 50, 50],
  ["Pantalla LCD / OLED", 1, 50, 50],
  ["Ventilador 12V", 1, 60, 60],
  ["Sensor DHT21 (AM2301)", 1, 71, 71],
  ["Chapa electromecánica solenoide 12V", 1, 110, 110],
  ["Sensor de huella AS608/R307", 1, 150, 150],
  ["ESP32 38 pines", 1, 135, 160],
  ["Sistema / batería UPS 12V-5V", 1, 180, 180],
  ["Sensor de suelo 7 en 1 (RS485)", 1, 475, 475]
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

  const filaContingencia = document.createElement("tr");

  [
    "Contingencia (10%)",
    "1",
    formatoMoneda(204),
    formatoMoneda(204)
  ].forEach(function(valor) {
    const celda = document.createElement("td");
    celda.textContent = valor;
    filaContingencia.appendChild(celda);
  });

  tabla.appendChild(filaContingencia);
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
  {
    codigo: "A1",
    nombre: "Falla o desconexión del sensor de humedad del suelo",
    impacto: "Riego continuo, desperdicio de agua y posible daño al cultivo.",
    mitigacion: "Temporizador watchdog: la bomba se apaga tras un máximo de 3 minutos de riego continuo.",
    nivel: "high",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A2",
    nombre: "La bomba funciona con el tanque vacío",
    impacto: "Daño al motor de la bomba.",
    mitigacion: "El sensor ultrasónico deshabilita la bomba cuando el nivel baja del 10% y genera un aviso.",
    nivel: "high",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A3",
    nombre: "Desbordamiento del tanque durante el llenado manual",
    impacto: "Pérdida de agua e inundación del área.",
    mitigacion: "Alarma sonora constante cuando el nivel supera el 90% de la capacidad.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A4",
    nombre: "Falsos disparos de la alarma por corrientes de aire caliente sobre el PIR",
    impacto: "Alertas innecesarias y desconfianza en el sistema.",
    mitigacion: "Se exige una señal ALTA continua durante al menos 3 segundos.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A5",
    nombre: "Intentos de acceso no autorizado por fuerza bruta en el lector de huellas",
    impacto: "Vulneración del control de acceso.",
    mitigacion: "Bloqueo del sensor durante 60 segundos después de 5 intentos fallidos consecutivos y aviso al operador.",
    nivel: "critical",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A6",
    nombre: "Cambios en las personas autorizadas a ingresar",
    impacto: "Ingreso de una persona que ya no debería tener acceso.",
    mitigacion: "Revocación remota de una huella por ID o alias, sin borrar toda la base.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A7",
    nombre: "Corte eléctrico prolongado que agota la batería UPS",
    impacto: "El operador podría no abrir la puerta biométrica.",
    mitigacion: "Emergency Jack externo de 12V para energizar temporalmente la chapa y el ESP32.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A8",
    nombre: "Lecturas inválidas por sensor dañado o desconectado",
    impacto: "Decisiones de control erróneas que podrían dañar el cultivo.",
    mitigacion: "Modo Safe State, LED RGB naranja, aviso al operador y actuadores en ciclo pasivo por temporizador.",
    nivel: "high",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A9",
    nombre: "Pérdida de conexión Wi-Fi o de servidores RainMaker",
    impacto: "Pérdida de monitoreo y control remoto.",
    mitigacion: "El sistema continúa operando localmente mientras se restablece la conexión.",
    nivel: "low",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A10",
    nombre: "Corte de energía que borra la configuración vigente",
    impacto: "Pérdida de umbrales, huellas registradas y estado de alarma.",
    mitigacion: "Persistencia de la configuración en memoria no volátil NVS.",
    nivel: "low",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A11",
    nombre: "Picos de corriente al energizar la bomba o la chapa solenoide",
    impacto: "Reinicios inesperados del ESP32 (brownout).",
    mitigacion: "Capacitor de 1000 µF, diodos flyback 1N4007, fusible de 5A y tierra común.",
    nivel: "low",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A12",
    nombre: "El operador necesita regar sin tener su teléfono",
    impacto: "Imposibilidad de activar el riego a tiempo.",
    mitigacion: "Pulsador físico local que activa la bomba durante 60 segundos.",
    nivel: "high",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "A13",
    nombre: "Exposición del lector biométrico al sol o condensación",
    impacto: "Daño o falla de lectura del sensor óptico.",
    mitigacion: "Gabinete estanco con visera protectora superior.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "B1",
    nombre: "Retraso en una fase crítica del cronograma",
    impacto: "Atraso de las fases posteriores y de la entrega.",
    mitigacion: "Revisión semanal, holgura entre fases críticas y reasignación si el atraso supera el 20%.",
    nivel: "high",
    responsable: "Jorge Daniel Aguilar García"
  },
  {
    codigo: "B2",
    nombre: "Dependencia entre subsistemas",
    impacto: "La integración de firmware y las pruebas pueden retrasarse.",
    mitigacion: "Diseño modular, pruebas por subsistema e integración incremental.",
    nivel: "medium",
    responsable: "Jorge Daniel Aguilar García"
  },
  {
    codigo: "B3",
    nombre: "Ausencia temporal de un integrante",
    impacto: "Sobrecarga del equipo y atraso puntual.",
    mitigacion: "Bitácora técnica compartida y revisión cruzada de tareas.",
    nivel: "low",
    responsable: "Jorge Daniel Aguilar García"
  },
  {
    codigo: "C1",
    nombre: "Retraso de componentes importados, especialmente la sonda 7 en 1",
    impacto: "Bloqueo del módulo de suelo y retraso general.",
    mitigacion: "Compra anticipada, proveedor alterno y holgura de al menos una semana.",
    nivel: "high",
    responsable: "Angela Gabriela Cujcuj Choy"
  },
  {
    codigo: "C2",
    nombre: "Variación de precio o desabastecimiento local",
    impacto: "Sobrecosto o sustitución de componentes.",
    mitigacion: "Cotizar con al menos dos proveedores y utilizar el margen de contingencia si corresponde.",
    nivel: "medium",
    responsable: "Angela Gabriela Cujcuj Choy"
  },
  {
    codigo: "D1",
    nombre: "La contingencia de Q204 resulta insuficiente",
    impacto: "Aporte adicional no presupuestado.",
    mitigacion: "Registro actualizado de gastos y aprobación conjunta de gastos no previstos.",
    nivel: "low",
    responsable: "Angela Gabriela Cujcuj Choy"
  },
  {
    codigo: "E1",
    nombre: "Curva de aprendizaje en ESP32, RainMaker y RS485",
    impacto: "Retrasos por errores durante programación e integración.",
    mitigacion: "Capacitación cruzada y revisión de documentación oficial y ejemplos.",
    nivel: "high",
    responsable: "Jorge Daniel Aguilar García"
  },
  {
    codigo: "E2",
    nombre: "Conocimiento técnico crítico concentrado en una persona",
    impacto: "Bloqueo de una fase si esa persona no está disponible.",
    mitigacion: "Programación en pareja y documentación técnica de los módulos críticos.",
    nivel: "high",
    responsable: "Jorge Daniel Aguilar García"
  },
  {
    codigo: "F1",
    nombre: "Incompatibilidad entre librerías o conflictos de pines",
    impacto: "Lecturas erróneas, bloqueos o fallas del microcontrolador.",
    mitigacion: "Probar sensores por separado, fijar versiones de librerías y revisar pines e interrupciones.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "F2",
    nombre: "Fallo durante actualización de firmware OTA",
    impacto: "Dispositivo sin conectividad o inestable.",
    mitigacion: "Mantener firmware estable de respaldo y actualizar en ventanas de prueba controladas.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "G1",
    nombre: "Protección inadecuada de datos biométricos",
    impacto: "Exposición de datos sensibles del personal.",
    mitigacion: "Las plantillas se guardan en el módulo AS608/R307, no como imágenes, y no se exportan a la nube.",
    nivel: "medium",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "G2",
    nombre: "Exposición de credenciales Wi-Fi/RainMaker por acceso físico",
    impacto: "Control no autorizado del sistema.",
    mitigacion: "Gabinete con cerradura, contraseñas robustas y deshabilitación del puerto USB/JTAG en la versión final.",
    nivel: "low",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "H1",
    nombre: "Degradación por polvo, calor y humedad de Zacapa",
    impacto: "Menor vida útil y fallas prematuras.",
    mitigacion: "Gabinete con protección adecuada, ventilación pasiva y revisión de sellos y viseras.",
    nivel: "medium",
    responsable: "José Daniel Chacón Najarro"
  },
  {
    codigo: "I1",
    nombre: "Fallo del prototipo durante la presentación",
    impacto: "Afectación de la defensa final.",
    mitigacion: "Ensayo general el día previo y video de respaldo grabado con anticipación.",
    nivel: "high",
    responsable: "Jorge Daniel Aguilar García"
  },
  {
    codigo: "I2",
    nombre: "Falta de Wi-Fi estable durante la defensa",
    impacto: "No se muestra telemetría ni control remoto en tiempo real.",
    mitigacion: "Confirmar la red del lugar o preparar un punto de acceso móvil de respaldo.",
    nivel: "medium",
    responsable: "Jorge Daniel Aguilar García"
  },
  {
    codigo: "J1",
    nombre: "Ausencia de esquema de soporte post-entrega",
    impacto: "El cliente no sabe a quién acudir ante una falla.",
    mitigacion: "Entregar manual técnico y de usuario y definir un periodo básico de soporte.",
    nivel: "medium",
    responsable: "José Daniel Chacón Najarro"
  },
  {
    codigo: "J2",
    nombre: "Disponibilidad limitada de repuestos a mediano plazo",
    impacto: "Reparaciones más lentas ante una falla.",
    mitigacion: "Documentar proveedores y referencias exactas de componentes críticos.",
    nivel: "low",
    responsable: "José Daniel Chacón Najarro"
  },
  {
    codigo: "K1",
    nombre: "La chapa fail-secure impide salir durante un corte de energía",
    impacto: "Riesgo para las personas en una emergencia.",
    mitigacion: "Instalar apertura manual desde el interior, independiente del suministro eléctrico.",
    nivel: "high",
    responsable: "Belsin David Moscoso Pérez"
  },
  {
    codigo: "K2",
    nombre: "Pérdida del firmware o configuración por falta de respaldo",
    impacto: "Pérdida de trabajo y retraso severo.",
    mitigacion: "Repositorio GitHub con commits regulares y una copia local adicional.",
    nivel: "medium",
    responsable: "Jorge Israel Toc Obregon"
  },
  {
    codigo: "K3",
    nombre: "Cambio de alcance solicitado por el cliente a mitad del proyecto",
    impacto: "Retrabajo, desvío de recursos y posible incumplimiento del cronograma.",
    mitigacion: "Documentar el alcance y evaluar formalmente tiempo y costo de cualquier cambio.",
    nivel: "medium",
    responsable: "José Daniel Chacón Najarro"
  }
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