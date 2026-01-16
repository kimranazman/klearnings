interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  explanation: string;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  "module-1": [
    {
      id: "m1-q1",
      question: "What is the key difference between machine learning and traditional statistical modeling?",
      options: [
        { id: "a", text: "Machine learning uses more data" },
        { id: "b", text: "Machine learning approximates the equation directly from data when the process is unknown" },
        { id: "c", text: "Traditional modeling is always more accurate" },
        { id: "d", text: "There is no difference" },
      ],
      correctAnswer: "b",
      explanation: "In traditional modeling, we know the underlying process and choose a model that approximates it. In machine learning, we approximate the equation directly from data when the process is unknown or too complex.",
    },
    {
      id: "m1-q2",
      question: "What is the formula for Mean Squared Error (MSE)?",
      options: [
        { id: "a", text: "(1/m) * sum(y_pred - y)" },
        { id: "b", text: "(1/m) * sum((y_pred - y)^2)" },
        { id: "c", text: "sum(|y_pred - y|)" },
        { id: "d", text: "max(y_pred - y)" },
      ],
      correctAnswer: "b",
      explanation: "MSE is calculated as the average of squared differences between predictions and actual values: MSE = (1/m) * sum((y_pred_i - y_i)^2).",
    },
    {
      id: "m1-q3",
      question: "What does R-squared (coefficient of determination) measure?",
      options: [
        { id: "a", text: "The total number of features" },
        { id: "b", text: "The speed of the algorithm" },
        { id: "c", text: "The proportion of variance explained by the model" },
        { id: "d", text: "The number of data points" },
      ],
      correctAnswer: "c",
      explanation: "R-squared measures the proportion of variance in the target variable that is explained by the model. It ranges from 0 to 1, with values closer to 1 indicating better fit.",
    },
    {
      id: "m1-q4",
      question: "What is the difference between parameters and hyperparameters?",
      options: [
        { id: "a", text: "They are the same thing" },
        { id: "b", text: "Parameters are learned from data; hyperparameters are set before training" },
        { id: "c", text: "Hyperparameters are learned from data; parameters are set before training" },
        { id: "d", text: "Both are set before training" },
      ],
      correctAnswer: "b",
      explanation: "Parameters (like regression coefficients) are estimated from the data during training. Hyperparameters (like polynomial degree or regularization strength) are decisions made before fitting the model.",
    },
    {
      id: "m1-q5",
      question: "When should you use regression vs classification?",
      options: [
        { id: "a", text: "Regression for categorical outcomes, classification for continuous values" },
        { id: "b", text: "Regression for continuous values, classification for categorical outcomes" },
        { id: "c", text: "Both are used for continuous values" },
        { id: "d", text: "Both are used for categorical outcomes" },
      ],
      correctAnswer: "b",
      explanation: "Regression is used to predict continuous numeric values (like stock prices or house prices), while classification is used to predict categorical outcomes (like spam/not spam or churn/no churn).",
    },
  ],
  "module-2": [
    {
      id: "m2-q1",
      question: "Why is it important to split data into training and test sets?",
      options: [
        { id: "a", text: "To make the dataset smaller" },
        { id: "b", text: "To evaluate model performance on unseen data and avoid overfitting" },
        { id: "c", text: "To speed up training" },
        { id: "d", text: "It's not important" },
      ],
      correctAnswer: "b",
      explanation: "Splitting data ensures we can evaluate how well the model generalizes to new, unseen data. Training and evaluating on the same data leads to overly optimistic performance estimates.",
    },
    {
      id: "m2-q2",
      question: "What is data leakage?",
      options: [
        { id: "a", text: "When data is lost during processing" },
        { id: "b", text: "When test set information influences the training process" },
        { id: "c", text: "When data is duplicated" },
        { id: "d", text: "When data is stored incorrectly" },
      ],
      correctAnswer: "b",
      explanation: "Data leakage occurs when information from the test set inadvertently influences the training process, leading to overly optimistic performance estimates that don't reflect real-world performance.",
    },
    {
      id: "m2-q3",
      question: "Why do we use n-1 columns in one-hot encoding instead of n?",
      options: [
        { id: "a", text: "To save memory" },
        { id: "b", text: "To avoid multicollinearity" },
        { id: "c", text: "It's just a convention" },
        { id: "d", text: "To make the model faster" },
      ],
      correctAnswer: "b",
      explanation: "Using n-1 columns prevents multicollinearity (when features are perfectly correlated). The dropped category becomes the reference, and its effect is captured in the intercept.",
    },
    {
      id: "m2-q4",
      question: "What indicates overfitting?",
      options: [
        { id: "a", text: "High training error, high test error" },
        { id: "b", text: "Low training error, low test error" },
        { id: "c", text: "Low training error, high test error" },
        { id: "d", text: "High training error, low test error" },
      ],
      correctAnswer: "c",
      explanation: "Overfitting is indicated by a large gap between training and test error - specifically, low training error but high test error. The model has memorized the training data but fails to generalize.",
    },
    {
      id: "m2-q5",
      question: "How do polynomial features enable nonlinear modeling with linear regression?",
      options: [
        { id: "a", text: "They change the algorithm completely" },
        { id: "b", text: "They create new features like x^2 and x1*x2, keeping the model linear in parameters" },
        { id: "c", text: "They remove outliers" },
        { id: "d", text: "They normalize the data" },
      ],
      correctAnswer: "b",
      explanation: "Polynomial features create new variables (x^2, x^3, x1*x2) that allow linear regression to capture nonlinear relationships. The model remains linear in its parameters (the coefficients), just with transformed features.",
    },
  ],
  "module-3": [
    {
      id: "m3-q1",
      question: "What is the main advantage of K-fold cross-validation over a single train-test split?",
      options: [
        { id: "a", text: "It's faster to compute" },
        { id: "b", text: "It uses less data" },
        { id: "c", text: "It provides a more reliable performance estimate by averaging across multiple splits" },
        { id: "d", text: "It always gives higher scores" },
      ],
      correctAnswer: "c",
      explanation: "K-fold cross-validation provides a more statistically significant performance measure by averaging scores across K different train-validation splits, reducing the impact of a lucky or unlucky single split.",
    },
    {
      id: "m3-q2",
      question: "In a scikit-learn Pipeline, what must all steps except the last one have?",
      options: [
        { id: "a", text: "A predict method" },
        { id: "b", text: "A fit_transform method" },
        { id: "c", text: "A score method" },
        { id: "d", text: "An evaluate method" },
      ],
      correctAnswer: "b",
      explanation: "All steps in a Pipeline except the last must have a fit_transform method (they're transformers). The last step can be a model with just fit and predict methods.",
    },
    {
      id: "m3-q3",
      question: "What does GridSearchCV do after finding the best hyperparameters?",
      options: [
        { id: "a", text: "Nothing - you must refit manually" },
        { id: "b", text: "Deletes the model" },
        { id: "c", text: "Refits the model on the full dataset with the best parameters" },
        { id: "d", text: "Exports the model to a file" },
      ],
      correctAnswer: "c",
      explanation: "By default (refit=True), GridSearchCV automatically refits the model on the entire dataset using the best hyperparameters found during the search, making it ready for production use.",
    },
    {
      id: "m3-q4",
      question: "What is stratified K-fold cross-validation?",
      options: [
        { id: "a", text: "Regular K-fold with more iterations" },
        { id: "b", text: "K-fold that maintains class proportions in each fold" },
        { id: "c", text: "K-fold with overlapping folds" },
        { id: "d", text: "K-fold without shuffling" },
      ],
      correctAnswer: "b",
      explanation: "Stratified K-fold ensures each fold maintains the same proportion of target classes as the original dataset. This is especially important for imbalanced datasets.",
    },
    {
      id: "m3-q5",
      question: "How do you access the best model's coefficients from a GridSearchCV object named 'grid' with a pipeline containing 'ridge_regression'?",
      options: [
        { id: "a", text: "grid.coef_" },
        { id: "b", text: "grid.best_estimator_.named_steps['ridge_regression'].coef_" },
        { id: "c", text: "grid.coefficients" },
        { id: "d", text: "grid.get_coef()" },
      ],
      correctAnswer: "b",
      explanation: "You access the best model through grid.best_estimator_, then navigate to the specific step in the pipeline using named_steps['step_name'], and finally access its coef_ attribute.",
    },
  ],
  "module-4": [
    {
      id: "m4-q1",
      question: "What is bias in the context of machine learning?",
      options: [
        { id: "a", text: "Personal preference in data collection" },
        { id: "b", text: "The tendency for a model to consistently miss true values (underfitting)" },
        { id: "c", text: "The tendency for predictions to fluctuate dramatically" },
        { id: "d", text: "Error in data entry" },
      ],
      correctAnswer: "b",
      explanation: "Bias refers to the model's tendency to consistently miss true values due to overly simplistic assumptions. High bias leads to underfitting - the model is too rigid to capture patterns.",
    },
    {
      id: "m4-q2",
      question: "What is the main difference between Ridge and Lasso regularization?",
      options: [
        { id: "a", text: "Ridge is faster" },
        { id: "b", text: "Lasso can eliminate features by zeroing coefficients; Ridge shrinks but doesn't zero" },
        { id: "c", text: "There is no difference" },
        { id: "d", text: "Ridge uses L1 penalty, Lasso uses L2" },
      ],
      correctAnswer: "b",
      explanation: "Lasso (L1) uses absolute value penalty which can drive coefficients exactly to zero, enabling feature selection. Ridge (L2) uses squared penalty which shrinks coefficients toward zero but rarely eliminates them completely.",
    },
    {
      id: "m4-q3",
      question: "Why must features be scaled before applying regularization?",
      options: [
        { id: "a", text: "It's not necessary" },
        { id: "b", text: "To make the algorithm faster" },
        { id: "c", text: "Features on larger scales receive unfair penalties without scaling" },
        { id: "d", text: "To reduce the number of features" },
      ],
      correctAnswer: "c",
      explanation: "Regularization penalizes coefficient magnitudes. Without scaling, features with larger scales will have smaller coefficients and be penalized less, leading to unfair and suboptimal regularization.",
    },
    {
      id: "m4-q4",
      question: "What happens when you increase the regularization parameter (alpha/lambda)?",
      options: [
        { id: "a", text: "Model becomes more complex" },
        { id: "b", text: "Model becomes simpler with smaller coefficients" },
        { id: "c", text: "Training becomes faster" },
        { id: "d", text: "Nothing changes" },
      ],
      correctAnswer: "b",
      explanation: "Higher alpha/lambda means stronger regularization penalty, which forces coefficients closer to zero, resulting in a simpler model with higher bias but lower variance.",
    },
    {
      id: "m4-q5",
      question: "What does Elastic Net combine?",
      options: [
        { id: "a", text: "Ridge and Linear Regression" },
        { id: "b", text: "Lasso and Decision Trees" },
        { id: "c", text: "Ridge (L2) and Lasso (L1) penalties" },
        { id: "d", text: "Cross-validation and Grid Search" },
      ],
      correctAnswer: "c",
      explanation: "Elastic Net combines both L1 (Lasso) and L2 (Ridge) penalties, providing the benefits of both: feature selection from Lasso and stability from Ridge. The l1_ratio parameter controls the balance between them.",
    },
  ],
  "module-5": [
    {
      id: "m5-q1",
      question: "In the geometric view of regularization, why does Lasso tend to zero out coefficients?",
      options: [
        { id: "a", text: "Because it uses larger penalties" },
        { id: "b", text: "Because its diamond-shaped constraint region has corners at axis points" },
        { id: "c", text: "Because it runs more iterations" },
        { id: "d", text: "Because it uses gradient descent" },
      ],
      correctAnswer: "b",
      explanation: "Lasso's diamond-shaped constraint region has corners at the axis points. When the RSS contours intersect this region, they're more likely to touch at corners where one or more coefficients are exactly zero.",
    },
    {
      id: "m5-q2",
      question: "What prior distribution does Ridge regression assume on coefficients?",
      options: [
        { id: "a", text: "Uniform distribution" },
        { id: "b", text: "Laplacian distribution" },
        { id: "c", text: "Gaussian (Normal) distribution centered at zero" },
        { id: "d", text: "Exponential distribution" },
      ],
      correctAnswer: "c",
      explanation: "In the Bayesian view, Ridge regression assumes a Gaussian (bell curve) prior on coefficients centered at zero. This prior belief that coefficients should be near zero leads to shrinkage.",
    },
    {
      id: "m5-q3",
      question: "What is the correct order for scaling when doing train-test splits?",
      options: [
        { id: "a", text: "Fit on test, transform train" },
        { id: "b", text: "Fit on all data, then split" },
        { id: "c", text: "Fit on train, transform both train and test using train parameters" },
        { id: "d", text: "Fit separately on train and test" },
      ],
      correctAnswer: "c",
      explanation: "You should fit the scaler only on training data (to learn mean/std), then use those same parameters to transform both train and test sets. This prevents data leakage from test set.",
    },
    {
      id: "m5-q4",
      question: "As lambda (alpha) increases in Lasso, what happens to the number of non-zero coefficients?",
      options: [
        { id: "a", text: "Increases" },
        { id: "b", text: "Stays the same" },
        { id: "c", text: "Decreases (more coefficients become zero)" },
        { id: "d", text: "Becomes unpredictable" },
      ],
      correctAnswer: "c",
      explanation: "As regularization strength (lambda/alpha) increases, more coefficients are pushed to exactly zero in Lasso. This is the feature selection property of L1 regularization.",
    },
    {
      id: "m5-q5",
      question: "What makes Lasso's Laplacian prior different from Ridge's Gaussian prior?",
      options: [
        { id: "a", text: "Laplacian is wider" },
        { id: "b", text: "Laplacian has a sharper peak at zero, making zeros more likely" },
        { id: "c", text: "They are identical" },
        { id: "d", text: "Gaussian has heavier tails" },
      ],
      correctAnswer: "b",
      explanation: "The Laplacian distribution has a sharper peak at zero compared to the Gaussian. This means the prior probability of coefficients being exactly zero is higher, leading to Lasso's feature selection behavior.",
    },
  ],
};
