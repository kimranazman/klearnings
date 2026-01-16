"use client";

import { useState, useEffect } from "react";
import { Play, RotateCcw, Trophy, Sliders, Target } from "lucide-react";

interface Feature {
  name: string;
  trueImportance: number; // 0-10
}

export function RegularizationGame() {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [alpha, setAlpha] = useState(0.1);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [coefficients, setCoefficients] = useState<number[]>([]);
  const [targetFeatures, setTargetFeatures] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [regType, setRegType] = useState<"ridge" | "lasso">("lasso");

  const totalRounds = 4;

  const generateRound = (round: number) => {
    // Generate features with varying importance
    const featureList: Feature[] = [
      { name: "price", trueImportance: Math.random() > 0.3 ? 8 + Math.random() * 2 : 0 },
      { name: "reviews", trueImportance: Math.random() > 0.3 ? 6 + Math.random() * 2 : 0 },
      { name: "category", trueImportance: Math.random() > 0.4 ? 5 + Math.random() * 2 : 0 },
      { name: "brand", trueImportance: Math.random() > 0.5 ? 4 + Math.random() * 2 : 0 },
      { name: "weight", trueImportance: Math.random() > 0.6 ? 3 + Math.random() * 2 : 0 },
      { name: "color", trueImportance: Math.random() > 0.7 ? 1 + Math.random() * 2 : 0 },
      { name: "warehouse_id", trueImportance: Math.random() > 0.8 ? Math.random() * 2 : 0 },
      { name: "upload_time", trueImportance: Math.random() > 0.9 ? Math.random() : 0 },
    ];

    setFeatures(featureList);
    const nonZero = featureList.filter(f => f.trueImportance > 1).length;
    setTargetFeatures(nonZero);
    setAlpha(0.1);
    setSubmitted(false);
    setRoundScore(0);
    setRegType(round % 2 === 0 ? "lasso" : "ridge");
    updateCoefficients(0.1, featureList, round % 2 === 0 ? "lasso" : "ridge");
  };

  const updateCoefficients = (newAlpha: number, feats: Feature[], type: "ridge" | "lasso") => {
    const coefs = feats.map(f => {
      if (type === "lasso") {
        // Lasso: coefficients go to zero
        const threshold = newAlpha * 5;
        if (f.trueImportance < threshold) return 0;
        return Math.max(0, f.trueImportance - threshold * 0.5);
      } else {
        // Ridge: coefficients shrink but don't go to zero
        const shrinkFactor = 1 / (1 + newAlpha * 2);
        return f.trueImportance * shrinkFactor;
      }
    });
    setCoefficients(coefs);
  };

  useEffect(() => {
    if (features.length > 0) {
      updateCoefficients(alpha, features, regType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alpha]);

  const startGame = () => {
    setGameState("playing");
    setCurrentRound(1);
    setScore(0);
    generateRound(1);
  };

  const submitAnswer = () => {
    const nonZeroCoefs = coefficients.filter(c => c > 0.1).length;
    const importantFeatures = features.filter(f => f.trueImportance > 1).length;

    // Score based on how well they matched the number of important features
    const diff = Math.abs(nonZeroCoefs - importantFeatures);
    let points = 0;

    if (diff === 0) {
      points = 100;
    } else if (diff === 1) {
      points = 75;
    } else if (diff === 2) {
      points = 50;
    } else {
      points = 25;
    }

    setRoundScore(points);
    setScore(prev => prev + points);
    setSubmitted(true);
  };

  const nextRound = () => {
    if (currentRound >= totalRounds) {
      setGameState("result");
    } else {
      setCurrentRound(prev => prev + 1);
      generateRound(currentRound + 1);
    }
  };

  if (gameState === "intro") {
    return (
      <div className="my-8 p-6 rounded-xl border-2 border-cyan-400 dark:border-cyan-600 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30">
        <div className="flex items-center gap-3 mb-4">
          <Sliders className="text-cyan-500" size={28} />
          <h3 className="text-xl font-bold">Game: Tune the Regularization!</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          Adjust the alpha (λ) parameter to keep only the important features. Watch how Ridge shrinks coefficients
          while Lasso eliminates them entirely!
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Goal:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• Find the alpha that keeps important features and removes noise</li>
            <li>• Lasso (L1) sets weak coefficients to exactly zero</li>
            <li>• Ridge (L2) shrinks all coefficients but never to zero</li>
            <li>• Higher alpha = more regularization = simpler model</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Play size={20} />
          Start Game
        </button>
      </div>
    );
  }

  if (gameState === "result") {
    const maxScore = totalRounds * 100;
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="my-8 p-6 rounded-xl border-2 border-[var(--accent)] bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 text-center">
        <Trophy className="mx-auto text-[var(--accent)] mb-4" size={64} />
        <h3 className="text-2xl font-bold mb-2">Game Complete!</h3>
        <p className="text-4xl font-bold text-[var(--accent)] mb-2">{score} / {maxScore}</p>
        <p className="text-[var(--muted)] mb-4">{percentage}% accuracy</p>

        <div className="mb-6">
          {percentage >= 80 && <p className="text-lg">⚙️ Master tuner! You understand regularization!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">👍 Good job! Keep experimenting with alpha!</p>}
          {percentage < 60 && <p className="text-lg">📚 Remember: higher alpha = fewer features!</p>}
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

  const nonZeroCount = coefficients.filter(c => c > 0.1).length;

  return (
    <div className="my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="text-cyan-500" size={24} />
          <span className="font-bold">Round {currentRound} of {totalRounds}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Regularization type badge */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
          regType === "lasso"
            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
        }`}>
          {regType === "lasso" ? "Lasso (L1)" : "Ridge (L2)"} Regularization
        </span>
      </div>

      {/* Info */}
      <div className="mb-4 p-3 rounded-lg bg-[var(--secondary)]">
        <p className="text-sm">
          This dataset has <strong>{targetFeatures} truly important features</strong>.
          Adjust alpha to keep only those features (coefficients &gt; 0.1).
        </p>
      </div>

      {/* Coefficients visualization */}
      <div className="mb-4 space-y-2">
        {features.map((feature, i) => (
          <div key={feature.name} className="flex items-center gap-3">
            <div className="w-28 text-sm font-mono truncate">{feature.name}</div>
            <div className="flex-1 h-6 bg-[var(--secondary)] rounded overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  coefficients[i] > 0.1
                    ? regType === "lasso" ? "bg-purple-500" : "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                style={{ width: `${Math.min(100, coefficients[i] * 10)}%` }}
              />
            </div>
            <div className="w-16 text-sm font-mono text-right">
              {coefficients[i].toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* Alpha slider */}
      {!submitted && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Alpha (λ): {alpha.toFixed(2)} — Non-zero coefficients: {nonZeroCount}
          </label>
          <input
            type="range"
            min="0.01"
            max="2"
            step="0.01"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-[var(--muted)]">
            <span>0.01 (weak)</span>
            <span>1.0</span>
            <span>2.0 (strong)</span>
          </div>
        </div>
      )}

      {/* Submit or Result */}
      {!submitted ? (
        <button
          onClick={submitAnswer}
          className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Submit (keeping {nonZeroCount} features)
        </button>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg text-center ${
            roundScore >= 75
              ? "bg-green-100 dark:bg-green-900/30"
              : "bg-orange-100 dark:bg-orange-900/30"
          }`}>
            <div className="text-2xl font-bold mb-1">+{roundScore} points</div>
            <div className="text-sm">
              Target: {targetFeatures} important features | You kept: {nonZeroCount} features
              {roundScore === 100 && " — Perfect match!"}
            </div>
          </div>

          <button
            onClick={nextRound}
            className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            {currentRound >= totalRounds ? "See Results" : "Next Round"}
          </button>
        </div>
      )}
    </div>
  );
}
