import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { ClientComponents } from "@/src/components/ClientComponents";
import { ProgressProvider } from "@/src/context/ProgressContext";
import { LanguageProvider } from "@/src/i18n/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aprende TypeScript - Plataforma de Aprendizaje",
  description: "Plataforma interactiva de aprendizaje de TypeScript con lecciones, quizzes y proyectos prácticos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100`}
      >
        <ProgressProvider totalLessons={13}>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
            <ClientComponents />
          </LanguageProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}

