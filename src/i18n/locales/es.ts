export const es = {
  nav: {
    home: "Inicio",
    projects: "Proyectos",
  },
  home: {
    title: "Domina TypeScript",
    subtitle: "Una ruta de aprendizaje estructurada desde los cimientos hasta patrones avanzados. Aprende las reglas, rompe los malos hábitos y escribe código a prueba de balas.",
    curriculum: "Ruta de Aprendizaje",
    ctaTitle: "¿Listo para construir?",
    ctaDesc: "Pon en práctica todo lo aprendido con nuestra colección de proyectos, desde calculadoras hasta apps completas.",
    ctaButton: "Ver Proyectos",
    modules: {
      basics: {
        title: "Fundamentos Esenciales",
        desc: "Tipos básicos, inferencia, y por qué 'any' es tu enemigo."
      },
      functions: {
        title: "Tipado de Funciones",
        desc: "Argumentos, retornos, funciones opcionales y overloads."
      },
      interfaces: {
        title: "Interfaces y Objetos",
        desc: "Modelando datos reales, propiedades opcionales y readonly."
      },
      unions: {
        title: "Union & Intersection",
        desc: "Creando tipos flexibles y combinando estructuras."
      },
      generics: {
        title: "Tipos Genéricos",
        desc: "Escribiendo código reutilizable y flexible."
      },
      utility: {
        title: "Utility Types",
        desc: "Herramientas integradas para transformar tipos: Partial, Pick, Omit."
      },
      advanced_narrowing: {
        title: "Narrowing Avanzado",
        desc: "Type Predicates (is), assertion functions y el operador 'in'."
      }
    }
  },
  concepts: {
    fundamentals: {
      title: "Fundamentos y \"Strictness\"",
      intro: "TypeScript no es solo JavaScript con tipos. Es una herramienta para modelar tu lógica de negocio y prevenir errores antes de ejecutar el código. Empecemos por la regla de oro: <strong> la inferencia es tu amiga, pero la explicidad es tu contrato.</strong>",
      sections: {
        inference: {
          title: "1. Inferencia vs Declaración Explícita",
          desc: "No siempre necesitas escribir el tipo. TypeScript es inteligente. Sin embargo, hay momentos donde declarar el tipo es crucial para definir un \"contrato\".",
          comparison: {
            title: "Inferencia de Tipos",
            desc: "Cuándo dejar que TS trabaje por ti.",
            goodCode: "// Limpio y seguro (TS infiere que es number)\nconst edad = 25; \nconst nombre = \"Juan\";\n\n// TS sabe que esto es boolean\nconst activo = true;",
            badCode: "// Redundante y ruidoso\nconst edad: number = 25;\nconst nombre: string = \"Juan\";\n\n// Si cambias el valor inicial, tienes que cambiar el tipo manualmente\nconst activo: boolean = true;",
            explanation: "Para variables primitivas inicializadas inmediatamente, la inferencia de tipos mantiene el código limpio. TypeScript ya sabe que 25 es un número. Declararlo explícitamente solo añade ruido visual a menos que no inicialices la variable."
          }
        },
        any: {
          title: "2. El peligro del 'any'",
          desc: "Usar <code>any</code> es básicamente apagar TypeScript. Pierdes autocompletado, seguridad y confianza.",
          comparison: {
            title: "Any vs Tipos Específicos",
            desc: "Evitando el comodín que destruye la seguridad.",
            goodCode: "function procesar(data: string) {\n  // TS te dará error inmediato si intentas pasar un número\n  // Y te autocompletará .toUpperCase() correctamente\n  return data.toUpperCase();\n}",
            badCode: "function procesar(data: any) {\n  // TS no te avisará si escribes mal 'toUppercase'\n  return data.toUppercase(); \n  // Crash en runtime si data es un número!\n}",
            explanation: "Cuando usas 'any', le dices al compilador 'confía en mí, sé lo que hago', lo cual suele ser mentira. Si realmente no conoces el tipo, usa 'unknown', que te obliga a verificar el tipo antes de usarlo."
          }
        }
      }
    },
    functions: {
      title: "Tipado de Funciones",
      intro: "Las funciones son el bloque de construcción fundamental. En TypeScript, debemos ser explícitos sobre lo que entra y lo que sale.",
      sections: {
        args: {
          title: "1. Tipado de Argumentos y Retorno",
          desc: "Siempre especifica el tipo de retorno, incluso si es <code>void</code>. Esto evita devoluciones accidentales.",
          comparison: {
            title: "Retorno Explícito",
            desc: "Evita que una función devuelva algo inesperado.",
            goodCode: "function sumar(a: number, b: number): number {\n  return a + b;\n}\n\n// TS te obligará a retornar string en todos los caminos\nfunction logUser(user: User): string {\n  if (user.isAdmin) return \"Admin\";\n  return \"User\"; // Error si falta esto\n}",
            badCode: "function sumar(a, b) {\n  // TS infiere retorno 'any' o 'number' dependiendo del contexto\n  return a + b; \n}\n\n// Si alguien cambia esto después...\nfunction logUser(user) {\n  if (user.isAdmin) return \"Admin\";\n  // ups, olvidé el 'else' explícito, devuelve undefined\n}",
            explanation: "El tipo de retorno explícito actúa como un guardián. Si modificas la función y olvidas retornar un valor o retornas el tipo incorrecto, TypeScript te gritará inmediatamente."
          }
        },
        optional: {
          title: "2. Parámetros Opcionales",
          desc: "Usa <code>?</code> para parámetros que no son obligatorios.",
          comparison: {
            title: "Opcionales vs Default",
            desc: "Manejo de argumentos faltantes.",
            goodCode: "// Opción A: Parámetro opcional\nfunction saludar(nombre?: string) {\n  // nombre es string | undefined\n  console.log(\"Hola \" + (nombre ?? \"Invitado\"));\n}\n\n// Opción B: Valor por defecto (Preferible)\nfunction saludar(nombre: string = \"Invitado\") {\n  // nombre es siempre string\n  console.log(\"Hola \" + nombre);\n}",
            badCode: "function saludar(nombre) {\n  // Típico check de JS antiguo\n  const n = nombre || \"Invitado\";\n  console.log(\"Hola \" + n);\n}",
            explanation: "Los valores por defecto en los parámetros son generalmente más limpios que los parámetros opcionales (?), ya que eliminan la necesidad de verificar 'undefined' dentro de la función."
          }
        }
      }
    },
    interfaces: {
      title: "Interfaces y Objetos",
      intro: "Describir la forma de los datos es la tarea principal en TypeScript. Las interfaces son la herramienta principal para definir \"contratos\" de objetos.",
      sections: {
        readonly: {
          title: "1. Readonly y Opcionales",
          desc: "Puedes controlar la mutabilidad y la presencia de propiedades directamente en la interfaz.",
          comparison: {
            title: "Inmutabilidad con Readonly",
            desc: "Prevenir modificaciones accidentales.",
            goodCode: "interface User {\n  readonly id: number; // No se puede cambiar después de crear\n  name: string;\n}\n\nfunction process(user: User) {\n  user.id = 999; // Error: Cannot assign to 'id' because it is a read-only property.\n}",
            badCode: "interface User {\n  id: number;\n  name: string;\n}\n\nfunction process(user: User) {\n  // ¡Peligroso! Modificando el ID\n  user.id = 999; \n}",
            explanation: "Usa `readonly` para propiedades que no deberían cambiar nunca (como IDs). Esto hace que tu código sea mucho más seguro y predecible."
          }
        },
        extends: {
          title: "2. Extender Interfaces",
          desc: "No repitas código (DRY). Usa la herencia de interfaces.",
          comparison: {
            title: "Herencia vs Duplicación",
            desc: "Componiendo estructuras complejas.",
            goodCode: "interface Persona {\n  nombre: string;\n  edad: number;\n}\n\n// Extendiendo limpia y correctamente\ninterface Empleado extends Persona {\n  salario: number;\n}",
            badCode: "interface Persona {\n  nombre: string;\n  edad: number;\n}\n\n// Repitiendo propiedades...\ninterface Empleado {\n  nombre: string;\n  edad: number;\n  salario: number;\n}",
            explanation: "`extends` permite reutilizar definiciones existentes, manteniendo tu código organizado y fácil de refactorizar."
          }
        }
      }
    },
    unions: {
      title: "Union Types & Discriminated Unions",
      intro: "En TypeScript, raramente un valor es \"solo una cosa\". A veces puede ser un número O un string. Pero el verdadero poder llega cuando combinamos uniones con tipos literales para modelar estados imposibles.",
      sections: {
        literals: {
          title: "1. Tipos Literales",
          desc: "En lugar de permitir cualquier <code>string</code>, podemos restringir una variable a valores específicos.",
          code: "type Direccion = 'norte' | 'sur' | 'este' | 'oeste';\n\n// Solo acepta estos 4 valores exactos\nlet miDireccion: Direccion = 'norte';  // ✅ OK\nmiDireccion = 'arriba';  // ❌ Error: Type '\"arriba\"' is not assignable"
        },
        discriminated: {
          title: "2. El Caos de los Booleanos vs Estados Explícitos",
          desc: "Un error común es usar múltiples banderas booleanas para controlar el estado. Esto permite \"estados imposibles\".",
          comparison: {
             title: "Booleanos vs Union Types",
             desc: "Modelando estados mutuamente excluyentes.",
             goodCode: "type RequestState = \n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'error'; message: string }\n  | { status: 'success'; data: User };\n\n// ✅ TypeScript ahora te protege:\nconst estado: RequestState = { \n  status: 'loading' \n  // No puedes agregar 'data' ni 'message' aquí\n};\n\nif (estado.status === 'success') {\n  console.log(estado.data); // TS sabe que 'data' existe\n}",
             badCode: "interface RequestState {\n  isLoading: boolean;\n  isError: boolean;\n  isSuccess: boolean;\n  error?: string;\n  data?: User;\n}\n\n// ❌ Problema: ¡Esto es válido pero ilógico!\nconst estado: RequestState = {\n  isLoading: true,\n  isSuccess: true, // ¿Cargando y éxito a la vez?\n  error: \"Falló internet\", // ¿Y con error también?\n};",
             explanation: "Al usar una 'Discriminated Union' (una propiedad común 'status' que discrimina el tipo), hacemos matemáticamente imposible representar un estado inválido. Además, TypeScript inferirá qué propiedades están disponibles en cada bloque 'if' o 'switch'."
          }
        },
        narrowing: {
          title: "3. Narrowing (Estrechamiento de Tipos)",
          desc: "TypeScript es lo suficientemente inteligente para saber qué tipo es una variable después de que la verificas.",
          comparison: {
              title: "Type Guards Básicos",
              desc: "Cómo trabajar con tipos mixtos.",
              goodCode: "function padLeft(value: string | number, padding: number) {\n  if (typeof value === \"number\") {\n    // Aquí dentro, TS sabe que 'value' es number\n    return \" \".repeat(padding) + value.toFixed(2);\n  }\n  // Aquí fuera, TS sabe que 'value' TIENE que ser string\n  return \" \".repeat(padding) + value;\n}",
              badCode: "function padLeft(value: string | number, padding: number) {\n  // Error: .repeat no existe en 'number'\n  return \" \".repeat(padding) + value; \n}",
              explanation: "El operador `typeof` (y `instanceof` para clases) actúa como un 'guardia'. Dentro del bloque `if`, TypeScript estrecha (narrows) el tipo de la unión a uno específico, permitiéndote acceder a sus métodos de forma segura."
          }
        }
      }
    },
    generics: {
      title: "Tipos Genéricos (Generics)",
      intro: "Los Genéricos son como \"variables para tipos\". Nos permiten escribir código reutilizable sin perder seguridad.",
      sections: {
        problem: {
          title: "1. El problema de la reutilización",
          desc: "Imagina una función que simplemente devuelve lo que le pasas. Sin genéricos, tendrías que usar <code>any</code> y perderías la información del tipo.",
          comparison: {
            title: "Any vs Genéricos",
            desc: "Manteniendo la identidad del tipo.",
            goodCode: "function identity<T>(arg: T): T {\n  return arg;\n}\n\n// ✅ TypeScript infiere que T es 'string'.\nconst output = identity(\"Hola\"); \n// 'output' es string. Autocompletado 100% funcional.\noutput.toUpperCase();",
            badCode: "function identity(arg: any): any {\n  return arg;\n}\n\n// ❌ Se pierde el tipo. 'output' es 'any'.\nconst output = identity(\"Hola\"); \n// TypeScript no sabe que output es un string.\noutput.toUpperCase(); // Funciona, pero sin autocompletado real.",
            explanation: "Al usar `<T>`, capturamos el tipo del argumento que el usuario pasa (por ejemplo 'string') y lo usamos para denotar el tipo de retorno. T es una variable que TypeScript rellena automáticamente."
          }
        },
        interfaces: {
          title: "2. Interfaces Genéricas",
          desc: "Muy útil para respuestas de API estándar.",
          comparison: {
            title: "Respuestas de API",
            desc: "Estandarizando estructuras.",
            goodCode: "interface ApiResponse<T> {\n  data: T;\n  status: number;\n  message?: string;\n}\n\n// Reutilizamos la misma estructura base\ntype UserResponse = ApiResponse<User>;\ntype ProductResponse = ApiResponse<Product>;",
            badCode: "interface UserResponse {\n  data: User;\n  status: number;\n}\ninterface ProductResponse {\n  data: Product;\n  status: number;\n}\n// Repetitivo si tienes muchos modelos...",
            explanation: "Con `ApiResponse<T>`, definimos la 'caja' una sola vez. Luego podemos poner cualquier cosa (User, Product, Array<User>) dentro de esa caja de forma segura."
          }
        },
        constraints: {
          title: "3. Constraints (Restricciones)",
          desc: "A veces queremos un genérico, pero no \"cualquier\" cosa. Queremos que cumpla cierta condición.",
          comparison: {
            title: "Extends",
            desc: "Limitando lo que T puede ser.",
            goodCode: "interface TieneLongitud {\n  length: number;\n}\n\n// T DEBE tener la propiedad 'length'\nfunction longitud<T extends TieneLongitud>(arg: T) {\n  return arg.length;\n}\n\nlongitud(\"hola\"); // ✅ Funciona (string tiene length)\nlongitud([1, 2]); // ✅ Funciona (array tiene length)\nlongitud(100);    // ❌ Error (number no tiene length)",
            badCode: "function longitud<T>(arg: T) {\n  // Error: Property 'length' does not exist on type 'T'.\n  return arg.length; \n}",
            explanation: "`extends` nos permite decir: 'Acepto cualquier tipo T, SIEMPRE Y CUANDO T tenga al menos estas propiedades'. Es un contrato parcial."
          }
        }
      }
    },
    utility: {
      title: "Utility Types",
      intro: "TypeScript viene con herramientas integradas para transformar tipos existentes. No necesitas reescribir interfaces una y otra vez.",
      sections: {
        partial: {
          title: "1. Partial<T>",
          desc: "Convierte todas las propiedades de un tipo en opcionales. Perfecto para actualizaciones (patches).",
          comparison: {
            title: "Creación vs Edición",
            desc: "Reutilizando el tipo base para formularios de edición.",
            goodCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// ✅ Partial<User> hace todo opcional automáticamente\nfunction updateUser(id: number, fields: Partial<User>) {\n  // fields acepta { name: 'New Name' } sin pedir email\n}",
            badCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// ❌ Duplicación innecesaria\ninterface UserUpdate {\n  id?: number;\n  name?: string;\n  email?: string;\n}\n\nfunction updateUser(id: number, fields: UserUpdate) { ... }",
            explanation: "Partial toma tu interfaz `User` y devuelve una nueva versión donde `name` es `string | undefined`, `email` es `string | undefined`, etc."
          }
        },
        pick_omit: {
          title: "2. Pick<T, K> y Omit<T, K>",
          desc: "Selecciona o excluye propiedades específicas. Útil para DTOs o props de componentes.",
          comparison: {
            title: "Recortando tipos",
            desc: "Muestra solo lo que necesitas.",
            goodCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  passwordHash: string;\n}\n\n// ✅ Omitimos passwordHash\ntype UserPreview = Omit<User, 'passwordHash'>;\n\n// O bien, seleccionamos solo lo que queremos\ntype UserCardProps = Pick<User, 'name' | 'email'>;",
            badCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  passwordHash: string; // ⚠️ No queremos exponer esto por error\n}\n\nfunction getUserPreview(user: User) {\n  // Riesgo de retornar passwordHash al frontend\n  return user;\n}",
            explanation: "Con `Omit`, creas un nuevo tipo quitando propiedades sensibles o innecesarias. Con `Pick`, haces una lista blanca de lo único que permites."
          }
        },
        record: {
          title: "3. Record<K, T>",
          desc: "Para objetos dinámicos (diccionarios/mapas) donde sabes el tipo de la clave y el valor.",
          comparison: {
            title: "Diccionarios Tipados",
            desc: "Evitando 'any' en objetos dinámicos.",
            goodCode: "const precios: Record<string, number> = {};\n\nprecios.manzana = 10;\n// precios.pera = \"dos\"; // ❌ Error: Type 'string' is not assignable to type 'number'.",
            badCode: "const precios: any = {};\nprecios.manzana = 10;\nprecios.pera = \"dos\"; // ❌ Error lógico, pero TS no se queja",
            explanation: "Record permite definir objetos flexibles pero seguros. El primer argumento es el tipo de la clave (usualmente string o un Union Type) y el segundo es el tipo del valor."
          }
        }
      }
    },
    advanced_narrowing: {
      title: "Advanced Narrowing & Type Guards",
      intro: "A veces el <code>typeof</code> de JS no es suficiente. Para objetos complejos o validaciones personalizadas, TypeScript nos permite crear nuestros propios 'guardianes' de tipo.",
      sections: {
        is: {
          title: "1. Type Predicates (arg is Type)",
          desc: "Permite a una función informar al compilador que, si devuelve true, el argumento es de un tipo específico.",
          comparison: {
            title: "Boolean vs Type Predicate",
            desc: "Cómo convencer a TS de que un objeto es lo que dices.",
            goodCode: "interface Bird { fly: () => void }\ninterface Fish { swim: () => void }\n\n// ✅ Si devuelve true, TS sabe que 'pet' es Bird\nfunction isBird(pet: Bird | Fish): pet is Bird {\n  return (pet as Bird).fly !== undefined;\n}\n\nif (isBird(myPet)) {\n  myPet.fly(); // ✅ Seguro\n}",
            badCode: "function isBird(pet: Bird | Fish): boolean {\n  return (pet as Bird).fly !== undefined;\n}\n\nif (isBird(myPet)) {\n  myPet.fly(); // ❌ Error: Property 'fly' does not exist\n}",
            explanation: "Sin 'pet is Bird', TypeScript solo sabe que la función devuelve un booleano, pero no sabe que ese booleano está relacionado con el tipo de la variable. Con el predicado de tipo, el estrechamiento (narrowing) ocurre mágicamente."
          }
        },
        in: {
          title: "2. El operador 'in'",
          desc: "Una forma rápida de estrechar tipos en objetos sin necesidad de funciones extra.",
          code: "function move(pet: Bird | Fish) {\n  if ('fly' in pet) {\n    // TS sabe que es Bird porque tiene 'fly'\n    pet.fly();\n  } else {\n    pet.swim();\n  }\n}"
        }
      }
    }
  },
  projects: {
    title: "Proyectos Prácticos",
    subtitle: "Una vez que hayas dominado los conceptos teóricos, pon a prueba tus habilidades construyendo estas aplicaciones.",
    week: "Semana",
    completed: "Completado",
    go_to: "Ir al proyecto",
    review: "Repasar proyecto",
    difficulty: {
      easy: "Fácil",
      medium: "Media",
      hard: "Difícil"
    },
    list: {
      calculator: {
        title: "Calculadora Básica",
        desc: "Practica tipos primitivos y funciones con operaciones matemáticas.",
        longDesc: "Tu primera misión es construir una calculadora simple. Aprenderás a tipar estados y manejar eventos básicos de React con TypeScript.",
        objectives: [
          "Crea dos inputs de tipo number controlados por useState.",
          "Tipa el estado explícitamente (ej: useState<string>).",
          "Crea 4 botones (+, -, *, /) que ejecuten la operación sobre los números.",
          "Muestra el resultado o un mensaje de error si la entrada es inválida.",
          "Reto Extra: Usa un 'switch' para la lógica de operaciones."
        ],
        hints: [
          {
            title: "Tipado de useState",
            content: "Recuerda que useState acepta un genérico: \nconst [num, setNum] = useState<string>('');"
          },
          {
            title: "Operaciones",
            content: "Usa parseFloat() o Number() antes de operar para evitar concatenar como texto."
          }
        ],
        solution: {
          title: "Solución Propuesta",
          description: "Aquí tienes una forma de implementarlo. Compara tu código:",
          code: "function Calculator() {\n  const [num1, setNum1] = useState<string>('');\n  const [num2, setNum2] = useState<string>('');\n  const [result, setResult] = useState<number | string | null>(null);\n\n  const handleOp = (op: '+' | '-' | '*' | '/') => {\n    const n1 = parseFloat(num1);\n    const n2 = parseFloat(num2);\n    if (isNaN(n1) || isNaN(n2)) return setResult(\"Entrada no válida\");\n\n    switch(op) {\n      case '+': setResult(n1 + n2); break;\n      case '-': setResult(n1 - n2); break;\n      case '*': setResult(n1 * n2); break;\n      case '/': setResult(n2 !== 0 ? n1 / n2 : \"Div por 0\"); break;\n    }\n  };\n\n  return (\n    <div className='p-4 gap-2 flex flex-col max-w-[200px]'>\n      <input value={num1} onChange={e => setNum1(e.target.value)} placeholder=\"0\" />\n      <input value={num2} onChange={e => setNum2(e.target.value)} placeholder=\"0\" />\n      <div className=\"flex gap-2\">\n        {['+', '-', '*', '/'].map(op => (\n          <button key={op} onClick={() => handleOp(op as any)}>{op}</button>\n        ))}\n      </div>\n      <div>Result: {result}</div>\n    </div>\n  )\n}"
        }
      },
      todo: {
        title: "Lista de Tareas",
        desc: "Aprende a manejar arrays, objetos e interfaces.",
        longDesc: "Construye una aplicación de tareas donde aprenderás a gestionar listas de objetos y definir estructuras de datos complejas.",
        objectives: [
          "Define una interfaz 'Todo' con id, text, y completed.",
          "Usa un array de objetos Todo en el estado (useState<Todo[]>).",
          "Implementa funciones para agregar, eliminar y marcar como completada.",
          "Filtra las tareas por estado (Todas, Pendientes, Completadas)."
        ],
        hints: [
          {
            title: "Inmutabilidad",
            content: "Nunca uses .push() en el estado. Usa spread: \nsetTodos([...todos, newTodo]);"
          }
        ],
        solution: {
          title: "Solución: Lista de Tareas",
          description: "Manejo de estados complejos y arrays.",
          code: "interface Todo {\n  id: number;\n  text: string;\n  completed: boolean;\n}\n\nfunction TodoApp() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  const [text, setText] = useState('');\n\n  const add = () => {\n    if (!text) return;\n    const newTodo = { id: Date.now(), text, completed: false };\n    setTodos([...todos, newTodo]);\n    setText('');\n  };\n\n  const toggle = (id: number) => {\n    setTodos(todos.map(t => \n      t.id === id ? { ...t, completed: !t.completed } : t\n    ));\n  };\n\n  return (\n    <div className=\"max-w-sm\">\n      <div className=\"flex gap-2 mb-4\">\n        <input value={text} onChange={e => setText(e.target.value)} />\n        <button onClick={add}>Add</button>\n      </div>\n      <ul>\n        {todos.map(t => (\n          <li key={t.id} className=\"flex gap-2\">\n            <input type=\"checkbox\" checked={t.completed} onChange={() => toggle(t.id)} />\n            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>\n              {t.text}\n            </span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
        }
      },
      guess: {
        title: "Juego de Adivinanza",
        desc: "Funciones, tipos especiales y lógica de control.",
        longDesc: "Crea un juego donde el usuario debe adivinar un número. Practica lógica aleatoria y estados de victoria/derrota usando tipos literales.",
        objectives: [
          "Genera un número aleatorio al iniciar (useEffect).",
          "Tipa los posibles estados del juego (playing, won, lost).",
          "Crea una función que valide el intento y devuelva pistas (alto/bajo).",
          "Reinicia el juego generando un nuevo número secreto."
        ],
        hints: [
          {
            title: "Tipos Literales",
            content: "type GameStatus = 'playing' | 'won' | 'lost';"
          }
        ],
        solution: {
          title: "Solución: Adivinanza",
          description: "Lógica de control y tipado de estados.",
          code: "type GameStatus = 'playing' | 'won' | 'lost';\n\nfunction GuessGame() {\n  const [target, setTarget] = useState(0);\n  const [guess, setGuess] = useState('');\n  const [status, setStatus] = useState<GameStatus>('playing');\n  const [message, setMessage] = useState('');\n\n  useEffect(() => {\n    setTarget(Math.floor(Math.random() * 100) + 1);\n  }, []);\n\n  const check = () => {\n    const num = parseInt(guess);\n    if (isNaN(num)) return;\n\n    if (num === target) {\n      setStatus('won');\n      setMessage('¡Correcto!');\n    } else if (num < target) {\n      setMessage('Muy bajo');\n    } else {\n      setMessage('Muy alto');\n    }\n  };\n\n  const reset = () => {\n    setTarget(Math.floor(Math.random() * 100) + 1);\n    setGuess('');\n    setStatus('playing');\n    setMessage('');\n  };\n\n  return (\n    <div className=\"flex flex-col gap-4 max-w-xs\">\n      {status === 'playing' ? (\n        <>\n          <input \n            type=\"number\" \n            value={guess} \n            onChange={e => setGuess(e.target.value)} \n            className=\"border p-2 rounded\"\n          />\n          <button onClick={check} className=\"bg-blue-500 text-white p-2 rounded\">Adivinar</button>\n          <p>{message}</p>\n        </>\n      ) : (\n        <div className=\"text-center\">\n           <p className=\"text-green-600 font-bold mb-2\">¡Ganaste!</p>\n           <button onClick={reset} className=\"bg-gray-500 text-white p-2 rounded\">Jugar de nuevo</button>\n        </div>\n      )}\n    </div>\n  );\n}"
        }
      },
      contacts: {
        title: "Gestor de Contactos",
        desc: "Introducción a Clases e Interfaces avanzadas.",
        longDesc: "Administra una lista de personas. Ideal para practicar herencia, búsqueda en arrays y validaciones de tipos complejos.",
        objectives: [
          "Define una interfaz 'Contact' con múltiples campos obligatorios y opcionales.",
          "Implementa un buscador en tiempo real por nombre o email.",
          "Crea un formulario con validación para evitar contactos duplicados.",
          "Maneja estados de 'favorito' usando booleanos."
        ],
        hints: [
          {
            title: "Búsqueda",
            content: "Usa .filter() y .toLowerCase() para una búsqueda insensible a mayúsculas."
          }
        ],
        solution: {
          title: "Solución: Contactos",
          description: "Interfaces complejas y formularios.",
          code: "interface Contact {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction ContactManager() {\n  const [contacts, setContacts] = useState<Contact[]>([]);\n  const [name, setName] = useState('');\n  const [email, setEmail] = useState('');\n  const [search, setSearch] = useState('');\n\n  const add = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (contacts.some(c => c.email === email)) return alert('Email duplicado');\n    setContacts([...contacts, { id: Date.now(), name, email }]);\n    setName(''); setEmail('');\n  };\n\n  const filtered = contacts.filter(c => \n    c.name.toLowerCase().includes(search.toLowerCase())\n  );\n\n  return (\n    <div className=\"max-w-md\">\n      <form onSubmit={add} className=\"flex flex-col gap-2 mb-4 border p-4 rounded\">\n         <input value={name} onChange={e => setName(e.target.value)} placeholder=\"Nombre\" required />\n         <input value={email} onChange={e => setEmail(e.target.value)} placeholder=\"Email\" type=\"email\" required />\n         <button type=\"submit\" className=\"bg-indigo-600 text-white p-2 rounded\">Agregar</button>\n      </form>\n\n      <input \n        value={search} \n        onChange={e => setSearch(e.target.value)} \n        placeholder=\"Buscar...\" \n        className=\"w-full mb-4 p-2 border rounded\"\n      />\n\n      <ul className=\"space-y-2\">\n        {filtered.map(c => (\n          <li key={c.id} className=\"border p-2 rounded flex justify-between\">\n            <span>{c.name}</span>\n            <span className=\"text-gray-500\">{c.email}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
        }
      },
      cart: {
        title: "Carrito de Compras",
        desc: "Uso de Generics y tipos compuestos.",
        longDesc: "El desafío final de lógica. Crea un sistema comercial usando Genéricos para manejar cualquier tipo de producto y Utility Types para el carrito.",
        objectives: [
          "Define una interfaz genérica para productos.",
          "Usa Omit o Pick para crear el tipo de item del carrito a partir del producto.",
          "Crea un hook genérico 'useCart' para manejar la lógica de agregar/quitar.",
          "Calcula subtotales e impuestos usando reducers seguros."
        ],
        hints: [
          {
            title: "Uso de Genéricos",
            content: "function useCart<T extends { id: number }>() { ... }"
          }
        ],
        solution: {
            title: "Solución: Carrito de Compras",
            description: "Genéricos y Utility Types.",
            code: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n}\n\n// Utility Type para items del carrito (quizás con cantidad)\ntype CartItem = Product & { quantity: number };\n\nfunction ShoppingCart() {\n  const [cart, setCart] = useState<CartItem[]>([]);\n\n  const addToCart = (product: Product) => {\n    setCart(prev => {\n      const existing = prev.find(item => item.id === product.id);\n      if (existing) {\n        return prev.map(item => \n          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item\n        );\n      }\n      return [...prev, { ...product, quantity: 1 }];\n    });\n  };\n\n  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);\n\n  return (\n    <div className=\"grid grid-cols-2 gap-8\">\n      <div className=\"space-y-2\">\n        <h4 className=\"font-bold\">Productos</h4>\n        {/* Mock Products */}\n        <button onClick={() => addToCart({ id: 1, name: 'Laptop', price: 999 })} \n          className=\"block w-full text-left p-2 border rounded hover:bg-gray-50\">\n          Laptop ($999)\n        </button>\n        <button onClick={() => addToCart({ id: 2, name: 'Mouse', price: 29 })} \n          className=\"block w-full text-left p-2 border rounded hover:bg-gray-50\">\n          Mouse ($29)\n        </button>\n      </div>\n\n      <div>\n        <h4 className=\"font-bold mb-2\">Carrito (Total: ${total})</h4>\n        {cart.map(item => (\n          <div key={item.id} className=\"flex justify-between text-sm mb-1\">\n            <span>{item.name} x{item.quantity}</span>\n            <span>${item.price * item.quantity}</span>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}"
        }
      },
      api_dashboard: {
        title: "API Dashboard",
        desc: "Manejo de datos asíncronos y validación de respuestas.",
        longDesc: "Aprende a consumir datos reales. Trabajarás con Promesas, estados de carga y validación de tipos para datos externos.",
        objectives: [
          "Tipa la respuesta de una API usando interfaces.",
          "Crea una unión para estados de la UI (loading, success, error).",
          "Usa genéricos para crear un fetcher reutilizable.",
          "Asegúrate de manejar el tipo 'unknown' en el catch del fetch."
        ],
        hints: [
          {
            title: "Tipado de Fetch",
            content: "async function getData(): Promise<User[]> { ... }"
          },
          {
            title: "Manejo de Errores",
            content: "catch (err: unknown) {\n  if (err instanceof Error) console.log(err.message);\n}"
          }
        ],
        solution: {
            title: "Solución: Dashboard API",
            description: "Promesas, Fetch y Tipado de Errores.",
            code: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ntype FetchState<T> = \n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'error', error: string }\n  | { status: 'success', data: T };\n\nfunction ApiDashboard() {\n  const [state, setState] = useState<FetchState<User[]>>({ status: 'idle' });\n\n  const loadUsers = async () => {\n    setState({ status: 'loading' });\n    try {\n      const res = await fetch('https://jsonplaceholder.typicode.com/users');\n      if (!res.ok) throw new Error('Error de red');\n      const data = await res.json();\n      setState({ status: 'success', data });\n    } catch (err) {\n      const message = err instanceof Error ? err.message : 'Error desconocido';\n      setState({ status: 'error', error: message });\n    }\n  };\n\n  return (\n    <div className=\"space-y-4\">\n      <button onClick={loadUsers} className=\"bg-purple-600 text-white px-4 py-2 rounded\">\n        Cargar Usuarios\n      </button>\n\n      {state.status === 'loading' && <p>Cargando...</p>}\n      {state.status === 'error' && <p className=\"text-red-500\">{state.error}</p>}\n      \n      {state.status === 'success' && (\n        <div className=\"grid gap-2\">\n          {state.data.slice(0, 3).map(u => (\n            <div key={u.id} className=\"p-3 border rounded shadow-sm bg-white dark:bg-zinc-800\">\n              <p className=\"font-bold\">{u.name}</p>\n              <p className=\"text-sm text-gray-500\">{u.email}</p>\n            </div>\n          ))}\n        </div>\n      )}\n    </div>\n  );\n}"
        }
      }
    }
  },
  challenge: {
    objectives: "Objetivos",
    hints: {
      title: "Pistas y Ayudas",
      trigger: "Pista"
    },
    complete_btn: "Marcar como Terminado",
    completed_btn: "¡Desafío Completado!",
    workspace: "Tu Componente",
    preview: "Vista Previa",
    solution: "Solución / Esperado"
  },
  footer: {
    desc: "Plataforma interactiva para dominar TypeScript desde cero hasta patrones avanzados.",
    concepts: "Conceptos",
    projects: "Proyectos",
    resources: "Recursos",
    view_all: "Ver todos →",
    docs: "Documentación Oficial",
    playground: "TS Playground",
    copyright: "TS Learning. Creado para aprender TypeScript."
  },
  navigation: {
    back: "Volver",
    previous: "Anterior",
    next: "Siguiente",
    of: "de",
    home: "Inicio",
    concepts: "Conceptos"
  },
  code_comparison: {
    good: "Buenas Prácticas",
    bad: "Anti-pattern",
    show_explanation: "Ocultar explicación",
    why: "¿Por qué es mejor?"
  },
  categories: {
    basic: "Básico",
    intermediate: "Intermedio",
    advanced: "Avanzado"
  },
  ui: {
    start_learning: "Comenzar a aprender",
    view_projects: "Ver proyectos",
    view_all: "Ver todo",
    your_progress: "Tu progreso",
    module: "Módulo",
    completed: "Completado",
    tips: "Consejos",
    stats: {
      modules: "Módulos",
      projects: "Proyectos",
      quizzes: "Quizzes",
      examples: "Ejemplos"
    }
  },
  quiz: {
    title: "Desafío de Conocimiento",
    question: "Pregunta",
    check_answer: "Comprobar Respuesta",
    next_question: "Siguiente Pregunta",
    view_results: "Ver Resultados",
    correct: "¡Correcto!",
    incorrect: "Incorrecto.",
    completed: "¡Lección Completada!",
    good_try: "¡Buen intento!",
    score_text: "Has obtenido",
    of: "de",
    correct_answers: "respuestas correctas",
    min_score: "Necesitas al menos 60% para completar esta lección.",
    retry: "Intentar de nuevo",
    review: "Repasar lección"
  },
  concepts_page: {
    title: "Conceptos y Teoría",
    subtitle: "Aquí profundizaremos en la teoría detrás de TypeScript. No solo se trata de \"hacer que funcione\", sino de escribir código robusto, mantenible y seguro."
  },
  tips: {
    tip1: "Completa los conceptos teóricos antes de cada proyecto para mejor comprensión.",
    tip2: "Cada proyecto aumenta en dificultad - síguelos en orden.",
    tip3: "Usa el TypeScript Playground para experimentar antes de implementar."
  }
};
