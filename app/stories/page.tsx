"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getAllStories } from "@/lib/stories";

export default function StoriesPage() {
  const stories = getAllStories();

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
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] glass-navbar">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back to Course</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-[var(--primary)]" />
            <span className="font-semibold">Story Time</span>
          </div>
          <div className="w-24" />
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 px-4 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-6">
              <Sparkles size={14} className="text-[var(--primary)]" />
              <span className="text-[var(--muted)]">Learn Through Stories</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              The <span className="gradient-text">TechRetail</span> Chronicles
            </h1>
            <p className="text-[var(--muted)] max-w-2xl mx-auto text-lg">
              Follow Maya, a data scientist at TechRetail, as she learns machine learning
              the hard way. Each story teaches key concepts through narrative—because the
              best lessons are the ones you remember.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="space-y-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {stories.map((story, index) => (
              <motion.div key={story.slug} variants={item}>
                <Link
                  href={`/stories/${story.slug}`}
                  className="group block p-6 rounded-2xl glass-card card-hover border-glow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-mid)] flex items-center justify-center text-3xl shadow-glow group-hover:shadow-glow-lg transition-shadow">
                        {story.coverEmoji}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-1">
                        {story.module ? (
                          <span className="px-2 py-0.5 rounded-full bg-[var(--secondary)]">
                            {story.module.replace("-", " ").replace(/^m/, "M")}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            Capstone
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {story.readingTime} min read
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--primary)] transition-colors">
                        {index + 1}. {story.title}
                      </h3>
                      <p className="text-sm text-[var(--muted)] mb-2">{story.subtitle}</p>
                      <p className="text-sm opacity-80 line-clamp-2">{story.synopsis}</p>
                    </div>
                    <div className="flex-shrink-0 self-center">
                      <ArrowRight
                        size={20}
                        className="text-[var(--muted)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-all"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reading Tips */}
      <section className="py-12 px-4 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="text-xl">💡</span> How to Read These Stories
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">1.</span>
                <span><strong>Read for the narrative first.</strong> Don&apos;t worry about memorizing—just enjoy the story.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">2.</span>
                <span><strong>Notice the highlighted insights.</strong> These are the key 20% of information.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">3.</span>
                <span><strong>Review the takeaways at the end.</strong> They summarize what Maya learned.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 mt-0.5">4.</span>
                <span><strong>Then explore the full module.</strong> The technical details will make more sense.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
