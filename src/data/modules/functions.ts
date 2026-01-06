import { Module } from '../courseData';

export const functionsModule: Module = {
  id: "funciones",
  title: "Tipado de Funciones",
  description: "Argumentos, retornos, funciones opcionales y overloads.",
  icon: "fn",
  level: "Básico",
  lessons: [
    {
      id: "funciones-01",
      title: "Tipado de Parámetros y Retornos",
      content: `
# Tipado de Funciones

Las funciones son el corazón de cualquier aplicación. En TypeScript, **los parámetros SIEMPRE deben tener tipos explícitos**.

### Parámetros de Función

\`\`\`typescript
// ❌ Error: Parameter 'user' implicitly has an 'any' type
const saludar = (user) => {
  console.log("Hola " + user.name);
};

// ✅ Contrato claro
interface User {
  name: string;
  id: number;
}

const saludar = (user: User) => {
  console.log("Hola " + user.name);
};
\`\`\`

### Tipo de Retorno

El tipo de retorno puede inferirse, pero es buena práctica declararlo en funciones públicas:

\`\`\`typescript
// Inferido: TypeScript deduce que retorna number
function sumar(a: number, b: number) {
  return a + b;
}

// Explícito: Más claro y auto-documentado
function sumar(a: number, b: number): number {
  return a + b;
}
\`\`\`

### Funciones void

Cuando una función no retorna nada:

\`\`\`typescript
function logMessage(msg: string): void {
  console.log(msg);
  // No hay return, o return sin valor
}
\`\`\`

### Arrow Functions

El tipado funciona igual:

\`\`\`typescript
const multiplicar = (a: number, b: number): number => a * b;

// O dejando que TS infiera el retorno
const dividir = (a: number, b: number) => a / b;
\`\`\`
      `,
      quiz: [
        {
          question: "¿Qué tipo de retorno tiene una función que suma dos números?",
          options: [
            "string",
            "number",
            "void",
            "any"
          ],
          correct: 1,
          explanation: "Una función que suma dos números debe devolver un 'number'."
        },
        {
          question: "¿Qué sucede si no se tipa explícitamente el retorno de una función?",
          options: [
            "TypeScript lanza un error",
            "TypeScript infiere el tipo automáticamente",
            "La función no compila",
            "El retorno siempre es 'any'"
          ],
          correct: 1,
          explanation: "Si no se especifica, TypeScript deduce el tipo de retorno según el valor devuelto."
        }
      ]
    },
    {
      id: "funciones-02",
      title: "Parámetros Opcionales y Por Defecto",
      content: `
# Parámetros Opcionales y Por Defecto

No siempre necesitas todos los argumentos. TypeScript te permite definir parámetros opcionales y valores por defecto.

### Parámetros Opcionales

Usa el símbolo \`?\` después del nombre del parámetro:

\`\`\`typescript
function saludar(nombre: string, apellido?: string): string {
  if (apellido) {
    return \`Hola, \${nombre} \${apellido}!\`;
  }
  return \`Hola, \${nombre}!\`;
}

saludar("Juan");           // ✅ "Hola, Juan!"
saludar("Juan", "Pérez");  // ✅ "Hola, Juan Pérez!"
\`\`\`

### Valores Por Defecto

Asigna un valor si no se proporciona:

\`\`\`typescript
function crearUsuario(
  nombre: string, 
  rol: string = "usuario"
): { nombre: string; rol: string } {
  return { nombre, rol };
}

crearUsuario("Ana");           // { nombre: "Ana", rol: "usuario" }
crearUsuario("Ana", "admin");  // { nombre: "Ana", rol: "admin" }
\`\`\`

### Regla Importante

Los parámetros opcionales deben ir **después** de los requeridos:

\`\`\`typescript
// ❌ Error: Required parameter cannot follow optional
function mal(opcional?: string, requerido: string) {}

// ✅ Correcto
function bien(requerido: string, opcional?: string) {}
\`\`\`

### Rest Parameters

Para aceptar múltiples argumentos:

\`\`\`typescript
function sumarTodos(...numeros: number[]): number {
  return numeros.reduce((acc, n) => acc + n, 0);
}

sumarTodos(1, 2, 3, 4, 5); // 15
\`\`\`
      `,
      quiz: [
        {
          question: "¿Cómo se marca un parámetro como opcional en TypeScript?",
          options: [
            "Usando 'optional' antes del nombre",
            "Usando '?' después del nombre",
            "Usando '|' con undefined",
            "No es posible en TypeScript"
          ],
          correct: 1,
          explanation: "El símbolo '?' después del nombre del parámetro indica que es opcional."
        },
        {
          question: "¿Dónde deben ubicarse los parámetros opcionales?",
          options: [
            "Al inicio de la lista de parámetros",
            "En cualquier posición",
            "Después de los parámetros requeridos",
            "Solo pueden haber parámetros opcionales"
          ],
          correct: 2,
          explanation: "Los parámetros opcionales siempre deben ir después de los requeridos."
        }
      ]
    }
  ]
};
