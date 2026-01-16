"use client";

import { useState } from "react";
import { Play, RotateCcw, Trophy, Layers, ArrowRight, GripVertical, Check, X } from "lucide-react";

interface PipelineStep {
  id: string;
  name: string;
  description: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  availableSteps: PipelineStep[];
  correctOrder: string[];
  explanation: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: "Basic Regression Pipeline",
    description: "Build a pipeline for polynomial regression with scaling",
    availableSteps: [
      { id: "scale", name: "StandardScaler", description: "Normalize features" },
      { id: "poly", name: "PolynomialFeatures", description: "Create polynomial terms" },
      { id: "model", name: "LinearRegression", description: "Fit the model" },
    ],
    correctOrder: ["poly", "scale", "model"],
    explanation: "PolynomialFeatures creates new features (x², x³), then StandardScaler normalizes them, then the model fits. Scaling AFTER polynomial ensures all features (including new ones) are scaled."
  },
  {
    id: 2,
    title: "Lasso with Preprocessing",
    description: "Build a pipeline for Lasso regression with proper preprocessing",
    availableSteps: [
      { id: "lasso", name: "Lasso", description: "L1 regularized regression" },
      { id: "scale", name: "StandardScaler", description: "Normalize features" },
      { id: "impute", name: "SimpleImputer", description: "Fill missing values" },
    ],
    correctOrder: ["impute", "scale", "lasso"],
    explanation: "First impute missing values (can't scale NaN), then scale features (required for Lasso), then fit Lasso. Lasso needs scaled features to apply fair penalties."
  },
  {
    id: 3,
    title: "Full Feature Engineering Pipeline",
    description: "Build a complete pipeline with encoding and polynomial features",
    availableSteps: [
      { id: "onehot", name: "OneHotEncoder", description: "Encode categories" },
      { id: "poly", name: "PolynomialFeatures", description: "Create interactions" },
      { id: "scale", name: "StandardScaler", description: "Normalize features" },
      { id: "ridge", name: "Ridge", description: "L2 regularized regression" },
    ],
    correctOrder: ["onehot", "poly", "scale", "ridge"],
    explanation: "OneHot first (convert categories to numbers), then Polynomial (create interaction terms), then Scale (normalize everything), then Ridge. Each step builds on the previous."
  },
  {
    id: 4,
    title: "Cross-Validation Ready Pipeline",
    description: "Build a pipeline that's safe for cross-validation",
    availableSteps: [
      { id: "select", name: "SelectKBest", description: "Select top features" },
      { id: "scale", name: "StandardScaler", description: "Normalize features" },
      { id: "model", name: "LinearRegression", description: "Fit the model" },
    ],
    correctOrder: ["scale", "select", "model"],
    explanation: "Scale first so feature selection scores are comparable, then select best features, then model. Putting selection inside the pipeline ensures it's done correctly in each CV fold."
  },
];

export function PipelineBuilderGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [userPipeline, setUserPipeline] = useState<string[]>([]);
  const [availableSteps, setAvailableSteps] = useState<PipelineStep[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const startGame = () => {
    setGameState("playing");
    setCurrentChallenge(0);
    setScore(0);
    loadChallenge(0);
  };

  const loadChallenge = (index: number) => {
    const challenge = challenges[index];
    setAvailableSteps([...challenge.availableSteps].sort(() => Math.random() - 0.5));
    setUserPipeline([]);
    setSubmitted(false);
    setIsCorrect(false);
  };

  const addStep = (stepId: string) => {
    if (submitted) return;
    setUserPipeline([...userPipeline, stepId]);
    setAvailableSteps(availableSteps.filter(s => s.id !== stepId));
  };

  const removeStep = (index: number) => {
    if (submitted) return;
    const removedId = userPipeline[index];
    const removedStep = challenges[currentChallenge].availableSteps.find(s => s.id === removedId);
    if (removedStep) {
      setAvailableSteps([...availableSteps, removedStep]);
    }
    setUserPipeline(userPipeline.filter((_, i) => i !== index));
  };

  const submitPipeline = () => {
    const challenge = challenges[currentChallenge];
    const correct = JSON.stringify(userPipeline) === JSON.stringify(challenge.correctOrder);
    setIsCorrect(correct);
    setSubmitted(true);
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge >= challenges.length - 1) {
      setGameState("result");
    } else {
      setCurrentChallenge(prev => prev + 1);
      loadChallenge(currentChallenge + 1);
    }
  };

  const getStepByIdFromChallenge = (id: string) => {
    return challenges[currentChallenge].availableSteps.find(s => s.id === id);
  };

  if (gameState === "intro") {
    return (
      <div className="my-8 p-6 rounded-xl border-2 border-purple-400 dark:border-purple-600 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30">
        <div className="flex items-center gap-3 mb-4">
          <Layers className="text-purple-500" size={28} />
          <h3 className="text-xl font-bold">Game: Build the Pipeline!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Arrange the ML pipeline steps in the correct order. The order matters—wrong order means wrong results or data leakage!
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Tips:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• Data flows left to right through the pipeline</li>
            <li>• Transformers (scalers, encoders) come before estimators (models)</li>
            <li>• Feature creation (polynomial) typically comes before scaling</li>
            <li>• The model is always the LAST step</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Play size={20} />
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "result") {
    const percentage = Math.round((score / challenges.length) * 100);

    return (
      <div className="my-8 p-6 rounded-xl border-2 border-[var(--accent)] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 text-center">
        <Trophy className="mx-auto text-[var(--accent)] mb-4" size={64} />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-bold text-[var(--accent)] mb-2">{score} / {challenges.length}</p>
        <p className="text-[var(--muted)] mb-4">{percentage}% correct</p>

        <div className="mb-6">
          {percentage >= 75 && <p className="text-lg">🔧 Excellent! You&apos;re a pipeline architect!</p>}
          {percentage >= 50 && percentage < 75 && <p className="text-lg">👍 Good job! Keep practicing the order!</p>}
          {percentage < 50 && <p className="text-lg">📚 Review: transformers before estimators!</p>}
        </div>

        <button
          onClick={() => setGameState("intro")}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity mx-auto"
        >
          <RotateCcw size={20} />
          Play Again
        </button>
      </div>
    );
  }

  const challenge = challenges[currentChallenge];

  return (
    <div className="my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="text-purple-500" size={24} />
          <span className="font-bold">Challenge {currentChallenge + 1} of {challenges.length}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Challenge info */}
      <div className="mb-4">
        <h4 className="font-bold text-lg">{challenge.title}</h4>
        <p className="text-[var(--muted)]">{challenge.description}</p>
      </div>

      {/* Pipeline builder */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Your Pipeline:</div>
        <div className="min-h-16 p-4 rounded-lg bg-[var(--secondary)] border-2 border-dashed border-[var(--border)] flex items-center gap-2 flex-wrap">
          {userPipeline.length === 0 ? (
            <span className="text-[var(--muted)] text-sm">Click steps below to add them here...</span>
          ) : (
            userPipeline.map((stepId, index) => {
              const step = getStepByIdFromChallenge(stepId);
              return (
                <div key={index} className="flex items-center gap-2">
                  {index > 0 && <ArrowRight size={16} className="text-[var(--muted)]" />}
                  <button
                    onClick={() => removeStep(index)}
                    disabled={submitted}
                    className={`px-3 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
                      submitted
                        ? isCorrect || challenge.correctOrder[index] === stepId
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                    }`}
                  >
                    <GripVertical size={14} />
                    {step?.name}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Available steps */}
      {!submitted && (
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Available Steps (click to add):</div>
          <div className="flex gap-2 flex-wrap">
            {availableSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => addStep(step.id)}
                className="px-4 py-2 rounded-lg bg-[var(--secondary)] hover:bg-purple-100 dark:hover:bg-purple-900/30 border-2 border-[var(--border)] hover:border-purple-400 transition-colors"
              >
                <div className="font-medium text-sm">{step.name}</div>
                <div className="text-xs text-[var(--muted)]">{step.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit or Result */}
      {!submitted ? (
        <button
          onClick={submitPipeline}
          disabled={userPipeline.length !== challenge.correctOrder.length}
          className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Submit Pipeline ({userPipeline.length}/{challenge.correctOrder.length} steps)
        </button>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            isCorrect
              ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
              : "bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
          }`}>
            {isCorrect ? (
              <Check className="text-green-600 flex-shrink-0 mt-1" size={24} />
            ) : (
              <X className="text-red-600 flex-shrink-0 mt-1" size={24} />
            )}
            <div>
              <div className="font-bold mb-1">{isCorrect ? "Correct!" : "Not quite!"}</div>
              <div className="text-sm mb-2">{challenge.explanation}</div>
              {!isCorrect && (
                <div className="text-sm font-medium">
                  Correct order: {challenge.correctOrder.map(id => getStepByIdFromChallenge(id)?.name).join(" → ")}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={nextChallenge}
            className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            {currentChallenge >= challenges.length - 1 ? "See Results" : "Next Challenge"}
          </button>
        </div>
      )}
    </div>
  );
}
