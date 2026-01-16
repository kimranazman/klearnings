"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Award } from "lucide-react";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  moduleSlug?: string;
  onComplete?: (score: number) => void;
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelectAnswer = (optionId: string) => {
    if (showExplanation) return;
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    if (optionId === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      onComplete?.(finalScore);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setIsComplete(false);
  };

  const score = Math.round((correctAnswers / questions.length) * 100);

  if (isComplete) {
    return (
      <div className="my-8 p-8 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
        <Award size={64} className={`mx-auto mb-4 ${score >= 60 ? "text-[var(--accent)]" : "text-[var(--muted)]"}`} />
        <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
        <p className="text-4xl font-bold mb-4" style={{ color: score >= 60 ? "var(--accent)" : "var(--muted)" }}>
          {score}%
        </p>
        <p className="text-[var(--muted)] mb-6">
          You got {correctAnswers} out of {questions.length} questions correct.
        </p>
        {score >= 60 ? (
          <p className="text-[var(--accent)] mb-6">
            Great job! You&apos;ve passed this module&apos;s quiz.
          </p>
        ) : (
          <p className="text-[var(--muted)] mb-6">
            Keep studying! You need 60% to pass.
          </p>
        )}
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          <RotateCcw size={18} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-[var(--secondary)]">
        <div
          className="h-full bg-[var(--primary)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-[var(--muted)]">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">
            Score: {correctAnswers}/{currentIndex + (showExplanation ? 1 : 0)}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-lg font-semibold mb-6">{currentQuestion.question}</h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option) => {
            let optionClass = "quiz-option";
            if (showExplanation) {
              if (option.id === currentQuestion.correctAnswer) {
                optionClass += " correct";
              } else if (option.id === selectedAnswer) {
                optionClass += " incorrect";
              }
            } else if (option.id === selectedAnswer) {
              optionClass += " selected";
            }

            return (
              <button
                key={option.id}
                onClick={() => handleSelectAnswer(option.id)}
                disabled={showExplanation}
                className={`${optionClass} w-full text-left flex items-center gap-3`}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    showExplanation && option.id === currentQuestion.correctAnswer
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : showExplanation && option.id === selectedAnswer
                      ? "border-red-500 bg-red-500"
                      : "border-[var(--border)]"
                  }`}
                >
                  {showExplanation && option.id === currentQuestion.correctAnswer && (
                    <CheckCircle2 size={14} className="text-white" />
                  )}
                  {showExplanation && option.id === selectedAnswer && option.id !== currentQuestion.correctAnswer && (
                    <XCircle size={14} className="text-white" />
                  )}
                </div>
                <span>{option.text}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`p-4 rounded-lg mb-6 ${
              isCorrect
                ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
                : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <CheckCircle2 size={18} className="text-[var(--accent)]" />
              ) : (
                <XCircle size={18} className="text-red-500" />
              )}
              <span className="font-semibold">
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
            </div>
            <p className="text-sm">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showExplanation && (
          <button
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
