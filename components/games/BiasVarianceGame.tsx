"use client";

import { useState } from "react";
import { Play, RotateCcw, Trophy, TrendingUp, ArrowRight, BarChart3 } from "lucide-react";

interface BiasVarianceGameProps {
  fullScreen?: boolean;
}

interface Scenario {
  id: number;
  trainError: number;
  testError: number;
  description: string;
  options: { id: string; label: string; description: string }[];
  correctAnswer: string;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    trainError: 2,
    testError: 25,
    description: "Your model achieves 2% error on training data but 25% error on test data.",
    options: [
      { id: "overfit", label: "Overfitting", description: "Model memorized training data" },
      { id: "underfit", label: "Underfitting", description: "Model is too simple" },
      { id: "good", label: "Good Fit", description: "Model generalizes well" },
    ],
    correctAnswer: "overfit",
    explanation: "Classic overfitting! The huge gap between train (2%) and test (25%) error means the model memorized the training data instead of learning patterns. It has HIGH VARIANCE - too sensitive to training data."
  },
  {
    id: 2,
    trainError: 20,
    testError: 22,
    description: "Your model achieves 20% error on training data and 22% error on test data.",
    options: [
      { id: "overfit", label: "Overfitting", description: "Model memorized training data" },
      { id: "underfit", label: "Underfitting", description: "Model is too simple" },
      { id: "good", label: "Good Fit", description: "Model generalizes well" },
    ],
    correctAnswer: "underfit",
    explanation: "This is underfitting! Both errors are high and similar. The model is too simple to capture patterns - it has HIGH BIAS. A more complex model (more features, higher degree polynomial) could help."
  },
  {
    id: 3,
    trainError: 5,
    testError: 7,
    description: "Your model achieves 5% error on training data and 7% error on test data.",
    options: [
      { id: "overfit", label: "Overfitting", description: "Model memorized training data" },
      { id: "underfit", label: "Underfitting", description: "Model is too simple" },
      { id: "good", label: "Good Fit", description: "Model generalizes well" },
    ],
    correctAnswer: "good",
    explanation: "Good fit! Both errors are low and the gap is small (2%). The model learned real patterns and generalizes well. This is the bias-variance sweet spot we aim for."
  },
  {
    id: 4,
    trainError: 1,
    testError: 15,
    description: "After adding polynomial features (degree 10), train error dropped from 8% to 1%, but test error went from 10% to 15%.",
    options: [
      { id: "more_complex", label: "Add More Features", description: "Even higher polynomial degree" },
      { id: "regularize", label: "Add Regularization", description: "Constrain model complexity" },
      { id: "more_data", label: "Get More Data", description: "Collect more training samples" },
    ],
    correctAnswer: "regularize",
    explanation: "Regularization is the fix! The high-degree polynomial is overfitting. Regularization (Ridge/Lasso) constrains coefficients, reducing variance. More data could help too, but regularization is the direct solution."
  },
  {
    id: 5,
    trainError: 18,
    testError: 19,
    description: "Your linear model has similar train (18%) and test (19%) errors. What's the best next step?",
    options: [
      { id: "regularize", label: "Add Regularization", description: "Constrain the model" },
      { id: "more_features", label: "Add More Features", description: "Increase model complexity" },
      { id: "reduce_features", label: "Remove Features", description: "Simplify the model" },
    ],
    correctAnswer: "more_features",
    explanation: "Add features! Similar high errors = underfitting (high bias). The model is too simple. Adding polynomial features or interaction terms increases complexity and can capture more patterns."
  },
  {
    id: 6,
    trainError: 3,
    testError: 30,
    description: "Your neural network has 3% train error but 30% test error. You only have 500 samples. Best action?",
    options: [
      { id: "bigger_network", label: "Bigger Network", description: "Add more layers/neurons" },
      { id: "more_data", label: "Get More Data", description: "Collect more training samples" },
      { id: "dropout", label: "Add Dropout/Regularization", description: "Constrain the network" },
    ],
    correctAnswer: "dropout",
    explanation: "Regularization (dropout) is best here! With only 500 samples and such a big gap, the network is severely overfitting. More data would help but is often impractical. Dropout/regularization directly fights overfitting."
  },
];

export function BiasVarianceGame({ fullScreen = false }: BiasVarianceGameProps) {
  const wrapperClass = fullScreen ? "max-w-4xl mx-auto" : "";
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentScenario, setCurrentScenario] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [shuffledScenarios, setShuffledScenarios] = useState<Scenario[]>([]);

  const totalQuestions = 5;

  const startGame = () => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    setShuffledScenarios(shuffled);
    setGameState("playing");
    setCurrentScenario(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const submitAnswer = () => {
    if (!selectedAnswer) return;
    setAnswered(true);
    if (selectedAnswer === shuffledScenarios[currentScenario].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario >= totalQuestions - 1) {
      setGameState("result");
    } else {
      setCurrentScenario(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    }
  };

  if (gameState === "intro") {
    return (
      <div className={`my-8 p-6 rounded-xl border-2 border-rose-400 dark:border-rose-600 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 ${wrapperClass}`}>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-rose-500" size={28} />
          <h3 className="text-xl font-bold">Game: Diagnose the Model!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Learn to diagnose overfitting vs underfitting by analyzing train and test errors.
          Understanding bias-variance tradeoff is key to building better models!
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Quick Guide:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• <strong>Overfitting:</strong> Low train error, high test error (high variance)</li>
            <li>• <strong>Underfitting:</strong> High train AND test error (high bias)</li>
            <li>• <strong>Good Fit:</strong> Low errors, small gap between train/test</li>
            <li>• Fix overfitting with regularization or more data</li>
            <li>• Fix underfitting with more features or complexity</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-rose-500 text-white font-medium hover:opacity-90 transition-opacity"
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
          {percentage >= 80 && <p className="text-lg">🎯 Excellent! You can diagnose models like a pro!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">👍 Good job! Remember: gap = variance, both high = bias!</p>}
          {percentage < 60 && <p className="text-lg">📚 Keep practicing! Compare train vs test errors carefully.</p>}
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
  const isCorrect = selectedAnswer === scenario.correctAnswer;

  return (
    <div className={`my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)] ${wrapperClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BarChart3 className="text-rose-500" size={24} />
          <span className="font-bold">Scenario {currentScenario + 1} of {totalQuestions}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Error Visualization */}
      <div className="bg-[var(--secondary)] rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm text-[var(--muted)] mb-1">Train Error</div>
            <div className="text-3xl font-bold text-blue-600">{scenario.trainError}%</div>
            <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: `${Math.min(100, scenario.trainError * 3)}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-[var(--muted)] mb-1">Test Error</div>
            <div className="text-3xl font-bold text-red-600">{scenario.testError}%</div>
            <div className="mt-2 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 transition-all duration-500"
                style={{ width: `${Math.min(100, scenario.testError * 3)}%` }}
              />
            </div>
          </div>
        </div>
        <p className="text-sm">{scenario.description}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {scenario.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrectOption = option.id === scenario.correctAnswer;

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
              ? "border-rose-500 bg-rose-50 dark:bg-rose-950/30"
              : "border-[var(--border)] hover:border-rose-300";
          }

          return (
            <button
              key={option.id}
              onClick={() => !answered && setSelectedAnswer(option.id)}
              disabled={answered}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{option.label}</div>
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
          disabled={!selectedAnswer}
          className="w-full py-3 rounded-lg bg-rose-500 text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
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
