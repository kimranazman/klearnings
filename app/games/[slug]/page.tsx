"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen, Gamepad2 } from "lucide-react";
import { getGameBySlug, games } from "@/lib/games";

const difficultyColors = {
  easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function GamePage() {
  const params = useParams();
  const slug = params.slug as string;
  const game = getGameBySlug(slug);

  if (!game) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game not found</h1>
          <Link href="/games" className="text-[var(--primary)] hover:underline">
            ← Back to Game Center
          </Link>
        </div>
      </div>
    );
  }

  const GameComponent = game.component;

  // Find related games from same module
  const relatedGames = games.filter(
    (g) => g.moduleSlug === game.moduleSlug && g.slug !== game.slug
  );

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/games"
            className="flex items-center gap-2 text-[var(--muted)] hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Game Center</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={`/modules/${game.moduleSlug}`}
              className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-foreground transition-colors"
            >
              <BookOpen size={16} />
              <span className="hidden sm:inline">View Module</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Game Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl`}>
              {game.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColors[game.difficulty]}`}>
                  {game.difficulty}
                </span>
                <span className="text-xs text-[var(--muted)] flex items-center gap-1">
                  <Clock size={12} />
                  ~{game.estimatedTime} min
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{game.title}</h1>
            </div>
          </div>
          <p className="text-[var(--muted)]">{game.description}</p>
          <div className="mt-3 text-sm text-[var(--muted)]">
            From: <Link href={`/modules/${game.moduleSlug}`} className="text-[var(--primary)] hover:underline">{game.moduleName}</Link>
          </div>
        </div>

        {/* Game Component - Full Width */}
        <div className="game-container">
          <GameComponent fullScreen />
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Gamepad2 size={20} className="text-[var(--primary)]" />
              More Games from This Module
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {relatedGames.map((relatedGame) => (
                <Link
                  key={relatedGame.slug}
                  href={`/games/${relatedGame.slug}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${relatedGame.color} flex items-center justify-center text-2xl`}>
                    {relatedGame.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{relatedGame.title}</h3>
                    <p className="text-xs text-[var(--muted)]">{relatedGame.difficulty} • {relatedGame.estimatedTime} min</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to Game Center */}
        <div className="mt-8 text-center">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--border)] hover:bg-[var(--secondary)] transition-colors"
          >
            <Gamepad2 size={18} />
            Browse All Games
          </Link>
        </div>
      </main>
    </div>
  );
}
