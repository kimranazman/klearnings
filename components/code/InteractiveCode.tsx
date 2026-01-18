"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { CodeComparison } from "@/components/mdx/CodeComparison";
import { CodeLearningModal } from "./CodeLearningModal";
import type { CodeExercise } from "@/lib/code-exercises";

interface InteractiveCodeProps {
  wrongCode: string;
  rightCode: string;
  wrongTitle?: string;
  rightTitle?: string;
  wrongExplanation?: string;
  rightExplanation?: string;
  language?: string;
  exercise?: CodeExercise;
}

export function InteractiveCode({
  wrongCode,
  rightCode,
  wrongTitle,
  rightTitle,
  wrongExplanation,
  rightExplanation,
  language,
  exercise,
}: InteractiveCodeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If no exercise is provided, just render the CodeComparison without interactivity
  if (!exercise) {
    return (
      <CodeComparison
        wrongCode={wrongCode}
        rightCode={rightCode}
        wrongTitle={wrongTitle}
        rightTitle={rightTitle}
        wrongExplanation={wrongExplanation}
        rightExplanation={rightExplanation}
        language={language}
      />
    );
  }

  return (
    <>
      {/* Clickable wrapper */}
      <div
        className="relative group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Interactive badge */}
        <div className="absolute -top-3 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-medium shadow-lg">
          <Sparkles size={12} />
          <span>Click to learn interactively</span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 rounded-xl bg-purple-500/0 group-hover:bg-purple-500/5 border-2 border-transparent group-hover:border-purple-400/50 transition-all duration-200 pointer-events-none z-[1]" />

        {/* The CodeComparison component */}
        <div className="pointer-events-none">
          <CodeComparison
            wrongCode={wrongCode}
            rightCode={rightCode}
            wrongTitle={wrongTitle}
            rightTitle={rightTitle}
            wrongExplanation={wrongExplanation}
            rightExplanation={rightExplanation}
            language={language}
          />
        </div>
      </div>

      {/* Learning Modal */}
      <CodeLearningModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exercise={exercise}
      />
    </>
  );
}
