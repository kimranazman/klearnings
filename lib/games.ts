import { ComponentType } from "react";
import {
  PredictionGame,
  DataLeakageGame,
  PipelineBuilderGame,
  RegularizationGame,
  CoefficientMatchingGame,
} from "@/components/games";

export interface Game {
  slug: string;
  title: string;
  description: string;
  moduleSlug: string;
  moduleName: string;
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: number; // in minutes
  icon: string; // emoji
  color: string; // tailwind color class
  component: ComponentType<{ fullScreen?: boolean }>;
}

export const games: Game[] = [
  {
    slug: "guess-the-line",
    title: "Guess the Regression Line",
    description: "Look at scatter plots and predict the slope and intercept of the best-fit line. Build your intuition for linear regression!",
    moduleSlug: "module-1",
    moduleName: "Introduction to ML & Linear Regression",
    difficulty: "easy",
    estimatedTime: 5,
    icon: "📈",
    color: "from-blue-500 to-indigo-600",
    component: PredictionGame,
  },
  {
    slug: "coefficient-matching",
    title: "Match the Coefficients",
    description: "Given a dataset and model output, match the correct coefficient values to their features. Test your understanding of model interpretation!",
    moduleSlug: "module-1",
    moduleName: "Introduction to ML & Linear Regression",
    difficulty: "medium",
    estimatedTime: 5,
    icon: "🎯",
    color: "from-purple-500 to-pink-600",
    component: CoefficientMatchingGame,
  },
  {
    slug: "data-leakage-detective",
    title: "Data Leakage Detective",
    description: "Identify potential data leakage issues in ML pipelines. Learn to spot when information from the test set leaks into training!",
    moduleSlug: "module-2",
    moduleName: "Train-Test Split & Polynomial Regression",
    difficulty: "medium",
    estimatedTime: 7,
    icon: "🔍",
    color: "from-amber-500 to-orange-600",
    component: DataLeakageGame,
  },
  {
    slug: "pipeline-builder",
    title: "Pipeline Builder",
    description: "Build correct ML pipelines by arranging preprocessing and model steps in the right order. Master the sklearn Pipeline pattern!",
    moduleSlug: "module-3",
    moduleName: "Cross-Validation & Hyperparameter Tuning",
    difficulty: "hard",
    estimatedTime: 8,
    icon: "🔧",
    color: "from-cyan-500 to-teal-600",
    component: PipelineBuilderGame,
  },
  {
    slug: "regularization-tuner",
    title: "Regularization Tuner",
    description: "Adjust regularization parameters and see their effect on model coefficients in real-time. Understand Ridge vs Lasso behavior!",
    moduleSlug: "module-4",
    moduleName: "Bias-Variance Tradeoff & Regularization",
    difficulty: "hard",
    estimatedTime: 10,
    icon: "⚖️",
    color: "from-emerald-500 to-green-600",
    component: RegularizationGame,
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByModule(moduleSlug: string): Game[] {
  return games.filter((g) => g.moduleSlug === moduleSlug);
}

export function getAllGames(): Game[] {
  return games;
}
