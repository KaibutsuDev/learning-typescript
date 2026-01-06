"use client";

import { useLanguage } from "@/src/i18n/LanguageContext";
import CodeComparison, { SectionDivider } from "@/src/components/CodeComparison";
import { Breadcrumb, LessonNavigation } from "@/src/components/Navigation";

export default function AdvancedNarrowingPage() {
  const { t } = useLanguage();
  const c = t.concepts.advanced_narrowing;

  return (
    <div className="max-w-4xl mx-auto">
      <Breadcrumb items={[
        { label: t.navigation.home, href: "/" },
        { label: t.navigation.concepts, href: "/concepts" },
        { label: c.title }
      ]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">{c.title}</h1>
        <p 
          className="text-lg text-zinc-600 dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: c.intro }}
        />
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.is.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.is.desc}
        </p>

        <CodeComparison
          title={c.sections.is.comparison.title}
          description={c.sections.is.comparison.desc}
          goodCode={c.sections.is.comparison.goodCode}
          badCode={c.sections.is.comparison.badCode}
          explanation={c.sections.is.comparison.explanation}
        />
      </section>

      <SectionDivider />

      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.in.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.in.desc}
        </p>

        <div className="bg-zinc-950 rounded-xl p-6 font-mono text-sm text-zinc-300 overflow-x-auto border border-zinc-800">
          <pre><code>{c.sections.in.code}</code></pre>
        </div>
      </section>

      <LessonNavigation
        prev={{ title: t.home.modules.utility.title, href: "/concepts/utility-types" }}
      />
    </div>
  );
}
