"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, Trophy, Sparkles, ArrowRight } from "lucide-react";

interface BayesianPriorGameProps {
  fullScreen?: boolean;
}

interface Scenario {
  id: number;
  context: string;
  dataPoints: number;
  dataStrength: "weak" | "moderate" | "strong";
  priorOptions: {
    id: string;
    name: string;
    description: string;
    lambda: number;
  }[];
  correctPrior: string;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    context: "Predicting house prices. You have strong domain knowledge that only location and square footage matter.",
    dataPoints: 50,
    dataStrength: "weak",
    priorOptions: [
      { id: "strong", name: "Strong Prior (λ=10)", description: "Heavily constrain coefficients", lambda: 10 },
      { id: "moderate", name: "Moderate Prior (λ=1)", description: "Balanced regularization", lambda: 1 },
      { id: "weak", name: "Weak Prior (λ=0.01)", description: "Let data speak freely", lambda: 0.01 },
    ],
    correctPrior: "strong",
    explanation: "With strong domain knowledge and limited data (50 samples), use a STRONG prior! Your expertise says most features don't matter - encode that belief. The prior acts as regularization, preventing overfitting."
  },
  {
    id: 2,
    context: "Building a spam classifier. You have 1 million labeled emails and no special domain knowledge.",
    dataPoints: 1000000,
    dataStrength: "strong",
    priorOptions: [
      { id: "strong", name: "Strong Prior (λ=10)", description: "Heavily constrain coefficients", lambda: 10 },
      { id: "moderate", name: "Moderate Prior (λ=1)", description: "Balanced regularization", lambda: 1 },
      { id: "weak", name: "Weak Prior (λ=0.01)", description: "Let data speak freely", lambda: 0.01 },
    ],
    correctPrior: "weak",
    explanation: "With abundant data (1M samples) and no strong beliefs, use a WEAK prior. Let the data dominate! With so much evidence, the data will find the true patterns without needing prior guidance."
  },
  {
    id: 3,
    context: "Medical diagnosis model. You have 100 patient records but 50 features including many irrelevant ones.",
    dataPoints: 100,
    dataStrength: "weak",
    priorOptions: [
      { id: "ridge", name: "Ridge Prior (L2)", description: "Shrink all coefficients equally", lambda: 1 },
      { id: "lasso", name: "Lasso Prior (L1)", description: "Some coefficients exactly zero", lambda: 1 },
      { id: "none", name: "No Prior (OLS)", description: "No regularization", lambda: 0 },
    ],
    correctPrior: "lasso",
    explanation: "Lasso (L1) prior is best! You expect many features are irrelevant - Lasso encodes the belief that coefficients should be SPARSE. It performs feature selection, setting useless coefficients to exactly zero."
  },
  {
    id: 4,
    context: "Stock price prediction. You believe all factors contribute somewhat but none dominates.",
    dataPoints: 500,
    dataStrength: "moderate",
    priorOptions: [
      { id: "ridge", name: "Ridge Prior (L2)", description: "Shrink all coefficients equally", lambda: 1 },
      { id: "lasso", name: "Lasso Prior (L1)", description: "Some coefficients exactly zero", lambda: 1 },
      { id: "none", name: "No Prior (OLS)", description: "No regularization", lambda: 0 },
    ],
    correctPrior: "ridge",
    explanation: "Ridge (L2) prior is ideal! Your belief is that ALL features contribute - Ridge encodes this by shrinking coefficients toward zero but never eliminating them. It keeps all features while preventing any from dominating."
  },
  {
    id: 5,
    context: "Predicting exam scores. Historical data strongly suggests study hours is the main predictor.",
    dataPoints: 200,
    dataStrength: "moderate",
    priorOptions: [
      { id: "informative", name: "Informative Prior", description: "Center prior on study hours being important", lambda: 5 },
      { id: "uniform", name: "Uniform Prior", description: "All features equally likely to matter", lambda: 1 },
      { id: "weak", name: "Weak Prior", description: "Almost no prior belief", lambda: 0.01 },
    ],
    correctPrior: "informative",
    explanation: "Use an INFORMATIVE prior! Historical evidence suggests study hours matters most - encode that knowledge. The prior 'gives a head start' to the right answer while still letting data adjust beliefs if needed."
  },
  {
    id: 6,
    context: "Exploratory analysis on a new dataset. No prior research exists on this problem.",
    dataPoints: 300,
    dataStrength: "moderate",
    priorOptions: [
      { id: "strong", name: "Strong Prior (λ=10)", description: "Heavily constrain coefficients", lambda: 10 },
      { id: "moderate", name: "Moderate Prior (λ=1)", description: "Balanced regularization", lambda: 1 },
      { id: "weak", name: "Weak Prior (λ=0.01)", description: "Let data speak freely", lambda: 0.01 },
    ],
    correctPrior: "moderate",
    explanation: "Moderate prior is safest for exploration! You have no domain knowledge to encode. A moderate prior provides some regularization (prevents overfitting) without imposing strong beliefs that could bias discovery."
  },
];

export function BayesianPriorGame({ fullScreen = false }: BayesianPriorGameProps) {
  const wrapperClass = fullScreen ? "max-w-4xl mx-auto" : "";
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedPrior, setSelectedPrior] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [shuffledScenarios, setShuffledScenarios] = useState<Scenario[]>([]);
  const [priorVisualization, setPriorVisualization] = useState<number[]>([]);

  const totalQuestions = 5;

  useEffect(() => {
    // Generate random "coefficient" visualization when prior changes
    if (selectedPrior && shuffledScenarios[currentScenario]) {
      const scenario = shuffledScenarios[currentScenario];
      const selected = scenario.priorOptions.find(p => p.id === selectedPrior);
      if (selected) {
        const baseCoefs = [0.8, 0.6, 0.4, 0.3, 0.2, 0.1];
        const regularized = baseCoefs.map(c => {
          const shrunk = c / (1 + selected.lambda * 0.5);
          return selected.id === "lasso" && shrunk < 0.15 ? 0 : shrunk;
        });
        setPriorVisualization(regularized);
      }
    }
  }, [selectedPrior, currentScenario, shuffledScenarios]);

  const startGame = () => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    setShuffledScenarios(shuffled);
    setGameState("playing");
    setCurrentScenario(0);
    setScore(0);
    setSelectedPrior(null);
    setAnswered(false);
    setPriorVisualization([]);
  };

  const submitAnswer = () => {
    if (!selectedPrior) return;
    setAnswered(true);
    if (selectedPrior === shuffledScenarios[currentScenario].correctPrior) {
      setScore(prev => prev + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario >= totalQuestions - 1) {
      setGameState("result");
    } else {
      setCurrentScenario(prev => prev + 1);
      setSelectedPrior(null);
      setAnswered(false);
      setPriorVisualization([]);
    }
  };

  if (gameState === "intro") {
    return (
      <div className={`my-8 p-6 rounded-xl border-2 border-indigo-400 dark:border-indigo-600 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 ${wrapperClass}`}>
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-indigo-500" size={28} />
          <h3 className="text-xl font-bold">Game: Set Your Priors!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          In Bayesian regression, your prior beliefs influence the model. Learn when to use strong vs weak priors,
          and how they relate to regularization (Ridge = L2 prior, Lasso = L1 prior)!
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Key Concepts:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• <strong>Strong prior:</strong> Confident beliefs → use with limited data or domain expertise</li>
            <li>• <strong>Weak prior:</strong> Let data speak → use with abundant data, little expertise</li>
            <li>• <strong>Ridge (L2):</strong> Prior belief that coefficients are small but non-zero</li>
            <li>• <strong>Lasso (L1):</strong> Prior belief that many coefficients are exactly zero (sparse)</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Play size={20} />
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "result") {
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
      <div className={`my-8 p-6 rounded-xl border-2 border-[var(--accent)] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 text-center ${wrapperClass}`}>
        <Trophy className="mx-auto text-[var(--accent)] mb-4" size={64} />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-bold text-[var(--accent)] mb-2">{score} / {totalQuestions}</p>
        <p className="text-[var(--muted)] mb-4">{percentage}% correct</p>

        <div className="mb-6">
          {percentage >= 80 && <p className="text-lg">🎯 Bayesian Master! You understand priors perfectly!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">👍 Good intuition! Remember: more data = weaker prior needed!</p>}
          {percentage < 60 && <p className="text-lg">📚 Key rule: strong beliefs + weak data = strong prior!</p>}
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

  const scenario = shuffledScenarios[currentScenario];
  const isCorrect = selectedPrior === scenario.correctPrior;

  const dataStrengthColors = {
    weak: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    moderate: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    strong: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  return (
    <div className={`my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] ${wrapperClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="text-indigo-500" size={24} />
          <span className="font-bold">Scenario {currentScenario + 1} of {totalQuestions}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Scenario */}
      <div className="bg-[var(--secondary)] rounded-lg p-4 mb-6">
        <p className="font-medium mb-3">{scenario.context}</p>
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm">
            {scenario.dataPoints.toLocaleString()} samples
          </span>
          <span className={`px-2 py-1 rounded text-sm ${dataStrengthColors[scenario.dataStrength]}`}>
            {scenario.dataStrength} data signal
          </span>
        </div>
      </div>

      {/* Prior Effect Visualization */}
      {selectedPrior && priorVisualization.length > 0 && (
        <div className="mb-6 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-950/30">
          <div className="text-sm text-[var(--muted)] mb-2">Effect on coefficients:</div>
          <div className="flex items-end gap-2 h-20">
            {priorVisualization.map((coef, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-t transition-all duration-300 ${coef > 0 ? "bg-indigo-500" : "bg-gray-300 dark:bg-gray-600"}`}
                  style={{ height: `${Math.max(4, coef * 100)}%` }}
                />
                <div className="text-xs mt-1 text-[var(--muted)]">β{i + 1}</div>
              </div>
            ))}
          </div>
          <div className="text-xs text-center mt-2 text-[var(--muted)]">
            {selectedPrior.includes("lasso") ? "Lasso sets some coefficients to exactly 0" :
             selectedPrior === "strong" || selectedPrior === "informative" ? "Strong prior shrinks coefficients heavily" :
             selectedPrior === "weak" || selectedPrior === "none" ? "Weak/no prior allows larger coefficients" :
             "Moderate shrinkage applied"}
          </div>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 mb-6">
        {scenario.priorOptions.map((option) => {
          const isSelected = selectedPrior === option.id;
          const isCorrectOption = option.id === scenario.correctPrior;

          let buttonClass = "w-full p-4 rounded-lg border-2 text-left transition-all ";
          if (answered) {
            if (isCorrectOption) {
              buttonClass += "border-green-500 bg-green-50 dark:bg-green-950/30";
            } else if (isSelected) {
              buttonClass += "border-red-500 bg-red-50 dark:bg-red-950/30";
            } else {
              buttonClass += "border-[var(--border)] opacity-50";
            }
          } else {
            buttonClass += isSelected
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30"
              : "border-[var(--border)] hover:border-indigo-300";
          }

          return (
            <button
              key={option.id}
              onClick={() => !answered && setSelectedPrior(option.id)}
              disabled={answered}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{option.name}</div>
                  <div className="text-sm text-[var(--muted)]">{option.description}</div>
                </div>
                {answered && isCorrectOption && <span className="text-green-600 text-xl">✓</span>}
                {answered && isSelected && !isCorrectOption && <span className="text-red-600 text-xl">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
          <p className="font-medium mb-1">
            {isCorrect ? "Correct! 🎉" : "Not quite! 🤔"}
          </p>
          <p className="text-sm text-[var(--muted)]">{scenario.explanation}</p>
        </div>
      )}

      {/* Action Button */}
      {!answered ? (
        <button
          onClick={submitAnswer}
          disabled={!selectedPrior}
          className="w-full py-3 rounded-lg bg-indigo-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={nextScenario}
          className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {currentScenario >= totalQuestions - 1 ? "See Results" : "Next Scenario"}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
