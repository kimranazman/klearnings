"use client";

import { useState, useEffect } from "react";
import { List, ChevronUp, Clock, FileQuestion } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  readingTime?: number;
  hasQuiz?: boolean;
  onQuizClick?: () => void;
}

export function TableOfContents({ readingTime, hasQuiz, onQuizClick }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Find all h2 and h3 elements in the module content
    const elements = document.querySelectorAll(".module-content h2, .module-content h3");
    const items: TOCItem[] = [];

    elements.forEach((element, index) => {
      // Generate ID if not present
      if (!element.id) {
        element.id = `section-${index}`;
      }
      items.push({
        id: element.id,
        text: element.textContent || "",
        level: element.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(items);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -66% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsExpanded(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsExpanded(false);
  };

  if (headings.length === 0) return null;

  // Filter to only show h2s for the collapsed preview
  const mainSections = headings.filter((h) => h.level === 2);

  return (
    <>
      {/* Desktop TOC - Fixed sidebar */}
      <div className="hidden xl:block fixed right-8 top-32 w-64 max-h-[calc(100vh-160px)] overflow-y-auto">
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[var(--border)]">
            <List size={16} className="text-[var(--primary)]" />
            <span className="font-medium text-sm">On this page</span>
          </div>

          {readingTime && (
            <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-3">
              <Clock size={12} />
              <span>{readingTime} min read</span>
            </div>
          )}

          <nav className="space-y-1">
            {headings.map((heading) => (
              <button
                key={heading.id}
                onClick={() => scrollToElement(heading.id)}
                className={`block w-full text-left text-sm py-1 transition-colors ${
                  heading.level === 3 ? "pl-4" : ""
                } ${
                  activeId === heading.id
                    ? "text-[var(--primary)] font-medium"
                    : "text-[var(--muted)] hover:text-foreground"
                }`}
              >
                {heading.text}
              </button>
            ))}
          </nav>

          {hasQuiz && (
            <button
              onClick={onQuizClick}
              className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <FileQuestion size={16} />
              Take Quiz
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="mt-3 w-full flex items-center justify-center gap-1 text-xs text-[var(--muted)] hover:text-foreground transition-colors"
          >
            <ChevronUp size={14} />
            Back to top
          </button>
        </div>
      </div>

      {/* Mobile TOC - Collapsible at top */}
      <div className="xl:hidden mb-6">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-2">
              <List size={18} className="text-[var(--primary)]" />
              <span className="font-medium">Table of Contents</span>
              {readingTime && (
                <span className="text-xs text-[var(--muted)] flex items-center gap-1 ml-2">
                  <Clock size={12} />
                  {readingTime} min
                </span>
              )}
            </div>
            <ChevronUp
              size={18}
              className={`text-[var(--muted)] transition-transform ${
                isExpanded ? "" : "rotate-180"
              }`}
            />
          </button>

          {isExpanded && (
            <div className="px-4 pb-4 border-t border-[var(--border)]">
              <nav className="space-y-1 pt-3">
                {mainSections.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => scrollToElement(heading.id)}
                    className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-colors ${
                      activeId === heading.id
                        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                        : "text-[var(--muted)] hover:bg-[var(--secondary)]"
                    }`}
                  >
                    {heading.text}
                  </button>
                ))}
              </nav>

              {hasQuiz && (
                <button
                  onClick={onQuizClick}
                  className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <FileQuestion size={16} />
                  Take Quiz
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
