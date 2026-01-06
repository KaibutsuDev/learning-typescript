import { Module } from '../courseData';

export const utilityTypesModule: Module = {
  id: "utility-types",
  title: "Utility Types",
  description: "Herramientas integradas para transformar tipos: Partial, Pick, Omit, Record.",
  icon: "🧰",
  level: "Avanzado",
  lessons: [
    {
      id: "utility-01",
      title: "Partial, Required y Readonly",
      content: `
# Utility Types Básicos

TypeScript incluye tipos utilitarios que transforman otros tipos de formas útiles.

### Partial<T>

Hace todas las propiedades opcionales:

\`\`\`typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

// Todas las propiedades son ahora opcionales
type UsuarioParcial = Partial<Usuario>;

// Útil para funciones de actualización
function actualizarUsuario(id: number, cambios: Partial<Usuario>) {
  // Solo necesitas pasar lo que quieres cambiar
}

actualizarUsuario(1, { nombre: "Nuevo nombre" }); // ✅
\`\`\`

### Required<T>

Lo opuesto a Partial - hace todas las propiedades requeridas:

\`\`\`typescript
interface Config {
  theme?: string;
  language?: string;
  debug?: boolean;
}

// Todas son ahora requeridas
type ConfigCompleta = Required<Config>;

const config: ConfigCompleta = {
  theme: "dark",
  language: "es",
  debug: false
};
\`\`\`

### Readonly<T>

Hace todas las propiedades de solo lectura:

\`\`\`typescript
interface Estado {
  count: number;
  items: string[];
}

type EstadoInmutable = Readonly<Estado>;

const estado: EstadoInmutable = { count: 0, items: [] };
estado.count = 5;  // ❌ Error: Cannot assign to 'count'
\`\`\`
      `,
      quiz: [
        {
          question: "¿Qué hace Partial<T>?",
          options: [
            "Elimina propiedades del tipo",
            "Hace todas las propiedades opcionales",
            "Hace todas las propiedades requeridas",
            "Convierte el tipo en readonly"
          ],
          correct: 1,
          explanation: "Partial<T> transforma todas las propiedades de T en opcionales (?), útil para updates parciales."
        },
        {
          question: "¿Cuál es el caso de uso típico para Partial<T>?",
          options: [
            "Crear objetos inmutables",
            "Funciones de actualización donde solo cambias algunos campos",
            "Validación de formularios",
            "Crear APIs REST"
          ],
          correct: 1,
          explanation: "Partial es ideal para funciones de update donde no necesitas pasar todas las propiedades."
        }
      ]
    },
    {
      id: "utility-02",
      title: "Pick, Omit y Record",
      content: `
# Utility Types para Selección

Estos tipos te permiten crear nuevos tipos seleccionando o excluyendo propiedades.

### Pick<T, Keys>

Crea un tipo con solo las propiedades especificadas:

\`\`\`typescript
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  stock: number;
}

// Solo id y nombre
type ProductoResumen = Pick<Producto, "id" | "nombre">;

const resumen: ProductoResumen = {
  id: 1,
  nombre: "Laptop"
};
\`\`\`

### Omit<T, Keys>

Lo opuesto a Pick - excluye las propiedades especificadas:

\`\`\`typescript
// Todo excepto descripcion y stock
type ProductoBasico = Omit<Producto, "descripcion" | "stock">;

const basico: ProductoBasico = {
  id: 1,
  nombre: "Laptop",
  precio: 999
};
\`\`\`

### Record<Keys, Type>

Crea un tipo objeto con claves específicas y un tipo de valor:

\`\`\`typescript
// Objeto donde las keys son strings y valores son números
type Puntuaciones = Record<string, number>;

const scores: Puntuaciones = {
  "matematicas": 90,
  "historia": 85,
  "ciencias": 92
};

// Con keys específicas
type DiaSemana = "lunes" | "martes" | "miercoles" | "jueves" | "viernes";
type Horario = Record<DiaSemana, string[]>;

const miHorario: Horario = {
  lunes: ["9:00 - Reunión"],
  martes: ["10:00 - Desarrollo"],
  miercoles: ["14:00 - Review"],
  jueves: ["11:00 - Planning"],
  viernes: ["15:00 - Demo"]
};
\`\`\`

### Combinando Utility Types

\`\`\`typescript
// Crear un tipo para formulario de edición
type FormularioEdicion = Partial<Omit<Producto, "id">>;

// Solo permite editar estas propiedades, todas opcionales
const formData: FormularioEdicion = {
  nombre: "Nuevo nombre",
  precio: 1099
};
\`\`\`
      `,
      quiz: [
        {
          question: "¿Cuál es la diferencia entre Pick y Omit?",
          options: [
            "Pick incluye las propiedades especificadas, Omit las excluye",
            "Pick elimina propiedades, Omit las añade",
            "No hay diferencia, son sinónimos",
            "Pick es para objetos, Omit para arrays"
          ],
          correct: 0,
          explanation: "Pick<T, K> crea un tipo con SOLO las propiedades K, mientras Omit<T, K> crea un tipo SIN las propiedades K."
        },
        {
          question: "¿Para qué sirve Record<K, V>?",
          options: [
            "Para grabar datos en una base de datos",
            "Para crear un tipo objeto con claves K y valores de tipo V",
            "Para registrar errores",
            "Para crear arrays tipados"
          ],
          correct: 1,
          explanation: "Record<Keys, Type> crea un tipo objeto donde las claves son del tipo Keys y los valores del tipo Type."
        }
      ]
    }
  ]
};
