# 🎮 Sistema de Características Interactivas

Este documento describe las nuevas funcionalidades interactivas implementadas en la plataforma de aprendizaje, inspiradas en el proyecto `learning-react`.

---

## 📋 Índice

1. [Sistema de Quizzes](#-sistema-de-quizzes)
2. [Bloques de Código Estilizados](#-bloques-de-código-estilizados)
3. [Vista de Lección con Markdown](#-vista-de-lección-con-markdown)
4. [Estructura de Datos Modular](#-estructura-de-datos-modular)
5. [Sistema de Progreso](#-sistema-de-progreso)
6. [Componentes UI](#-componentes-ui)

---

## 🧩 Sistema de Quizzes

### Componente: `Quiz.tsx`

El componente de quizzes proporciona una experiencia interactiva de evaluación al final de cada lección.

#### Características:
- **Preguntas de opción múltiple** con selección visual
- **Retroalimentación inmediata** (correcto/incorrecto con colores)
- **Explicaciones detalladas** después de cada respuesta
- **Contador de progreso** (Pregunta X de Y)
- **Pantalla de resultados** con puntuación y porcentaje
- **Marcado de lección completa** al aprobar (≥60%)

#### Interfaz de Datos:
```typescript
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;       // Índice de la respuesta correcta (0-based)
  explanation: string;   // Explicación que aparece tras responder
}

// Props del componente
interface QuizProps {
  questions: QuizQuestion[];
  lessonId: string;
}
```

#### Uso:
```tsx
import Quiz from '@/app/components/Quiz';

const questions = [
  {
    question: "¿Qué tipo de retorno tiene una función que no devuelve nada?",
    options: ["undefined", "null", "void", "never"],
    correct: 2,
    explanation: "El tipo 'void' indica que la función no retorna ningún valor."
  }
];

<Quiz questions={questions} lessonId="fundamentos-01" />
```

---

## 💻 Bloques de Código Estilizados

### Componente: `CodeBlock.tsx`

Renderiza código con un diseño moderno estilo terminal/IDE.

#### Características:
- **Header con puntos de colores** (estilo macOS: rojo, amarillo, verde)
- **Indicador de lenguaje** (TypeScript, JavaScript, etc.)
- **Fondo oscuro** para contraste óptimo
- **Scrollbar horizontal** para código largo
- **Botón de copiar** (opcional)

#### Interfaz:
```typescript
interface CodeBlockProps {
  code: string;
  language?: string;  // 'typescript' | 'javascript' | 'jsx' | etc.
  showCopy?: boolean;
}
```

#### Uso:
```tsx
import CodeBlock from '@/app/components/CodeBlock';

<CodeBlock 
  code={`const greeting: string = "Hola";`}
  language="typescript"
/>
```

---

## 📖 Vista de Lección con Markdown

### Componente: `LessonView.tsx`

Renderiza contenido de lección en formato Markdown con animaciones.

#### Características:
- **Parseo de Markdown** (headers, listas, negritas, código)
- **Animaciones de entrada** con transiciones suaves
- **Integración automática** de `CodeBlock` para bloques de código
- **Soporte para Quiz** integrado al final

#### Elementos Soportados:
- `# Título` → `<h1>`
- `### Subtítulo` → `<h3>`
- `- Elemento` → `<li>`
- `**negrita**` → `<strong>`
- ````typescript` ... ``` → `<CodeBlock />`

---

## 📂 Estructura de Datos Modular

### Directorio: `app/data/`

Los datos del curso están organizados de forma modular para facilitar el mantenimiento.

```
app/
└── data/
    ├── courseData.ts       # Índice principal de módulos
    └── modules/
        ├── fundamentos.ts   # Módulo 1
        ├── funciones.ts     # Módulo 2
        ├── interfaces.ts    # Módulo 3
        ├── uniones.ts       # Módulo 4
        ├── genericos.ts     # Módulo 5
        └── utilityTypes.ts  # Módulo 6
```

### Estructura de un Módulo:
```typescript
export interface Lesson {
  id: string;
  title: string;
  content: string;  // Markdown
  quiz: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  lessons: Lesson[];
}
```

---

## 📊 Sistema de Progreso

### Contexto: `ProgressContext.tsx`

Gestiona el progreso del usuario a través del curso.

#### Características:
- **Persistencia en localStorage** para conservar progreso
- **Trackeo de lecciones completadas** por ID
- **Indicadores visuales** (checkmarks, barras de progreso)
- **Estadísticas generales** (lecciones completas, porcentaje)

#### API del Contexto:
```typescript
interface ProgressContextType {
  completedLessons: string[];
  markLessonComplete: (lessonId: string) => void;
  isLessonComplete: (lessonId: string) => boolean;
  getProgress: () => { completed: number; total: number; percentage: number };
  resetProgress: () => void;
}
```

---

## 🎨 Componentes UI

### Variables CSS Globales

El sistema de diseño usa variables CSS para consistencia:

```css
:root {
  /* Colores */
  --accent-primary: #6366f1;    /* Indigo */
  --accent-secondary: #818cf8;
  --success: #4ade80;
  --error: #f87171;
  --warning: #fbbf24;
  
  /* Espaciado */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Bordes */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
  
  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
}
```

---

## 🔗 Migración de Lecciones

### Cómo Migrar una Lección Existente:

1. **Crear archivo de módulo** en `app/data/modules/`
2. **Definir el contenido** en formato Markdown (string)
3. **Añadir preguntas de quiz** basadas en `weekly-review.md`
4. **Exportar e importar** en `courseData.ts`
5. **Actualizar la ruta** en `app/conceptos/[modulo]/page.tsx`

### Ejemplo de Migración:

**Antes (página estática):**
```tsx
// app/conceptos/fundamentos/page.tsx
export default function FundamentosPage() {
  return (
    <div>
      <h1>Fundamentos</h1>
      <CodeComparison ... />
    </div>
  );
}
```

**Después (contenido dinámico):**
```tsx
// app/conceptos/fundamentos/page.tsx
import LessonView from '@/app/components/LessonView';
import { fundamentosModule } from '@/app/data/modules/fundamentos';

export default function FundamentosPage() {
  return <LessonView lesson={fundamentosModule.lessons[0]} />;
}
```

---

## 📝 Checklist de Implementación

- [x] Documentación de características (`INTERACTIVE_FEATURES.md`)
- [x] Componente `Quiz.tsx`
- [x] Componente `CodeBlock.tsx`
- [x] Componente `LessonView.tsx`
- [x] Contexto `ProgressContext.tsx`
- [x] Variables CSS en `globals.css`
- [x] Estructura de datos en `app/data/`
- [x] Módulo de datos: Fundamentos (2 lecciones, 4 preguntas)
- [x] Módulo de datos: Funciones (2 lecciones, 4 preguntas)
- [x] Módulo de datos: Interfaces (2 lecciones, 4 preguntas)
- [x] Módulo de datos: Uniones (2 lecciones, 4 preguntas)
- [x] Módulo de datos: Genéricos (2 lecciones, 4 preguntas)
- [x] Módulo de datos: Utility Types (2 lecciones, 4 preguntas)
- [x] Migrar página de Fundamentos al nuevo sistema
- [ ] Migrar página de Funciones
- [ ] Migrar página de Interfaces
- [ ] Migrar página de Uniones
- [ ] Migrar página de Genéricos
- [ ] Migrar página de Utility Types
- [ ] Tests de componentes
- [x] Responsive design (básico)

---

## 🚀 Próximos Pasos

Consulta `IMPLEMENTATION_PLAN.md` para ver el estado completo del proyecto y las siguientes fases de desarrollo.
