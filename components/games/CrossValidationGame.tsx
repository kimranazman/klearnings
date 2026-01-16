"use client";

import { useState } from "react";
import { Play, RotateCcw, Trophy, Layers, Check, X, ArrowRight } from "lucide-react";

interface CrossValidationGameProps {
  fullScreen?: boolean;
}

interface Scenario {
  id: number;
  description: string;
  dataSize: number;
  computeCost: "low" | "medium" | "high";
  options: { k: number | string; description: string }[];
  correctK: number | string;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    description: "You have 1,000 samples, fast model training, and need reliable estimates.",
    dataSize: 1000,
    computeCost: "low",
    options: [
      { k: 3, description: "3-fold CV" },
      { k: 5, description: "5-fold CV" },
      { k: 10, description: "10-fold CV" },
    ],
    correctK: 10,
    explanation: "With 1,000 samples and low compute cost, 10-fold CV is ideal. Each fold has 100 test samples, and you get 10 independent estimates for very stable results."
  },
  {
    id: 2,
    description: "You have 50 samples and a computationally expensive deep learning model.",
    dataSize: 50,
    computeCost: "high",
    options: [
      { k: 3, description: "3-fold CV" },
      { k: 5, description: "5-fold CV" },
      { k: "LOOCV", description: "Leave-One-Out CV" },
    ],
    correctK: 5,
    explanation: "With expensive computation, LOOCV (50 model fits!) is too slow. 3-fold only uses 33 samples for training. 5-fold balances compute cost with having ~40 training samples per fold."
  },
  {
    id: 3,
    description: "You have 30 samples and need the most unbiased performance estimate possible.",
    dataSize: 30,
    computeCost: "low",
    options: [
      { k: 5, description: "5-fold CV" },
      { k: 10, description: "10-fold CV" },
      { k: "LOOCV", description: "Leave-One-Out CV" },
    ],
    correctK: "LOOCV",
    explanation: "LOOCV uses n-1 samples for training in each fold, minimizing bias. With only 30 samples and low compute cost, it's worth the 30 model fits for the most unbiased estimate."
  },
  {
    id: 4,
    description: "You're doing hyperparameter tuning with GridSearchCV on a medium dataset.",
    dataSize: 5000,
    computeCost: "medium",
    options: [
      { k: 3, description: "3-fold CV" },
      { k: 5, description: "5-fold CV" },
      { k: 10, description: "10-fold CV" },
    ],
    correctK: 5,
    explanation: "For GridSearchCV, you train many models (one per hyperparameter combo). 5-fold is the standard choice - reliable enough while keeping computation manageable. 10-fold would double your time!"
  },
  {
    id: 5,
    description: "Your data has high variance between samples, and you want stable estimates.",
    dataSize: 200,
    computeCost: "low",
    options: [
      { k: 5, description: "5-fold CV" },
      { k: 10, description: "10-fold CV" },
      { k: "Repeated", description: "Repeated 5-fold CV (3x)" },
    ],
    correctK: "Repeated",
    explanation: "With high-variance data, a single CV run can give unstable results depending on how data falls into folds. Repeated CV (running 5-fold 3 times with different shuffles) averages out this randomness."
  }
];

export function CrossValidationGame({ fullScreen = false }: CrossValidationGameProps) {
  const wrapperClass = fullScreen ? "max-w-4xl mx-auto" : "";
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedK, setSelectedK] = useState<number | string | null>(null);
  const [answered, setAnswered] = useState(false);

  const scenario = scenarios[currentScenario];

  const startGame = () => {
    setGameState("playing");
    setCurrentScenario(0);
    setScore(0);
    setSelectedK(null);
    setAnswered(false);
  };

  const submitAnswer = () => {
    if (selectedK === null) return;
    setAnswered(true);
    if (selectedK === scenario.correctK) {
      setScore(prev => prev + 100);
    }
  };

  const nextScenario = () => {
    if (currentScenario >= scenarios.length - 1) {
      setGameState("result");
    } else {
      setCurrentScenario(prev => prev + 1);
      setSelectedK(null);
      setAnswered(false);
    }
  };

  if (gameState === "intro") {
    return (
      <div className={`my-8 p-6 rounded-xl border-2 border-teal-400 dark:border-teal-600 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 ${wrapperClass}`}>
        <div className="flex items-center gap-3 mb-4">
          <Layers className="text-teal-500" size={28} />
          <h3 className="text-xl font-bold">Game: Pick the Right K!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Cross-validation is essential for reliable model evaluation. But how many folds should you use?
          The answer depends on your data size, compute budget, and goals!
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Quick Guide:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• <strong>More folds</strong> → less bias, more variance, slower</li>
            <li>• <strong>Fewer folds</strong> → faster, but less reliable estimates</li>
            <li>• <strong>5-fold</strong> is the most common default</li>
            <li>• <strong>LOOCV</strong> for tiny datasets when compute allows</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Play size={20} />
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "result") {
    const maxScore = scenarios.length * 100;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className={`my-8 p-6 rounded-xl border-2 border-[var(--accent)] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 text-center ${wrapperClass}`}>
        <Trophy className="mx-auto text-[var(--accent)] mb-4" size={64} />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-bold text-[var(--accent)] mb-2">{score} / {maxScore}</p>
        <p className="text-[var(--muted)] mb-4">{percentage}% correct</p>

        <div className="mb-6">
          {percentage >= 80 && <p className="text-lg">🏆 CV Master! You know when to use which fold count!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">🌟 Good intuition! Remember: balance bias, variance, and compute.</p>}
          {percentage < 60 && <p className="text-lg">💪 Keep practicing! The key is matching K to your constraints.</p>}
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

  const computeCostColors = {
    low: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    high: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  };

  return (
    <div className={`my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] ${wrapperClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Layers className="text-teal-500" size={24} />
          <span className="font-bold">Scenario {currentScenario + 1} of {scenarios.length}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Scenario */}
      <div className="bg-[var(--secondary)] rounded-lg p-4 mb-6">
        <div className="text-sm text-[var(--muted)] mb-2">Scenario:</div>
        <p className="font-medium mb-3">{scenario.description}</p>
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
            {scenario.dataSize.toLocaleString()} samples
          </span>
          <span className={`px-2 py-1 rounded text-sm ${computeCostColors[scenario.computeCost]}`}>
            {scenario.computeCost} compute cost
          </span>
        </div>
      </div>

      {/* CV Visualization */}
      <div className="mb-6">
        <div className="text-sm text-[var(--muted)] mb-2">How {typeof selectedK === "number" ? `${selectedK}-fold` : selectedK || "K-fold"} CV works:</div>
        <div className="space-y-2">
          {selectedK && typeof selectedK === "number" && Array.from({ length: Math.min(selectedK, 5) }).map((_, i) => (
            <div key={i} className="h-6 rounded flex overflow-hidden text-xs">
              {Array.from({ length: selectedK }).map((_, j) => (
                <div
                  key={j}
                  className={`flex-1 flex items-center justify-center border-r border-white/20 last:border-r-0 ${
                    i === j ? "bg-green-500 text-white" : "bg-blue-400 text-white"
                  }`}
                >
                  {i === j ? "Test" : ""}
                </div>
              ))}
            </div>
          ))}
          {selectedK === "LOOCV" && (
            <div className="text-sm text-[var(--muted)] italic">
              LOOCV: Each sample takes a turn as the single test point ({scenario.dataSize} model fits)
            </div>
          )}
          {selectedK === "Repeated" && (
            <div className="text-sm text-[var(--muted)] italic">
              Repeated CV: Run 5-fold CV 3 times with different random shuffles (15 folds total)
            </div>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {scenario.options.map((option) => {
          const isSelected = selectedK === option.k;
          const isCorrect = option.k === scenario.correctK;

          let buttonClass = "w-full p-4 rounded-lg border-2 text-left transition-all ";
          if (answered) {
            if (isCorrect) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-950/30";
            } else if (isSelected) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-950/30";
            } else {
              buttonClass += "border-[var(--border)] opacity-50";
            }
          } else {
            buttonClass += isSelected
              ? "border-teal-500 bg-teal-50 dark:bg-teal-950/30"
              : "border-[var(--border)] hover:border-teal-300";
          }

          return (
            <button
              key={String(option.k)}
              onClick={() => !answered && setSelectedK(option.k)}
              disabled={answered}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{option.description}</div>
                </div>
                {answered && isCorrect && <Check className="text-green-500" size={24} />}
                {answered && isSelected && !isCorrect && <X className="text-red-500" size={24} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className={`p-4 rounded-lg mb-6 ${selectedK === scenario.correctK ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
          <p className="font-medium mb-1">
            {selectedK === scenario.correctK ? "Correct! 🎉" : "Not quite! 🤔"}
          </p>
          <p className="text-sm text-[var(--muted)]">{scenario.explanation}</p>
        </div>
      )}

      {/* Action Button */}
      {!answered ? (
        <button
          onClick={submitAnswer}
          disabled={selectedK === null}
          className="w-full py-3 rounded-lg bg-teal-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={nextScenario}
          className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {currentScenario >= scenarios.length - 1 ? "See Results" : "Next Scenario"}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
