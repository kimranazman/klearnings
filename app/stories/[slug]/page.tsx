"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, BookOpen, Lightbulb, MessageCircle, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { getStoryBySlug, getAllStories, StorySection } from "@/lib/stories";

function SectionRenderer({ section, index }: { section: StorySection; index: number }) {
  switch (section.type) {
    case "narrative":
      return (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="text-lg leading-relaxed mb-6"
        >
          {section.content}
        </motion.p>
      );

    case "dialogue":
      return (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="my-6 pl-4 border-l-4 border-[var(--primary)] bg-[var(--secondary)]/50 rounded-r-xl py-4 pr-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <MessageCircle size={16} className="text-[var(--primary)]" />
            <span className="text-sm font-semibold text-[var(--primary)]">{section.character}</span>
          </div>
          <p className="text-lg italic">&ldquo;{section.content}&rdquo;</p>
        </motion.div>
      );

    case "revelation":
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          className="my-8 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-violet-200 dark:border-violet-800"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
              <Lightbulb size={20} className="text-white" />
            </div>
            <div>
              <p className="text-lg leading-relaxed mb-3">{section.content}</p>
              {section.highlight && (
                <div className="p-3 rounded-lg bg-white/50 dark:bg-black/20 border border-violet-200 dark:border-violet-700">
                  <p className="text-sm font-medium text-violet-800 dark:text-violet-200">
                    <span className="text-violet-500 mr-2">💡</span>
                    {section.highlight}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );

    case "lesson":
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="my-6 p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]"
        >
          <p className="leading-relaxed mb-3">{section.content}</p>
          {section.highlight && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                <span className="text-amber-500 mr-2">📌</span>
                {section.highlight}
              </p>
            </div>
          )}
        </motion.div>
      );

    default:
      return null;
  }
}

export default function StoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const story = getStoryBySlug(slug);
  const allStories = getAllStories();

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Story not found</h1>
          <Link href="/stories" className="text-[var(--primary)] hover:underline">
            Back to all stories
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = allStories.findIndex(s => s.slug === slug);
  const prevStory = currentIndex > 0 ? allStories[currentIndex - 1] : null;
  const nextStory = currentIndex < allStories.length - 1 ? allStories[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] glass-navbar">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/stories"
            className="flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">All Stories</span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Clock size={16} />
            <span>{story.readingTime} min read</span>
          </div>
        </div>
      </header>

      {/* Story Header */}
      <section className="py-12 px-4 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-6xl mb-6">{story.coverEmoji}</div>
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--muted)] mb-3">
              {story.module ? (
                <Link
                  href={`/modules/${story.module}`}
                  className="px-3 py-1 rounded-full bg-[var(--secondary)] hover:bg-[var(--border)] transition-colors"
                >
                  {story.module.replace("-", " ").replace(/^m/, "M")}
                </Link>
              ) : (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  Capstone Story
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{story.title}</h1>
            <p className="text-xl text-[var(--muted)]">{story.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Story Content */}
      <article className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Synopsis */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 p-6 rounded-2xl bg-[var(--secondary)]/50 border border-[var(--border)]"
          >
            <p className="text-lg italic text-[var(--muted)]">{story.synopsis}</p>
          </motion.div>

          {/* Story Sections */}
          <div className="story-content">
            {story.sections.map((section, index) => (
              <SectionRenderer key={index} section={section} index={index} />
            ))}
          </div>

          {/* Key Takeaways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Sparkles size={20} className="text-emerald-500" />
              What Maya Learned
            </h3>
            <ul className="space-y-3">
              {story.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{takeaway}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Module Link */}
          {story.module && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)]"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Ready for the technical details?</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Explore {story.module.replace("-", " ").replace(/^m/, "M")} for code examples, interactive exercises, and quizzes.
                  </p>
                </div>
                <Link
                  href={`/modules/${story.module}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
                >
                  <BookOpen size={18} />
                  Go to Module
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </article>

      {/* Navigation */}
      <section className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          {prevStory ? (
            <Link
              href={`/stories/${prevStory.slug}`}
              className="flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} />
              <div className="text-right">
                <div className="text-xs">Previous Story</div>
                <div className="font-medium">{prevStory.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextStory ? (
            <Link
              href={`/stories/${nextStory.slug}`}
              className="flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors"
            >
              <div>
                <div className="text-xs">Next Story</div>
                <div className="font-medium">{nextStory.title}</div>
              </div>
              <ArrowRight size={20} />
            </Link>
          ) : (
            <Link
              href="/stories"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
            >
              All Stories
              <BookOpen size={18} />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
