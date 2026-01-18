"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Puzzle,
  CheckCircle,
  Play,
  Terminal,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Download,
  RotateCcw,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";
import { CodeExercise } from "./CodeExercise";
import { usePyodide, LOADING_MESSAGES, LOADING_PROGRESS } from "@/hooks/usePyodide";
import type { CodeExercise as CodeExerciseType, ModalState, ExerciseResult } from "@/lib/code-exercises";

interface CodeLearningModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise: CodeExerciseType;
}

export function CodeLearningModal({ isOpen, onClose, exercise }: CodeLearningModalProps) {
  const { theme } = useTheme();
  const { isPyodideReady, loadingStage, isLoading, output, runCode, clearOutput } = usePyodide();

  const [modalState, setModalState] = useState<ModalState>("explanation");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [exerciseResult, setExerciseResult] = useState<ExerciseResult | null>(null);
  const [copied, setCopied] = useState(false);

  const isPyodideLoading = loadingStage !== "idle" && loadingStage !== "ready" && loadingStage !== "error";

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setModalState("explanation");
      setCurrentStepIndex(0);
      setExerciseResult(null);
      clearOutput();
    }
  }, [isOpen, clearOutput]);

  const handleExerciseComplete = useCallback((result: ExerciseResult) => {
    setExerciseResult(result);
    setModalState("result");
  }, []);

  const handleRunCode = useCallback(async () => {
    await runCode(exercise.runnableCode);
  }, [runCode, exercise.runnableCode]);

  const handleCopyCode = useCallback(async () => {
    await navigator.clipboard.writeText(exercise.runnableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [exercise.runnableCode]);

  const currentStep = exercise.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === exercise.steps.length - 1;

  const stateConfig = {
    explanation: {
      title: "Step-by-Step Explanation",
      icon: BookOpen,
      color: "text-blue-500",
    },
    exercise: {
      title: "Drag & Drop Exercise",
      icon: Puzzle,
      color: "text-purple-500",
    },
    result: {
      title: exerciseResult?.isCorrect ? "Great Job!" : "Review Your Answer",
      icon: CheckCircle,
      color: exerciseResult?.isCorrect ? "text-green-500" : "text-amber-500",
    },
    playground: {
      title: "Run the Code",
      icon: Terminal,
      color: "text-emerald-500",
    },
  };

  const currentConfig = stateConfig[modalState];
  const Icon = currentConfig.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-[var(--card)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--secondary)]">
              <div className="flex items-center gap-3">
                <Icon size={20} className={currentConfig.color} />
                <div>
                  <h2 className="font-bold text-lg">{exercise.title}</h2>
                  <p className="text-sm text-[var(--muted)]">{currentConfig.title}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation tabs */}
            <div className="flex items-center gap-1 px-6 py-2 border-b border-[var(--border)] bg-[var(--secondary)]/50">
              {(["explanation", "exercise", "result", "playground"] as ModalState[]).map((state, index) => {
                const config = stateConfig[state];
                const StateIcon = config.icon;
                const isActive = modalState === state;
                const isPast = ["explanation", "exercise", "result", "playground"].indexOf(modalState) > index;
                const isDisabled = state === "result" && !exerciseResult;

                return (
                  <button
                    key={state}
                    onClick={() => !isDisabled && setModalState(state)}
                    disabled={isDisabled}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${isActive
                        ? "bg-[var(--primary)] text-white"
                        : isPast
                          ? "text-[var(--primary)] hover:bg-[var(--border)]"
                          : "text-[var(--muted)] hover:bg-[var(--border)]"
                      }
                      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    <StateIcon size={16} />
                    <span className="hidden sm:inline capitalize">{state}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Explanation View */}
              {modalState === "explanation" && currentStep && (
                <div className="space-y-6">
                  {/* Step progress */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[var(--primary)]">
                        Step {currentStepIndex + 1} of {exercise.steps.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {exercise.steps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStepIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentStepIndex
                              ? "w-6 bg-[var(--primary)]"
                              : index < currentStepIndex
                                ? "bg-[var(--primary)]/50"
                                : "bg-[var(--border)]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Step title */}
                  <h3 className="text-xl font-bold">{currentStep.title}</h3>

                  {/* Step explanation */}
                  <p className="text-[var(--muted)] leading-relaxed">
                    {currentStep.explanation}
                  </p>

                  {/* Step code */}
                  <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                    <div className="px-4 py-2 bg-[var(--secondary)] border-b border-[var(--border)] flex items-center gap-2">
                      <Terminal size={14} className="text-[var(--primary)]" />
                      <span className="text-sm font-medium">Code</span>
                    </div>
                    <SyntaxHighlighter
                      language="python"
                      style={theme === "dark" ? vscDarkPlus : vs}
                      showLineNumbers={false}
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        padding: "1rem",
                        fontSize: "0.875rem",
                        background: theme === "dark" ? "#1a1a1a" : "#f8fafc",
                      }}
                    >
                      {currentStep.code.trim()}
                    </SyntaxHighlighter>
                  </div>

                  {/* Navigation buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                      disabled={isFirstStep}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] transition-colors ${
                        isFirstStep
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-[var(--secondary)]"
                      }`}
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>

                    {isLastStep ? (
                      <button
                        onClick={() => setModalState("exercise")}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors"
                      >
                        Start Exercise
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Exercise View */}
              {modalState === "exercise" && (
                <div className="space-y-4">
                  <p className="text-[var(--muted)]">{exercise.description}</p>
                  <CodeExercise
                    exercise={exercise.dragDropExercise}
                    onComplete={handleExerciseComplete}
                  />
                </div>
              )}

              {/* Result View */}
              {modalState === "result" && exerciseResult && (
                <div className="space-y-6">
                  {/* Result message */}
                  <div className={`p-6 rounded-xl text-center ${
                    exerciseResult.isCorrect
                      ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
                      : "bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700"
                  }`}>
                    <CheckCircle
                      size={48}
                      className={`mx-auto mb-4 ${
                        exerciseResult.isCorrect ? "text-green-600" : "text-amber-600"
                      }`}
                    />
                    <h3 className={`text-xl font-bold mb-2 ${
                      exerciseResult.isCorrect
                        ? "text-green-800 dark:text-green-200"
                        : "text-amber-800 dark:text-amber-200"
                    }`}>
                      {exerciseResult.isCorrect
                        ? "Excellent Work!"
                        : "Good Effort!"}
                    </h3>
                    <p className={`${
                      exerciseResult.isCorrect
                        ? "text-green-700 dark:text-green-300"
                        : "text-amber-700 dark:text-amber-300"
                    }`}>
                      {exerciseResult.feedback}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={() => setModalState("exercise")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
                    >
                      <ArrowLeft size={16} />
                      Try Again
                    </button>
                    <button
                      onClick={() => setModalState("playground")}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Run the Code
                      <Play size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* Playground View */}
              {modalState === "playground" && (
                <div className="space-y-4">
                  <p className="text-[var(--muted)]">
                    See the complete, correct code in action. Click &quot;Run&quot; to execute it with Python.
                  </p>

                  {/* Loading Progress Bar */}
                  {isPyodideLoading && (
                    <div className="p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]">
                      <div className="flex items-center gap-3 mb-2">
                        <Download size={16} className="text-[var(--primary)] animate-pulse" />
                        <span className="text-sm text-[var(--muted)]">
                          {LOADING_MESSAGES[loadingStage]}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] transition-all duration-500 ease-out"
                          style={{ width: `${LOADING_PROGRESS[loadingStage]}%` }}
                        />
                      </div>
                      <p className="text-xs text-[var(--muted)] mt-2 opacity-75">
                        First load may take 10-15 seconds to download Python packages
                      </p>
                    </div>
                  )}

                  {/* Code block */}
                  <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                    <div className="flex items-center justify-between px-4 py-2 bg-[var(--secondary)] border-b border-[var(--border)]">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-[var(--primary)]" />
                        <span className="text-sm font-medium">Complete Code</span>
                        {isPyodideReady && (
                          <span className="text-xs text-[var(--accent)] px-2 py-0.5 rounded-full bg-[var(--accent)]/10">
                            Ready
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyCode}
                          className="p-2 rounded-lg hover:bg-[var(--border)] transition-colors"
                          title="Copy code"
                        >
                          {copied ? (
                            <Check size={14} className="text-[var(--accent)]" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                        <button
                          onClick={handleRunCode}
                          disabled={isLoading || isPyodideLoading}
                          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                          {isLoading ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Play size={14} />
                          )}
                          Run
                        </button>
                      </div>
                    </div>
                    <SyntaxHighlighter
                      language="python"
                      style={theme === "dark" ? vscDarkPlus : vs}
                      showLineNumbers
                      customStyle={{
                        margin: 0,
                        borderRadius: 0,
                        padding: "1rem",
                        fontSize: "0.8rem",
                        maxHeight: "300px",
                        background: theme === "dark" ? "#1a1a1a" : "#f8fafc",
                      }}
                    >
                      {exercise.runnableCode.trim()}
                    </SyntaxHighlighter>
                  </div>

                  {/* Output */}
                  {output && (
                    <div className="rounded-xl overflow-hidden border border-[var(--border)]">
                      <div className="px-4 py-2 text-xs font-medium text-[var(--muted)] bg-[var(--secondary)] border-b border-[var(--border)]">
                        Output
                      </div>
                      <pre className="p-4 text-sm font-mono bg-[var(--code-bg)] overflow-x-auto max-h-48 overflow-y-auto">
                        {output}
                      </pre>
                    </div>
                  )}

                  {/* Back to explanation */}
                  <div className="flex items-center justify-between pt-4">
                    <button
                      onClick={() => {
                        setCurrentStepIndex(0);
                        setModalState("explanation");
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
                    >
                      <RotateCcw size={16} />
                      Start Over
                    </button>
                    <button
                      onClick={onClose}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      Done
                      <CheckCircle size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
