import { Module } from '../courseData';

export const interfacesModule: Module = {
  id: "interfaces",
  title: "Interfaces y Objetos",
  description: "Modelando datos reales, propiedades opcionales y readonly.",
  icon: "📦",
  level: "Intermedio",
  lessons: [
    {
      id: "interfaces-01",
      title: "Definiendo Estructuras de Datos",
      content: `
# Interfaces y Objetos

Las interfaces son la forma principal de definir la "forma" de un objeto en TypeScript.

### ¿Por qué usar Interfaces?

\`\`\`typescript
// ❌ Sin interface: objeto sin contrato
const usuario = {
  nombre: "María",
  email: "maria@email.com",
  edad: 28
};

// ✅ Con interface: contrato claro
interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

const usuario: Usuario = {
  nombre: "María",
  email: "maria@email.com",
  edad: 28
};
\`\`\`

### Propiedades Opcionales

Usa \`?\` para propiedades que pueden no existir:

\`\`\`typescript
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;  // Opcional
  tags?: string[];       // Opcional
}

// Válido sin propiedades opcionales
const producto: Producto = {
  id: 1,
  nombre: "Laptop",
  precio: 999
};
\`\`\`

### Propiedades Readonly

Evita mutaciones accidentales:

\`\`\`typescript
interface Config {
  readonly apiUrl: string;
  readonly version: string;
  timeout: number;
}

const config: Config = {
  apiUrl: "https://api.ejemplo.com",
  version: "1.0.0",
  timeout: 5000
};

config.timeout = 10000;  // ✅ Permitido
config.apiUrl = "otra-url"; // ❌ Error! Cannot assign to 'apiUrl'
\`\`\`
      `,
      quiz: [
        {
          question: "¿Cuál es la mejor forma de definir la estructura de un objeto en TypeScript?",
          options: [
            "class",
            "interface",
            "enum",
            "tuple"
          ],
          correct: 1,
          explanation: "Las interfaces definen contratos claros para la estructura de objetos."
        },
        {
          question: "¿Qué hace el modificador 'readonly' en una propiedad?",
          options: [
            "La hace opcional",
            "La hace privada",
            "Evita que se pueda modificar después de la inicialización",
            "La hace undefined por defecto"
          ],
          correct: 2,
          explanation: "'readonly' previene la reasignación de la propiedad después de la inicialización del objeto."
        }
      ]
    },
    {
      id: "interfaces-02",
      title: "Extendiendo Interfaces",
      content: `
# Extendiendo Interfaces

Las interfaces pueden extenderse para crear estructuras más específicas sin repetir código.

### Herencia de Interfaces

\`\`\`typescript
interface Persona {
  nombre: string;
  edad: number;
}

interface Empleado extends Persona {
  departamento: string;
  salario: number;
}

const empleado: Empleado = {
  nombre: "Carlos",
  edad: 35,
  departamento: "Ingeniería",
  salario: 50000
};
\`\`\`

### Extender Múltiples Interfaces

\`\`\`typescript
interface Auditable {
  creadoEn: Date;
  actualizadoEn: Date;
}

interface Identificable {
  id: string;
}

interface Documento extends Identificable, Auditable {
  titulo: string;
  contenido: string;
}

const doc: Documento = {
  id: "doc-123",
  titulo: "Mi Documento",
  contenido: "...",
  creadoEn: new Date(),
  actualizadoEn: new Date()
};
\`\`\`

### Interface vs Type

Ambos son similares, pero con diferencias sutiles:

\`\`\`typescript
// Interface: puede extenderse y mezclarse
interface Animal {
  nombre: string;
}

interface Perro extends Animal {
  raza: string;
}

// Type: usa intersección (&) para combinar
type Animal = {
  nombre: string;
};

type Perro = Animal & {
  raza: string;
};
\`\`\`

**Regla general**: Usa \`interface\` para objetos, \`type\` para uniones y tipos complejos.
      `,
      quiz: [
        {
          question: "¿Cómo se extiende una interface en TypeScript?",
          options: [
            "Usando 'implements'",
            "Usando 'extends'",
            "Usando '&'",
            "Usando 'inherits'"
          ],
          correct: 1,
          explanation: "Las interfaces usan 'extends' para heredar de otras interfaces."
        },
        {
          question: "¿Qué ventaja tiene usar interfaces sobre objetos directos?",
          options: [
            "Permiten herencia múltiple real",
            "Definen contratos claros y reutilizables",
            "Son más rápidas en ejecución",
            "No requieren tipado adicional"
          ],
          correct: 1,
          explanation: "Las interfaces permiten tipar objetos y asegurar consistencia en su uso a través del código."
        }
      ]
    }
  ]
};
