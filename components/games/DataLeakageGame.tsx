"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Play, RotateCcw, Trophy, ShieldAlert } from "lucide-react";

interface Scenario {
  id: number;
  code: string;
  description: string;
  hasLeakage: boolean;
  explanation: string;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    code: `scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # All data
X_train, X_test = train_test_split(X_scaled, ...)`,
    description: "Scaling before splitting",
    hasLeakage: true,
    explanation: "LEAKAGE! You fit the scaler on ALL data including test set. The scaler learns mean/std from test data, which leaks information into training."
  },
  {
    id: 2,
    code: `X_train, X_test, y_train, y_test = train_test_split(...)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)`,
    description: "Scaling after splitting",
    hasLeakage: false,
    explanation: "Correct! You split first, then fit scaler only on training data. Test data is transformed using training parameters."
  },
  {
    id: 3,
    code: `# Feature selection using correlation with y
correlations = X.corrwith(y)  # All data
best_features = correlations.nlargest(10).index
X_selected = X[best_features]
X_train, X_test = train_test_split(X_selected, ...)`,
    description: "Feature selection before splitting",
    hasLeakage: true,
    explanation: "LEAKAGE! Feature selection used correlations from ALL data including test. You're selecting features based on test set information."
  },
  {
    id: 4,
    code: `X_train, X_test, y_train, y_test = train_test_split(...)
model = LinearRegression()
model.fit(X_train, y_train)
score = model.score(X_test, y_test)`,
    description: "Basic train-test workflow",
    hasLeakage: false,
    explanation: "Correct! This is the proper workflow: split first, train on training set, evaluate on test set. No leakage."
  },
  {
    id: 5,
    code: `# Fill missing values with mean
X['price'].fillna(X['price'].mean(), inplace=True)
X_train, X_test = train_test_split(X, ...)`,
    description: "Imputing missing values before split",
    hasLeakage: true,
    explanation: "LEAKAGE! The mean includes test data values. In production, you won't know future values. Calculate mean only from training data."
  },
  {
    id: 6,
    code: `X_train, X_test = train_test_split(X, ...)
train_mean = X_train['price'].mean()
X_train['price'].fillna(train_mean, inplace=True)
X_test['price'].fillna(train_mean, inplace=True)`,
    description: "Imputing with training mean only",
    hasLeakage: false,
    explanation: "Correct! You calculate the mean from training data only, then use that same value to fill both train and test missing values."
  },
  {
    id: 7,
    code: `# Using tomorrow's stock price to predict today's
df['next_day_price'] = df['price'].shift(-1)
model.fit(X, df['next_day_price'])`,
    description: "Using future data as feature",
    hasLeakage: true,
    explanation: "LEAKAGE! You're using tomorrow's price (future information) to predict today. This is time-travel leakage - impossible in real trading."
  },
  {
    id: 8,
    code: `pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', Ridge())
])
X_train, X_test = train_test_split(X, ...)
pipe.fit(X_train, y_train)
pipe.score(X_test, y_test)`,
    description: "Using Pipeline for preprocessing",
    hasLeakage: false,
    explanation: "Correct! Pipeline ensures scaler is fit only during fit() on training data. When scoring test data, it uses training parameters."
  }
];

export function DataLeakageGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [shuffledScenarios, setShuffledScenarios] = useState<Scenario[]>([]);

  const totalQuestions = 6;

  const startGame = () => {
    const shuffled = [...scenarios].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    setShuffledScenarios(shuffled);
    setGameState("playing");
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answer: boolean) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === shuffledScenarios[currentIndex].hasLeakage) {
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
      <div className="my-8 p-6 rounded-xl border-2 border-amber-400 dark:border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert className="text-amber-500" size={28} />
          <h3 className="text-xl font-bold">Game: Spot the Data Leakage!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Data leakage is one of the most common mistakes in ML. Can you identify which code snippets
          have leakage and which are safe?
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Remember:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• Leakage = test data influences training in any way</li>
            <li>• Common sources: scaling before split, feature selection before split, using future data</li>
            <li>• Safe practice: ALWAYS split first, then process train and test separately</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-500 text-white font-medium hover:opacity-90 transition-opacity"
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
          {percentage >= 80 && <p className="text-lg">🛡️ Excellent! You&apos;re a data leakage detective!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">👍 Good job! Watch out for those tricky cases!</p>}
          {percentage < 60 && <p className="text-lg">📚 Review the fit_transform vs transform rule!</p>}
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

  return (
    <div className="my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="text-amber-500" size={24} />
          <span className="font-bold">Question {currentIndex + 1} of {totalQuestions}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Scenario */}
      <div className="mb-4">
        <div className="text-sm font-medium text-[var(--muted)] mb-2">{scenario.description}</div>
        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-x-auto">
          <pre>{scenario.code}</pre>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-4">
        <p className="text-lg font-semibold">Does this code have data leakage?</p>
      </div>

      {/* Buttons */}
      {!answered ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="py-4 rounded-lg bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
          >
            <AlertTriangle className="mx-auto mb-1" size={24} />
            Yes, Leakage!
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="py-4 rounded-lg bg-green-100 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 font-bold hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
          >
            <CheckCircle className="mx-auto mb-1" size={24} />
            No, It&apos;s Safe
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            selectedAnswer === scenario.hasLeakage
              ? "bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700"
              : "bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"
          }`}>
            {selectedAnswer === scenario.hasLeakage ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0 mt-1" size={24} />
            )}
            <div>
              <div className="font-bold mb-1">
                {selectedAnswer === scenario.hasLeakage ? "Correct!" : "Incorrect!"}
              </div>
              <div className="text-sm">{scenario.explanation}</div>
            </div>
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
