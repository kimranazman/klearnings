"use client";

import Link from "next/link";
import { BookOpen, Code2, Trophy, ChevronRight, Moon, Sun, Sparkles, ArrowRight, Play, Gamepad2, BookMarked } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { modules } from "@/lib/modules";
import { motion } from "framer-motion";

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
      color: "from-violet-500 to-indigo-500",
    },
    {
      icon: Code2,
      title: "Interactive Python Playground",
      description: "Run real Python code directly in your browser with NumPy and scikit-learn",
      color: "from-cyan-500 to-blue-500",
    },
    {
      icon: Gamepad2,
      title: "Interactive Games",
      description: "Practice concepts with fun mini-games in each module",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Trophy,
      title: "Progress Tracking",
      description: "Track your learning progress and pick up where you left off",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 grid-background opacity-50 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--gradient-start)] rounded-full opacity-20 blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[var(--gradient-mid)] rounded-full opacity-15 blur-[100px]" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-[var(--gradient-end)] rounded-full opacity-10 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <div className="h-full glass-navbar border-b border-[var(--border)]">
          <div className="container mx-auto flex items-center justify-between h-full px-4 lg:px-8 max-w-7xl">
            <Link href="/" className="flex items-center gap-2.5">
              <motion.div
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-mid)] flex items-center justify-center shadow-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="text-white" size={20} />
              </motion.div>
              <div className="hidden sm:flex flex-col">
                <span className="font-bold text-base tracking-tight leading-none">ML Regression</span>
                <span className="text-xs text-[var(--muted)]">Interactive Course</span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/games"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-foreground hover:bg-[var(--secondary)] transition-colors"
              >
                <Gamepad2 size={18} />
                <span>Games</span>
              </Link>
              <Link
                href="/glossary"
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-[var(--muted)] hover:text-foreground hover:bg-[var(--secondary)] transition-colors"
              >
                <BookMarked size={18} />
                <span>Glossary</span>
              </Link>
              <Link
                href="/modules/module-1"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--secondary)] hover:bg-[var(--border)] transition-colors"
              >
                Start Learning
              </Link>
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-xl bg-[var(--secondary)] hover:bg-[var(--border)] transition-colors"
                aria-label="Toggle theme"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mounted && (theme === "dark" ? (
                  <Sun size={18} className="text-amber-400" />
                ) : (
                  <Moon size={18} className="text-[var(--primary)]" />
                ))}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
              </span>
              <span className="text-[var(--muted)]">Free Interactive Course</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-[1.1]">
              Master{" "}
              <span className="gradient-text-animated">Machine Learning</span>
              <br />
              <span className="text-[var(--foreground)]">Regression Techniques</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[var(--muted)] mb-10 max-w-2xl mx-auto leading-relaxed">
              Learn supervised machine learning from linear regression to advanced
              regularization. Interactive Python examples, games, quizzes, and
              progress tracking included.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/modules/module-1"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)] text-white font-semibold shadow-glow btn-shine transition-all"
                >
                  <Play size={20} />
                  Start Learning
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#modules"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-card font-semibold hover:bg-[var(--secondary)] transition-all"
                >
                  View Curriculum
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { value: "5", label: "Modules" },
                { value: "25+", label: "Quizzes" },
                { value: "5", label: "Games" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-[var(--muted)]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Everything you need to{" "}
              <span className="gradient-text">learn ML Regression</span>
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              A complete learning experience with interactive tools and real-world examples
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="group relative p-6 rounded-2xl glass-card card-hover border-glow overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="font-semibold mb-2 tracking-tight">{feature.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules List */}
      <section id="modules" className="py-24 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Course Curriculum</h2>
            <p className="text-[var(--muted)]">
              5 modules covering the fundamentals of regression in machine learning
            </p>
          </motion.div>

          {/* Progress line connector */}
          <div className="relative">
            <div className="absolute left-[39px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)] opacity-20 hidden sm:block" />

            <motion.div
              className="space-y-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {modules.map((module, index) => (
                <motion.div key={module.slug} variants={item}>
                  <Link
                    href={`/modules/${module.slug}`}
                    className="group block p-6 rounded-2xl glass-card card-hover border-glow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-mid)] text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-glow group-hover:shadow-glow-lg transition-shadow">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <h3 className="font-semibold mb-1.5 tracking-tight group-hover:text-[var(--primary)] transition-colors">
                          {module.title}
                        </h3>
                        <p className="text-sm text-[var(--muted)] leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 pt-2">
                        <ChevronRight
                          className="text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all"
                          size={24}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="relative p-12 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gradient-start)] via-[var(--gradient-mid)] to-[var(--gradient-end)]" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noise%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noise)%27/%3E%3C/svg%3E')] opacity-10" />

            <div className="relative text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Ready to master ML Regression?
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Start your journey with interactive Python examples, games, and quizzes
              </p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/modules/module-1"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-[var(--gradient-start)] font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  <Play size={20} />
                  Start Module 1
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[var(--border)]">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-mid)] flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="font-semibold">ML Regression Course</span>
          </div>
          <p className="text-sm text-[var(--muted)]">
            An interactive learning experience for machine learning enthusiasts
          </p>
        </div>
      </footer>
    </div>
  );
}
