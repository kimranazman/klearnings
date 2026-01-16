"use client";

import Link from "next/link";
import { Gamepad2, Clock, ArrowRight, Trophy, Sparkles } from "lucide-react";
import { games } from "@/lib/games";

const difficultyColors = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function GameCenterPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Gamepad2 className="text-[var(--primary)]" size={24} />
            <span className="font-bold text-lg">Game Center</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--muted)] hover:text-foreground transition-colors"
          >
            ← Back to Course
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-medium mb-4">
            <Sparkles size={16} />
            {games.length} Interactive Games
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn ML Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]">
              Play
            </span>
          </h1>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Master machine learning concepts with interactive games. Each game reinforces
            key concepts from the course modules.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-12">
          <div className="text-center p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <div className="text-2xl font-bold text-[var(--primary)]">{games.length}</div>
            <div className="text-xs text-[var(--muted)]">Games</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <div className="text-2xl font-bold text-[var(--accent)]">
              {games.reduce((acc, g) => acc + g.estimatedTime, 0)}
            </div>
            <div className="text-xs text-[var(--muted)]">Minutes</div>
          </div>
          <div className="text-center p-4 rounded-xl bg-[var(--card)] border border-[var(--border)]">
            <div className="text-2xl font-bold text-amber-500">
              <Trophy size={24} className="inline" />
            </div>
            <div className="text-xs text-[var(--muted)]">Earn Points</div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[var(--primary)]/10"
            >
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-br ${game.color} p-6 flex items-center justify-center`}>
                <span className="text-6xl">{game.icon}</span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[game.difficulty]}`}>
                    {game.difficulty}
                  </span>
                  <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                    <Clock size={12} />
                    {game.estimatedTime} min
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--primary)] transition-colors">
                  {game.title}
                </h3>

                <p className="text-sm text-[var(--muted)] mb-4 line-clamp-2">
                  {game.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--muted)]">
                    Module {game.moduleSlug.split("-")[1]}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-[var(--primary)] group-hover:gap-2 transition-all">
                    Play
                    <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 border border-[var(--border)]">
          <h2 className="text-2xl font-bold mb-2">Ready to Learn?</h2>
          <p className="text-[var(--muted)] mb-4">
            Complete the course modules first to get the most out of these games.
          </p>
          <Link
            href="/modules/module-1"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Start Learning
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    </div>
  );
}
