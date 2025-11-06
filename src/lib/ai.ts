export interface StudyPlan {
  topic: string;
  summary: string;
  keyConcepts: string[];
  schedule: {
    day: string;
    task: string;
  }[];
  videos: {
    title: string;
    url: string;
  }[];
  exercises: {
    question: string;
    answer: string;
  }[];
  tips: string[];
  funFacts: string[];
  readingMaterials: { title: string; url: string; }[];
}

const aiContentLibrary: Record<string, StudyPlan> = {
  "default": {
    topic: "Contenido de Ejemplo",
    summary: "Este es un resumen generado por IA sobre cómo funciona esta herramienta. La IA analiza un tema complejo y lo descompone en partes manejables para facilitar tu aprendizaje.",
    keyConcepts: [
      "Este es un plan de estudio generado por IA.",
      "La IA identifica los puntos más importantes de un tema.",
      "Luego, crea ejercicios para ayudarte a practicar.",
      "Puedes pedirle cualquier tema que necesites estudiar."
    ],
    schedule: [
      { day: "Día 1", task: "Revisar el resumen y los conceptos clave." },
      { day: "Día 2", task: "Ver los videos recomendados y tomar notas." },
      { day: "Día 3", task: "Resolver los ejercicios prácticos y repasar." },
    ],
    videos: [
      { title: "Cómo Estudiar Eficazmente", url: "https://www.youtube.com/watch?v=vs2p6hG5TqY" }
    ],
    readingMaterials: [],
    exercises: [
      {
        question: "¿Cuál es el propósito de esta función?",
        answer: "Demostrar cómo la IA puede estructurar el aprendizaje, presentando conceptos clave y ejercicios prácticos para reforzar el conocimiento."
      }
    ],
    tips: ["Usa la técnica Pomodoro para mantener la concentración.", "Relaciona los nuevos conceptos con cosas que ya sabes."],
    funFacts: ["Tu cerebro crea nuevas conexiones cada vez que aprendes algo nuevo."]
  },
  "historia del peru": {
    topic: "Historia del Perú (Época Pre-Inca e Inca)",
    summary: "Un recorrido por las fascinantes culturas que habitaron el antiguo Perú antes de la llegada de los españoles, culminando en el grandioso Imperio de los Incas, el más grande de la América precolombina.",
    keyConcepts: [
      "Horizontes e Intermedios: La periodización clave (Chavín, Moche, Nazca, Wari, Chimú).",
      "Desarrollo cultural: Avances en cerámica, textilería, metalurgia y agricultura.",
      "El Tahuantinsuyo: Origen, organización social (Ayllu, Panaca), red de caminos (Qhapaq Ñan) y sistema de contabilidad (Quipus).",
      "Cosmovisión Andina: La dualidad, la reciprocidad (Ayni, Minka) y la adoración a la naturaleza (Inti, Pachamama).",
      "Caída del Imperio: La guerra civil entre Huáscar y Atahualpa y la llegada de los conquistadores españoles."
    ],
    schedule: [
      { day: "Día 1", task: "Estudiar las culturas pre-incas de los Horizontes Temprano y Medio (Chavín, Nazca, Moche)." },
      { day: "Día 2", task: "Enfocarse en los grandes imperios pre-incas (Wari, Chimú) y el origen y expansión del Tahuantinsuyo." },
      { day: "Día 3", task: "Analizar la organización social, económica y la caída del Imperio Inca." },
    ],
    videos: [
      { title: "Historia del Perú (resumen)", url: "https://www.youtube.com/watch?v=t8H9bHk4_Sg" },
      { title: "El Imperio Inca", url: "https://www.youtube.com/watch?v=i_S0r_yT9yA" }
    ],
    readingMaterials: [
        { title: "Historia del Perú - Wikipedia", url: "https://es.wikipedia.org/wiki/Historia_del_Per%C3%BA" },
        { title: "Historia Peruana - Portal de Historia", url: "https://historiaperuana.pe/" },
    ],
    exercises: [
      {
        question: "¿Qué fue el Qhapaq Ñan y cuál era su importancia para el Imperio Inca?",
        answer: "Fue la red de caminos incas que conectaba todo el Tahuantinsuyo. Su importancia era vital para el transporte de tropas, el relevo de mensajeros (chasquis) y el movimiento de bienes, permitiendo la administración y control del vasto imperio."
      },
      {
        question: "Menciona una característica principal de la cerámica de la cultura Nazca.",
        answer: "La cerámica Nazca es conocida por ser polícroma (usaban hasta 11 colores en una sola pieza) y por su técnica de 'horror al vacío', donde no dejaban ningún espacio sin decorar."
      }
    ],
    tips: [
      "Crea una línea de tiempo visual para ubicar cada cultura y horizonte.",
      "Usa mapas para entender la expansión geográfica de imperios como Wari y el Tahuantinsuyo.",
      "No memorices fechas, entiende procesos: ¿por qué una cultura decayó y otra surgió?"
    ],
    funFacts: [
      "Los incas realizaban cirugías cerebrales complejas llamadas trepanaciones craneanas, con una sorprendente tasa de supervivencia.",
      "La ciudad de Caral, en el valle de Supe, es considerada la civilización más antigua de América, contemporánea a las pirámides de Egipto."
    ]
  },
  "arquitectura romana": {
    topic: "Arquitectura Romana",
    summary: `La arquitectura romana es una de las más influyentes de la historia. No solo por su monumentalidad, sino por su capacidad de resolver problemas prácticos y urbanísticos a gran escala. Los romanos no solo copiaron a los griegos: innovaron con el hormigón, el arco y la bóveda, y crearon espacios públicos que aún hoy nos asombran.\n\nEste módulo te guiará como si tuvieras un libro de texto interactivo: cada concepto clave está explicado en profundidad, con ejemplos, esquemas, enlaces a lecturas y ejercicios para que realmente comprendas y no solo memorices.`,
    keyConcepts: [
      `**Materiales Clave: Hormigón Romano y Ladrillo Cocido**\n\nEl hormigón romano (opus caementicium) fue la revolución tecnológica que permitió construir cúpulas y bóvedas gigantes. Mezclaban cal, agua, arena volcánica (puozolana) y piedras. El ladrillo cocido se usaba para revestir y dar forma a los muros.\n\n*Ejemplo:* El Panteón de Roma, con su cúpula de 43 metros de diámetro, sigue en pie gracias a este material.`,
      `**Innovaciones Estructurales: El Arco, la Bóveda y la Cúpula**\n\nEl arco de medio punto distribuye el peso hacia los lados, permitiendo abrir grandes espacios. La bóveda de cañón es una sucesión de arcos, y la cúpula es una bóveda girada sobre su eje.\n\n*Ejemplo:* El Coliseo usa arcos superpuestos para soportar varias gradas de espectadores.`,
      `**Tipos de Edificios Públicos**\n\n- *Basílica:* Centro de justicia y comercio.\n- *Termas:* Baños públicos, centros sociales y deportivos.\n- *Anfiteatro:* Espectáculos de gladiadores (Coliseo).\n- *Acueductos:* Transportaban agua a kilómetros de distancia.\n- *Templos:* El Panteón, dedicado a todos los dioses.\n\n*Ejemplo visual:* Busca imágenes de la Basílica de Majencio o el Acueducto de Segovia.`,
      `**Urbanismo Romano**\n\nLas ciudades romanas se planificaban en cuadrícula (castrum), con dos calles principales: el Cardo (N-S) y el Decumano (E-O). Había foros, termas, teatros y mercados.\n\n*Ejemplo práctico:* Mira un plano de Pompeya y localiza el foro y las termas.`,
      `**Órdenes Arquitectónicos**\n\nLos romanos adaptaron los órdenes griegos (dórico, jónico, corintio) y crearon el toscano y el compuesto. Cada columna y capitel tiene su propio "lenguaje" visual.\n\n*Ejemplo:* Observa la fachada del Coliseo: cada piso usa un orden diferente.`,
    ],
    schedule: [
      { day: "Día 1", task: "Lee la explicación sobre materiales y realiza un esquema del Panteón. Luego, mira el video recomendado sobre el Imperio Romano." },
      { day: "Día 2", task: "Estudia las innovaciones estructurales y dibuja un arco y una bóveda. Busca imágenes de acueductos y termas." },
      { day: "Día 3", task: "Analiza el urbanismo y los órdenes arquitectónicos. Haz un resumen comparando el Partenón y el Panteón." },
    ],
    videos: [
      { title: "El Imperio Romano en 10 minutos", url: "https://www.youtube.com/watch?v=ufEclRGXV6k" },
      { title: "La Arquitectura de la Antigua Roma", url: "https://www.youtube.com/watch?v=8s1lR1jCz2g" },
    ],
    readingMaterials: [
        { title: "Arquitectura de la Antigua Roma - Wikipedia", url: "https://es.wikipedia.org/wiki/Arquitectura_de_la_Antigua_Roma" },
        { title: "10 Obras maestras de la arquitectura romana", url: "https://www.nationalgeographic.com.es/historia/10-obras-maestras-arquitectura-romana" },
        { title: "PDF: Manual de Arquitectura Romana (descarga)", url: "https://www.academia.edu/attachments/12345678/download_file?st=MTY5ODg4ODg4OHwxfG1hbnVhbA==" },
        { title: "Blog: El legado de Roma en la arquitectura moderna", url: "https://www.archdaily.mx/mx/899999/el-legado-de-la-arquitectura-romana-en-la-arquitectura-moderna" },
    ],
    exercises: [
      {
        question: "Explica con tus palabras por qué el hormigón fue tan revolucionario para los romanos. Da un ejemplo de edificio que no existiría sin este material.",
        answer: "El hormigón permitió construir formas curvas y espacios gigantes sin columnas intermedias. Ejemplo: la cúpula del Panteón de Roma." 
      },
      {
        question: "Dibuja un esquema de un arco de medio punto y explica cómo distribuye el peso.",
        answer: "El peso se transmite hacia los laterales y hacia abajo, permitiendo abrir grandes vanos en los muros."
      },
      {
        question: "¿Qué diferencias encuentras entre un templo griego y uno romano? Haz una tabla comparativa.",
        answer: "El templo griego es más cerrado y está rodeado de columnas; el romano es más abierto al frente y suele estar elevado sobre un podio."
      }
    ],
    tips: [
      "Haz mapas mentales de cada tipo de edificio y su función.",
      "Busca videos de reconstrucciones 3D para visualizar cómo eran los espacios.",
      "No te limites a memorizar: intenta explicar cada concepto a otra persona, como si fueras el profesor."
    ],
    funFacts: [
      "El Panteón de Roma tiene la cúpula de hormigón no armado más grande del mundo, ¡y fue construida hace casi 2000 años!",
      "El Coliseo podía vaciarse en menos de 10 minutos gracias a su sistema de pasillos y escaleras (vomitorios).",
      "Algunos acueductos romanos siguen en uso hoy en día."
    ]
  }
};

// Simula una llamada a una API de IA
export const generateStudyPlan = (topic: string): Promise<StudyPlan> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const lowerTopic = topic.toLowerCase();
      if (lowerTopic.includes("peru") || lowerTopic.includes("inca")) {
        resolve(aiContentLibrary["historia del peru"]);
      } else if (lowerTopic.includes("arquitectura") || lowerTopic.includes("romana")) {
        resolve(aiContentLibrary["arquitectura romana"]);
      } else if (lowerTopic.includes("cálculo") || lowerTopic.includes("integrales")) {
        resolve(aiContentLibrary["cálculo"]);
      } else {
        resolve(aiContentLibrary["default"]);
      }
    }, 1500); // Simula el tiempo de respuesta de la red
  });
};
