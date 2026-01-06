# 🛤️ Plan de Refactorización: Rutas en Inglés

## Objetivo
Cambiar todas las rutas de español a inglés para seguir estándares de la industria, mejorar SEO y evitar problemas con caracteres especiales.

---

## 📋 Mapeo de Rutas

### Páginas de Conceptos
| Ruta Actual (ES) | Nueva Ruta (EN) |
|------------------|-----------------|
| `/conceptos` | `/concepts` |
| `/conceptos/fundamentos` | `/concepts/fundamentals` |
| `/conceptos/funciones` | `/concepts/functions` |
| `/conceptos/interfaces` | `/concepts/interfaces` |
| `/conceptos/uniones` | `/concepts/unions` |
| `/conceptos/genericos` | `/concepts/generics` |
| `/conceptos/utility-types` | `/concepts/utility-types` |

### Páginas de Proyectos
| Ruta Actual (ES) | Nueva Ruta (EN) |
|------------------|-----------------|
| `/proyectos` | `/projects` |
| `/calculadora` | `/calculator` |
| `/todo` | `/todo` *(sin cambio)* |
| `/adivinanza` | `/guess-game` |
| `/contactos` | `/contacts` |
| `/carrito` | `/cart` |

---

## 📁 Cambios de Estructura de Carpetas

```
app/
├── conceptos/           →  concepts/
│   ├── page.tsx              page.tsx
│   ├── fundamentos/     →    fundamentals/
│   ├── funciones/       →    functions/
│   ├── interfaces/           interfaces/
│   ├── uniones/         →    unions/
│   ├── genericos/       →    generics/
│   └── utility-types/        utility-types/
│
├── proyectos/           →  projects/
├── calculadora/         →  calculator/
├── adivinanza/          →  guess-game/
├── contactos/           →  contacts/
├── carrito/             →  cart/
└── todo/                    todo/ (sin cambio)
```

---

## 📝 Checklist de Tareas

### Fase 1: Renombrar Carpetas
- [ ] Renombrar `app/conceptos` → `app/concepts`
- [ ] Renombrar `app/conceptos/fundamentos` → `app/concepts/fundamentals`
- [ ] Renombrar `app/conceptos/funciones` → `app/concepts/functions`
- [ ] Renombrar `app/conceptos/uniones` → `app/concepts/unions`
- [ ] Renombrar `app/conceptos/genericos` → `app/concepts/generics`
- [ ] Renombrar `app/proyectos` → `app/projects`
- [ ] Renombrar `app/calculadora` → `app/calculator`
- [ ] Renombrar `app/adivinanza` → `app/guess-game`
- [ ] Renombrar `app/contactos` → `app/contacts`
- [ ] Renombrar `app/carrito` → `app/cart`

### Fase 2: Actualizar Links en Componentes
- [ ] `app/page.tsx` - Links a módulos y CTA
- [ ] `app/components/Navbar.tsx` - Links de navegación
- [ ] `app/components/Footer.tsx` - Links del footer
- [ ] `app/components/Navigation.tsx` - No tiene links hardcodeados
- [ ] `app/concepts/*/page.tsx` - LessonNavigation prev/next
- [ ] `app/projects/page.tsx` - Links a proyectos

### Fase 3: Actualizar Datos de i18n
- [ ] Actualizar `modulesData` en page.tsx con nuevos hrefs
- [ ] Actualizar `conceptsData` en concepts/page.tsx
- [ ] Actualizar `projectsData` en projects/page.tsx

### Fase 4: Verificación
- [ ] Ejecutar `npm run build` para verificar
- [ ] Probar navegación en desarrollo
- [ ] Verificar que el progreso funciona con nuevas rutas

---

## 🔧 Comandos de Renombrado (PowerShell)

```powershell
# Ejecutar desde d:\GitHub\learning-typescript\app

# Conceptos
Rename-Item -Path "conceptos" -NewName "concepts"
Rename-Item -Path "concepts/fundamentos" -NewName "fundamentals"
Rename-Item -Path "concepts/funciones" -NewName "functions"
Rename-Item -Path "concepts/uniones" -NewName "unions"
Rename-Item -Path "concepts/genericos" -NewName "generics"

# Proyectos
Rename-Item -Path "proyectos" -NewName "projects"
Rename-Item -Path "calculadora" -NewName "calculator"
Rename-Item -Path "adivinanza" -NewName "guess-game"
Rename-Item -Path "contactos" -NewName "contacts"
Rename-Item -Path "carrito" -NewName "cart"
```

---

## 📊 Archivos a Modificar

| Archivo | Cambios Necesarios |
|---------|-------------------|
| `app/page.tsx` | `href` de módulos: /conceptos/* → /concepts/* |
| `app/components/Navbar.tsx` | Link de navegación |
| `app/components/Footer.tsx` | Todos los links internos |
| `app/concepts/page.tsx` | `href` de cada concepto |
| `app/projects/page.tsx` | `href` de cada proyecto |
| `app/concepts/fundamentals/page.tsx` | `LessonNavigation next.href` |
| `app/concepts/functions/page.tsx` | `LessonNavigation prev/next.href` |
| `app/concepts/interfaces/page.tsx` | `LessonNavigation prev/next.href` |
| `app/concepts/unions/page.tsx` | `LessonNavigation prev/next.href` |
| `app/concepts/generics/page.tsx` | `LessonNavigation prev/next.href` |
| `app/concepts/utility-types/page.tsx` | `LessonNavigation prev.href` |

---

## ⚠️ Consideraciones

1. **Lesson IDs**: Los IDs de lecciones para el progreso (`fundamentos-01`, etc.) NO necesitan cambiar - solo afectan la persistencia interna.

2. **SEO**: Después del cambio, considera añadir redirects de las rutas antiguas a las nuevas si el sitio ya está en producción.

3. **Git**: Usar `git mv` para renombrar mantiene el historial:
   ```bash
   git mv app/conceptos app/concepts
   ```

4. **Orden de ejecución**: Renombrar carpetas PRIMERO, luego actualizar links para evitar errores de build.

---

## 🚀 Estimación

- **Tiempo**: ~15-20 minutos
- **Riesgo**: Bajo (cambios mecánicos, fáciles de revertir)
- **Impacto**: Alto (mejor SEO, estándares de industria)

---

¿Listo para ejecutar? Responde "sí" para comenzar la refactorización.
