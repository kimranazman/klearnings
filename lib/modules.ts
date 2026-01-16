export interface Module {
  slug: string;
  title: string;
  description: string;
  order: number;
}

export const modules: Module[] = [
  {
    slug: "module-1",
    title: "Introduction to ML & Linear Regression",
    description: "Foundations of supervised ML, linear regression basics, MSE, and R-squared",
    order: 1,
  },
  {
    slug: "module-2",
    title: "Train-Test Split & Polynomial Regression",
    description: "Data splitting, one-hot encoding, overfitting, and polynomial features",
    order: 2,
  },
  {
    slug: "module-3",
    title: "Cross-Validation & Hyperparameter Tuning",
    description: "K-fold CV, pipelines, GridSearchCV, and optimal model selection",
    order: 3,
  },
  {
    slug: "module-4",
    title: "Bias-Variance Tradeoff & Regularization",
    description: "Ridge, Lasso, Elastic Net, and feature selection techniques",
    order: 4,
  },
  {
    slug: "module-5",
    title: "Advanced Regularization Concepts",
    description: "Geometric, analytical, and Bayesian views of regularization",
    order: 5,
  },
];

export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

export function getNextModule(currentSlug: string): Module | undefined {
  const currentIndex = modules.findIndex((m) => m.slug === currentSlug);
  if (currentIndex === -1 || currentIndex === modules.length - 1) return undefined;
  return modules[currentIndex + 1];
}

export function getPrevModule(currentSlug: string): Module | undefined {
  const currentIndex = modules.findIndex((m) => m.slug === currentSlug);
  if (currentIndex <= 0) return undefined;
  return modules[currentIndex - 1];
}
