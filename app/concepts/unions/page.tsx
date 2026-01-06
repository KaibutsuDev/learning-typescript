"use client";

import CodeComparison, { SectionDivider } from "@/src/components/CodeComparison";
import CodeBlock from "@/src/components/CodeBlock";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { Breadcrumb, LessonNavigation } from "@/src/components/Navigation";

export default function UnionesPage() {
  const { t } = useLanguage();
  const c = t.concepts.unions;

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
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.literals.title}</h2>
        <p 
          className="mb-4 text-zinc-600 dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: c.sections.literals.desc }}
        />
        
        <CodeBlock 
          code={c.sections.literals.code}
          language="typescript"
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 2 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.discriminated.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.discriminated.desc}
        </p>

        <CodeComparison
          title={c.sections.discriminated.comparison.title}
          description={c.sections.discriminated.comparison.desc}
          goodCode={c.sections.discriminated.comparison.goodCode}
          badCode={c.sections.discriminated.comparison.badCode}
          explanation={c.sections.discriminated.comparison.explanation}
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 3 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.narrowing.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.narrowing.desc}
        </p>

        <CodeComparison
          title={c.sections.narrowing.comparison.title}
          description={c.sections.narrowing.comparison.desc}
          goodCode={c.sections.narrowing.comparison.goodCode}
          badCode={c.sections.narrowing.comparison.badCode}
          explanation={c.sections.narrowing.comparison.explanation}
        />
      </section>

      {/* Navegación */}
      <LessonNavigation
        prev={{ title: t.home.modules.interfaces.title, href: "/concepts/interfaces" }}
        next={{ title: t.home.modules.generics.title, href: "/concepts/genericos" }}
      />
    </div>
  );
}
