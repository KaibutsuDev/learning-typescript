# Estructura del Proyecto y Guía de Uso

Esta plataforma está construida con **Next.js 15** (App Router) para que puedas aprender TypeScript implementando pequeños proyectos de forma incremental.

## 📂 Estructura de Directorios

El proyecto utiliza el sistema de rutas de Next.js (App Router), donde cada carpeta dentro de `app/` se convierte en una ruta de la aplicación.

```
learning-typescript/
├── app/
│   ├── components/      # Componentes reutilizables (Navbar, botones, etc.)
│   ├── calculadora/     # Proyecto: Calculadora (Semana 1)
│   │   └── page.tsx     # Lógica y UI de la calculadora
│   ├── todo/            # Proyecto: To-Do List (Semana 2) [PENDIENTE]
│   │   └── page.tsx
│   ├── layout.tsx       # Layout principal (contiene el Navbar)
│   └── page.tsx         # Dashboard principal (Home)
├── docs/                # Documentación del plan de estudios
└── ...
```

## 🛠️ Cómo agregar un nuevo proyecto

Sigue estos pasos para añadir un nuevo ejercicio (por ejemplo, el "Gestor de Contactos"):

1.  **Crea una nueva carpeta** en `app/` con el nombre de la ruta, por ejemplo: `app/contactos/`.
2.  **Crea el archivo de la página** dentro de esa carpeta: `app/contactos/page.tsx`.
3.  **Define tu componente** y expórtalo por defecto. ¡Recuerda usar TypeScript!

    ```tsx
    // app/contactos/page.tsx
    import { useState } from 'react';

    // ¡Define tus interfaces primero!
    interface Contacto {
      nombre: string;
      email: string;
    }

    export default function ContactosPage() {
      // Tu lógica aquí
      return <div>Mi Gestor de Contactos</div>;
    }
    ```

4.  **Actualiza el Dashboard**: Ve a `app/page.tsx` y asegúrate de que el enlace en el array `projects` apunte a tu nueva ruta.
5.  **(Opcional) Actualiza el Navbar**: Si quieres acceso rápido, añade tu ruta en `app/components/Navbar.tsx`.

## 💡 Recomendaciones para Aprender

1.  **No copies y pegues**: Intenta escribir el código tú mismo/a.
2.  **Usa `strict mode`**: Next.js ya lo activa por defecto. No uses `any` a menos que sea estrictamente necesario.
3.  **Define Interfaces**: Antes de escribir la lógica del componente, piensa en los datos. ¿Qué forma tienen? Define `interface` o `type` para tus props y estados.
4.  **Componentes Pequeños**: Si un archivo `page.tsx` crece demasiado, divide la UI en componentes más pequeños dentro de una carpeta `components` local (ej: `app/contactos/components/CardContacto.tsx`) o en la carpeta global `app/components`.

---

¡Disfruta construyendo y aprendiendo!
