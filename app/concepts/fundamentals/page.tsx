"use client";

import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/src/i18n/LanguageContext";
import CodeComparison, { SectionDivider } from "@/src/components/CodeComparison";
import { Breadcrumb, LessonNavigation } from "@/src/components/Navigation";

export default function FundamentosPage() {
  const { t } = useLanguage();
  const c = t.concepts.fundamentals;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
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
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.inference.title}</h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">
          {c.sections.inference.desc}
        </p>

        <CodeComparison
          title={c.sections.inference.comparison.title}
          description={c.sections.inference.comparison.desc}
          goodCode={c.sections.inference.comparison.goodCode}
          badCode={c.sections.inference.comparison.badCode}
          explanation={c.sections.inference.comparison.explanation}
        />
      </section>

      <SectionDivider />

      {/* Sección 2 */}
      <section>
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-4">{c.sections.any.title}</h2>
        <p 
          className="mb-4 text-zinc-600 dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: c.sections.any.desc }}
        />

        <CodeComparison
          title={c.sections.any.comparison.title}
          description={c.sections.any.comparison.desc}
          goodCode={c.sections.any.comparison.goodCode}
          badCode={c.sections.any.comparison.badCode}
          explanation={c.sections.any.comparison.explanation}
        />
      </section>

      {/* Navegación */}
      <LessonNavigation
        next={{ title: t.home.modules.functions.title, href: "/concepts/functions" }}
      />
    </div>
  );
}
