"use client";

import Link from "next/link";
import { useLanguage } from "@/src/i18n/LanguageContext";
import { ExternalLinkIcon, GitHubIcon } from "./icons";

// ========================================
// 📋 TYPES
// ========================================

interface FooterLinkProps {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}

// ========================================
// 🔗 LINK COMPONENT
// ========================================

function FooterLink({ href, external, children }: FooterLinkProps) {
  const className = "text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1";
  
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
        <ExternalLinkIcon />
      </a>
    );
  }
  
  return <Link href={href} className={className}>{children}</Link>;
}

// ========================================
// 🧩 MAIN COMPONENT
// ========================================

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
              <span className="text-2xl">🔷</span>
              TS Learning
            </Link>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {t.footer.desc}
            </p>
          </div>

          {/* Conceptos */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">{t.footer.concepts}</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/concepts/fundamentals">{t.home.modules.basics.title}</FooterLink></li>
              <li><FooterLink href="/concepts/functions">{t.home.modules.functions.title}</FooterLink></li>
              <li><FooterLink href="/concepts/interfaces">{t.home.modules.interfaces.title}</FooterLink></li>
              <li><FooterLink href="/concepts/generics">{t.home.modules.generics.title}</FooterLink></li>
            </ul>
          </div>

          {/* Proyectos */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">{t.footer.projects}</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink href="/projects/calculator">{t.projects.list.calculator.title}</FooterLink></li>
              <li><FooterLink href="/projects/todo">{t.projects.list.todo.title}</FooterLink></li>
              <li><FooterLink href="/projects">{t.footer.view_all}</FooterLink></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">{t.footer.resources}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <FooterLink href="https://www.typescriptlang.org/docs/" external>
                  {t.footer.docs}
                </FooterLink>
              </li>
              <li>
                <FooterLink href="https://www.typescriptlang.org/play" external>
                  {t.footer.playground}
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {currentYear} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
