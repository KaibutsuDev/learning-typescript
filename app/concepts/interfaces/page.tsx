"use client";

import CodeComparison, { SectionDivider } from "@/src/components/CodeComparison";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { Breadcrumb, LessonNavigation } from "@/src/components/Navigation";

export default function InterfacesPage() {
  const { t } = useLanguage();
  const c = t.concepts.interfaces;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: t.navigation.home, href: "/" },
        { label: t.navigation.concepts, href: "/concepts" },
        { label: c.title }
      ]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">{c.title}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {c.intro}
        </p>
      </div>

      {/* Sección 1 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.readonly.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.readonly.desc}
        </p>

        <CodeComparison
          title={c.sections.readonly.comparison.title}
          description={c.sections.readonly.comparison.desc}
          goodCode={c.sections.readonly.comparison.goodCode}
          badCode={c.sections.readonly.comparison.badCode}
          explanation={c.sections.readonly.comparison.explanation}
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 2 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.extends.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.extends.desc}
        </p>

        <CodeComparison
          title={c.sections.extends.comparison.title}
          description={c.sections.extends.comparison.desc}
          goodCode={c.sections.extends.comparison.goodCode}
          badCode={c.sections.extends.comparison.badCode}
          explanation={c.sections.extends.comparison.explanation}
        />
      </section>

      {/* Navegación */}
      <LessonNavigation
        prev={{ title: t.home.modules.functions.title, href: "/concepts/funciones" }}
        next={{ title: t.home.modules.unions.title, href: "/concepts/uniones" }}
      />
    </div>
  );
}
