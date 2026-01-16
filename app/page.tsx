"use client";

import Link from "next/link";
import { BookOpen, Code2, Brain, Trophy, ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { modules } from "@/lib/modules";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "5 Comprehensive Modules",
      description: "From linear regression basics to advanced regularization techniques",
    },
    {
      icon: Code2,
      title: "Interactive Python Playground",
      description: "Run real Python code directly in your browser with NumPy and scikit-learn",
    },
    {
      icon: Brain,
      title: "25 Quiz Questions",
      description: "Test your understanding with interactive quizzes after each module",
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description: "Track your learning progress and pick up where you left off",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-[var(--border)] bg-[var(--background)]">
        <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <BookOpen className="text-[var(--primary)]" size={28} />
            <span className="font-bold text-lg">ML Regression Course</span>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-[var(--secondary)] transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--secondary)] text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            Free Interactive Course
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Master{" "}
            <span className="text-[var(--primary)]">Machine Learning</span>
            <br />
            Regression Techniques
          </h1>
          <p className="text-xl text-[var(--muted)] mb-8 max-w-2xl mx-auto">
            Learn supervised machine learning from linear regression to advanced
            regularization techniques. Interactive Python examples, quizzes, and
            progress tracking included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/modules/module-1"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Start Learning
              <ChevronRight size={20} />
            </Link>
            <Link
              href="#modules"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[var(--border)] font-semibold hover:bg-[var(--secondary)] transition-colors"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-[var(--secondary)]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to learn ML Regression
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-[var(--card)] border border-[var(--border)]"
              >
                <feature.icon
                  className="text-[var(--primary)] mb-4"
                  size={32}
                />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--muted)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules List */}
      <section id="modules" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-4">Course Curriculum</h2>
          <p className="text-center text-[var(--muted)] mb-12">
            5 modules covering the fundamentals of regression in machine learning
          </p>
          <div className="space-y-4">
            {modules.map((module, index) => (
              <Link
                key={module.slug}
                href={`/modules/${module.slug}`}
                className="block p-6 rounded-xl border border-[var(--border)] hover:border-[var(--primary)] transition-colors bg-[var(--card)]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{module.title}</h3>
                    <p className="text-sm text-[var(--muted)]">
                      {module.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="text-[var(--muted)] flex-shrink-0"
                    size={24}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[var(--primary)] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to master ML Regression?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Start your journey with interactive Python examples and quizzes
          </p>
          <Link
            href="/modules/module-1"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--primary)] font-semibold hover:opacity-90 transition-opacity"
          >
            Start Module 1
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="container mx-auto max-w-4xl text-center text-sm text-[var(--muted)]">
          <p>ML Regression Course - An interactive learning experience</p>
        </div>
      </footer>
    </div>
  );
}
