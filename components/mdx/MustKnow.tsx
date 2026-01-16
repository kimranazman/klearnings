"use client";

import { ReactNode } from "react";
import { AlertCircle, Target, Lightbulb, Zap } from "lucide-react";

interface MustKnowItem {
  concept: string;
  whyItMatters: string;
  analogy?: string;
  codeSnippet?: string;
}

interface MustKnowProps {
  moduleNumber: number;
  title: string;
  tldr: string;
  items: MustKnowItem[];
  children?: ReactNode;
}

export function MustKnow({ moduleNumber, title, tldr, items }: MustKnowProps) {
  return (
    <div className="my-10 rounded-2xl border-2 border-red-300 dark:border-red-700 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 overflow-hidden">
      {/* Header */}
      <div className="bg-red-500 dark:bg-red-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="text-white" size={28} />
          <div>
            <div className="text-red-100 text-sm font-medium">Module {moduleNumber}</div>
            <h3 className="text-white text-xl font-bold">{title}</h3>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="px-6 py-4 bg-white/50 dark:bg-black/20 border-b border-red-200 dark:border-red-800">
        <div className="flex items-start gap-3">
          <Zap className="text-red-500 flex-shrink-0 mt-1" size={20} />
          <div>
            <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">TL;DR - If You Remember Nothing Else</div>
            <p className="text-base font-medium text-red-900 dark:text-red-100">{tldr}</p>
          </div>
        </div>
      </div>

      {/* Must Know Items */}
      <div className="p-6 space-y-6">
        {items.map((item, index) => (
          <div key={index} className="space-y-3">
            {/* Concept */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-red-900 dark:text-red-100">{item.concept}</h4>
              </div>
            </div>

            {/* Why It Matters */}
            <div className="ml-11 space-y-3">
              <div className="flex items-start gap-2">
                <Target className="text-orange-500 flex-shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase">Why It Matters: </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">{item.whyItMatters}</span>
                </div>
              </div>

              {/* Analogy */}
              {item.analogy && (
                <div className="flex items-start gap-2">
                  <Lightbulb className="text-yellow-500 flex-shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase">Remember It As: </span>
                    <span className="text-sm text-gray-800 dark:text-gray-200 italic">{item.analogy}</span>
                  </div>
                </div>
              )}

              {/* Code Snippet */}
              {item.codeSnippet && (
                <div className="bg-gray-900 rounded-lg p-3 font-mono text-sm text-green-400 overflow-x-auto">
                  <pre>{item.codeSnippet}</pre>
                </div>
              )}
            </div>

            {index < items.length - 1 && (
              <hr className="border-red-200 dark:border-red-800 ml-11" />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-red-100 dark:bg-red-900/30 text-center">
        <span className="text-sm font-medium text-red-700 dark:text-red-300">
          Master these concepts before moving to the next module
        </span>
      </div>
    </div>
  );
}
