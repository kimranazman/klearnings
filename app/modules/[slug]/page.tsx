"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { getModuleBySlug, getNextModule, getPrevModule } from "@/lib/modules";
import { useProgress } from "@/hooks/useProgress";
import { Quiz } from "@/components/mdx/Quiz";
import { quizzes } from "@/lib/quiz-data";

// Module content components
import Module1Content from "@/content/modules/module-1";
import Module2Content from "@/content/modules/module-2";
import Module3Content from "@/content/modules/module-3";
import Module4Content from "@/content/modules/module-4";
import Module5Content from "@/content/modules/module-5";

const moduleComponents: Record<string, React.ComponentType> = {
  "module-1": Module1Content,
  "module-2": Module2Content,
  "module-3": Module3Content,
  "module-4": Module4Content,
  "module-5": Module5Content,
};

export default function ModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const currentModule = getModuleBySlug(slug);
  const nextModule = getNextModule(slug);
  const prevModule = getPrevModule(slug);
  const { markModuleRead, markModuleCompleted, recordQuizScore, getModuleProgress } = useProgress();
  const [showQuiz, setShowQuiz] = useState(false);

  const moduleProgress = getModuleProgress(slug);
  const ModuleContent = moduleComponents[slug];
  const quizQuestions = quizzes[slug] || [];

  useEffect(() => {
    if (slug) {
      markModuleRead(slug);
    }
  }, [slug, markModuleRead]);

  if (!currentModule || !ModuleContent) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Module not found</h1>
        <Link href="/" className="text-[var(--primary)] hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  const handleQuizComplete = (score: number) => {
    recordQuizScore(slug, score);
    if (score >= 60) {
      markModuleCompleted(slug);
    }
  };

  const handleMarkComplete = () => {
    markModuleCompleted(slug);
  };

  return (
    <div className="module-content">
      {/* Module Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--muted)] mb-2">
          <span>Module {currentModule.order}</span>
          {moduleProgress.completed && (
            <span className="flex items-center gap-1 text-[var(--accent)]">
              <CheckCircle2 size={16} />
              Completed
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-4">{currentModule.title}</h1>
        <p className="text-[var(--muted)]">{currentModule.description}</p>
      </div>

      {/* Module Content */}
      <ModuleContent />

      {/* Mark Complete Button */}
      {!moduleProgress.completed && (
        <div className="my-8 p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="font-semibold mb-1">Finished reading?</h3>
              <p className="text-sm text-[var(--muted)]">
                Mark this module as complete or take the quiz to test your knowledge.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleMarkComplete}
                className="px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
              >
                Mark Complete
              </button>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Section */}
      {(showQuiz || moduleProgress.quizScore !== null) && quizQuestions.length > 0 && (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4">Module Quiz</h2>
          {moduleProgress.quizScore !== null && !showQuiz ? (
            <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-semibold">
                    Previous Score: {moduleProgress.quizScore}%
                  </p>
                  <p className="text-sm text-[var(--muted)]">
                    {moduleProgress.quizScore >= 60
                      ? "You passed this quiz!"
                      : "Try again to improve your score."}
                  </p>
                </div>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          ) : (
            <Quiz
              questions={quizQuestions}
              moduleSlug={slug}
              onComplete={handleQuizComplete}
            />
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12 pt-8 border-t border-[var(--border)]">
        {prevModule ? (
          <Link
            href={`/modules/${prevModule.slug}`}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors"
          >
            <ChevronLeft size={20} />
            <div className="text-right">
              <div className="text-xs">Previous</div>
              <div className="font-medium">{prevModule.title}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextModule ? (
          <Link
            href={`/modules/${nextModule.slug}`}
            className="flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors"
          >
            <div>
              <div className="text-xs">Next</div>
              <div className="font-medium">{nextModule.title}</div>
            </div>
            <ChevronRight size={20} />
          </Link>
        ) : (
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--accent)] text-white hover:opacity-90 transition-opacity"
          >
            Complete Course
            <CheckCircle2 size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}
