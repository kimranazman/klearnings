"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, Play } from "lucide-react";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  children: string;
  language?: string;
  showLineNumbers?: boolean;
  runnable?: boolean;
  onRun?: (code: string) => void;
}

export function CodeBlock({
  children,
  language = "python",
  showLineNumbers = true,
  runnable = false,
  onRun,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    if (onRun) {
      onRun(children.trim());
    }
  };

  return (
    <div className="relative group my-4">
      <div className="absolute right-2 top-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        {runnable && (
          <button
            onClick={handleRun}
            className="p-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
            title="Run code"
          >
            <Play size={16} />
          </button>
        )}
        <button
          onClick={handleCopy}
          className="relative p-2 rounded-lg bg-[var(--secondary)] hover:bg-[var(--border)] transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={16} className="text-[var(--accent)]" />
              <span className="absolute -bottom-8 right-0 px-2 py-1 text-xs bg-[var(--accent)] text-white rounded-md whitespace-nowrap animate-fade-in">
                Copied!
              </span>
            </>
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
      <div className="text-xs text-[var(--muted)] absolute left-4 top-2">
        {language}
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === "dark" ? vscDarkPlus : vs}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: "0.5rem",
          padding: "2.5rem 1rem 1rem 1rem",
          fontSize: "0.875rem",
        }}
      >
        {children.trim()}
      </SyntaxHighlighter>
    </div>
  );
}
