"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, BookOpen, Lightbulb, ArrowLeft, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllTermsSorted, searchGlossary, GlossaryTerm } from "@/lib/glossary";

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<string>("all");

  const allTerms = useMemo(() => getAllTermsSorted(), []);

  const filteredTerms = useMemo(() => {
    let terms = searchQuery ? searchGlossary(searchQuery) : allTerms;

    if (selectedModule !== "all") {
      terms = terms.filter(t => t.module === selectedModule);
    }

    return terms;
  }, [searchQuery, selectedModule, allTerms]);

  // Group terms by first letter
  const groupedTerms = useMemo(() => {
    const groups: Record<string, GlossaryTerm[]> = {};
    filteredTerms.forEach(term => {
      const letter = term.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const letters = Object.keys(groupedTerms).sort();

  const modules = [
    { slug: "all", name: "All Modules" },
    { slug: "module-1", name: "Module 1: Intro & Linear Regression" },
    { slug: "module-2", name: "Module 2: Train-Test & Polynomial" },
    { slug: "module-3", name: "Module 3: Cross-Validation" },
    { slug: "module-4", name: "Module 4: Bias-Variance & Regularization" },
    { slug: "module-5", name: "Module 5: Bayesian & Feature Selection" },
  ];

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
            <span className="font-semibold">ML Glossary</span>
          </div>
          <div className="w-24" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 px-4 border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-6">
              <Sparkles size={14} className="text-[var(--primary)]" />
              <span className="text-[var(--muted)]">{allTerms.length} Terms & Definitions</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ML Regression <span className="gradient-text">Glossary</span>
            </h1>
            <p className="text-[var(--muted)] max-w-2xl mx-auto mb-8">
              Quick reference for all the technical terms used in this course.
              Each term includes a definition and a memorable analogy.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
              <input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--secondary)] border border-[var(--border)] focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 px-4 border-b border-[var(--border)] bg-[var(--secondary)]/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {modules.map((mod) => (
              <button
                key={mod.slug}
                onClick={() => setSelectedModule(mod.slug)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  selectedModule === mod.slug
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--card)] hover:bg-[var(--border)]"
                }`}
              >
                {mod.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Letter Navigation */}
      {!searchQuery && (
        <section className="py-3 px-4 border-b border-[var(--border)] sticky top-16 z-40 bg-[var(--background)]">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-1 justify-center">
              {letters.map((letter) => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium hover:bg-[var(--secondary)] transition-colors"
                >
                  {letter}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Terms List */}
      <section className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[var(--muted)]">No terms found matching &ldquo;{searchQuery}&rdquo;</p>
            </div>
          ) : (
            <div className="space-y-8">
              {letters.map((letter) => (
                <div key={letter} id={`letter-${letter}`}>
                  <h2 className="text-2xl font-bold mb-4 text-[var(--primary)]">{letter}</h2>
                  <div className="space-y-3">
                    {groupedTerms[letter].map((term) => (
                      <TermCard
                        key={term.term}
                        term={term}
                        isExpanded={expandedTerm === term.term}
                        onToggle={() => setExpandedTerm(
                          expandedTerm === term.term ? null : term.term
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer tip */}
      <section className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-[var(--muted)]">
            <strong>Tip:</strong> Highlight any term in the course and it will show its definition!
          </p>
        </div>
      </section>
    </div>
  );
}

function TermCard({
  term,
  isExpanded,
  onToggle,
}: {
  term: GlossaryTerm;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      layout
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
    >
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[var(--secondary)]/50 transition-colors"
      >
        <span className="font-semibold">{term.term}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-[var(--muted)]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)]">
              {/* Definition */}
              <p className="text-sm pt-3 leading-relaxed">{term.definition}</p>

              {/* Analogy */}
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start gap-2">
                  <Lightbulb size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Analogy</span>
                    <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed mt-1">
                      {term.analogy}
                    </p>
                  </div>
                </div>
              </div>

              {/* Related terms */}
              {term.relatedTerms && term.relatedTerms.length > 0 && (
                <div>
                  <span className="text-xs text-[var(--muted)]">Related: </span>
                  <span className="text-xs">
                    {term.relatedTerms.join(", ")}
                  </span>
                </div>
              )}

              {/* Module link */}
              {term.module && (
                <Link
                  href={`/modules/${term.module}`}
                  className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline"
                >
                  Learn more in {term.module.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
