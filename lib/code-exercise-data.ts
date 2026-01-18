import type { CodeExercise, ModuleExercises } from "./code-exercises";

// Module 1: ML Fundamentals
export const module1Exercises: CodeExercise[] = [
  {
    id: "m1-train-test-split",
    title: "Train-Test Split: Proper Data Splitting",
    description: "Learn the correct way to split your data and evaluate your model on unseen data.",
    steps: [
      {
        id: "step1",
        title: "Import the necessary function",
        code: "from sklearn.model_selection import train_test_split",
        explanation: "First, we import train_test_split from sklearn's model_selection module. This function handles the random splitting of data into training and test sets.",
      },
      {
        id: "step2",
        title: "Split your data",
        code: `X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)`,
        explanation: "We split both features (X) and labels (y) into training (70%) and test (30%) sets. The random_state ensures reproducibility - you'll get the same split every time.",
      },
      {
        id: "step3",
        title: "Create and train the model",
        code: `model = LinearRegression()
model.fit(X_train, y_train)`,
        explanation: "Create a LinearRegression model and train it using ONLY the training data. The model learns the relationship between X_train and y_train.",
      },
      {
        id: "step4",
        title: "Make predictions on test data",
        code: "predictions = model.predict(X_test)",
        explanation: "Use the trained model to predict on the test set - data the model has NEVER seen during training. This gives an honest evaluation.",
      },
      {
        id: "step5",
        title: "Evaluate the model",
        code: "r2 = r2_score(y_test, predictions)",
        explanation: "Calculate R² by comparing predictions to actual test values. This score reflects how well your model generalizes to new data.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.model_selection import train_test_split", label: "Import split function" },
        { id: "b2", code: "X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)", label: "Split data" },
        { id: "b3", code: "model = LinearRegression()", label: "Create model" },
        { id: "b4", code: "model.fit(X_train, y_train)", label: "Train model" },
        { id: "b5", code: "predictions = model.predict(X_test)", label: "Predict on test" },
        { id: "b6", code: "r2 = r2_score(y_test, predictions)", label: "Evaluate" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5", "b6"],
      hints: [
        "Start with imports - you need the split function before you can use it.",
        "You must split data before training, and train before predicting.",
        "Evaluation always comes last - you need predictions first!",
      ],
    },
    runnableCode: `# Complete example: Proper Train-Test Split
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import numpy as np

# Create sample data
np.random.seed(42)
X = np.random.randn(100, 1) * 10
y = 2 * X.flatten() + 5 + np.random.randn(100) * 2

# Step 1: Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42
)
print(f"Training samples: {len(X_train)}")
print(f"Test samples: {len(X_test)}")

# Step 2: Create and train model
model = LinearRegression()
model.fit(X_train, y_train)

# Step 3: Predict on test data
predictions = model.predict(X_test)

# Step 4: Evaluate
r2 = r2_score(y_test, predictions)
print(f"\\nR² Score: {r2:.4f}")
print("This is an honest score on unseen data!")`,
    wrongCode: `# WRONG: Testing on training data
model = LinearRegression()
model.fit(X, y)
predictions = model.predict(X)
r2 = r2_score(y, predictions)`,
    wrongExplanation: "Model memorizes training data, giving falsely optimistic metrics.",
    rightExplanation: "Model is evaluated on data it has never seen, giving realistic estimates.",
  },
  {
    id: "m1-fit-before-predict",
    title: "Fit Before Predict",
    description: "Understand why you must always train (fit) a model before making predictions.",
    steps: [
      {
        id: "step1",
        title: "Create the model instance",
        code: "model = LinearRegression()",
        explanation: "Creating a model gives you an 'empty' model with no learned parameters yet. Think of it as buying a textbook but not studying it.",
      },
      {
        id: "step2",
        title: "Fit the model to training data",
        code: "model.fit(X_train, y_train)",
        explanation: "The fit() method is where the actual learning happens. The model analyzes the relationship between X_train and y_train to find the best coefficients.",
      },
      {
        id: "step3",
        title: "Now make predictions",
        code: "predictions = model.predict(X_test)",
        explanation: "After fitting, the model can use its learned coefficients to make predictions on new data. Without fit(), this would fail with NotFittedError!",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "model = LinearRegression()", label: "Create empty model" },
        { id: "b2", code: "model.fit(X_train, y_train)", label: "Train the model" },
        { id: "b3", code: "predictions = model.predict(X_test)", label: "Make predictions" },
      ],
      correctOrder: ["b1", "b2", "b3"],
      hints: [
        "You need to create a model before you can do anything with it.",
        "fit() is like studying - predict() is like taking the exam. Which comes first?",
      ],
    },
    runnableCode: `# Correct order: Create -> Fit -> Predict
from sklearn.linear_model import LinearRegression
import numpy as np

# Sample data
np.random.seed(42)
X_train = np.random.randn(80, 1) * 10
y_train = 3 * X_train.flatten() + 7 + np.random.randn(80) * 2
X_test = np.random.randn(20, 1) * 10

# Step 1: Create model
model = LinearRegression()
print("Model created (not fitted yet)")

# Step 2: Fit the model
model.fit(X_train, y_train)
print(f"Model fitted! Coefficients: {model.coef_[0]:.2f}, Intercept: {model.intercept_:.2f}")

# Step 3: Predict
predictions = model.predict(X_test)
print(f"\\nPredictions made for {len(predictions)} test samples")
print(f"First 5 predictions: {predictions[:5].round(2)}")`,
    wrongCode: `# WRONG: Predicting without fitting
model = LinearRegression()
predictions = model.predict(X_test)  # Error!`,
    wrongExplanation: "The model has no learned parameters. It doesn't know what coefficients to use.",
    rightExplanation: "fit() learns the coefficients from training data, then predict() uses them.",
  },
  {
    id: "m1-regression-metrics",
    title: "Using Correct Metrics for Regression",
    description: "Learn which metrics to use for regression problems (not classification metrics!).",
    steps: [
      {
        id: "step1",
        title: "Import regression metrics",
        code: "from sklearn.metrics import r2_score, mean_squared_error",
        explanation: "For regression, we use R² (coefficient of determination) and MSE (mean squared error). These measure how close your predictions are to actual values.",
      },
      {
        id: "step2",
        title: "Train the model",
        code: "model.fit(X_train, y_train)",
        explanation: "Train your regression model on the training data. The model learns to predict continuous values, not categories.",
      },
      {
        id: "step3",
        title: "Make predictions",
        code: "predictions = model.predict(X_test)",
        explanation: "Get predicted values for your test set. These are continuous numbers (like $47.52), not categories.",
      },
      {
        id: "step4",
        title: "Calculate R² score",
        code: "r2 = r2_score(y_test, predictions)",
        explanation: "R² tells you how much variance your model explains. 1.0 is perfect, 0 means no better than guessing the mean.",
      },
      {
        id: "step5",
        title: "Calculate MSE",
        code: "mse = mean_squared_error(y_test, predictions)",
        explanation: "MSE measures average squared error. Lower is better. Take the square root (RMSE) to get error in original units.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.metrics import r2_score, mean_squared_error", label: "Import metrics" },
        { id: "b2", code: "model.fit(X_train, y_train)", label: "Train model" },
        { id: "b3", code: "predictions = model.predict(X_test)", label: "Predict" },
        { id: "b4", code: "r2 = r2_score(y_test, predictions)", label: "Calculate R²" },
        { id: "b5", code: "mse = mean_squared_error(y_test, predictions)", label: "Calculate MSE" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Always import what you need first.",
        "You need predictions before you can calculate metrics!",
        "R² and MSE both need actual values (y_test) and predictions.",
      ],
    },
    runnableCode: `# Correct: Using regression metrics for regression
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score, mean_squared_error
from sklearn.model_selection import train_test_split
import numpy as np

# Create sample data
np.random.seed(42)
X = np.random.randn(100, 1) * 10
y = 2.5 * X.flatten() + 10 + np.random.randn(100) * 3

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Evaluate with regression metrics
r2 = r2_score(y_test, predictions)
mse = mean_squared_error(y_test, predictions)
rmse = np.sqrt(mse)

print("Regression Metrics:")
print(f"R² Score: {r2:.4f} (1.0 = perfect)")
print(f"MSE: {mse:.4f}")
print(f"RMSE: {rmse:.4f} (in original units)")
print(f"\\nSample predictions vs actual:")
for i in range(5):
    print(f"  Predicted: {predictions[i]:.2f}, Actual: {y_test[i]:.2f}")`,
    wrongCode: `# WRONG: Using accuracy for regression
from sklearn.metrics import accuracy_score
score = accuracy_score(y_test, predictions)`,
    wrongExplanation: "Accuracy is for classification. It makes no sense for continuous predictions.",
    rightExplanation: "R² and MSE measure how close your numbers are to actual values.",
  },
];

// Module 2: Feature Engineering
export const module2Exercises: CodeExercise[] = [
  {
    id: "m2-scaling",
    title: "Proper Feature Scaling",
    description: "Learn how to correctly scale features using fit only on training data.",
    steps: [
      {
        id: "step1",
        title: "Import the scaler",
        code: "from sklearn.preprocessing import StandardScaler",
        explanation: "StandardScaler transforms features to have mean=0 and std=1. This helps many algorithms converge faster.",
      },
      {
        id: "step2",
        title: "Create the scaler",
        code: "scaler = StandardScaler()",
        explanation: "Create a scaler instance. It doesn't know the mean and std yet - those come from fitting.",
      },
      {
        id: "step3",
        title: "Fit on training data ONLY",
        code: "scaler.fit(X_train)",
        explanation: "CRITICAL: Fit the scaler ONLY on training data. This learns the mean and std from training data. Never fit on test data!",
      },
      {
        id: "step4",
        title: "Transform training data",
        code: "X_train_scaled = scaler.transform(X_train)",
        explanation: "Apply the learned transformation to training data. You can also use fit_transform() to combine steps 3 and 4.",
      },
      {
        id: "step5",
        title: "Transform test data with SAME scaler",
        code: "X_test_scaled = scaler.transform(X_test)",
        explanation: "Use the SAME scaler (with mean/std from training) to transform test data. This prevents data leakage!",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.preprocessing import StandardScaler", label: "Import" },
        { id: "b2", code: "scaler = StandardScaler()", label: "Create scaler" },
        { id: "b3", code: "scaler.fit(X_train)", label: "Fit on train only" },
        { id: "b4", code: "X_train_scaled = scaler.transform(X_train)", label: "Transform train" },
        { id: "b5", code: "X_test_scaled = scaler.transform(X_test)", label: "Transform test" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Import first, then create the scaler object.",
        "Fit learns parameters - this MUST happen before transform.",
        "Test data uses the SAME scaler fitted on training data.",
      ],
    },
    runnableCode: `# Correct: Fit scaler on training data only
from sklearn.preprocessing import StandardScaler
import numpy as np

# Sample data with different scales
np.random.seed(42)
X_train = np.column_stack([
    np.random.randn(80) * 1000,  # Feature 1: thousands
    np.random.randn(80) * 0.01   # Feature 2: tiny decimals
])
X_test = np.column_stack([
    np.random.randn(20) * 1000,
    np.random.randn(20) * 0.01
])

print("Before scaling:")
print(f"Train feature 1 mean: {X_train[:, 0].mean():.2f}")
print(f"Train feature 2 mean: {X_train[:, 1].mean():.6f}")

# Create and fit scaler on TRAINING data only
scaler = StandardScaler()
scaler.fit(X_train)

# Transform both sets using training parameters
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\\nAfter scaling:")
print(f"Train feature 1 mean: {X_train_scaled[:, 0].mean():.4f}")
print(f"Train feature 2 mean: {X_train_scaled[:, 1].mean():.4f}")
print("\\nBoth features now have similar scale!")`,
    wrongCode: `# WRONG: Fitting scaler on all data (data leakage!)
scaler.fit(X)  # Don't do this!`,
    wrongExplanation: "Fitting on all data leaks test information into your preprocessing.",
    rightExplanation: "Fit only on training data, then transform both train and test.",
  },
];

// Module 3: Model Selection
export const module3Exercises: CodeExercise[] = [
  {
    id: "m3-pipeline",
    title: "Building a Proper Pipeline",
    description: "Learn to combine preprocessing and modeling into a single, reproducible pipeline.",
    steps: [
      {
        id: "step1",
        title: "Import Pipeline and components",
        code: `from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge`,
        explanation: "Pipeline chains multiple steps. Import it along with your preprocessing and model components.",
      },
      {
        id: "step2",
        title: "Create the pipeline",
        code: `pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', Ridge(alpha=1.0))
])`,
        explanation: "Define steps as (name, transformer) tuples. Order matters - data flows through each step in sequence.",
      },
      {
        id: "step3",
        title: "Fit the entire pipeline",
        code: "pipeline.fit(X_train, y_train)",
        explanation: "One fit() call handles everything: fits the scaler on training data, transforms it, then fits the model.",
      },
      {
        id: "step4",
        title: "Predict with the pipeline",
        code: "predictions = pipeline.predict(X_test)",
        explanation: "Predict automatically applies all transformations (using training parameters) then predicts. No manual steps!",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.pipeline import Pipeline", label: "Import Pipeline" },
        { id: "b2", code: "pipeline = Pipeline([('scaler', StandardScaler()), ('model', Ridge())])", label: "Create pipeline" },
        { id: "b3", code: "pipeline.fit(X_train, y_train)", label: "Fit pipeline" },
        { id: "b4", code: "predictions = pipeline.predict(X_test)", label: "Predict" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4"],
      hints: [
        "Import before use.",
        "Create the pipeline before fitting it.",
        "fit() before predict() - same as regular models!",
      ],
    },
    runnableCode: `# Correct: Using Pipeline for clean, reproducible workflow
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import numpy as np

# Sample data
np.random.seed(42)
X = np.random.randn(100, 3) * np.array([100, 1, 0.01])
y = X[:, 0] * 0.5 + X[:, 1] * 2 + X[:, 2] * 100 + np.random.randn(100)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', Ridge(alpha=1.0))
])

# Fit entire pipeline
pipeline.fit(X_train, y_train)

# Predict (automatically scales test data correctly!)
predictions = pipeline.predict(X_test)

# Evaluate
r2 = r2_score(y_test, predictions)
print(f"R² Score: {r2:.4f}")
print("\\nPipeline ensures preprocessing is always applied correctly!")`,
    wrongCode: `# WRONG: Manual steps prone to errors
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
model.fit(X_train_scaled, y_train)
# Forgot to scale X_test!
predictions = model.predict(X_test)`,
    wrongExplanation: "Manual steps are error-prone. Easy to forget scaling or use wrong scaler.",
    rightExplanation: "Pipeline handles everything automatically and consistently.",
  },
  {
    id: "m3-cross-validation",
    title: "K-Fold Cross-Validation",
    description: "Learn to properly evaluate models using cross-validation for robust estimates.",
    steps: [
      {
        id: "step1",
        title: "Import cross_val_score",
        code: "from sklearn.model_selection import cross_val_score",
        explanation: "cross_val_score handles the entire k-fold process automatically, returning scores for each fold.",
      },
      {
        id: "step2",
        title: "Create your model (or pipeline)",
        code: "model = Ridge(alpha=1.0)",
        explanation: "Create the model you want to evaluate. Works with single models or full pipelines.",
      },
      {
        id: "step3",
        title: "Run cross-validation",
        code: "scores = cross_val_score(model, X_train, y_train, cv=5)",
        explanation: "cv=5 means 5 folds. Each fold trains on 4/5 of data, tests on 1/5. Returns 5 scores.",
      },
      {
        id: "step4",
        title: "Analyze results",
        code: `print(f"Mean: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})")`,
        explanation: "Report mean and standard deviation. The spread tells you how stable your model is.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.model_selection import cross_val_score", label: "Import" },
        { id: "b2", code: "model = Ridge(alpha=1.0)", label: "Create model" },
        { id: "b3", code: "scores = cross_val_score(model, X_train, y_train, cv=5)", label: "Cross-validate" },
        { id: "b4", code: "print(f'Mean: {scores.mean():.3f}')", label: "Report results" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4"],
      hints: [
        "Import the function you need first.",
        "You need a model before you can evaluate it.",
        "After getting scores, analyze them to understand performance.",
      ],
    },
    runnableCode: `# K-Fold Cross-Validation for robust evaluation
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import Ridge
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
import numpy as np

# Sample data
np.random.seed(42)
X = np.random.randn(100, 3)
y = X[:, 0] * 2 + X[:, 1] * 0.5 + np.random.randn(100) * 0.5

# Create pipeline (recommended for cross-validation)
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', Ridge(alpha=1.0))
])

# 5-fold cross-validation
scores = cross_val_score(pipeline, X, y, cv=5, scoring='r2')

print("5-Fold Cross-Validation Results:")
print(f"Fold scores: {scores.round(3)}")
print(f"Mean R²: {scores.mean():.3f}")
print(f"Std: {scores.std():.3f}")
print(f"\\n95% CI: {scores.mean():.3f} (+/- {scores.std() * 2:.3f})")`,
  },
];

// Module 4: Regularization
export const module4Exercises: CodeExercise[] = [
  {
    id: "m4-ridge-vs-lasso",
    title: "Ridge vs Lasso Regularization",
    description: "Understand when to use L2 (Ridge) vs L1 (Lasso) regularization.",
    steps: [
      {
        id: "step1",
        title: "Import both models",
        code: `from sklearn.linear_model import Ridge, Lasso`,
        explanation: "Ridge uses L2 penalty (shrinks coefficients), Lasso uses L1 penalty (can zero out coefficients).",
      },
      {
        id: "step2",
        title: "Create Ridge model",
        code: `ridge = Ridge(alpha=1.0)
ridge.fit(X_train, y_train)`,
        explanation: "Ridge keeps all features but shrinks their coefficients. Good when you believe all features matter.",
      },
      {
        id: "step3",
        title: "Create Lasso model",
        code: `lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)`,
        explanation: "Lasso can completely eliminate features (coefficient = 0). Good for feature selection.",
      },
      {
        id: "step4",
        title: "Compare coefficients",
        code: `print(f"Ridge coefs: {ridge.coef_}")
print(f"Lasso coefs: {lasso.coef_}")`,
        explanation: "Notice Lasso may have zeros! This is automatic feature selection.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.linear_model import Ridge, Lasso", label: "Import models" },
        { id: "b2", code: "ridge = Ridge(alpha=1.0)", label: "Create Ridge" },
        { id: "b3", code: "ridge.fit(X_train, y_train)", label: "Fit Ridge" },
        { id: "b4", code: "lasso = Lasso(alpha=0.1)", label: "Create Lasso" },
        { id: "b5", code: "lasso.fit(X_train, y_train)", label: "Fit Lasso" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Always import first.",
        "Create each model, then fit it.",
        "The order of Ridge vs Lasso doesn't matter, but each must be created then fitted.",
      ],
    },
    runnableCode: `# Comparing Ridge and Lasso
from sklearn.linear_model import Ridge, Lasso, LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import numpy as np

# Create data with some irrelevant features
np.random.seed(42)
X = np.random.randn(100, 5)
# Only first 2 features actually matter
y = X[:, 0] * 3 + X[:, 1] * 2 + np.random.randn(100) * 0.5

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Fit all three models
lr = LinearRegression().fit(X_train, y_train)
ridge = Ridge(alpha=1.0).fit(X_train, y_train)
lasso = Lasso(alpha=0.1).fit(X_train, y_train)

print("Coefficients comparison:")
print(f"Linear:  {lr.coef_.round(3)}")
print(f"Ridge:   {ridge.coef_.round(3)}")
print(f"Lasso:   {lasso.coef_.round(3)}")

print("\\nNotice: Lasso zeros out irrelevant features!")
print("Features 3, 4, 5 were noise - Lasso identified this.")

# R² scores
print(f"\\nTest R² - Linear: {r2_score(y_test, lr.predict(X_test)):.3f}")
print(f"Test R² - Ridge: {r2_score(y_test, ridge.predict(X_test)):.3f}")
print(f"Test R² - Lasso: {r2_score(y_test, lasso.predict(X_test)):.3f}")`,
  },
];

// Module 5: Advanced Topics
export const module5Exercises: CodeExercise[] = [
  {
    id: "m5-polynomial",
    title: "Polynomial Features for Non-Linear Relationships",
    description: "Learn to capture non-linear relationships using polynomial features.",
    steps: [
      {
        id: "step1",
        title: "Import PolynomialFeatures",
        code: "from sklearn.preprocessing import PolynomialFeatures",
        explanation: "PolynomialFeatures creates new features by raising existing ones to powers and creating interactions.",
      },
      {
        id: "step2",
        title: "Create polynomial transformer",
        code: "poly = PolynomialFeatures(degree=2, include_bias=False)",
        explanation: "degree=2 creates x, x², and x₁x₂ terms. include_bias=False avoids duplicate intercept.",
      },
      {
        id: "step3",
        title: "Transform features",
        code: "X_poly = poly.fit_transform(X_train)",
        explanation: "Creates polynomial combinations of all features. For 2 features with degree 2: x₁, x₂, x₁², x₁x₂, x₂².",
      },
      {
        id: "step4",
        title: "Fit linear model on polynomial features",
        code: `model = LinearRegression()
model.fit(X_poly, y_train)`,
        explanation: "A linear model on polynomial features can capture non-linear patterns!",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.preprocessing import PolynomialFeatures", label: "Import" },
        { id: "b2", code: "poly = PolynomialFeatures(degree=2)", label: "Create transformer" },
        { id: "b3", code: "X_poly = poly.fit_transform(X_train)", label: "Transform features" },
        { id: "b4", code: "model = LinearRegression()", label: "Create model" },
        { id: "b5", code: "model.fit(X_poly, y_train)", label: "Fit on poly features" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Import first, create objects second.",
        "Transform features before fitting the model.",
        "The model is fitted on the transformed (polynomial) features.",
      ],
    },
    runnableCode: `# Polynomial Features for non-linear relationships
from sklearn.preprocessing import PolynomialFeatures
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import numpy as np

# Create non-linear data (quadratic relationship)
np.random.seed(42)
X = np.linspace(-3, 3, 100).reshape(-1, 1)
y = 2 * X.flatten()**2 - 3 * X.flatten() + 1 + np.random.randn(100) * 2

# Split
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Try linear regression first
lr = LinearRegression()
lr.fit(X_train, y_train)
r2_linear = r2_score(y_test, lr.predict(X_test))

# Now with polynomial features
poly = PolynomialFeatures(degree=2, include_bias=False)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)

lr_poly = LinearRegression()
lr_poly.fit(X_train_poly, y_train)
r2_poly = r2_score(y_test, lr_poly.predict(X_test_poly))

print("Feature names:", poly.get_feature_names_out())
print(f"\\nLinear R²: {r2_linear:.3f}")
print(f"Polynomial R²: {r2_poly:.3f}")
print("\\nPolynomial features capture the curve!")`,
  },
];

// Export all exercises by module
export const allExercises: ModuleExercises[] = [
  { moduleId: "module-1", exercises: module1Exercises },
  { moduleId: "module-2", exercises: module2Exercises },
  { moduleId: "module-3", exercises: module3Exercises },
  { moduleId: "module-4", exercises: module4Exercises },
  { moduleId: "module-5", exercises: module5Exercises },
];

// Helper function to get exercise by ID
export function getExerciseById(exerciseId: string): CodeExercise | undefined {
  for (const moduleData of allExercises) {
    const exercise = moduleData.exercises.find((e) => e.id === exerciseId);
    if (exercise) return exercise;
  }
  return undefined;
}

// Helper function to get exercises for a module
export function getExercisesForModule(moduleId: string): CodeExercise[] {
  const moduleData = allExercises.find((m) => m.moduleId === moduleId);
  return moduleData?.exercises || [];
}
