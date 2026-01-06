"use client";

import CodeComparison, { SectionDivider } from "@/src/components/CodeComparison";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { Breadcrumb, LessonNavigation } from "@/src/components/Navigation";

export default function GenericosPage() {
  const { t } = useLanguage();
  const c = t.concepts.generics;

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
        <p 
          className="text-lg text-zinc-600 dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: c.intro }}
        />
      </div>

      {/* Sección 1 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.problem.title}</h2>
        <p 
          className="mb-4 text-zinc-600 dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: c.sections.problem.desc }}
        />

        <CodeComparison
          title={c.sections.problem.comparison.title}
          description={c.sections.problem.comparison.desc}
          goodCode={c.sections.problem.comparison.goodCode}
          badCode={c.sections.problem.comparison.badCode}
          explanation={c.sections.problem.comparison.explanation}
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 2 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.interfaces.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.interfaces.desc}
        </p>

        <CodeComparison
          title={c.sections.interfaces.comparison.title}
          description={c.sections.interfaces.comparison.desc}
          goodCode={c.sections.interfaces.comparison.goodCode}
          badCode={c.sections.interfaces.comparison.badCode}
          explanation={c.sections.interfaces.comparison.explanation}
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 3 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.constraints.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.constraints.desc}
        </p>

        <CodeComparison
          title={c.sections.constraints.comparison.title}
          description={c.sections.constraints.comparison.desc}
          goodCode={c.sections.constraints.comparison.goodCode}
          badCode={c.sections.constraints.comparison.badCode}
          explanation={c.sections.constraints.comparison.explanation}
        />
      </section>

      {/* Navegación */}
      <LessonNavigation
        prev={{ title: t.home.modules.unions.title, href: "/concepts/uniones" }}
        next={{ title: t.home.modules.utility.title, href: "/concepts/utility-types" }}
      />
    </div>
  );
}
