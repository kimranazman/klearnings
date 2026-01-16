"use client";

import { useState } from "react";
import { Play, RotateCcw, Trophy, Split, ArrowRight, Check, X } from "lucide-react";

interface TrainTestSplitGameProps {
  fullScreen?: boolean;
}

interface Challenge {
  id: number;
  scenario: string;
  dataSize: number;
  options: { ratio: string; trainPct: number; description: string }[];
  correctRatio: string;
  explanation: string;
}

const challenges: Challenge[] = [
  {
    id: 1,
    scenario: "You have 100 samples and need a reliable estimate of model performance.",
    dataSize: 100,
    options: [
      { ratio: "50/50", trainPct: 50, description: "50% train, 50% test" },
      { ratio: "70/30", trainPct: 70, description: "70% train, 30% test" },
      { ratio: "90/10", trainPct: 90, description: "90% train, 10% test" },
    ],
    correctRatio: "70/30",
    explanation: "With 100 samples, 70/30 is ideal. 50/50 wastes training data, while 90/10 only gives you 10 test samples - too few for reliable evaluation."
  },
  {
    id: 2,
    scenario: "You have 1 million samples and want to maximize training data.",
    dataSize: 1000000,
    options: [
      { ratio: "70/30", trainPct: 70, description: "70% train, 30% test" },
      { ratio: "80/20", trainPct: 80, description: "80% train, 20% test" },
      { ratio: "95/5", trainPct: 95, description: "95% train, 5% test" },
    ],
    correctRatio: "95/5",
    explanation: "With 1M samples, even 5% gives you 50,000 test samples - plenty for reliable evaluation! Use 95% for training to maximize model learning."
  },
  {
    id: 3,
    scenario: "You have 50 samples and your model is complex (many parameters).",
    dataSize: 50,
    options: [
      { ratio: "60/40", trainPct: 60, description: "60% train, 40% test" },
      { ratio: "80/20", trainPct: 80, description: "80% train, 20% test" },
      { ratio: "90/10", trainPct: 90, description: "90% train, 10% test" },
    ],
    correctRatio: "80/20",
    explanation: "With only 50 samples and a complex model, you need enough training data (80%) but also enough test data (10 samples) to detect overfitting. Consider using cross-validation instead!"
  },
  {
    id: 4,
    scenario: "You're building a quick prototype and need fast iteration.",
    dataSize: 10000,
    options: [
      { ratio: "70/30", trainPct: 70, description: "70% train, 30% test" },
      { ratio: "80/20", trainPct: 80, description: "80% train, 20% test" },
      { ratio: "60/40", trainPct: 60, description: "60% train, 40% test" },
    ],
    correctRatio: "80/20",
    explanation: "For prototyping with 10K samples, 80/20 is the standard choice. It gives you 2,000 test samples (enough for reliable metrics) while keeping 8,000 for training."
  },
  {
    id: 5,
    scenario: "Your data has high variance and you're worried about evaluation reliability.",
    dataSize: 500,
    options: [
      { ratio: "70/30", trainPct: 70, description: "70% train, 30% test" },
      { ratio: "80/20", trainPct: 80, description: "80% train, 20% test" },
      { ratio: "Use CV", trainPct: 0, description: "Use cross-validation instead" },
    ],
    correctRatio: "Use CV",
    explanation: "With high-variance data and limited samples, a single train-test split can be unreliable. Cross-validation gives you multiple evaluation folds for more stable performance estimates!"
  }
];

export function TrainTestSplitGame({ fullScreen = false }: TrainTestSplitGameProps) {
  const wrapperClass = fullScreen ? "max-w-4xl mx-auto" : "";
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const challenge = challenges[currentChallenge];

  const startGame = () => {
    setGameState("playing");
    setCurrentChallenge(0);
    setScore(0);
    setSelectedRatio(null);
    setAnswered(false);
  };

  const submitAnswer = () => {
    if (!selectedRatio) return;
    setAnswered(true);
    if (selectedRatio === challenge.correctRatio) {
      setScore(prev => prev + 100);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge >= challenges.length - 1) {
      setGameState("result");
    } else {
      setCurrentChallenge(prev => prev + 1);
      setSelectedRatio(null);
      setAnswered(false);
    }
  };

  if (gameState === "intro") {
    return (
      <div className={`my-8 p-6 rounded-xl border-2 border-orange-400 dark:border-orange-600 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 ${wrapperClass}`}>
        <div className="flex items-center gap-3 mb-4">
          <Split className="text-orange-500" size={28} />
          <h3 className="text-xl font-bold">Game: Master the Split!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Choosing the right train-test split ratio is crucial! Too little training data and your model underperforms.
          Too little test data and you can&apos;t trust your evaluation.
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Quick Rules:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• More data → can use smaller test percentage</li>
            <li>• Complex models → need more training data</li>
            <li>• Small datasets → consider cross-validation</li>
            <li>• Common splits: 70/30, 80/20, or 90/10</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Play size={20} />
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "result") {
    const maxScore = challenges.length * 100;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className={`my-8 p-6 rounded-xl border-2 border-[var(--accent)] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 text-center ${wrapperClass}`}>
        <Trophy className="mx-auto text-[var(--accent)] mb-4" size={64} />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-bold text-[var(--accent)] mb-2">{score} / {maxScore}</p>
        <p className="text-[var(--muted)] mb-4">{percentage}% correct</p>

        <div className="mb-6">
          {percentage >= 80 && <p className="text-lg">🏆 Excellent! You really understand data splitting!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">🌟 Good job! A few more practice rounds will help!</p>}
          {percentage < 60 && <p className="text-lg">💪 Keep practicing! Remember: data size determines your options.</p>}
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

  return (
    <div className={`my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] ${wrapperClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Split className="text-orange-500" size={24} />
          <span className="font-bold">Challenge {currentChallenge + 1} of {challenges.length}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Scenario */}
      <div className="bg-[var(--secondary)] rounded-lg p-4 mb-6">
        <div className="text-sm text-[var(--muted)] mb-2">Scenario:</div>
        <p className="font-medium">{challenge.scenario}</p>
        <div className="mt-2 text-sm">
          <span className="px-2 py-1 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300">
            Dataset: {challenge.dataSize.toLocaleString()} samples
          </span>
        </div>
      </div>

      {/* Visual Split Preview */}
      {selectedRatio && (
        <div className="mb-6">
          <div className="text-sm text-[var(--muted)] mb-2">Preview:</div>
          <div className="h-8 rounded-lg overflow-hidden flex">
            <div
              className="bg-blue-500 flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${challenge.options.find(o => o.ratio === selectedRatio)?.trainPct || 0}%` }}
            >
              Train
            </div>
            <div
              className="bg-green-500 flex items-center justify-center text-white text-xs font-medium"
              style={{ width: `${100 - (challenge.options.find(o => o.ratio === selectedRatio)?.trainPct || 0)}%` }}
            >
              Test
            </div>
          </div>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 mb-6">
        {challenge.options.map((option) => {
          const isSelected = selectedRatio === option.ratio;
          const isCorrect = option.ratio === challenge.correctRatio;

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
              ? "border-orange-500 bg-orange-50 dark:bg-orange-950/30"
              : "border-[var(--border)] hover:border-orange-300";
          }

          return (
            <button
              key={option.ratio}
              onClick={() => !answered && setSelectedRatio(option.ratio)}
              disabled={answered}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{option.ratio}</div>
                  <div className="text-sm text-[var(--muted)]">{option.description}</div>
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
        <div className={`p-4 rounded-lg mb-6 ${selectedRatio === challenge.correctRatio ? "bg-green-100 dark:bg-green-900/30" : "bg-amber-100 dark:bg-amber-900/30"}`}>
          <p className="font-medium mb-1">
            {selectedRatio === challenge.correctRatio ? "Correct! 🎉" : "Not quite! 🤔"}
          </p>
          <p className="text-sm text-[var(--muted)]">{challenge.explanation}</p>
        </div>
      )}

      {/* Action Button */}
      {!answered ? (
        <button
          onClick={submitAnswer}
          disabled={!selectedRatio}
          className="w-full py-3 rounded-lg bg-orange-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          Submit Answer
        </button>
      ) : (
        <button
          onClick={nextChallenge}
          className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          {currentChallenge >= challenges.length - 1 ? "See Results" : "Next Challenge"}
          <ArrowRight size={18} />
        </button>
      )}
    </div>
  );
}
