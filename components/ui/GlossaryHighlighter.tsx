"use client";

import { useEffect, useRef, useCallback } from "react";
import { glossaryTerms, findGlossaryTerm, GlossaryTerm } from "@/lib/glossary";

interface GlossaryHighlighterProps {
  children: React.ReactNode;
  onTermClick?: (term: GlossaryTerm, rect: DOMRect) => void;
}

// Build a regex pattern that matches all glossary terms
function buildTermsPattern(): RegExp {
  // Sort by length (longest first) to match longer terms before shorter ones
  const terms = glossaryTerms
    .map(t => t.term)
    .sort((a, b) => b.length - a.length);

  // Escape special regex characters and join with |
  const escaped = terms.map(term =>
    term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );

  // Match whole words only, case insensitive
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

const TERMS_PATTERN = buildTermsPattern();

export function GlossaryHighlighter({ children, onTermClick }: GlossaryHighlighterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const processedRef = useRef(false);

  const handleTermClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('glossary-term')) {
      e.preventDefault();
      e.stopPropagation();

      const termText = target.textContent || '';
      const term = findGlossaryTerm(termText);

      if (term && onTermClick) {
        const rect = target.getBoundingClientRect();
        onTermClick(term, rect);
      }
    }
  }, [onTermClick]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || processedRef.current) return;

    // Mark as processed to avoid re-processing on re-renders
    processedRef.current = true;

    // Find all text nodes in the container
    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip if parent is already a glossary term, code block, or script
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          const tagName = parent.tagName.toLowerCase();
          if (
            parent.classList.contains('glossary-term') ||
            tagName === 'script' ||
            tagName === 'style' ||
            tagName === 'code' ||
            tagName === 'pre' ||
            tagName === 'button' ||
            tagName === 'input' ||
            tagName === 'textarea' ||
            tagName === 'a' ||
            parent.closest('code') ||
            parent.closest('pre') ||
            parent.closest('a') ||
            parent.closest('.code-playground') ||
            parent.closest('[data-no-glossary]')
          ) {
            return NodeFilter.FILTER_REJECT;
          }

          // Only process if text contains a glossary term
          if (TERMS_PATTERN.test(node.textContent || '')) {
            TERMS_PATTERN.lastIndex = 0; // Reset regex
            return NodeFilter.FILTER_ACCEPT;
          }

          return NodeFilter.FILTER_REJECT;
        }
      }
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text);
    }

    // Process each text node
    textNodes.forEach(textNode => {
      const text = textNode.textContent || '';
      const parent = textNode.parentNode;
      if (!parent) return;

      // Split text by glossary terms and create elements
      const fragment = document.createDocumentFragment();
      let lastIndex = 0;

      TERMS_PATTERN.lastIndex = 0;
      let match;

      while ((match = TERMS_PATTERN.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.slice(lastIndex, match.index))
          );
        }

        // Create highlighted term span
        const span = document.createElement('span');
        span.className = 'glossary-term';
        span.textContent = match[0];
        span.setAttribute('data-term', match[0].toLowerCase());
        span.setAttribute('role', 'button');
        span.setAttribute('tabIndex', '0');
        fragment.appendChild(span);

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        fragment.appendChild(
          document.createTextNode(text.slice(lastIndex))
        );
      }

      // Replace the text node with our fragment
      if (fragment.childNodes.length > 0) {
        parent.replaceChild(fragment, textNode);
      }
    });

    // Add click listener for terms
    container.addEventListener('click', handleTermClick);

    return () => {
      container.removeEventListener('click', handleTermClick);
    };
  }, [handleTermClick]);

  // Reset processed flag when children change significantly
  useEffect(() => {
    return () => {
      processedRef.current = false;
    };
  }, []);

  return (
    <div ref={containerRef} className="glossary-content">
      {children}
    </div>
  );
}
