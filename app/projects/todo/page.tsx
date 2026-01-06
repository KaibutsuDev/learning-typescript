"use client";

import ChallengeLayout from "@/src/components/ChallengeLayout";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { TodoSolution } from "@/src/components/solutions";

// -------------------------------------------------------------------------
// 🏗️ USER WORKSPACE
// -------------------------------------------------------------------------

function TodoWorkshop() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div className="text-center text-zinc-500 py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg">
        <p>🚧 Tu lista de tareas aparecerá aquí 🚧</p>
        <p className="text-sm mt-2">Sigue los objetivos de la izquierda</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 🧩 CHALLENGE CONFIGURATION
// -------------------------------------------------------------------------

export default function TodoPage() {
  const { t } = useLanguage();
  const c = t.projects.list.todo;

  return (
    <ChallengeLayout
      title={c.title}
      description={c.longDesc || c.desc}
      objectives={c.objectives || []}
      hints={c.hints || []}
      solution={c.solution}
      solutionComponent={<TodoSolution />}
      projectId="todo"
    >
      <TodoWorkshop />
    </ChallengeLayout>
  );
}
