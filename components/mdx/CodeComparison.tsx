"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check, X, CheckCircle, AlertTriangle } from "lucide-react";
import { useTheme } from "next-themes";

interface CodeComparisonProps {
  wrongCode: string;
  rightCode: string;
  wrongTitle?: string;
  rightTitle?: string;
  wrongExplanation?: string;
  rightExplanation?: string;
  language?: string;
}

export function CodeComparison({
  wrongCode,
  rightCode,
  wrongTitle = "Wrong Approach",
  rightTitle = "Right Approach",
  wrongExplanation,
  rightExplanation,
  language = "python",
}: CodeComparisonProps) {
  const [copiedWrong, setCopiedWrong] = useState(false);
  const [copiedRight, setCopiedRight] = useState(false);
  const { theme } = useTheme();

  const handleCopy = async (code: string, isWrong: boolean) => {
    await navigator.clipboard.writeText(code.trim());
    if (isWrong) {
      setCopiedWrong(true);
      setTimeout(() => setCopiedWrong(false), 2000);
    } else {
      setCopiedRight(true);
      setTimeout(() => setCopiedRight(false), 2000);
    }
  };

  return (
    <div className="my-6 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Wrong Code */}
        <div className="rounded-xl overflow-hidden border-2 border-red-300 dark:border-red-800">
          <div className="flex items-center justify-between px-4 py-2 bg-red-100 dark:bg-red-950 border-b border-red-300 dark:border-red-800">
            <div className="flex items-center gap-2">
              <X className="text-red-500" size={18} />
              <span className="font-semibold text-red-700 dark:text-red-300 text-sm">
                {wrongTitle}
              </span>
            </div>
            <button
              onClick={() => handleCopy(wrongCode, true)}
              className="p-1.5 rounded-lg hover:bg-red-200 dark:hover:bg-red-900 transition-colors"
              title="Copy code"
            >
              {copiedWrong ? (
                <Check size={14} className="text-red-600" />
              ) : (
                <Copy size={14} className="text-red-600" />
              )}
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={theme === "dark" ? vscDarkPlus : vs}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              padding: "1rem",
              fontSize: "0.8rem",
              background: theme === "dark" ? "#1a1a1a" : "#fef2f2",
            }}
          >
            {wrongCode.trim()}
          </SyntaxHighlighter>
          {wrongExplanation && (
            <div className="px-4 py-3 bg-red-50 dark:bg-red-950/50 border-t border-red-300 dark:border-red-800">
              <div className="flex items-start gap-2">
                <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={14} />
                <p className="text-xs text-red-700 dark:text-red-300">{wrongExplanation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Code */}
        <div className="rounded-xl overflow-hidden border-2 border-green-300 dark:border-green-800">
          <div className="flex items-center justify-between px-4 py-2 bg-green-100 dark:bg-green-950 border-b border-green-300 dark:border-green-800">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" size={18} />
              <span className="font-semibold text-green-700 dark:text-green-300 text-sm">
                {rightTitle}
              </span>
            </div>
            <button
              onClick={() => handleCopy(rightCode, false)}
              className="p-1.5 rounded-lg hover:bg-green-200 dark:hover:bg-green-900 transition-colors"
              title="Copy code"
            >
              {copiedRight ? (
                <Check size={14} className="text-green-600" />
              ) : (
                <Copy size={14} className="text-green-600" />
              )}
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={theme === "dark" ? vscDarkPlus : vs}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              padding: "1rem",
              fontSize: "0.8rem",
              background: theme === "dark" ? "#1a1a1a" : "#f0fdf4",
            }}
          >
            {rightCode.trim()}
          </SyntaxHighlighter>
          {rightExplanation && (
            <div className="px-4 py-3 bg-green-50 dark:bg-green-950/50 border-t border-green-300 dark:border-green-800">
              <div className="flex items-start gap-2">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                <p className="text-xs text-green-700 dark:text-green-300">{rightExplanation}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
