"use client";

import { useState } from "react";
import { Play, RotateCcw, Trophy, Zap, ArrowDown, ArrowRight } from "lucide-react";

interface GradientScenario {
  id: number;
  dataSize: string;
  description: string;
  options: {
    id: string;
    name: string;
    description: string;
  }[];
  correctAnswer: string;
  explanation: string;
}

const scenarios: GradientScenario[] = [
  {
    id: 1,
    dataSize: "100 samples",
    description: "Small dataset, need high accuracy, not worried about speed",
    options: [
      { id: "batch", name: "Batch GD", description: "Use all data each step" },
      { id: "stochastic", name: "Stochastic GD", description: "Use 1 sample per step" },
      { id: "mini", name: "Mini-batch GD", description: "Use small batches" },
    ],
    correctAnswer: "batch",
    explanation: "With only 100 samples and no speed concerns, Batch GD gives the most accurate gradient. It uses ALL data each iteration, so gradients point exactly toward the minimum."
  },
  {
    id: 2,
    dataSize: "10 million samples",
    description: "Huge dataset on a single machine, need reasonable speed",
    options: [
      { id: "batch", name: "Batch GD", description: "Use all data each step" },
      { id: "stochastic", name: "Stochastic GD", description: "Use 1 sample per step" },
      { id: "mini", name: "Mini-batch GD", description: "Use batches of ~256" },
    ],
    correctAnswer: "mini",
    explanation: "Mini-batch GD is the sweet spot! Batch GD would be too slow (10M samples per step). Stochastic is too noisy. Mini-batch gives good gradient estimates while being fast."
  },
  {
    id: 3,
    dataSize: "1 billion samples",
    description: "Massive dataset distributed across 100 machines",
    options: [
      { id: "batch", name: "Batch GD", description: "Compute full gradient" },
      { id: "mapreduce", name: "MapReduce GD", description: "Parallel computation" },
      { id: "stochastic", name: "Stochastic GD", description: "Random single samples" },
    ],
    correctAnswer: "mapreduce",
    explanation: "MapReduce GD! Each machine computes partial gradient on its local data (map), then we combine them (reduce). This parallelizes the expensive gradient computation across all 100 machines."
  },
  {
    id: 4,
    dataSize: "50,000 samples",
    description: "Online learning - data arrives one at a time, need to update model continuously",
    options: [
      { id: "batch", name: "Batch GD", description: "Wait and use all data" },
      { id: "stochastic", name: "Stochastic GD", description: "Update with each sample" },
      { id: "mini", name: "Mini-batch GD", description: "Accumulate small batches" },
    ],
    correctAnswer: "stochastic",
    explanation: "Stochastic GD is perfect for online learning! It updates the model with each new sample as it arrives. No waiting, continuous adaptation. Think: spam filter learning from each email you mark."
  },
  {
    id: 5,
    dataSize: "500,000 samples",
    description: "Training a model where you want to leverage GPU parallelism",
    options: [
      { id: "stochastic", name: "Stochastic GD", description: "One sample at a time" },
      { id: "mini", name: "Mini-batch GD", description: "Batches of 32-512" },
      { id: "batch", name: "Batch GD", description: "All samples at once" },
    ],
    correctAnswer: "mini",
    explanation: "Mini-batch GD maximizes GPU utilization! GPUs excel at parallel matrix operations. Batch size of 32-512 fills GPU cores efficiently. Stochastic wastes GPU power; full batch may exceed GPU memory."
  },
  {
    id: 6,
    dataSize: "1,000 samples",
    description: "Noisy data with many outliers, need robust training",
    options: [
      { id: "batch", name: "Batch GD", description: "Average over all data" },
      { id: "stochastic", name: "Stochastic GD", description: "Single sample updates" },
      { id: "mini", name: "Mini-batch GD", description: "Small batch averaging" },
    ],
    correctAnswer: "batch",
    explanation: "Batch GD handles noise best by averaging gradients over ALL data. Outliers get diluted. Stochastic would be very erratic - one outlier could send the model way off course!"
  },
];

export function CoefficientMatchingGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [shuffledScenarios, setShuffledScenarios] = useState<GradientScenario[]>([]);

  const totalQuestions = 5;

  const startGame = () => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    setShuffledScenarios(shuffled);
    setGameState("playing");
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answerId: string) => {
    if (answered) return;

    setSelectedAnswer(answerId);
    setAnswered(true);

    if (answerId === shuffledScenarios[currentIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex >= totalQuestions - 1) {
      setGameState("result");
    } else {
      setCurrentIndex(prev => prev + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    }
  };

  if (gameState === "intro") {
    return (
      <div className="my-8 p-6 rounded-xl border-2 border-emerald-400 dark:border-emerald-600 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="text-emerald-500" size={28} />
          <h3 className="text-xl font-bold">Game: Choose the Right Gradient Descent!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Different scenarios call for different gradient descent strategies. Can you pick the best one
          for each situation?
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">The Three Strategies:</h4>
          <ul className="text-sm space-y-2 text-[var(--muted)]">
            <li className="flex items-start gap-2">
              <ArrowRight size={16} className="mt-1 flex-shrink-0 text-blue-500" />
              <span><strong>Batch GD:</strong> Uses ALL data each step. Accurate but slow for big data.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight size={16} className="mt-1 flex-shrink-0 text-orange-500" />
              <span><strong>Stochastic GD:</strong> Uses ONE sample per step. Fast but noisy updates.</span>
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight size={16} className="mt-1 flex-shrink-0 text-green-500" />
              <span><strong>Mini-batch GD:</strong> Uses small batches. Best of both worlds!</span>
            </li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-white font-medium hover:opacity-90 transition-opacity"
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
      <div className="my-8 p-6 rounded-xl border-2 border-[var(--accent)] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 text-center">
        <Trophy className="mx-auto text-[var(--accent)] mb-4" size={64} />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-bold text-[var(--accent)] mb-2">{score} / {totalQuestions}</p>
        <p className="text-[var(--muted)] mb-4">{percentage}% correct</p>

        <div className="mb-6">
          {percentage >= 80 && <p className="text-lg">🚀 Excellent! You know how to scale ML!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">👍 Good job! Remember: mini-batch is often the answer!</p>}
          {percentage < 60 && <p className="text-lg">📚 Review: big data = distribute, medium = mini-batch!</p>}
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

  const scenario = shuffledScenarios[currentIndex];
  const isCorrect = selectedAnswer === scenario.correctAnswer;

  return (
    <div className="my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="text-emerald-500" size={24} />
          <span className="font-bold">Question {currentIndex + 1} of {totalQuestions}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Scenario */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-bold">
            {scenario.dataSize}
          </span>
        </div>
        <p className="text-lg font-medium">{scenario.description}</p>
      </div>

      {/* Visualization */}
      <div className="mb-6 p-4 rounded-lg bg-[var(--secondary)]">
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-1">
              <ArrowDown className="text-blue-500" size={24} />
            </div>
            <span className="text-xs text-[var(--muted)]">Data</span>
          </div>
          <ArrowRight className="text-[var(--muted)]" />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-1">
              <span className="text-2xl">⚙️</span>
            </div>
            <span className="text-xs text-[var(--muted)]">GD Algorithm</span>
          </div>
          <ArrowRight className="text-[var(--muted)]" />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-1">
              <span className="text-2xl">📈</span>
            </div>
            <span className="text-xs text-[var(--muted)]">Model</span>
          </div>
        </div>
      </div>

      {/* Options */}
      {!answered ? (
        <div className="grid gap-3">
          {scenario.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className="p-4 rounded-lg bg-[var(--secondary)] border-2 border-[var(--border)] hover:border-emerald-400 transition-colors text-left"
            >
              <div className="font-bold">{option.name}</div>
              <div className="text-sm text-[var(--muted)]">{option.description}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Show options with results */}
          <div className="grid gap-3">
            {scenario.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrectOption = option.id === scenario.correctAnswer;

              let bgClass = "bg-[var(--secondary)]";
              let borderClass = "border-[var(--border)]";

              if (isCorrectOption) {
                bgClass = "bg-green-100 dark:bg-green-900/30";
                borderClass = "border-green-500";
              } else if (isSelected && !isCorrectOption) {
                bgClass = "bg-red-100 dark:bg-red-900/30";
                borderClass = "border-red-500";
              }

              return (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg ${bgClass} border-2 ${borderClass}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">{option.name}</div>
                      <div className="text-sm text-[var(--muted)]">{option.description}</div>
                    </div>
                    {isCorrectOption && <span className="text-green-600 text-xl">✓</span>}
                    {isSelected && !isCorrectOption && <span className="text-red-600 text-xl">✗</span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explanation */}
          <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-orange-100 dark:bg-orange-900/30"}`}>
            <div className="font-bold mb-1">{isCorrect ? "Correct!" : "Not quite!"}</div>
            <div className="text-sm">{scenario.explanation}</div>
          </div>

          <button
            onClick={nextQuestion}
            className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            {currentIndex >= totalQuestions - 1 ? "See Results" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}
