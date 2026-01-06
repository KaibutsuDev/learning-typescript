"use client";

import ChallengeLayout from "@/src/components/ChallengeLayout";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { ContactSolution } from "@/src/components/solutions";

// -------------------------------------------------------------------------
// 🏗️ USER WORKSPACE
// -------------------------------------------------------------------------

function ContactsWorkshop() {
  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800">
      <div className="text-center text-zinc-500 py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-lg">
        <p>🚧 Tu gestor de contactos aparecerá aquí 🚧</p>
        <p className="text-sm mt-2">Sigue los objetivos de la izquierda</p>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------------
// 🧩 CHALLENGE CONFIGURATION
// -------------------------------------------------------------------------

export default function ContactsPage() {
  const { t } = useLanguage();
  const c = t.projects.list.contacts;

  return (
    <ChallengeLayout
      title={c.title}
      description={c.longDesc || c.desc}
      objectives={c.objectives || []}
      hints={c.hints || []}
      solution={c.solution}
      solutionComponent={<ContactSolution />}
      projectId="contacts"
    >
      <ContactsWorkshop />
    </ChallengeLayout>
  );
}
