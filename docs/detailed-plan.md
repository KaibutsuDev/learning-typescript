# 📅 Plan Detallado de Aprendizaje con Proyectos en TypeScript

Este calendario propone **ejercicios diarios** dentro de cada semana, organizados por proyecto.  
La idea es que cada día avances un poco y consolides fundamentos antes de pasar al siguiente nivel.

---

## Semana 1: 📝 Calculadora Básica
**Objetivo:** Practicar tipos primitivos y funciones.

- **Día 1:** Configurar proyecto con `tsc` y `tsconfig.json`. Crear función `sumar(a: number, b: number): number`.
- **Día 2:** Implementar operaciones básicas: suma, resta, multiplicación, división.
- **Día 3:** Añadir control de flujo (`switch`) para seleccionar operación.
- **Día 4:** Manejar errores (ej. división por cero).
- **Día 5:** Documentar funciones con JSDoc y probar casos.

---

## Semana 2: 📋 Lista de Tareas (To-Do App)
**Objetivo:** Trabajar con arrays y objetos.

- **Día 1:** Definir interfaz `Tarea` con propiedades `id`, `titulo`, `completada`.
- **Día 2:** Crear función para añadir tareas a un array tipado.
- **Día 3:** Implementar función para marcar tareas como completadas.
- **Día 4:** Usar métodos de arrays (`map`, `filter`) para listar y filtrar tareas.
- **Día 5:** Añadir propiedades opcionales (`descripcion?`) y `readonly`.

---

## Semana 3: 🎲 Juego de Adivinanza de Números
**Objetivo:** Practicar funciones y tipos especiales.

- **Día 1:** Generar número aleatorio con `Math.random()`.
- **Día 2:** Crear función que reciba un número y devuelva si es mayor, menor o igual.
- **Día 3:** Implementar bucle para permitir múltiples intentos.
- **Día 4:** Definir niveles de dificultad con tipos literales (`"fácil" | "medio" | "difícil"`).
- **Día 5:** Añadir mensajes de victoria/derrota tipados.

---

## Semana 4: 📚 Gestor de Contactos
**Objetivo:** Introducir clases e interfaces.

- **Día 1:** Definir interfaz `Contacto` con propiedades básicas.
- **Día 2:** Crear clase `Agenda` con constructor y métodos `agregar`, `eliminar`.
- **Día 3:** Implementar modificadores de acceso (`private` para lista interna).
- **Día 4:** Añadir método para buscar contactos por nombre.
- **Día 5:** Probar con varios contactos y documentar.

---

## Semana 5: 🛒 Carrito de Compras
**Objetivo:** Introducir generics y tipos compuestos.

- **Día 1:** Definir interfaz `Producto` y `Carrito`.
- **Día 2:** Crear función genérica para añadir productos.
- **Día 3:** Implementar función para calcular total del carrito.
- **Día 4:** Usar `union types` para estados del carrito (`"empty" | "active"`).
- **Día 5:** Añadir `readonly` para evitar mutaciones accidentales.

---

## Semana 6: 🌐 Mini API con Node.js + TypeScript
**Objetivo:** Integrar TypeScript en backend.

- **Día 1:** Configurar proyecto con Node.js y TypeScript.
- **Día 2:** Crear endpoint básico `/hello` con tipado en parámetros.
- **Día 3:** Implementar endpoint `/users` con tipado en respuestas.
- **Día 4:** Usar `async/await` para simular base de datos.
- **Día 5:** Manejar errores con tipos personalizados.

---

## Semana 7: 🎨 Pequeña App con React + TypeScript
**Objetivo:** Aplicar TypeScript en frontend.

- **Día 1:** Configurar proyecto React + TS.
- **Día 2:** Crear componente `TaskList` con props tipadas.
- **Día 3:** Usar `useState` con tipos para manejar estado.
- **Día 4:** Implementar `useEffect` con tipado en dependencias.
- **Día 5:** Tipar eventos (`React.ChangeEvent<HTMLInputElement>`) y probar la app.

---

# 📍 Recomendaciones Finales
- Dedica **1 hora diaria** a cada ejercicio.
- Refuerza conceptos con documentación oficial de TypeScript.
- Al terminar cada semana, escribe un **resumen de aprendizajes** en Markdown.
- Intenta combinar varios proyectos en una aplicación más grande al finalizar el plan.
