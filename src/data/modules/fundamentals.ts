import { Module } from '../courseData';

export const fundamentalsModule: Module = {
  id: "fundamentos",
  title: "Fundamentos Esenciales",
  description: "Tipos básicos, inferencia, y por qué 'any' es tu enemigo.",
  icon: "🏗️",
  level: "Básico",
  lessons: [
    {
      id: "fundamentos-01",
      title: "Inferencia vs Declaración Explícita",
      content: `
# Fundamentos y "Strictness"

TypeScript no es solo JavaScript con tipos. Es una herramienta para **modelar tu lógica de negocio** y prevenir errores antes de ejecutar el código.

### La Regla de Oro

La inferencia es tu amiga, pero la explicidad es tu contrato.

### ¿Cuándo usar inferencia?

No siempre necesitas escribir el tipo. TypeScript es inteligente. Sin embargo, hay momentos donde declarar el tipo es crucial para definir un "contrato".

\`\`\`typescript
// ❌ Redundante y ruidoso
const edad: number = 25;
const nombre: string = "Juan";
const activo: boolean = true;

// ✅ Limpio y seguro (TS infiere los tipos)
const edad = 25;       // TypeScript sabe que es number
const nombre = "Juan"; // TypeScript sabe que es string
const activo = true;   // TypeScript sabe que es boolean
\`\`\`

### ¿Por qué funciona?

Para variables primitivas inicializadas inmediatamente, la inferencia mantiene el código limpio. TypeScript ya sabe que \`25\` es un número. Declararlo explícitamente solo añade ruido visual.

### Cuándo SÍ ser explícito

Debes declarar tipos explícitamente cuando:

- **Variables sin valor inicial**: \`let contador: number;\`
- **Parámetros de función**: Siempre deben tener tipos
- **Objetos complejos**: Para claridad y documentación
- **APIs públicas**: Para que otros desarrolladores entiendan el contrato
      `,
      quiz: [
        {
          question: "¿Qué tipo infiere TypeScript para `const x = 42`?",
          options: [
            "any",
            "number",
            "42 (tipo literal)",
            "unknown"
          ],
          correct: 2,
          explanation: "Para constantes, TypeScript infiere el tipo literal '42'. Para 'let x = 42', inferiría 'number' porque el valor puede cambiar."
        },
        {
          question: "¿Cuándo es recomendable declarar tipos explícitamente?",
          options: [
            "Siempre, en todas las variables",
            "Nunca, la inferencia es suficiente",
            "En parámetros de función y variables sin inicializar",
            "Solo en objetos"
          ],
          correct: 2,
          explanation: "Los parámetros de función y variables sin inicializar necesitan tipos explícitos. Para primitivos inicializados, la inferencia es preferible."
        }
      ]
    },
    {
      id: "fundamentos-02",
      title: "El Peligro del 'any'",
      content: `
# El Peligro del 'any'

Usar \`any\` es básicamente **apagar TypeScript**. Pierdes autocompletado, seguridad y confianza en tu código.

### El Problema

\`\`\`typescript
// ❌ Con 'any', TypeScript no te protege
function procesar(data: any) {
  // TS no detecta el error de tipeo
  return data.toUppercase(); // Error en runtime!
}

procesar(42); // No hay error en compilación
// 💥 Crash: 42.toUppercase is not a function
\`\`\`

### La Solución

\`\`\`typescript
// ✅ Con tipos específicos, TS te ayuda
function procesar(data: string) {
  // TS te autocompleta .toUpperCase() correctamente
  return data.toUpperCase();
}

procesar(42); // ❌ Error en compilación!
// Argument of type 'number' is not assignable 
// to parameter of type 'string'
\`\`\`

### ¿Y si realmente no sé el tipo?

Usa \`unknown\` en lugar de \`any\`. Te obliga a verificar el tipo antes de usarlo:

\`\`\`typescript
function procesarSeguro(data: unknown) {
  // TS te obliga a verificar primero
  if (typeof data === 'string') {
    return data.toUpperCase(); // ✅ Seguro
  }
  return null;
}
\`\`\`

### Regla: any vs unknown

- **any**: "Confía en mí, sé lo que hago" (casi siempre mentira)
- **unknown**: "No sé qué es, verifica antes de usar" (seguro)
      `,
      quiz: [
        {
          question: "¿Qué sucede si usas 'any' en un parámetro de función?",
          options: [
            "TypeScript lanza un error",
            "El código no compila",
            "Pierdes la seguridad de tipos y el autocompletado",
            "El rendimiento mejora"
          ],
          correct: 2,
          explanation: "Usar 'any' desactiva todas las verificaciones de TypeScript para esa variable, perdiendo los beneficios del tipado estático."
        },
        {
          question: "¿Cuál es la alternativa segura a 'any' cuando no conoces el tipo?",
          options: [
            "object",
            "unknown",
            "null",
            "void"
          ],
          correct: 1,
          explanation: "'unknown' te obliga a verificar el tipo con type guards antes de operar con el valor, manteniendo la seguridad."
        }
      ]
    }
  ]
};
