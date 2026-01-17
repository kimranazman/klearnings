export interface GlossaryTerm {
  term: string;
  definition: string;
  analogy: string;
  relatedTerms?: string[];
  module?: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  // Module 1: Introduction to ML & Linear Regression
  {
    term: "Machine Learning",
    definition: "A field of AI where computers learn patterns from data without being explicitly programmed, using algorithms that improve through experience.",
    analogy: "Like a child learning to recognize dogs by seeing many examples, rather than being told explicit rules about what makes a dog.",
    relatedTerms: ["supervised learning", "model", "training"],
    module: "module-1"
  },
  {
    term: "Supervised Learning",
    definition: "A type of machine learning where the model learns from labeled data - examples where we know both the input and the correct output.",
    analogy: "Like studying with an answer key - you see the question and the correct answer, so you learn the pattern.",
    relatedTerms: ["regression", "classification", "training data"],
    module: "module-1"
  },
  {
    term: "Regression",
    definition: "A supervised learning task where we predict a continuous numerical value (like price, temperature, or sales) rather than a category.",
    analogy: "Like predicting 'how much?' instead of 'which one?' - predicting a house will sell for $450,000 vs predicting it's in the 'expensive' category.",
    relatedTerms: ["classification", "linear regression", "target variable"],
    module: "module-1"
  },
  {
    term: "Classification",
    definition: "A supervised learning task where we predict a discrete category or class label (like spam/not spam, cat/dog).",
    analogy: "Like sorting mail into bins - each item goes into exactly one category, not a spectrum.",
    relatedTerms: ["regression", "supervised learning"],
    module: "module-1"
  },
  {
    term: "Linear Regression",
    definition: "A model that predicts the target as a weighted sum of input features plus a bias term, forming a straight line (or hyperplane in higher dimensions).",
    analogy: "Like finding the best-fit line through a scatter plot - the line that comes closest to all the points.",
    relatedTerms: ["coefficients", "intercept", "ordinary least squares"],
    module: "module-1"
  },
  {
    term: "Features",
    definition: "The input variables (X) used to make predictions. Each feature represents a measurable property of the data.",
    analogy: "Like ingredients in a recipe - the things you measure and combine to create the final dish (prediction).",
    relatedTerms: ["target variable", "feature engineering", "independent variable"],
    module: "module-1"
  },
  {
    term: "Target Variable",
    definition: "The output variable (y) we're trying to predict. Also called the dependent variable or label.",
    analogy: "The final exam score you're trying to predict based on study habits, attendance, and homework grades.",
    relatedTerms: ["features", "prediction", "dependent variable"],
    module: "module-1"
  },
  {
    term: "Coefficients",
    definition: "The weights (w) in a linear model that determine how much each feature contributes to the prediction. Learned during training.",
    analogy: "Like multipliers in a recipe - if the coefficient for 'square footage' is 200, each extra sq ft adds $200 to the predicted price.",
    relatedTerms: ["intercept", "weights", "linear regression"],
    module: "module-1"
  },
  {
    term: "Intercept",
    definition: "The bias term (b) in a linear model - the prediction when all features are zero. Also called the bias or constant term.",
    analogy: "The 'base price' before adding anything - like a house's land value before considering the building.",
    relatedTerms: ["coefficients", "bias term"],
    module: "module-1"
  },
  {
    term: "MSE",
    definition: "Mean Squared Error - the average of squared differences between predictions and actual values. Penalizes large errors heavily.",
    analogy: "Like grading where big mistakes cost you exponentially more points - being off by 10 is 100x worse than being off by 1.",
    relatedTerms: ["RMSE", "loss function", "R-squared"],
    module: "module-1"
  },
  {
    term: "Mean Squared Error",
    definition: "The average of squared differences between predictions and actual values. A common loss function for regression.",
    analogy: "Like grading where big mistakes cost you exponentially more points - being off by 10 is 100x worse than being off by 1.",
    relatedTerms: ["RMSE", "loss function", "R-squared"],
    module: "module-1"
  },
  {
    term: "R-squared",
    definition: "A metric showing what percentage of variance in the target is explained by the model. Ranges from 0 to 1 (or negative for terrible models).",
    analogy: "Like a grade showing how much of the pattern your model 'gets' - 0.85 means you explain 85% of why prices vary.",
    relatedTerms: ["MSE", "variance", "model evaluation"],
    module: "module-1"
  },
  {
    term: "Loss Function",
    definition: "A function that measures how wrong the model's predictions are. The goal of training is to minimize this function.",
    analogy: "Like a penalty score in a game - lower is better, and training tries to reduce this score.",
    relatedTerms: ["MSE", "cost function", "gradient descent"],
    module: "module-1"
  },
  {
    term: "Cost Function",
    definition: "Another name for loss function - measures the error between predictions and actual values across the entire dataset.",
    analogy: "The total 'bill' for all your prediction mistakes - training aims to minimize this bill.",
    relatedTerms: ["loss function", "MSE", "optimization"],
    module: "module-1"
  },

  // Module 2: Train-Test Split & Polynomial Regression
  {
    term: "Training Data",
    definition: "The portion of data used to train (fit) the model. The model learns patterns from this data.",
    analogy: "Like practice problems you study from - you learn the patterns, but the real test comes later.",
    relatedTerms: ["test data", "train-test split", "validation data"],
    module: "module-2"
  },
  {
    term: "Test Data",
    definition: "Data held out during training, used only to evaluate the model's performance on unseen examples.",
    analogy: "Like the final exam with questions you've never seen - tests if you truly learned vs just memorized.",
    relatedTerms: ["training data", "train-test split", "generalization"],
    module: "module-2"
  },
  {
    term: "Train-Test Split",
    definition: "Dividing data into separate training and test sets to evaluate how well the model generalizes to new data.",
    analogy: "Like splitting a deck of flashcards - study with most of them, then quiz yourself with the ones you set aside.",
    relatedTerms: ["training data", "test data", "cross-validation"],
    module: "module-2"
  },
  {
    term: "Generalization",
    definition: "A model's ability to perform well on new, unseen data - not just the data it was trained on.",
    analogy: "Like understanding math concepts well enough to solve new problems, not just the ones from homework.",
    relatedTerms: ["overfitting", "test data", "validation"],
    module: "module-2"
  },
  {
    term: "Polynomial Regression",
    definition: "Linear regression extended with polynomial features (x², x³, etc.) to capture non-linear relationships.",
    analogy: "Like fitting a curved line instead of straight - when the relationship bends, polynomials can follow the curve.",
    relatedTerms: ["polynomial features", "linear regression", "feature engineering"],
    module: "module-2"
  },
  {
    term: "Polynomial Features",
    definition: "Transformations that add powers and interactions of original features (x², x³, x₁×x₂) to capture non-linear patterns.",
    analogy: "Like adding 'age squared' as a feature because the effect of age might not be constant - it could accelerate or slow down.",
    relatedTerms: ["polynomial regression", "feature engineering", "degree"],
    module: "module-2"
  },
  {
    term: "Feature Engineering",
    definition: "The process of creating new features from existing ones to help the model learn better patterns.",
    analogy: "Like a chef preparing ingredients before cooking - chopping, combining, and transforming raw inputs into useful forms.",
    relatedTerms: ["polynomial features", "feature selection", "transformation"],
    module: "module-2"
  },
  {
    term: "Data Leakage",
    definition: "When information from outside the training data 'leaks' into the model, causing overly optimistic performance estimates.",
    analogy: "Like accidentally seeing the test answers while studying - your 'grade' looks great but you haven't really learned.",
    relatedTerms: ["train-test split", "overfitting", "cross-validation"],
    module: "module-2"
  },

  // Module 3: Cross-Validation & Hyperparameter Tuning
  {
    term: "Cross-Validation",
    definition: "A technique that splits data into multiple folds, training and testing on different combinations to get robust performance estimates.",
    analogy: "Like taking the same test multiple times with different question subsets - your average score is more reliable than one attempt.",
    relatedTerms: ["k-fold", "LOOCV", "validation"],
    module: "module-3"
  },
  {
    term: "K-Fold Cross-Validation",
    definition: "Cross-validation where data is split into K equal parts. Each part takes a turn as test data while others train the model.",
    analogy: "Like a 5-person study group where each person takes a turn being quizzed while others help - everyone gets tested fairly.",
    relatedTerms: ["cross-validation", "LOOCV", "fold"],
    module: "module-3"
  },
  {
    term: "LOOCV",
    definition: "Leave-One-Out Cross-Validation - extreme case where K equals the number of samples. Each sample is tested individually.",
    analogy: "Like testing each flashcard one by one, training on all others - most thorough but slowest approach.",
    relatedTerms: ["cross-validation", "k-fold"],
    module: "module-3"
  },
  {
    term: "Hyperparameters",
    definition: "Settings you choose before training that control the learning process - like learning rate, regularization strength, or polynomial degree.",
    analogy: "Like oven temperature and cooking time in a recipe - you set these before cooking, not learned during.",
    relatedTerms: ["parameters", "grid search", "tuning"],
    module: "module-3"
  },
  {
    term: "Parameters",
    definition: "Values learned by the model during training - like coefficients in linear regression. Contrast with hyperparameters which are set beforehand.",
    analogy: "Like the actual recipe amounts you figure out through experimentation - 'add 2 cups flour' is learned, 'bake at 350°F' is preset.",
    relatedTerms: ["hyperparameters", "coefficients", "weights"],
    module: "module-3"
  },
  {
    term: "Grid Search",
    definition: "A hyperparameter tuning method that tries all combinations of specified parameter values to find the best configuration.",
    analogy: "Like trying every combination at a restaurant - all appetizers with all mains with all desserts - to find the best meal.",
    relatedTerms: ["hyperparameters", "cross-validation", "tuning"],
    module: "module-3"
  },
  {
    term: "Pipeline",
    definition: "A sequence of data processing steps chained together, ensuring consistent transformations during training and prediction.",
    analogy: "Like an assembly line in a factory - raw materials go in one end, finished products come out the other, same process every time.",
    relatedTerms: ["preprocessing", "sklearn", "transformation"],
    module: "module-3"
  },
  {
    term: "Validation Data",
    definition: "A subset of training data used to tune hyperparameters and make decisions during model development, separate from final test data.",
    analogy: "Like practice tests before the real exam - helps you adjust your study strategy without 'using up' the real test.",
    relatedTerms: ["training data", "test data", "cross-validation"],
    module: "module-3"
  },

  // Module 4: Bias-Variance Tradeoff & Regularization
  {
    term: "Overfitting",
    definition: "When a model learns the training data too well, including noise, and fails to generalize to new data. Low training error, high test error.",
    analogy: "Like memorizing exam answers word-for-word instead of understanding concepts - you fail when questions are rephrased.",
    relatedTerms: ["underfitting", "generalization", "regularization", "variance"],
    module: "module-4"
  },
  {
    term: "Underfitting",
    definition: "When a model is too simple to capture the underlying patterns. High error on both training and test data.",
    analogy: "Like using a straight line to predict a curved pattern - too simple to capture reality, misses the point entirely.",
    relatedTerms: ["overfitting", "bias", "model complexity"],
    module: "module-4"
  },
  {
    term: "Bias",
    definition: "Error from overly simplistic assumptions in the model. High bias means the model misses relevant patterns (underfitting).",
    analogy: "Like assuming all relationships are straight lines - you'll systematically miss curved patterns.",
    relatedTerms: ["variance", "bias-variance tradeoff", "underfitting"],
    module: "module-4"
  },
  {
    term: "Variance",
    definition: "Error from sensitivity to small fluctuations in training data. High variance means predictions change wildly with different training samples.",
    analogy: "Like a nervous test-taker whose score varies wildly depending on which questions appear - inconsistent and unreliable.",
    relatedTerms: ["bias", "bias-variance tradeoff", "overfitting"],
    module: "module-4"
  },
  {
    term: "Bias-Variance Tradeoff",
    definition: "The balance between model simplicity (bias) and flexibility (variance). Reducing one often increases the other.",
    analogy: "Like thermostat settings - too cold (high bias) or too hot (high variance), you want the comfortable middle.",
    relatedTerms: ["bias", "variance", "model complexity"],
    module: "module-4"
  },
  {
    term: "Regularization",
    definition: "A technique that adds a penalty for model complexity to prevent overfitting. Forces the model to stay simpler.",
    analogy: "Like a word limit on an essay - forces you to be concise and focus on what's important, cutting the fluff.",
    relatedTerms: ["ridge", "lasso", "overfitting", "lambda"],
    module: "module-4"
  },
  {
    term: "Ridge Regression",
    definition: "Linear regression with L2 regularization - adds penalty proportional to squared coefficients. Shrinks coefficients but keeps all features.",
    analogy: "Like a tax on large coefficients - the bigger they are, the more penalty. Encourages spreading importance across features.",
    relatedTerms: ["lasso", "L2 regularization", "regularization"],
    module: "module-4"
  },
  {
    term: "Lasso Regression",
    definition: "Linear regression with L1 regularization - adds penalty proportional to absolute coefficients. Can set some coefficients exactly to zero.",
    analogy: "Like a budget that forces you to cut entire expenses - some features get completely eliminated, not just reduced.",
    relatedTerms: ["ridge", "L1 regularization", "feature selection"],
    module: "module-4"
  },
  {
    term: "L1 Regularization",
    definition: "Penalty based on the sum of absolute values of coefficients. Promotes sparsity - many coefficients become exactly zero.",
    analogy: "Like paying a flat fee per feature used - encourages using fewer features to minimize the penalty.",
    relatedTerms: ["L2 regularization", "lasso", "sparsity"],
    module: "module-4"
  },
  {
    term: "L2 Regularization",
    definition: "Penalty based on the sum of squared coefficients. Shrinks all coefficients but rarely makes them exactly zero.",
    analogy: "Like paying based on total 'weight' of coefficients - encourages smaller values but keeps everyone in the game.",
    relatedTerms: ["L1 regularization", "ridge"],
    module: "module-4"
  },
  {
    term: "Lambda",
    definition: "The regularization strength parameter (also called alpha). Higher values mean stronger regularization and simpler models.",
    analogy: "Like the strictness of a diet - higher lambda means stricter rules and more constrained coefficients.",
    relatedTerms: ["regularization", "hyperparameters", "alpha"],
    module: "module-4"
  },
  {
    term: "Alpha",
    definition: "Another name for the regularization strength parameter (lambda). Controls how much to penalize model complexity.",
    analogy: "The 'volume knob' for regularization - turn it up for more regularization, down for less.",
    relatedTerms: ["lambda", "regularization", "hyperparameters"],
    module: "module-4"
  },
  {
    term: "Elastic Net",
    definition: "Combines L1 and L2 regularization, getting benefits of both - feature selection from Lasso and coefficient shrinking from Ridge.",
    analogy: "Like having both a budget and a weight limit for packing - combines the benefits of both constraints.",
    relatedTerms: ["ridge", "lasso", "regularization"],
    module: "module-4"
  },

  // Module 5: Bayesian Regression & Advanced Topics
  {
    term: "Bayesian Regression",
    definition: "A probabilistic approach where we start with prior beliefs about parameters and update them with data to get posterior distributions.",
    analogy: "Like updating your belief about a restaurant - you start with reviews (prior), then adjust after eating there (data) to form your final opinion (posterior).",
    relatedTerms: ["prior", "posterior", "uncertainty"],
    module: "module-5"
  },
  {
    term: "Prior",
    definition: "In Bayesian inference, your initial belief about parameters before seeing any data. Encodes domain knowledge or assumptions.",
    analogy: "Like your expectation before a first date based on their profile - your starting belief before getting real evidence.",
    relatedTerms: ["posterior", "Bayesian regression"],
    module: "module-5"
  },
  {
    term: "Posterior",
    definition: "In Bayesian inference, the updated belief about parameters after combining prior beliefs with observed data.",
    analogy: "Your opinion after the first date - combines what you expected (prior) with what actually happened (data).",
    relatedTerms: ["prior", "Bayesian regression", "likelihood"],
    module: "module-5"
  },
  {
    term: "Feature Selection",
    definition: "The process of choosing which features to include in a model, removing irrelevant or redundant ones.",
    analogy: "Like packing for a trip - deciding what's essential and leaving behind what won't be useful.",
    relatedTerms: ["lasso", "feature importance", "dimensionality reduction"],
    module: "module-5"
  },
  {
    term: "Sparsity",
    definition: "Having many zero values - in regression, a sparse model has many coefficients equal to zero, using only a few features.",
    analogy: "Like a minimalist apartment - most spaces are empty, only essential items remain.",
    relatedTerms: ["lasso", "L1 regularization", "feature selection"],
    module: "module-5"
  },

  // General ML Terms
  {
    term: "Model",
    definition: "A mathematical representation learned from data that can make predictions on new inputs.",
    analogy: "Like a recipe derived from tasting many dishes - it captures the pattern so you can recreate similar results.",
    relatedTerms: ["training", "prediction", "algorithm"],
  },
  {
    term: "Training",
    definition: "The process of learning model parameters from data by minimizing a loss function.",
    analogy: "Like practicing piano - repetition and feedback help you improve until you can play well.",
    relatedTerms: ["model", "parameters", "loss function"],
  },
  {
    term: "Prediction",
    definition: "Using a trained model to estimate the output for new, unseen inputs.",
    analogy: "Like using your cooking skills to make a dish you've never made before - applying learned patterns to new situations.",
    relatedTerms: ["model", "inference"],
  },
  {
    term: "Fit",
    definition: "To train a model on data - finding the parameters that best match the training examples.",
    analogy: "Like tailoring a suit - adjusting the parameters until it fits the data well.",
    relatedTerms: ["training", "model", "parameters"],
  },
  {
    term: "Gradient Descent",
    definition: "An optimization algorithm that iteratively adjusts parameters in the direction that reduces the loss function.",
    analogy: "Like walking downhill in fog - you can't see the bottom, but you keep stepping in the direction that goes down.",
    relatedTerms: ["loss function", "optimization", "learning rate"],
    module: "module-1"
  },
  {
    term: "Learning Rate",
    definition: "A hyperparameter controlling how big each step is during gradient descent. Too high = overshoot, too low = slow.",
    analogy: "Like the step size when walking downhill - big steps are faster but might miss the bottom, tiny steps are precise but slow.",
    relatedTerms: ["gradient descent", "hyperparameters"],
  },
  {
    term: "Normalization",
    definition: "Scaling features to a standard range (often 0-1 or mean=0, std=1) so they contribute equally to the model.",
    analogy: "Like converting currencies to dollars for comparison - puts everything on the same scale.",
    relatedTerms: ["standardization", "preprocessing", "feature scaling"],
  },
  {
    term: "Standardization",
    definition: "Transforming features to have zero mean and unit variance. Important for many algorithms including regularized regression.",
    analogy: "Like grading on a curve - centers scores around average and normalizes the spread.",
    relatedTerms: ["normalization", "preprocessing", "z-score"],
  },
  {
    term: "RMSE",
    definition: "Root Mean Squared Error - the square root of MSE, giving error in the same units as the target variable.",
    analogy: "If MSE is 100, RMSE is 10 - now you can say 'predictions are off by about 10 units on average.'",
    relatedTerms: ["MSE", "loss function", "evaluation"],
  },
  {
    term: "Scikit-learn",
    definition: "A popular Python library for machine learning with consistent APIs for models, preprocessing, and evaluation.",
    analogy: "Like a well-organized kitchen with standardized tools - everything works the same way, making cooking (ML) easier.",
    relatedTerms: ["Python", "pipeline", "model"],
  },
  {
    term: "Sklearn",
    definition: "Short name for scikit-learn, the popular Python machine learning library.",
    analogy: "Like a well-organized kitchen with standardized tools - everything works the same way, making cooking (ML) easier.",
    relatedTerms: ["scikit-learn", "Python", "pipeline"],
  },
];

// Create a map for faster lookup
export const glossaryMap = new Map<string, GlossaryTerm>();
glossaryTerms.forEach(term => {
  // Add the main term
  glossaryMap.set(term.term.toLowerCase(), term);

  // Add common variations
  const variations = generateVariations(term.term);
  variations.forEach(v => {
    if (!glossaryMap.has(v.toLowerCase())) {
      glossaryMap.set(v.toLowerCase(), term);
    }
  });
});

function generateVariations(term: string): string[] {
  const variations: string[] = [];
  const lower = term.toLowerCase();

  // Add lowercase
  variations.push(lower);

  // Handle common patterns
  if (lower.endsWith('ing')) {
    // overfitting -> overfit
    variations.push(lower.slice(0, -3));
    variations.push(lower.slice(0, -4)); // overfitting -> overfi... actually let's be more careful
  }

  if (lower.endsWith('ization')) {
    // regularization -> regularize
    variations.push(lower.replace('ization', 'ize'));
  }

  if (lower.endsWith('ion')) {
    // regression -> regress
    variations.push(lower.slice(0, -3));
  }

  // Handle hyphenated terms
  if (lower.includes('-')) {
    variations.push(lower.replace(/-/g, ' '));
    variations.push(lower.replace(/-/g, ''));
  }

  // Handle spaces
  if (lower.includes(' ')) {
    variations.push(lower.replace(/ /g, '-'));
    variations.push(lower.replace(/ /g, ''));
  }

  return variations;
}

export function findGlossaryTerm(searchText: string): GlossaryTerm | undefined {
  const normalized = searchText.trim().toLowerCase();

  // Direct lookup
  if (glossaryMap.has(normalized)) {
    return glossaryMap.get(normalized);
  }

  // Try without trailing punctuation
  const withoutPunctuation = normalized.replace(/[.,!?;:'"]+$/, '');
  if (glossaryMap.has(withoutPunctuation)) {
    return glossaryMap.get(withoutPunctuation);
  }

  // Try singular/plural variations
  if (normalized.endsWith('s') && !normalized.endsWith('ss')) {
    const singular = normalized.slice(0, -1);
    if (glossaryMap.has(singular)) {
      return glossaryMap.get(singular);
    }
  }

  return undefined;
}

export function searchGlossary(query: string): GlossaryTerm[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return glossaryTerms;

  return glossaryTerms.filter(term =>
    term.term.toLowerCase().includes(normalized) ||
    term.definition.toLowerCase().includes(normalized) ||
    term.analogy.toLowerCase().includes(normalized)
  );
}

export function getTermsByModule(moduleSlug: string): GlossaryTerm[] {
  return glossaryTerms.filter(term => term.module === moduleSlug);
}

export function getAllTermsSorted(): GlossaryTerm[] {
  return [...glossaryTerms].sort((a, b) => a.term.localeCompare(b.term));
}
