# 🔷 TS Learning: Plataforma de Aprendizaje de TypeScript

[**Read this in English / Leer en Inglés 🇺🇸**](./README.md)

¡Bienvenido a tu entorno de aprendizaje! Este proyecto está diseñado para que aprendas TypeScript de forma práctica y estructurada.

---

## 📂 Estructura del Proyecto

Para mantener el aprendizaje organizado, hemos dividido el código en tres áreas clave:

### 1. 🏗️ El Taller (Donde tú trabajas)
**Ubicación:** `app/projects/[nombre-del-proyecto]/page.tsx`

Aquí es donde ocurre la magia. Cada carpeta dentro de `app/projects/` representa un desafío práctico.
- Abre el archivo `page.tsx` de cada proyecto.
- Busca los comentarios `TODO` o sigue los objetivos en la interfaz.
- Implementa la lógica de TypeScript solicitada.
- Mira tus cambios en tiempo real en la aplicación.
- **Nueva Función:** Ahora puedes activar la sección **"Solución / Esperado"** en la interfaz si te quedas bloqueado (disponible en algunos proyectos).

### 2. 📚 La Academia (Teoría)
**Ubicación:** `app/concepts/`

Contiene las lecciones teóricas interacticas. Puedes leerlas en la aplicación o revisar el código para ver cómo se estructuran las explicaciones y comparaciones de código.

### 3. ⚙️ La Maquinaria (Infraestructura)
**Ubicación:** `src/`

Aquí vive el "corazón" de la plataforma. Normalmente no necesitarás tocar esto, pero es útil para ver cómo se construye una app real:
- `src/components/`: Componentes de UI (Navbar, Botones, etc.).
- `src/i18n/`: Sistema de traducciones (Español/Inglés).
- `src/hooks/`: Lógica de tracking de progreso.
- `src/context/`: Estado global de la aplicación.

---

## 🚀 Cómo empezar

1.  **Instala las dependencias**:
    ```bash
    npm install
    ```

2.  **Inicia el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

3.  **Abre la aplicación**:
    Ve a `http://localhost:3000`.

4.  **Sigue la ruta**:
    - Empieza por la **Teoría** en la pantalla principal.
    - Cuando te sientas listo, ve a la sección de **Proyectos**.
    - Abre el archivo correspondiente en tu editor y ¡empieza a codear!

---

## 🛠️ Tecnologías utilizadas

- **Next.js 15+** (App Router)
- **TypeScript** (Obviamente 😉)
- **Tailwind CSS** (Estilos rápidos y limpios)
- **Lucide React** (Iconos)

---

¡Diviértete aprendiendo! 🚀
