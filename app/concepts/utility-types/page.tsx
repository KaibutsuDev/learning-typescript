"use client";

import CodeComparison, { SectionDivider } from "@/src/components/CodeComparison";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { Breadcrumb, LessonNavigation } from "@/src/components/Navigation";

export default function UtilityTypesPage() {
  const { t } = useLanguage();
  const c = t.concepts.utility;

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
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.partial.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.partial.desc}
        </p>

        <CodeComparison
          title={c.sections.partial.comparison.title}
          description={c.sections.partial.comparison.desc}
          goodCode={c.sections.partial.comparison.goodCode}
          badCode={c.sections.partial.comparison.badCode}
          explanation={c.sections.partial.comparison.explanation}
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 2 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.pick_omit.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.pick_omit.desc}
        </p>

        <CodeComparison
          title={c.sections.pick_omit.comparison.title}
          description={c.sections.pick_omit.comparison.desc}
          goodCode={c.sections.pick_omit.comparison.goodCode}
          badCode={c.sections.pick_omit.comparison.badCode}
          explanation={c.sections.pick_omit.comparison.explanation}
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 3 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.record.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.record.desc}
        </p>

        <CodeComparison
          title={c.sections.record.comparison.title}
          description={c.sections.record.comparison.desc}
          goodCode={c.sections.record.comparison.goodCode}
          badCode={c.sections.record.comparison.badCode}
          explanation={c.sections.record.comparison.explanation}
        />
      </section>

      {/* Navegación */}
      <LessonNavigation
        prev={{ title: t.home.modules.generics.title, href: "/concepts/generics" }}
        next={{ title: t.home.modules.advanced_narrowing.title, href: "/concepts/advanced-narrowing" }}
      />
    </div>
  );
}
