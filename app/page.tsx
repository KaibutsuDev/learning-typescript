"use client";

import { useLanguage } from "@/src/i18n/LanguageContext";
import { useProgress } from "@/src/context/ProgressContext";
import { HeroSection } from "@/src/components/home/HeroSection";
import {
  ModuleGrid,
  HomeCTA,
  HomeStats,
} from "@/src/components/home/HomeComponents";

// ========================================
// 🎨 MODULE DATA
// ========================================

const modulesData = [
  {
    id: "fundamentals",
    icon: "🏗️",
    href: "/concepts/fundamentals",
    levelKey: "basic",
  },
  {
    id: "functions",
    icon: "fn",
    href: "/concepts/functions",
    levelKey: "basic",
  },
  {
    id: "interfaces",
    icon: "📦",
    href: "/concepts/interfaces",
    levelKey: "intermediate",
  },
  {
    id: "unions",
    icon: "🔗",
    href: "/concepts/unions",
    levelKey: "intermediate",
  },
  {
    id: "generics",
    icon: "🧬",
    href: "/concepts/generics",
    levelKey: "advanced",
  },
  {
    id: "utility-types",
    icon: "🧰",
    href: "/concepts/utility-types",
    levelKey: "advanced",
  },
  {
    id: "advanced-narrowing",
    icon: "🛡️",
    href: "/concepts/advanced-narrowing",
    levelKey: "advanced",
  },
];

const moduleKeys = [
  "basics",
  "functions",
  "interfaces",
  "unions",
  "generics",
  "utility",
  "advanced_narrowing",
];

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function Home() {
  const { t } = useLanguage();
  const { getProgress } = useProgress();
  const progress = getProgress();

  // Map modules with translations
  const modules = modulesData.map((data, index) => {
    const key = moduleKeys[index] as keyof typeof t.home.modules;
    const translation = t.home.modules[key];
    return {
      ...data,
      title: translation?.title || key,
      description: translation?.desc || "",
      level: t.categories[data.levelKey as keyof typeof t.categories],
    };
  });

  return (
    <div className="space-y-16">
      <HeroSection t={t} progress={progress} />

      <ModuleGrid t={t} modules={modules} />

      <HomeCTA t={t} />

      <HomeStats t={t} />
    </div>
  );
}
