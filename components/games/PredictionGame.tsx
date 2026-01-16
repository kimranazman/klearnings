"use client";

import { useState } from "react";
import { Play, RotateCcw, Trophy, Target, TrendingUp } from "lucide-react";

interface DataPoint {
  x: number;
  y: number;
}

interface PredictionGameProps {
  fullScreen?: boolean;
}

export function PredictionGame({ fullScreen = false }: PredictionGameProps) {
  const [gameState, setGameState] = useState<"intro" | "playing" | "result">("intro");
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [data, setData] = useState<DataPoint[]>([]);
  const [trueSlope, setTrueSlope] = useState(0);
  const [trueIntercept, setTrueIntercept] = useState(0);
  const [userSlope, setUserSlope] = useState(1);
  const [userIntercept, setUserIntercept] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [roundScore, setRoundScore] = useState<number | null>(null);

  const totalRounds = 5;

  const generateRound = () => {
    const slope = Math.round((Math.random() * 4 - 2) * 10) / 10; // -2 to 2
    const intercept = Math.round((Math.random() * 6 - 3) * 10) / 10; // -3 to 3

    const points: DataPoint[] = [];
    for (let i = 0; i < 8; i++) {
      const x = Math.round((Math.random() * 8 + 1) * 10) / 10;
      const noise = (Math.random() - 0.5) * 2;
      const y = Math.round((slope * x + intercept + noise) * 10) / 10;
      points.push({ x, y });
    }

    setData(points);
    setTrueSlope(slope);
    setTrueIntercept(intercept);
    setUserSlope(1);
    setUserIntercept(0);
    setFeedback(null);
    setRoundScore(null);
  };

  const startGame = () => {
    setGameState("playing");
    setCurrentRound(1);
    setScore(0);
    generateRound();
  };

  const submitGuess = () => {
    const slopeError = Math.abs(userSlope - trueSlope);
    const interceptError = Math.abs(userIntercept - trueIntercept);
    const totalError = slopeError + interceptError;

    let points = 0;
    let message = "";

    if (totalError < 0.5) {
      points = 100;
      message = "Perfect! You nailed it! 🎯";
    } else if (totalError < 1) {
      points = 80;
      message = "Excellent! Very close! 🌟";
    } else if (totalError < 2) {
      points = 60;
      message = "Good job! Getting there! 👍";
    } else if (totalError < 3) {
      points = 40;
      message = "Not bad, but room for improvement 📈";
    } else {
      points = 20;
      message = "Keep practicing! 💪";
    }

    setRoundScore(points);
    setScore(prev => prev + points);
    setFeedback(`${message}\nTrue line: y = ${trueSlope}x + ${trueIntercept}`);
  };

  const nextRound = () => {
    if (currentRound >= totalRounds) {
      setGameState("result");
    } else {
      setCurrentRound(prev => prev + 1);
      generateRound();
    }
  };

  const calculateY = (x: number, slope: number, intercept: number) => {
    return slope * x + intercept;
  };

  // Convert data coordinates to SVG coordinates
  const toSvgX = (x: number) => 50 + (x / 10) * 300;
  const toSvgY = (y: number) => 200 - (y + 5) * 20;

  if (gameState === "intro") {
    return (
      <div className="my-8 p-6 rounded-xl border-2 border-[var(--primary)] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="text-[var(--primary)]" size={28} />
          <h3 className="text-xl font-bold">Game: Guess the Regression Line</h3>
        </div>
        <p className="text-[var(--muted)] mb-4">
          You&apos;ll see scatter plots of data points. Your job is to guess the slope (β₁) and intercept (β₀)
          of the best-fit line. The closer you get, the more points you earn!
        </p>
        <div className="bg-white/50 dark:bg-black/20 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">How to Play:</h4>
          <ul className="text-sm space-y-1 text-[var(--muted)]">
            <li>• Look at the data points and visualize where the line should go</li>
            <li>• Adjust the slope (how steep) and intercept (where it crosses y-axis)</li>
            <li>• Submit your guess and see how close you were!</li>
            <li>• Complete 5 rounds and try to get the highest score</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
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
          {percentage >= 80 && <p className="text-lg">🏆 Outstanding! You have great intuition for linear regression!</p>}
          {percentage >= 60 && percentage < 80 && <p className="text-lg">🌟 Great job! You&apos;re getting the hang of it!</p>}
          {percentage >= 40 && percentage < 60 && <p className="text-lg">👍 Good effort! Keep practicing to improve!</p>}
          {percentage < 40 && <p className="text-lg">💪 Keep at it! Practice makes perfect!</p>}
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
    <div className="my-8 p-6 rounded-xl border-2 border-[var(--border)] bg-[var(--card)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="text-[var(--primary)]" size={24} />
          <span className="font-bold">Round {currentRound} of {totalRounds}</span>
        </div>
        <div className="text-lg font-bold">Score: {score}</div>
      </div>

      {/* Chart */}
      <div className="bg-[var(--secondary)] rounded-lg p-4 mb-4">
        <svg viewBox="0 0 400 250" className={`w-full ${fullScreen ? "h-80 md:h-96" : "h-64"}`}>
          {/* Grid */}
          <defs>
            <pattern id="game-grid" width="30" height="20" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect x="50" y="0" width="300" height="200" fill="url(#game-grid)" />

          {/* Axes */}
          <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2"/>
          <line x1="50" y1="0" x2="50" y2="200" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2"/>

          {/* Axis labels */}
          <text x="200" y="230" fontSize="12" fill="currentColor" textAnchor="middle">X</text>
          <text x="30" y="100" fontSize="12" fill="currentColor" textAnchor="middle">Y</text>

          {/* User's line */}
          <line
            x1={toSvgX(0)}
            y1={toSvgY(calculateY(0, userSlope, userIntercept))}
            x2={toSvgX(10)}
            y2={toSvgY(calculateY(10, userSlope, userIntercept))}
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray={feedback ? "none" : "8,4"}
          />

          {/* True line (only shown after submission) */}
          {feedback && (
            <line
              x1={toSvgX(0)}
              y1={toSvgY(calculateY(0, trueSlope, trueIntercept))}
              x2={toSvgX(10)}
              y2={toSvgY(calculateY(10, trueSlope, trueIntercept))}
              stroke="#10b981"
              strokeWidth="3"
            />
          )}

          {/* Data points */}
          {data.map((point, i) => (
            <circle
              key={i}
              cx={toSvgX(point.x)}
              cy={toSvgY(point.y)}
              r="6"
              fill="#ef4444"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Legend */}
          {feedback && (
            <>
              <line x1="260" y1="15" x2="290" y2="15" stroke="#3b82f6" strokeWidth="3"/>
              <text x="295" y="18" fontSize="10" fill="currentColor">Your line</text>
              <line x1="260" y1="30" x2="290" y2="30" stroke="#10b981" strokeWidth="3"/>
              <text x="295" y="33" fontSize="10" fill="currentColor">True line</text>
            </>
          )}
        </svg>
      </div>

      {/* Controls */}
      {!feedback ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Slope (β₁): {userSlope.toFixed(1)}
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={userSlope}
                onChange={(e) => setUserSlope(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[var(--muted)]">
                <span>-3</span>
                <span>0</span>
                <span>3</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Intercept (β₀): {userIntercept.toFixed(1)}
              </label>
              <input
                type="range"
                min="-5"
                max="5"
                step="0.1"
                value={userIntercept}
                onChange={(e) => setUserIntercept(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[var(--muted)]">
                <span>-5</span>
                <span>0</span>
                <span>5</span>
              </div>
            </div>
          </div>

          <div className="text-center p-3 bg-[var(--secondary)] rounded-lg font-mono">
            Your equation: y = {userSlope.toFixed(1)}x + {userIntercept.toFixed(1)}
          </div>

          <button
            onClick={submitGuess}
            className="w-full py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Submit Guess
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg text-center ${roundScore && roundScore >= 60 ? "bg-green-100 dark:bg-green-900/30" : "bg-orange-100 dark:bg-orange-900/30"}`}>
            <div className="text-2xl font-bold mb-2">+{roundScore} points</div>
            <div className="whitespace-pre-line">{feedback}</div>
          </div>

          <button
            onClick={nextRound}
            className="w-full py-3 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            {currentRound >= totalRounds ? "See Results" : "Next Round"}
          </button>
        </div>
      )}
    </div>
  );
}
