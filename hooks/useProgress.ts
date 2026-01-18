"use client";

import { useState, useEffect, useCallback } from "react";

interface Progress {
  modulesRead: string[];
  quizzesPassed: Record<string, number>;
  lastVisited: string | null;
}

interface ModuleProgress {
  read: boolean;
  quizScore: number | null;
  completed: boolean;
}

const STORAGE_KEY = "ml-regression-progress";

const defaultProgress: Progress = {
  modulesRead: [],
  quizzesPassed: {},
  lastVisited: null,
};

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProgress(JSON.parse(stored));
        } catch {
          setProgress(defaultProgress);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: Progress) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    }
    setProgress(newProgress);
  }, []);

  // Mark module as read
  const markModuleRead = useCallback(
    (slug: string) => {
      const alreadyRead = progress.modulesRead.includes(slug);
      const lastVisitedSame = progress.lastVisited === slug;

      if (!alreadyRead) {
        // New module - add to modulesRead and update lastVisited
        const newProgress = {
          ...progress,
          modulesRead: [...progress.modulesRead, slug],
          lastVisited: slug,
        };
        saveProgress(newProgress);
      } else if (!lastVisitedSame) {
        // Already read but lastVisited is different - update lastVisited only
        saveProgress({
          ...progress,
          lastVisited: slug,
        });
      }
      // If already read AND lastVisited is same, do nothing to prevent re-render loop
    },
    [progress, saveProgress]
  );

  // Record quiz score
  const recordQuizScore = useCallback(
    (moduleSlug: string, score: number) => {
      const newProgress = {
        ...progress,
        quizzesPassed: {
          ...progress.quizzesPassed,
          [moduleSlug]: score,
        },
      };
      saveProgress(newProgress);
    },
    [progress, saveProgress]
  );

  // Mark module as completed
  const markModuleCompleted = useCallback(
    (slug: string) => {
      if (!progress.modulesRead.includes(slug)) {
        const newProgress = {
          ...progress,
          modulesRead: [...progress.modulesRead, slug],
        };
        saveProgress(newProgress);
      }
    },
    [progress, saveProgress]
  );

  // Get module progress
  const getModuleProgress = useCallback(
    (slug: string): ModuleProgress => {
      const read = progress.modulesRead.includes(slug);
      const quizScore = progress.quizzesPassed[slug] ?? null;
      const completed = read && (quizScore === null || quizScore >= 60);
      return { read, quizScore, completed };
    },
    [progress]
  );

  // Reset progress
  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, [saveProgress]);

  return {
    progress,
    isLoaded,
    markModuleRead,
    markModuleCompleted,
    recordQuizScore,
    getModuleProgress,
    resetProgress,
  };
}
