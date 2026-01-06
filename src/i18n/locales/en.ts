export const en = {
  nav: {
    home: "Home",
    projects: "Projects",
  },
  home: {
    title: "Master TypeScript",
    subtitle: "A structured learning path from foundations to advanced patterns. Learn the rules, break bad habits, and write bulletproof code.",
    curriculum: "Learning Path",
    ctaTitle: "Ready to build?",
    ctaDesc: "Put everything you've learned into practice with our collection of projects, from calculators to full apps.",
    ctaButton: "View Projects",
    modules: {
      basics: {
        title: "Essential Fundamentals",
        desc: "Basic types, inference, and why 'any' is your enemy."
      },
      functions: {
        title: "Function Typing",
        desc: "Arguments, returns, optional functions and overloads."
      },
      interfaces: {
        title: "Interfaces & Objects",
        desc: "Modeling real data, optional properties and readonly."
      },
      unions: {
        title: "Union & Intersection",
        desc: "Creating flexible types and combining structures."
      },
      generics: {
        title: "Generic Types",
        desc: "Writing reusable and flexible code."
      },
      utility: {
        title: "Utility Types",
        desc: "Built-in tools to transform types: Partial, Pick, Omit."
      },
      advanced_narrowing: {
        title: "Advanced Narrowing",
        desc: "Type Predicates (is), assertion functions, and the 'in' operator."
      }
    }
  },
  concepts: {
    fundamentals: {
      title: "Fundamentals & Strictness",
      intro: "TypeScript is not just JavaScript with types. It's a tool to model your business logic and prevent errors before runtime. Let's start with the golden rule: <strong>inference is your friend, but explicitness is your contract.</strong>",
      sections: {
        inference: {
          title: "1. Inference vs Explicit Declaration",
          desc: "You don't always need to write the type. TypeScript is smart. However, there are times when declaring the type is crucial to define a \"contract\".",
          comparison: {
            title: "Type Inference",
            desc: "When to let TS work for you.",
            goodCode: "// Clean and safe (TS infers it's number)\nconst age = 25; \nconst name = \"John\";\n\n// TS knows this is boolean\nconst active = true;",
            badCode: "// Redundant and noisy\nconst age: number = 25;\nconst name: string = \"John\";\n\n// If you change the initial value, you have to change the type manually\nconst active: boolean = true;",
            explanation: "For primitive variables initialized immediately, type inference keeps the code clean. TypeScript already knows 25 is a number. Declaring it explicitly just adds visual noise unless you don't initialize the variable."
          }
        },
        any: {
          title: "2. The danger of 'any'",
          desc: "Using <code>any</code> is basically turning off TypeScript. You lose autocomplete, safety, and confidence.",
          comparison: {
            title: "Any vs Specific Types",
            desc: "Avoiding the wildcard that destroys safety.",
            goodCode: "function process(data: string) {\n  // TS gives immediate error if you try to pass a number\n  // And autocompletes .toUpperCase() correctly\n  return data.toUpperCase();\n}",
            badCode: "function process(data: any) {\n  // TS won't warn if you misspell 'toUppercase'\n  return data.toUppercase(); \n  // Crash at runtime if data is a number!\n}",
            explanation: "When you use 'any', you tell the compiler 'trust me, I know what I'm doing', which is often a lie. If you really don't know the type, use 'unknown', which forces you to check the type before using it."
          }
        }
      }
    },
    functions: {
      title: "function Typing",
      intro: "Functions are the fundamental building block. In TypeScript, we must be explicit about what goes in and what comes out.",
      sections: {
        args: {
          title: "1. Argument & Return Typing",
          desc: "Always specify the return type, even if it is <code>void</code>. This prevents accidental returns.",
          comparison: {
            title: "Explicit Return",
            desc: "Prevents a function from returning something unexpected.",
            goodCode: "function sum(a: number, b: number): number {\n  return a + b;\n}\n\n// TS enforces returning string in all paths\nfunction logUser(user: User): string {\n  if (user.isAdmin) return \"Admin\";\n  return \"User\"; // Error if this is missing\n}",
            badCode: "function sum(a, b) {\n  // TS infers 'any' or 'number' return depending on context\n  return a + b; \n}\n\n// If someone changes this later...\nfunction logUser(user) {\n  if (user.isAdmin) return \"Admin\";\n  // oops, forgot explicit 'else', returns undefined\n}",
            explanation: "Explicit return types act as a guard. If you modify the function and forget to return a value or return the wrong type, TypeScript will yell at you immediately."
          }
        },
        optional: {
          title: "2. Optional Parameters",
          desc: "Use <code>?</code> for parameters that are not mandatory.",
          comparison: {
            title: "Optionals vs Default",
            desc: "Handling missing arguments.",
            goodCode: "// Option A: Optional parameter\nfunction greet(name?: string) {\n  // name is string | undefined\n  console.log(\"Hello \" + (name ?? \"Guest\"));\n}\n\n// Option B: Default value (Preferred)\nfunction greet(name: string = \"Guest\") {\n  // name is always string\n  console.log(\"Hello \" + name);\n}",
            badCode: "function greet(name) {\n  // Typical old JS check\n  const n = name || \"Guest\";\n  console.log(\"Hello \" + n);\n}",
            explanation: "Default parameters are generally cleaner than optional parameters (?), as they eliminate the need to check for 'undefined' inside the function."
          }
        }
      }
    },
    interfaces: {
      title: "Interfaces & Objects",
      intro: "Describing the shape of data is the main task in TypeScript. Interfaces are the main tool to define object \"contracts\".",
      sections: {
        readonly: {
          title: "1. Readonly & Optionals",
          desc: "You can control mutability and presence of properties directly in the interface.",
          comparison: {
            title: "Immutability with Readonly",
            desc: "Preventing accidental modifications.",
            goodCode: "interface User {\n  readonly id: number; // Cannot change after creation\n  name: string;\n}\n\nfunction process(user: User) {\n  user.id = 999; // Error: Cannot assign to 'id' because it is a read-only property.\n}",
            badCode: "interface User {\n  id: number;\n  name: string;\n}\n\nfunction process(user: User) {\n  // Dangerous! Modifying the ID\n  user.id = 999; \n}",
            explanation: "Use `readonly` for properties that should never change (like IDs). This makes your code much safer and predictable."
          }
        },
        extends: {
          title: "2. Extending Interfaces",
          desc: "Don't repeat yourself (DRY). Use interface inheritance.",
          comparison: {
            title: "Inheritance vs Duplication",
            desc: "Composing complex structures.",
            goodCode: "interface Person {\n  name: string;\n  age: number;\n}\n\n// Extending cleanly and correctly\ninterface Employee extends Person {\n  salary: number;\n}",
            badCode: "interface Person {\n  name: string;\n  age: number;\n}\n\n// Repeating properties...\ninterface Employee {\n  name: string;\n  age: number;\n  salary: number;\n}",
            explanation: "`extends` allows you to reuse existing definitions, keeping your code organized and easy to refactor."
          }
        }
      }
    },
    unions: {
      title: "Union Types & Discriminated Unions",
      intro: "In TypeScript, a value is rarely \"just one thing\". Sometimes it can be a number OR a string. But the real power comes when combining unions with literal types to model impossible states.",
      sections: {
        literals: {
          title: "1. Literal Types",
          desc: "Instead of allowing any <code>string</code>, we can restrict a variable to specific values.",
          code: "type Direction = 'north' | 'south' | 'east' | 'west';\n\n// Only accepts these 4 exact values\nlet myDirection: Direction = 'north';  // ✅ OK\nmyDirection = 'up';  // ❌ Error: Type '\"up\"' is not assignable"
        },
        discriminated: {
          title: "2. Boolean Chaos vs Explicit States",
          desc: "A common mistake is using multiple boolean flags to control state. This allows \"impossible states\".",
          comparison: {
            title: "Booleans vs Union Types",
            desc: "Modeling mutually exclusive states.",
            goodCode: "type RequestState = \n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'error'; message: string }\n  | { status: 'success'; data: User };\n\n// ✅ TypeScript now protects you:\nconst state: RequestState = { \n  status: 'loading' \n  // You cannot add 'data' or 'message' here\n};\n\nif (state.status === 'success') {\n  console.log(state.data); // TS knows 'data' exists\n}",
            badCode: "interface RequestState {\n  isLoading: boolean;\n  isError: boolean;\n  isSuccess: boolean;\n  error?: string;\n  data?: User;\n}\n\n// ❌ Problem: This is valid but illogical!\nconst state: RequestState = {\n  isLoading: true,\n  isSuccess: true, // Loading and Success at the same time?\n  error: \"Internet failed\", // And with error too?\n};",
            explanation: "By using a 'Discriminated Union' (a common property 'status' that discriminates the type), we make it mathematically impossible to represent an invalid state. Plus, TypeScript will infer which properties are available in each 'if' or 'switch' block."
          }
        },
        narrowing: {
          title: "3. Narrowing",
          desc: "TypeScript is smart enough to know what type a variable is after you check it.",
          comparison: {
            title: "Basic Type Guards",
            desc: "How to work with mixed types.",
            goodCode: "function padLeft(value: string | number, padding: number) {\n  if (typeof value === \"number\") {\n    // Inside here, TS knows 'value' is number\n    return \" \".repeat(padding) + value.toFixed(2);\n  }\n  // Outside here, TS knows 'value' MUST be string\n  return \" \".repeat(padding) + value;\n}",
            badCode: "function padLeft(value: string | number, padding: number) {\n  // Error: .repeat does not exist on 'number'\n  return \" \".repeat(padding) + value; \n}",
            explanation: "The `typeof` operator (and `instanceof` for classes) acts as a 'guard'. Inside the `if` block, TypeScript narrows the union type to a specific one, allowing you to access its methods safely."
          }
        }
      }
    },
    generics: {
      title: "Generic Types",
      intro: "Generics are like \"variables for types\". They allow us to write reusable code without losing safety.",
      sections: {
        problem: {
          title: "1. The Reusability Problem",
          desc: "Imagine a function that simply returns what you pass it. Without generics, you'd have to use <code>any</code> and lose type information.",
          comparison: {
             title: "Any vs Generics",
             desc: "Keeping identity of type.",
             goodCode: "function identity<T>(arg: T): T {\n  return arg;\n}\n\n// ✅ TypeScript infers T is 'string'.\nconst output = identity(\"Hello\"); \n// 'output' is string. Autocomplete 100% functional.\noutput.toUpperCase();",
             badCode: "function identity(arg: any): any {\n  return arg;\n}\n\n// ❌ Type is lost. 'output' is 'any'.\nconst output = identity(\"Hello\"); \n// TypeScript doesn't know output is a string.\noutput.toUpperCase(); // Works, but no real autocomplete.",
             explanation: "By using `<T>`, we capture the type of the argument the user passes (e.g. 'string') and use it to denote the return type. T is a variable that TypeScript fills in automatically."
          }
        },
        interfaces: {
          title: "2. Generic Interfaces",
          desc: "Very useful for standard API responses.",
          comparison: {
            title: "API Responses",
            desc: "Standardizing structures.",
            goodCode: "interface ApiResponse<T> {\n  data: T;\n  status: number;\n  message?: string;\n}\n\n// Reusing the same base structure\ntype UserResponse = ApiResponse<User>;\ntype ProductResponse = ApiResponse<Product>;",
            badCode: "interface UserResponse {\n  data: User;\n  status: number;\n}\ninterface ProductResponse {\n  data: Product;\n  status: number;\n}\n// Repetitive if you have many models...",
            explanation: "With `ApiResponse<T>`, we define the 'box' once. Then we can put anything (User, Product, Array<User>) inside that box safely."
          }
        },
        constraints: {
          title: "3. Constraints",
          desc: "Sometimes we want a generic, but not \"just anything\". We want it to satisfy a certain condition.",
          comparison: {
            title: "Extends",
            desc: "Limiting what T can be.",
            goodCode: "interface HasLength {\n  length: number;\n}\n\n// T MUST have 'length' property\nfunction getLength<T extends HasLength>(arg: T) {\n  return arg.length;\n}\n\ngetLength(\"hello\"); // ✅ Works (string has length)\ngetLength([1, 2]); // ✅ Works (array has length)\ngetLength(100);    // ❌ Error (number does not have length)",
            badCode: "function getLength<T>(arg: T) {\n  // Error: Property 'length' does not exist on type 'T'.\n  return arg.length; \n}",
            explanation: "`extends` allows us to say: 'I accept any type T, AS LONG AS T has at least these properties'. It is a partial contract."
          }
        }
      }
    },
    utility: {
      title: "Utility Types",
      intro: "TypeScript comes with built-in tools to transform existing types. You don't need to rewrite interfaces over and over again.",
      sections: {
        partial: {
          title: "1. Partial<T>",
          desc: "Converts all properties of a type to optional. Perfect for updates (patches).",
          comparison: {
            title: "Creation vs Editing",
            desc: "Reusing base type for edit forms.",
            goodCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// ✅ Partial<User> makes everything optional automatically\nfunction updateUser(id: number, fields: Partial<User>) {\n  // fields accepts { name: 'New Name' } without asking for email\n}",
            badCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\n// ❌ Unnecessary duplication\ninterface UserUpdate {\n  id?: number;\n  name?: string;\n  email?: string;\n}\n\nfunction updateUser(id: number, fields: UserUpdate) { ... }",
            explanation: "Partial takes your `User` interface and returns a new version where `name` is `string | undefined`, `email` is `string | undefined`, etc."
          }
        },
        pick_omit: {
          title: "2. Pick<T, K> & Omit<T, K>",
          desc: "Selects or excludes specific properties. Useful for DTOs or component props.",
          comparison: {
            title: "Trimming Types",
            desc: "Showing only what you need.",
            goodCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  passwordHash: string;\n}\n\n// ✅ We omit passwordHash\ntype UserPreview = Omit<User, 'passwordHash'>;\n\n// Or, we pick only what we want\ntype UserCardProps = Pick<User, 'name' | 'email'>;",
            badCode: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  passwordHash: string; // ⚠️ We don't want to expose this by mistake\n}\n\nfunction getUserPreview(user: User) {\n  // Risk of returning passwordHash to frontend\n  return user;\n}",
            explanation: "With `Omit`, you create a new type removing sensitive or unnecessary properties. With `Pick`, you whitelist only what you allow."
          }
        },
        record: {
          title: "3. Record<K, T>",
          desc: "For dynamic objects (dictionaries/maps) where you know the key type and value type.",
          comparison: {
             title: "Typed Dictionaries",
             desc: "Avoiding 'any' in dynamic objects.",
             goodCode: "const prices: Record<string, number> = {};\n\nprices.apple = 10;\n// prices.pear = \"two\"; // ❌ Error: Type 'string' is not assignable to type 'number'.",
             badCode: "const prices: any = {};\nprices.apple = 10;\nprices.pear = \"two\"; // ❌ Logical error, but TS doesn't complain",
             explanation: "Record allows defining flexible but safe objects. The first argument is the key type (usually string or a Union Type) and the second is the value type."
          }
        }
      }
    },
    advanced_narrowing: {
      title: "Advanced Narrowing & Type Guards",
      intro: "Sometimes JS `typeof` is not enough. For complex objects or custom validations, TypeScript allows us to create our own type 'guards'.",
      sections: {
        is: {
          title: "1. Type Predicates (arg is Type)",
          desc: "Allows a function to inform the compiler that, if it returns true, the argument is of a specific type.",
          comparison: {
            title: "Boolean vs Type Predicate",
            desc: "How to convince TS that an object is what you say it is.",
            goodCode: "interface Bird { fly: () => void }\ninterface Fish { swim: () => void }\n\n// ✅ If returns true, TS knows 'pet' is Bird\nfunction isBird(pet: Bird | Fish): pet is Bird {\n  return (pet as Bird).fly !== undefined;\n}\n\nif (isBird(myPet)) {\n  myPet.fly(); // ✅ Safe\n}",
            badCode: "function isBird(pet: Bird | Fish): boolean {\n  return (pet as Bird).fly !== undefined;\n}\n\nif (isBird(myPet)) {\n  myPet.fly(); // ❌ Error: Property 'fly' does not exist\n}",
            explanation: "Without 'pet is Bird', TypeScript only knows the function returns a boolean, but it doesn't know that boolean is related to the variable's type. With the type predicate, narrowing happens magically."
          }
        },
        in: {
          title: "2. The 'in' operator",
          desc: "A quick way to narrow types in objects without needing extra functions.",
          code: "function move(pet: Bird | Fish) {\n  if ('fly' in pet) {\n    // TS knows it's a Bird because it has 'fly'\n    pet.fly();\n  } else {\n    pet.swim();\n  }\n}"
        }
      }
    }
  },
  projects: {
    title: "Practical Projects",
    subtitle: "Once you've mastered the theoretical concepts, put your skills to the test by building these applications.",
    week: "Week",
    completed: "Completed",
    go_to: "Go to project",
    review: "Review project",
    difficulty: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard"
    },
    list: {
      calculator: {
        title: "Basic Calculator",
        desc: "Practice primitive types and functions with mathematical operations.",
        longDesc: "Your first mission is to build a simple calculator. You will learn to type state and handle basic events.",
        objectives: [
          "Create two number inputs controlled by useState.",
          "Make sure to type the state explicitly (e.g. useState<string>).",
          "Create 4 buttons (+, -, *, /) that execute the operation.",
          "Show the result on screen or an error message if invalid (e.g. division by 0).",
          "Extra Challenge: Use a 'switch' for operation logic."
        ],
        hints: [
          {
            title: "useState Typing",
            content: "Remember that useState accepts a generic: \nconst [num, setNum] = useState<string>('');\nIt's better to use string for inputs and convert to number when operating."
          },
          {
            title: "Event Handling",
            content: "In an input's onChange, the event 'e' is of type:\nReact.ChangeEvent<HTMLInputElement>\nBut sometimes TS infers it alone ;)"
          },
          {
             title: "Type Conversion",
             content: "Remember to use parseFloat() or Number() before adding, or you will end up concatenating strings ('2' + '2' = '22')."
          }
        ],
        solution: {
          title: "Proposed Solution",
          description: "Here is one way to implement it. Compare your code:",
          code: "function Calculator() {\n  const [num1, setNum1] = useState<string>('');\n  const [num2, setNum2] = useState<string>('');\n  const [result, setResult] = useState<number | string | null>(null);\n\n  const handleOp = (op: '+' | '-' | '*' | '/') => {\n    const n1 = parseFloat(num1);\n    const n2 = parseFloat(num2);\n    if (isNaN(n1) || isNaN(n2)) return setResult(\"Invalid Input\");\n\n    switch(op) {\n      case '+': setResult(n1 + n2); break;\n      case '-': setResult(n1 - n2); break;\n      case '*': setResult(n1 * n2); break;\n      case '/': setResult(n2 !== 0 ? n1 / n2 : \"Div by 0\"); break;\n    }\n  };\n\n  return (\n    <div className='p-4 gap-2 flex flex-col max-w-[200px]'>\n      <input value={num1} onChange={e => setNum1(e.target.value)} placeholder=\"0\" />\n      <input value={num2} onChange={e => setNum2(e.target.value)} placeholder=\"0\" />\n      <div className=\"flex gap-2\">\n        {['+', '-', '*', '/'].map(op => (\n          <button key={op} onClick={() => handleOp(op as any)}>{op}</button>\n        ))}\n      </div>\n      <div>Result: {result}</div>\n    </div>\n  )\n}"
        }
      },
      todo: {
        title: "To-Do List",
        desc: "Learn to handle arrays, objects, and interfaces.",
        longDesc: "Build a tasks application where you'll learn to manage lists of objects and define complex data structures.",
        objectives: [
          "Define a 'Todo' interface with id, text, and completed fields.",
          "Use an array of Todo objects in state (useState<Todo[]>).",
          "Implement functions to add, remove, and mark as completed.",
          "Filter tasks by status (All, Pending, Completed)."
        ],
        hints: [
          {
            title: "Immutability",
            content: "Never use .push() on state. Use spread instead: \nsetTodos([...todos, newTodo]);"
          }
        ],
        solution: {
          title: "Solution: To-Do List",
          description: "Managing complex state and arrays.",
          code: "interface Todo {\n  id: number;\n  text: string;\n  completed: boolean;\n}\n\nfunction TodoApp() {\n  const [todos, setTodos] = useState<Todo[]>([]);\n  const [text, setText] = useState('');\n\n  const add = () => {\n    if (!text) return;\n    const newTodo = { id: Date.now(), text, completed: false };\n    setTodos([...todos, newTodo]);\n    setText('');\n  };\n\n  const toggle = (id: number) => {\n    setTodos(todos.map(t => \n      t.id === id ? { ...t, completed: !t.completed } : t\n    ));\n  };\n\n  return (\n    <div className=\"max-w-sm\">\n      <div className=\"flex gap-2 mb-4\">\n        <input value={text} onChange={e => setText(e.target.value)} />\n        <button onClick={add}>Add</button>\n      </div>\n      <ul>\n        {todos.map(t => (\n          <li key={t.id} className=\"flex gap-2\">\n            <input type=\"checkbox\" checked={t.completed} onChange={() => toggle(t.id)} />\n            <span style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>\n              {t.text}\n            </span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
        }
      },
      guess: {
        title: "Guessing Game",
        desc: "Functions, special types, and control logic.",
        longDesc: "Create a game where the user must guess a number. Practice random logic and win/loss states using literal types.",
        objectives: [
          "Generate a random number on start (useEffect).",
          "Type the possible game states (playing, won, lost).",
          "Create a function that validates the guess and returns hints (high/low).",
          "Reset the game by generating a new secret number."
        ],
        hints: [
          {
            title: "Literal Types",
            content: "type GameStatus = 'playing' | 'won' | 'lost';"
          }
        ],
        solution: {
          title: "Solution: Guessing Game",
          description: "Control logic and state typing.",
          code: "type GameStatus = 'playing' | 'won' | 'lost';\n\nfunction GuessGame() {\n  const [target, setTarget] = useState(0);\n  const [guess, setGuess] = useState('');\n  const [status, setStatus] = useState<GameStatus>('playing');\n  const [message, setMessage] = useState('');\n\n  useEffect(() => {\n    setTarget(Math.floor(Math.random() * 100) + 1);\n  }, []);\n\n  const check = () => {\n    const num = parseInt(guess);\n    if (isNaN(num)) return;\n\n    if (num === target) {\n      setStatus('won');\n      setMessage('Correct!');\n    } else if (num < target) {\n      setMessage('Too low');\n    } else {\n      setMessage('Too high');\n    }\n  };\n\n  const reset = () => {\n    setTarget(Math.floor(Math.random() * 100) + 1);\n    setGuess('');\n    setStatus('playing');\n    setMessage('');\n  };\n\n  return (\n    <div className=\"flex flex-col gap-4 max-w-xs\">\n      {status === 'playing' ? (\n        <>\n          <input \n            type=\"number\" \n            value={guess} \n            onChange={e => setGuess(e.target.value)} \n            className=\"border p-2 rounded\"\n          />\n          <button onClick={check} className=\"bg-blue-500 text-white p-2 rounded\">Guess</button>\n          <p>{message}</p>\n        </>\n      ) : (\n        <div className=\"text-center\">\n           <p className=\"text-green-600 font-bold mb-2\">You won!</p>\n           <button onClick={reset} className=\"bg-gray-500 text-white p-2 rounded\">Play again</button>\n        </div>\n      )}\n    </div>\n  );\n}"
        }
      },
      contacts: {
        title: "Contact Manager",
        desc: "Introduction to Classes and advanced Interfaces.",
        longDesc: "Manage a list of people. Ideal for practicing inheritance, searching arrays, and complex type validations.",
        objectives: [
          "Define a 'Contact' interface with multiple required and optional fields.",
          "Implement real-time search by name or email.",
          "Create a form with validation to avoid duplicate contacts.",
          "Manage 'favorite' states using booleans."
        ],
        hints: [
          {
            title: "Searching",
            content: "Use .filter() and .toLowerCase() for case-insensitive search."
          }
        ],
        solution: {
          title: "Solution: Contact Manager",
          description: "Complex interfaces and forms.",
          code: "interface Contact {\n  id: number;\n  name: string;\n  email: string;\n}\n\nfunction ContactManager() {\n  const [contacts, setContacts] = useState<Contact[]>([]);\n  const [name, setName] = useState('');\n  const [email, setEmail] = useState('');\n  const [search, setSearch] = useState('');\n\n  const add = (e: React.FormEvent) => {\n    e.preventDefault();\n    if (contacts.some(c => c.email === email)) return alert('Duplicate email');\n    setContacts([...contacts, { id: Date.now(), name, email }]);\n    setName(''); setEmail('');\n  };\n\n  const filtered = contacts.filter(c => \n    c.name.toLowerCase().includes(search.toLowerCase())\n  );\n\n  return (\n    <div className=\"max-w-md\">\n      <form onSubmit={add} className=\"flex flex-col gap-2 mb-4 border p-4 rounded\">\n         <input value={name} onChange={e => setName(e.target.value)} placeholder=\"Name\" required />\n         <input value={email} onChange={e => setEmail(e.target.value)} placeholder=\"Email\" type=\"email\" required />\n         <button type=\"submit\" className=\"bg-indigo-600 text-white p-2 rounded\">Add</button>\n      </form>\n\n      <input \n        value={search} \n        onChange={e => setSearch(e.target.value)} \n        placeholder=\"Search...\" \n        className=\"w-full mb-4 p-2 border rounded\"\n      />\n\n      <ul className=\"space-y-2\">\n        {filtered.map(c => (\n          <li key={c.id} className=\"border p-2 rounded flex justify-between\">\n            <span>{c.name}</span>\n            <span className=\"text-gray-500\">{c.email}</span>\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}"
        }
      },
      cart: {
        title: "Shopping Cart",
        desc: "Use of Generics and compound types.",
        longDesc: "The final logic challenge. Create a commercial system using Generics to handle any type of product and Utility Types for the cart.",
        objectives: [
          "Define a generic interface for products.",
          "Use Omit or Pick to create the cart item type from the product.",
          "Create a 'useCart' generic hook to handle add/remove logic.",
          "Calculate subtotals and taxes using safe reducers."
        ],
        hints: [
          {
            title: "Using Generics",
            content: "function useCart<T extends { id: number }>() { ... }"
          }
        ],
        solution: {
            title: "Solution: Shopping Cart",
            description: "Generics and Utility Types.",
            code: "interface Product {\n  id: number;\n  name: string;\n  price: number;\n}\n\n// Utility Type for cart items (maybe with quantity)\ntype CartItem = Product & { quantity: number };\n\nfunction ShoppingCart() {\n  const [cart, setCart] = useState<CartItem[]>([]);\n\n  const addToCart = (product: Product) => {\n    setCart(prev => {\n      const existing = prev.find(item => item.id === product.id);\n      if (existing) {\n        return prev.map(item => \n          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item\n        );\n      }\n      return [...prev, { ...product, quantity: 1 }];\n    });\n  };\n\n  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);\n\n  return (\n    <div className=\"grid grid-cols-2 gap-8\">\n      <div className=\"space-y-2\">\n        <h4 className=\"font-bold\">Products</h4>\n        {/* Mock Products */}\n        <button onClick={() => addToCart({ id: 1, name: 'Laptop', price: 999 })} \n          className=\"block w-full text-left p-2 border rounded hover:bg-gray-50\">\n          Laptop ($999)\n        </button>\n        <button onClick={() => addToCart({ id: 2, name: 'Mouse', price: 29 })} \n          className=\"block w-full text-left p-2 border rounded hover:bg-gray-50\">\n          Mouse ($29)\n        </button>\n      </div>\n\n      <div>\n        <h4 className=\"font-bold mb-2\">Cart (Total: ${total})</h4>\n        {cart.map(item => (\n          <div key={item.id} className=\"flex justify-between text-sm mb-1\">\n            <span>{item.name} x{item.quantity}</span>\n            <span>${item.price * item.quantity}</span>\n          </div>\n        ))}\n      </div>\n    </div>\n  );\n}"
        }
      },
      api_dashboard: {
        title: "API Dashboard",
        desc: "Handling asynchronous data and response validation.",
        longDesc: "Learn to consume real data. You will work with Promises, loading states, and type validation for external data.",
        objectives: [
          "Type an API response using interfaces.",
          "Create a union for UI states (loading, success, error).",
          "Use generics to create a reusable fetcher.",
          "Handle 'unknown' type in the fetch catch block."
        ],
        hints: [
          {
            title: "Fetch Typing",
            content: "async function getData(): Promise<User[]> { ... }"
          },
          {
            title: "Error Handling",
            content: "catch (err: unknown) {\n  if (err instanceof Error) console.log(err.message);\n}"
          }
        ],
        solution: {
            title: "Solution: API Dashboard",
            description: "Promises, Fetch, and Error Typing.",
            code: "interface User {\n  id: number;\n  name: string;\n  email: string;\n}\n\ntype FetchState<T> = \n  | { status: 'idle' }\n  | { status: 'loading' }\n  | { status: 'error', error: string }\n  | { status: 'success', data: T };\n\nfunction ApiDashboard() {\n  const [state, setState] = useState<FetchState<User[]>>({ status: 'idle' });\n\n  const loadUsers = async () => {\n    setState({ status: 'loading' });\n    try {\n      const res = await fetch('https://jsonplaceholder.typicode.com/users');\n      if (!res.ok) throw new Error('Network error');\n      const data = await res.json();\n      setState({ status: 'success', data });\n    } catch (err) {\n      const message = err instanceof Error ? err.message : 'Unknown error';\n      setState({ status: 'error', error: message });\n    }\n  };\n\n  return (\n    <div className=\"space-y-4\">\n      <button onClick={loadUsers} className=\"bg-purple-600 text-white px-4 py-2 rounded\">\n        Load Users\n      </button>\n\n      {state.status === 'loading' && <p>Loading...</p>}\n      {state.status === 'error' && <p className=\"text-red-500\">{state.error}</p>}\n      \n      {state.status === 'success' && (\n        <div className=\"grid gap-2\">\n          {state.data.slice(0, 3).map(u => (\n            <div key={u.id} className=\"p-3 border rounded shadow-sm bg-white dark:bg-zinc-800\">\n              <p className=\"font-bold\">{u.name}</p>\n              <p className=\"text-sm text-gray-500\">{u.email}</p>\n            </div>\n          ))}\n        </div>\n      )}\n    </div>\n  );\n}"
        }
      }
    }
  },
  challenge: {
    objectives: "Objectives",
    hints: {
      title: "Hints & Help",
      trigger: "Hint"
    },
    complete_btn: "Mark as Completed",
    completed_btn: "Challenge Completed!",
    workspace: "Your Component",
    preview: "Preview",
    solution: "Solution / Expected"
  },
  footer: {
    desc: "Interactive platform to master TypeScript from scratch to advanced patterns.",
    concepts: "Concepts",
    projects: "Projects",
    resources: "Resources",
    view_all: "View all →",
    docs: "Official Documentation",
    playground: "TS Playground",
    copyright: "TS Learning. Created to learn TypeScript."
  },
  navigation: {
    back: "Back",
    previous: "Previous",
    next: "Next",
    of: "of",
    home: "Home",
    concepts: "Concepts"
  },
  code_comparison: {
    good: "Best Practices",
    bad: "Anti-pattern",
    show_explanation: "Hide explanation",
    why: "Why is it better?"
  },
  categories: {
    basic: "Basic",
    intermediate: "Intermediate",
    advanced: "Advanced"
  },
  ui: {
    start_learning: "Start learning",
    view_projects: "View projects",
    view_all: "View all",
    your_progress: "Your progress",
    module: "Module",
    completed: "Completed",
    tips: "Tips",
    stats: {
      modules: "Modules",
      projects: "Projects",
      quizzes: "Quizzes",
      examples: "Examples"
    }
  },
  quiz: {
    title: "Knowledge Challenge",
    question: "Question",
    check_answer: "Check Answer",
    next_question: "Next Question",
    view_results: "View Results",
    correct: "Correct!",
    incorrect: "Incorrect.",
    completed: "Lesson Completed!",
    good_try: "Good try!",
    score_text: "You got",
    of: "of",
    correct_answers: "correct answers",
    min_score: "You need at least 60% to complete this lesson.",
    retry: "Try again",
    review: "Review lesson"
  },
  concepts_page: {
    title: "Concepts & Theory",
    subtitle: "Here we'll dive deeper into the theory behind TypeScript. It's not just about \"making it work\", but writing robust, maintainable, and safe code."
  },
  tips: {
    tip1: "Complete the theoretical concepts before each project for better understanding.",
    tip2: "Each project increases in difficulty - follow them in order.",
    tip3: "Use the TypeScript Playground to experiment before implementing."
  }
};
