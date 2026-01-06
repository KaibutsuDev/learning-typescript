"use client";

import CodeComparison, { SectionDivider } from "@/src/components/CodeComparison";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { Breadcrumb, LessonNavigation } from "@/src/components/Navigation";

export default function FuncionesPage() {
  const { t } = useLanguage();
  const c = t.concepts.functions;

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
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.args.title}</h2>
        <p 
            className="mb-4 text-zinc-600 dark:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: c.sections.args.desc }}
        />

        <CodeComparison
          title={c.sections.args.comparison.title}
          description={c.sections.args.comparison.desc}
          goodCode={c.sections.args.comparison.goodCode}
          badCode={c.sections.args.comparison.badCode}
          explanation={c.sections.args.comparison.explanation}
        />
      </section>

      {/* ━━━ Separador ━━━ */}
      <SectionDivider />

      {/* Sección 2 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.optional.title}</h2>
        <p 
            className="mb-4 text-zinc-600 dark:text-zinc-400"
            dangerouslySetInnerHTML={{ __html: c.sections.optional.desc }}
        />

        <CodeComparison
          title={c.sections.optional.comparison.title}
          description={c.sections.optional.comparison.desc}
          goodCode={c.sections.optional.comparison.goodCode}
          badCode={c.sections.optional.comparison.badCode}
          explanation={c.sections.optional.comparison.explanation}
        />
      </section>

      {/* Navegación */}
      <LessonNavigation
        prev={{ title: t.home.modules.basics.title, href: "/concepts/fundamentos" }}
        next={{ title: t.home.modules.interfaces.title, href: "/concepts/interfaces" }}
      />
    </div>
  );
}
