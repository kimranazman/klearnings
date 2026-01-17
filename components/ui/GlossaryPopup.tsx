"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X, BookOpen, Lightbulb, ArrowRight, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { findGlossaryTerm, GlossaryTerm } from "@/lib/glossary";

interface PopupPosition {
  x: number;
  y: number;
}

export function GlossaryPopup() {
  const [term, setTerm] = useState<GlossaryTerm | null>(null);
  const [position, setPosition] = useState<PopupPosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim() || "";

    if (text.length < 2 || text.length > 50) {
      return;
    }

    // Check if selection is within a glossary term
    const foundTerm = findGlossaryTerm(text);

    if (foundTerm) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();

      if (rect) {
        // Position popup above the selection
        const x = rect.left + rect.width / 2;
        const y = rect.top - 10;

        setTerm(foundTerm);
        setPosition({ x, y });
        setIsVisible(true);
      }
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Cmd/Ctrl + D to look up selected text
    if ((e.metaKey || e.ctrlKey) && e.key === "d") {
      e.preventDefault();
      handleSelection();
    }

    // Escape to close
    if (e.key === "Escape") {
      setIsVisible(false);
    }
  }, [handleSelection]);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleSelection, handleKeyDown, handleClickOutside]);

  // Adjust position if popup would go off-screen
  const getAdjustedPosition = () => {
    if (!position) return { top: 0, left: 0 };

    const popupWidth = 320;
    const popupHeight = 200;
    const padding = 16;

    let left = position.x - popupWidth / 2;
    let top = position.y - popupHeight - 10;

    // Keep within horizontal bounds
    if (left < padding) left = padding;
    if (left + popupWidth > window.innerWidth - padding) {
      left = window.innerWidth - popupWidth - padding;
    }

    // If not enough space above, show below
    if (top < padding) {
      top = position.y + 30;
    }

    return { top, left };
  };

  const adjustedPosition = getAdjustedPosition();

  return (
    <AnimatePresence>
      {isVisible && term && (
        <motion.div
          ref={popupRef}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            top: adjustedPosition.top,
            left: adjustedPosition.left,
            zIndex: 9999,
          }}
          className="w-80 rounded-xl shadow-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-mid)]">
            <div className="flex items-center gap-2 text-white">
              <BookOpen size={16} />
              <span className="font-semibold text-sm">{term.term}</span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Definition */}
            <div>
              <p className="text-sm leading-relaxed">{term.definition}</p>
            </div>

            {/* Analogy */}
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-2">
                <Lightbulb size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                  {term.analogy}
                </p>
              </div>
            </div>

            {/* Related terms */}
            {term.relatedTerms && term.relatedTerms.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {term.relatedTerms.slice(0, 4).map((related) => (
                  <span
                    key={related}
                    className="px-2 py-0.5 text-xs rounded-full bg-[var(--secondary)] text-[var(--muted)]"
                  >
                    {related}
                  </span>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
              <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                <Command size={10} />
                <span>+ D to lookup</span>
              </div>
              <Link
                href="/glossary"
                onClick={() => setIsVisible(false)}
                className="flex items-center gap-1 text-xs text-[var(--primary)] hover:underline"
              >
                View all terms
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
