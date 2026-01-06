import { Module } from '../courseData';

export const genericsModule: Module = {
  id: "genericos",
  title: "Tipos Genéricos",
  description: "Escribiendo código reutilizable y flexible.",
  icon: "🧬",
  level: "Avanzado",
  lessons: [
    {
      id: "genericos-01",
      title: "Introducción a Generics",
      content: `
# Tipos Genéricos

Los generics te permiten escribir código **reutilizable** que funciona con diferentes tipos sin perder la seguridad.

### El Problema sin Generics

\`\`\`typescript
// Sin generics: perdemos información del tipo
function primero(arr: any[]): any {
  return arr[0];
}

const num = primero([1, 2, 3]);    // tipo: any 😢
const str = primero(["a", "b"]);   // tipo: any 😢
\`\`\`

### La Solución con Generics

\`\`\`typescript
// Con generics: preservamos el tipo
function primero<T>(arr: T[]): T | undefined {
  return arr[0];
}

const num = primero([1, 2, 3]);    // tipo: number ✅
const str = primero(["a", "b"]);   // tipo: string ✅
\`\`\`

### ¿Cómo funciona?

- \`<T>\` declara un "tipo variable" (parámetro de tipo)
- TypeScript infiere \`T\` basándose en los argumentos
- El tipo se preserva a través de la función

### Múltiples Parámetros de Tipo

\`\`\`typescript
function intercambiar<T, U>(tupla: [T, U]): [U, T] {
  return [tupla[1], tupla[0]];
}

const resultado = intercambiar(["hola", 42]);
// tipo: [number, string]
\`\`\`

### Convenciones de Nombres

- \`T\` - Tipo genérico (Type)
- \`K\` - Clave (Key)
- \`V\` - Valor (Value)
- \`E\` - Elemento (Element)
\`\`\`typescript
function obtenerValor<K, V>(map: Map<K, V>, key: K): V | undefined {
  return map.get(key);
}
\`\`\`
      `,
      quiz: [
        {
          question: "¿Qué ventaja tienen los generics sobre usar 'any'?",
          options: [
            "Permiten tipar funciones y clases de forma flexible sin perder seguridad",
            "Son más rápidos en ejecución",
            "Solo sirven para arrays",
            "No tienen ventaja, son equivalentes"
          ],
          correct: 0,
          explanation: "Los generics permiten reutilizar código con diferentes tipos mientras mantienen la seguridad de tipos, a diferencia de 'any'."
        },
        {
          question: "¿Qué hace TypeScript cuando llamas a 'primero([1, 2, 3])'?",
          options: [
            "Lanza un error porque no especificaste el tipo",
            "Infiere que T es 'number' basándose en el argumento",
            "Asume que T es 'any'",
            "Asume que T es 'unknown'"
          ],
          correct: 1,
          explanation: "TypeScript infiere el tipo genérico T automáticamente basándose en los argumentos proporcionados."
        }
      ]
    },
    {
      id: "genericos-02",
      title: "Constraints y Generics Avanzados",
      content: `
# Constraints en Generics

A veces necesitas restringir qué tipos puede aceptar un generic.

### Usando 'extends' como Constraint

\`\`\`typescript
// T debe tener una propiedad 'length'
interface ConLongitud {
  length: number;
}

function mostrarLongitud<T extends ConLongitud>(item: T): number {
  return item.length;
}

mostrarLongitud("hola");      // ✅ string tiene length
mostrarLongitud([1, 2, 3]);   // ✅ array tiene length
mostrarLongitud({ length: 5 }); // ✅ objeto con length
mostrarLongitud(42);          // ❌ number no tiene length
\`\`\`

### keyof con Generics

\`\`\`typescript
function obtenerPropiedad<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const persona = { nombre: "Ana", edad: 30 };

const nombre = obtenerPropiedad(persona, "nombre");  // tipo: string
const edad = obtenerPropiedad(persona, "edad");      // tipo: number
obtenerPropiedad(persona, "altura");  // ❌ Error: 'altura' no existe
\`\`\`

### Interfaces Genéricas

\`\`\`typescript
interface Respuesta<T> {
  data: T;
  status: number;
  ok: boolean;
}

// Uso con diferentes tipos
type RespuestaUsuarios = Respuesta<Usuario[]>;
type RespuestaProducto = Respuesta<Producto>;
type RespuestaVacia = Respuesta<null>;
\`\`\`

### Valores Por Defecto

\`\`\`typescript
interface Estado<T = string> {
  value: T;
  timestamp: Date;
}

const estado1: Estado = { value: "activo", timestamp: new Date() };
const estado2: Estado<number> = { value: 42, timestamp: new Date() };
\`\`\`
      `,
      quiz: [
        {
          question: "¿Para qué sirve 'extends' en un generic?",
          options: [
            "Para heredar de una clase",
            "Para restringir qué tipos puede aceptar el generic",
            "Para extender una interface",
            "Para crear un nuevo tipo"
          ],
          correct: 1,
          explanation: "'extends' en generics actúa como constraint, limitando los tipos válidos a aquellos que cumplen la condición."
        },
        {
          question: "¿Qué representa 'keyof T' en TypeScript?",
          options: [
            "Todas las claves de un objeto T como un union type",
            "El primer key de T",
            "Un nuevo objeto con las keys de T",
            "Un array con las keys de T"
          ],
          correct: 0,
          explanation: "'keyof T' genera un union type con todas las claves (propiedades) del tipo T."
        }
      ]
    }
  ]
};
