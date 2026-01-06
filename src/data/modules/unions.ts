import { Module } from '../courseData';

export const unionsModule: Module = {
  id: "uniones",
  title: "Union & Intersection",
  description: "Creando tipos flexibles y combinando estructuras.",
  icon: "🔗",
  level: "Intermedio",
  lessons: [
    {
      id: "uniones-01",
      title: "Union Types",
      content: `
# Union Types

Los Union Types permiten que una variable pueda ser de **uno entre varios tipos**.

### Sintaxis Básica

\`\`\`typescript
// La variable puede ser string O number
let id: string | number;

id = "abc-123";  // ✅ Válido
id = 42;         // ✅ Válido
id = true;       // ❌ Error: Type 'boolean' is not assignable
\`\`\`

### Tipos Literales

Crea un conjunto limitado de valores válidos:

\`\`\`typescript
type Estado = "pendiente" | "activo" | "completado";

let tareaEstado: Estado;
tareaEstado = "activo";      // ✅
tareaEstado = "cancelado";   // ❌ Error

// Muy útil para evitar "magic strings"
type Direccion = "norte" | "sur" | "este" | "oeste";
type Dificultad = "fácil" | "medio" | "difícil";
\`\`\`

### Discriminated Unions

Patrón poderoso para manejar diferentes "formas" de datos:

\`\`\`typescript
interface CargaExitosa {
  status: "success";
  data: string[];
}

interface CargaError {
  status: "error";
  error: string;
}

type ResultadoCarga = CargaExitosa | CargaError;

function procesarResultado(resultado: ResultadoCarga) {
  // TypeScript sabe qué propiedades existen según el status
  if (resultado.status === "success") {
    console.log(resultado.data);  // ✅ TS sabe que 'data' existe
  } else {
    console.log(resultado.error); // ✅ TS sabe que 'error' existe
  }
}
\`\`\`
      `,
      quiz: [
        {
          question: "¿Qué tipo usarías para representar niveles como 'fácil' | 'medio' | 'difícil'?",
          options: [
            "enum",
            "union type (literal)",
            "tuple",
            "any"
          ],
          correct: 1,
          explanation: "'fácil' | 'medio' | 'difícil' es un ejemplo de unión de tipos literales."
        },
        {
          question: "¿Qué es un 'Discriminated Union'?",
          options: [
            "Una unión de tipos primitivos",
            "Una unión donde cada tipo tiene una propiedad común que los diferencia",
            "Una unión que no puede tener null",
            "Una unión de interfaces solamente"
          ],
          correct: 1,
          explanation: "Los Discriminated Unions usan una propiedad común (como 'status' o 'type') para diferenciar entre las opciones."
        }
      ]
    },
    {
      id: "uniones-02",
      title: "Type Narrowing",
      content: `
# Type Narrowing

Cuando tienes un union type, necesitas "estrechar" el tipo para acceder a propiedades específicas.

### Narrowing con typeof

\`\`\`typescript
function formatear(valor: string | number): string {
  // TypeScript no sabe si es string o number aquí
  
  if (typeof valor === "string") {
    // Aquí TS sabe que es string
    return valor.toUpperCase();
  }
  
  // Aquí TS sabe que es number
  return valor.toFixed(2);
}
\`\`\`

### Narrowing con in

\`\`\`typescript
interface Coche {
  marca: string;
  ruedas: number;
}

interface Bicicleta {
  marca: string;
  pedales: boolean;
}

function describir(vehiculo: Coche | Bicicleta) {
  console.log(\`Marca: \${vehiculo.marca}\`);
  
  if ("ruedas" in vehiculo) {
    console.log(\`Ruedas: \${vehiculo.ruedas}\`);
  } else {
    console.log(\`Tiene pedales: \${vehiculo.pedales}\`);
  }
}
\`\`\`

### Narrowing con instanceof

\`\`\`typescript
function handleError(error: Error | string) {
  if (error instanceof Error) {
    console.log(error.message);
    console.log(error.stack);
  } else {
    console.log(error);
  }
}
\`\`\`

### Type Predicates (Funciones de Guardia)

\`\`\`typescript
interface Pez {
  nadar: () => void;
}

interface Pajaro {
  volar: () => void;
}

// Type predicate: "animal is Pez"
function esPez(animal: Pez | Pajaro): animal is Pez {
  return (animal as Pez).nadar !== undefined;
}

function mover(animal: Pez | Pajaro) {
  if (esPez(animal)) {
    animal.nadar();  // TS sabe que es Pez
  } else {
    animal.volar();  // TS sabe que es Pajaro
  }
}
\`\`\`
      `,
      quiz: [
        {
          question: "¿Qué operador usas para verificar si una propiedad existe en un objeto?",
          options: [
            "typeof",
            "instanceof",
            "in",
            "hasOwnProperty"
          ],
          correct: 2,
          explanation: "El operador 'in' verifica si una propiedad existe en un objeto y ayuda a TypeScript a estrechar el tipo."
        },
        {
          question: "¿Qué es un 'type predicate'?",
          options: [
            "Un tipo que predice el futuro",
            "Una función que retorna un booleano e indica el tipo con 'param is Type'",
            "Un operador para crear tipos",
            "Una forma de comparar tipos"
          ],
          correct: 1,
          explanation: "Los type predicates son funciones que retornan boolean y usan la sintaxis 'param is Type' para indicar a TS el tipo específico."
        }
      ]
    }
  ]
};
