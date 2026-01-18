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

// Module 2: Data Preparation & Leakage Prevention
export const module2Exercises: CodeExercise[] = [
  // Exercise 1: fit_transform vs transform (The #1 Data Leakage Mistake)
  {
    id: "m2-fit-transform-leakage",
    title: "fit_transform() vs transform() - The Critical Difference",
    description: "Master the most important rule in ML preprocessing: fit on train, transform on both. This prevents data leakage!",
    steps: [
      {
        id: "step1",
        title: "What is fit_transform()?",
        code: `# fit_transform() does TWO things:
# 1. LEARNS parameters (mean, std) from data
# 2. APPLIES the transformation
X_train_scaled = scaler.fit_transform(X_train)`,
        explanation: "fit_transform() is a shortcut that combines fit() and transform(). It LEARNS the parameters (like mean and standard deviation) from the data AND applies the transformation. Use this ONLY on training data!",
      },
      {
        id: "step2",
        title: "What is transform()?",
        code: `# transform() does ONE thing:
# APPLIES already-learned parameters
X_test_scaled = scaler.transform(X_test)`,
        explanation: "transform() ONLY applies a transformation using parameters that were already learned. It doesn't learn anything new. Use this on test data to apply the training parameters.",
      },
      {
        id: "step3",
        title: "Why does this matter?",
        code: `# WRONG: Learning from test data
X_test_scaled = scaler.fit_transform(X_test)  # LEAKAGE!
# This learns NEW mean/std from test data
# Your model now has "seen" test data statistics`,
        explanation: "If you fit_transform() on test data, you're learning from data your model shouldn't see! In production, you won't have test data to 'fit' on. The model's performance will be artificially inflated.",
      },
      {
        id: "step4",
        title: "The correct pattern",
        code: `# Step 1: Create scaler
scaler = StandardScaler()

# Step 2: fit_transform on TRAINING data
X_train_scaled = scaler.fit_transform(X_train)

# Step 3: transform (NOT fit_transform!) on TEST data
X_test_scaled = scaler.transform(X_test)`,
        explanation: "This is the golden rule: fit_transform() on training data, transform() on test data. The scaler learns from training and applies that knowledge to test data.",
      },
      {
        id: "step5",
        title: "Real-world analogy",
        code: `# Think of it like a school:
# - fit_transform = Learn the grading rubric AND grade papers
# - transform = Just grade papers using existing rubric

# Training: Teacher creates rubric while grading first batch
# Testing: Teacher uses SAME rubric for final exam`,
        explanation: "Imagine a teacher creating a grading rubric. They create it (fit) using practice essays, then apply (transform) that same rubric to the final exam. They don't create a new rubric for each exam!",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "scaler = StandardScaler()", label: "Create scaler" },
        { id: "b2", code: "X_train_scaled = scaler.fit_transform(X_train)", label: "fit_transform on train" },
        { id: "b3", code: "X_test_scaled = scaler.transform(X_test)", label: "transform on test" },
        { id: "b4", code: "model.fit(X_train_scaled, y_train)", label: "Train model" },
        { id: "b5", code: "predictions = model.predict(X_test_scaled)", label: "Predict" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Create the scaler first before you can use it.",
        "fit_transform() goes on training data - it LEARNS the parameters.",
        "transform() goes on test data - it APPLIES the learned parameters.",
        "Model training comes after preprocessing!",
      ],
    },
    runnableCode: `# Demonstrating fit_transform vs transform
from sklearn.preprocessing import StandardScaler
import numpy as np

np.random.seed(42)

# Create data with DIFFERENT distributions
# Training: mean=100, Test: mean=200 (intentionally different!)
X_train = np.random.randn(100, 1) * 10 + 100  # Mean ~100
X_test = np.random.randn(30, 1) * 10 + 200    # Mean ~200

print("=== Original Data ===")
print(f"Train mean: {X_train.mean():.1f}")
print(f"Test mean:  {X_test.mean():.1f}")

# CORRECT WAY: fit on train, transform on both
scaler = StandardScaler()
X_train_correct = scaler.fit_transform(X_train)  # Learns mean=100
X_test_correct = scaler.transform(X_test)         # Uses mean=100

print("\\n=== CORRECT: transform() on test ===")
print(f"Train mean after scaling: {X_train_correct.mean():.2f}")
print(f"Test mean after scaling:  {X_test_correct.mean():.2f}")
print("Test mean is ~10 because test was 100 units higher!")

# WRONG WAY: fit_transform on test (LEAKAGE!)
scaler_wrong = StandardScaler()
X_train_wrong = scaler_wrong.fit_transform(X_train)
X_test_wrong = scaler_wrong.fit_transform(X_test)  # WRONG!

print("\\n=== WRONG: fit_transform() on test ===")
print(f"Train mean after scaling: {X_train_wrong.mean():.2f}")
print(f"Test mean after scaling:  {X_test_wrong.mean():.2f}")
print("Test mean is 0 because we learned its own parameters!")
print("\\nThis hides the distribution difference - DATA LEAKAGE!")`,
    wrongCode: `# WRONG: fit_transform on test data = LEAKAGE!
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.fit_transform(X_test)  # BUG!`,
    wrongExplanation: "fit_transform() learns new parameters from test data. In production, you won't have test data to 'fit' on!",
    rightExplanation: "transform() applies parameters learned from training. This simulates real production conditions.",
  },

  // Exercise 2: Split Before Processing
  {
    id: "m2-split-first",
    title: "Always Split Before Processing",
    description: "Learn why you must split your data BEFORE any preprocessing. Order matters!",
    steps: [
      {
        id: "step1",
        title: "The tempting (but wrong) approach",
        code: `# DON'T DO THIS!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Scale ALL data first
X_train, X_test = train_test_split(X_scaled)  # Then split`,
        explanation: "It seems simpler to process all data at once, then split. But this is WRONG! When you fit the scaler on ALL data, you're using test data statistics to transform training data.",
      },
      {
        id: "step2",
        title: "Why is this data leakage?",
        code: `# When you scale BEFORE splitting:
# - Scaler learns mean/std from ENTIRE dataset
# - This includes test data!
# - Training data is now "contaminated" with test info
# - Your model indirectly "sees" the test set`,
        explanation: "The scaler calculates mean and std from ALL data, including test. Your training data is then scaled using information from test data. This is indirect data leakage!",
      },
      {
        id: "step3",
        title: "The correct order",
        code: `# CORRECT: Split FIRST, then process
# Step 1: Split raw data
X_train, X_test, y_train, y_test = train_test_split(X, y)

# Step 2: Fit preprocessor on training ONLY
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)`,
        explanation: "Split your raw data first. Then fit any preprocessing (scaling, encoding, etc.) ONLY on training data. Finally, transform both train and test using the fitted preprocessor.",
      },
      {
        id: "step4",
        title: "This applies to ALL preprocessing",
        code: `# Same rule for EVERY preprocessing step:
# - StandardScaler
# - MinMaxScaler
# - OneHotEncoder
# - PolynomialFeatures
# - Imputers (for missing values)
# - Feature selectors

# ALWAYS: split → fit on train → transform both`,
        explanation: "This isn't just for scaling! ANY preprocessing that learns from data must follow this pattern. Imputers learn the mean/median, encoders learn categories, feature selectors learn which features to keep.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "X_train, X_test, y_train, y_test = train_test_split(X, y)", label: "Split data FIRST" },
        { id: "b2", code: "scaler = StandardScaler()", label: "Create scaler" },
        { id: "b3", code: "X_train_scaled = scaler.fit_transform(X_train)", label: "fit_transform train" },
        { id: "b4", code: "X_test_scaled = scaler.transform(X_test)", label: "transform test" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4"],
      hints: [
        "The FIRST step must be splitting the data. Everything else comes after.",
        "Create the scaler after splitting but before using it.",
        "fit_transform on training, transform on test - always!",
      ],
    },
    runnableCode: `# Demonstrating why split must come FIRST
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import numpy as np

np.random.seed(42)

# Create data where test set has slightly different distribution
X = np.vstack([
    np.random.randn(80, 2) * 10 + 50,   # Training-like samples
    np.random.randn(20, 2) * 10 + 60    # Test-like samples (shifted)
])
y = X[:, 0] * 2 + X[:, 1] * 0.5 + np.random.randn(100) * 5

print("=== WRONG WAY: Scale before split ===")
scaler_wrong = StandardScaler()
X_scaled_wrong = scaler_wrong.fit_transform(X)  # Leakage here!
X_train_w, X_test_w, y_train_w, y_test_w = train_test_split(
    X_scaled_wrong, y, test_size=0.2, random_state=42
)
model_wrong = LinearRegression().fit(X_train_w, y_train_w)
r2_wrong = r2_score(y_test_w, model_wrong.predict(X_test_w))
print(f"R² score: {r2_wrong:.4f}")

print("\\n=== CORRECT WAY: Split before scale ===")
X_train_c, X_test_c, y_train_c, y_test_c = train_test_split(
    X, y, test_size=0.2, random_state=42
)
scaler_correct = StandardScaler()
X_train_scaled = scaler_correct.fit_transform(X_train_c)
X_test_scaled = scaler_correct.transform(X_test_c)
model_correct = LinearRegression().fit(X_train_scaled, y_train_c)
r2_correct = r2_score(y_test_c, model_correct.predict(X_test_scaled))
print(f"R² score: {r2_correct:.4f}")

print("\\nThe correct way gives honest performance estimates!")`,
    wrongCode: `# WRONG: Scaling before splitting = LEAKAGE!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # Uses ALL data
X_train, X_test = train_test_split(X_scaled)`,
    wrongExplanation: "The scaler learns statistics from ALL data including test. Your training data now contains test information.",
    rightExplanation: "Split first, then fit transformers only on training data. This maintains true separation.",
  },

  // Exercise 3: Polynomial Features Pipeline
  {
    id: "m2-poly-features",
    title: "Polynomial Features: Correct Order of Operations",
    description: "Learn the proper order for polynomial features and scaling to avoid subtle bugs.",
    steps: [
      {
        id: "step1",
        title: "What are polynomial features?",
        code: `# Polynomial features create new columns
# Original: [x1, x2]
# Degree 2: [x1, x2, x1², x1*x2, x2²]

from sklearn.preprocessing import PolynomialFeatures
poly = PolynomialFeatures(degree=2, include_bias=False)`,
        explanation: "Polynomial features let you model curves (non-linear relationships) while still using linear models. They create new features by raising existing ones to powers and creating interactions.",
      },
      {
        id: "step2",
        title: "The correct order: Poly THEN Scale",
        code: `# Step 1: Create polynomial features FIRST
poly = PolynomialFeatures(degree=2, include_bias=False)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)

# Step 2: THEN scale the polynomial features
scaler = StandardScaler()
X_train_final = scaler.fit_transform(X_train_poly)
X_test_final = scaler.transform(X_test_poly)`,
        explanation: "Create polynomial features FIRST, then scale. Why? Because x² creates large values that need scaling. If you scale first, the polynomial of scaled values is different from scaling polynomials.",
      },
      {
        id: "step3",
        title: "Why order matters",
        code: `# scale(x)² ≠ scale(x²)
#
# If x = 100:
# - Scale first: scaled_x ≈ 0, then 0² = 0
# - Poly first: x² = 10000, then scale that
#
# The second way preserves the quadratic relationship!`,
        explanation: "Mathematical operations aren't always interchangeable. Scaling first can destroy the quadratic relationship you're trying to capture. Polynomial features first preserves the true relationship.",
      },
      {
        id: "step4",
        title: "Remember: fit_transform rules still apply!",
        code: `# WRONG: fit_transform on test for BOTH steps!
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.fit_transform(X_test)  # BUG #1!

X_train_scaled = scaler.fit_transform(X_train_poly)
X_test_scaled = scaler.fit_transform(X_test_poly)  # BUG #2!

# RIGHT: fit on train, transform on test - EVERY step`,
        explanation: "The fit_transform vs transform rule applies to EVERY preprocessing step, including PolynomialFeatures. Each transformer must be fitted only on training data.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "poly = PolynomialFeatures(degree=2)", label: "Create poly transformer" },
        { id: "b2", code: "X_train_poly = poly.fit_transform(X_train)", label: "Poly on train" },
        { id: "b3", code: "X_test_poly = poly.transform(X_test)", label: "Poly on test" },
        { id: "b4", code: "scaler = StandardScaler()", label: "Create scaler" },
        { id: "b5", code: "X_train_scaled = scaler.fit_transform(X_train_poly)", label: "Scale train" },
        { id: "b6", code: "X_test_scaled = scaler.transform(X_test_poly)", label: "Scale test" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5", "b6"],
      hints: [
        "Polynomial features come BEFORE scaling.",
        "Create each transformer, then use it on train, then on test.",
        "fit_transform on train, transform on test - for BOTH steps!",
      ],
    },
    runnableCode: `# Polynomial Features: Correct order of operations
from sklearn.preprocessing import PolynomialFeatures, StandardScaler
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
import numpy as np

np.random.seed(42)

# Create non-linear data (quadratic relationship)
X_train = np.random.randn(80, 1) * 3
y_train = 2 * X_train.flatten()**2 - 3 * X_train.flatten() + 5 + np.random.randn(80)
X_test = np.random.randn(20, 1) * 3
y_test = 2 * X_test.flatten()**2 - 3 * X_test.flatten() + 5 + np.random.randn(20)

# CORRECT ORDER: Polynomial features THEN scaling
print("=== Correct Order: Poly → Scale ===")

# Step 1: Polynomial features
poly = PolynomialFeatures(degree=2, include_bias=False)
X_train_poly = poly.fit_transform(X_train)
X_test_poly = poly.transform(X_test)
print(f"Features after poly: {poly.get_feature_names_out()}")

# Step 2: Scale
scaler = StandardScaler()
X_train_final = scaler.fit_transform(X_train_poly)
X_test_final = scaler.transform(X_test_poly)

# Train and evaluate
model = LinearRegression()
model.fit(X_train_final, y_train)
r2 = r2_score(y_test, model.predict(X_test_final))
print(f"R² score: {r2:.4f}")

print("\\nThe quadratic relationship is captured correctly!")`,
    wrongCode: `# WRONG: Wrong order + fit_transform on test
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
poly = PolynomialFeatures(degree=2)
X_train_poly = poly.fit_transform(X_train_scaled)
X_test_poly = poly.fit_transform(X_test)  # Double bug!`,
    wrongExplanation: "Wrong order and fit_transform on test data. This creates features differently for train vs test.",
    rightExplanation: "Polynomial features first, then scaling. Each step uses fit on train, transform on test.",
  },

  // Exercise 4: One-Hot Encoding
  {
    id: "m2-one-hot-encoding",
    title: "One-Hot Encoding for Categorical Variables",
    description: "Learn how to properly convert categorical (text) data into numbers that ML models can use.",
    steps: [
      {
        id: "step1",
        title: "Why can't we use strings directly?",
        code: `# ML models need NUMBERS, not strings!
categories = ['Red', 'Blue', 'Green']

# This FAILS:
model.fit(categories, y)
# ValueError: could not convert string to float`,
        explanation: "Machine learning algorithms do math - they multiply, add, and compare numbers. They can't do math with text like 'Red' or 'Blue'. We need to convert categories to numbers.",
      },
      {
        id: "step2",
        title: "Why not just number them 1, 2, 3?",
        code: `# Tempting but WRONG:
# Red=1, Blue=2, Green=3

# Problem: This implies Green > Blue > Red
# The model thinks: Green(3) - Red(1) = Blue(2)
# But colors have no order!`,
        explanation: "Assigning numbers like 1, 2, 3 creates a false ordering. The model thinks 3 > 2 > 1, which implies Green > Blue > Red. But colors aren't ordered! This confuses the model.",
      },
      {
        id: "step3",
        title: "One-Hot Encoding: The solution",
        code: `# One-Hot creates binary columns:
# Color    → Red  Blue  Green
# 'Red'    →  1    0     0
# 'Blue'   →  0    1     0
# 'Green'  →  0    0     1

from sklearn.preprocessing import OneHotEncoder
encoder = OneHotEncoder(sparse_output=False)`,
        explanation: "One-hot encoding creates a separate column for each category, filled with 0s and 1s. Each row has exactly one 1 (hence 'one-hot'). No false ordering is created!",
      },
      {
        id: "step4",
        title: "The drop='first' trick",
        code: `# With 3 colors, we only need 2 columns!
# If Red=0 and Blue=0, it MUST be Green

encoder = OneHotEncoder(drop='first', sparse_output=False)
# Now: Blue column, Green column
# Red is implied when both are 0`,
        explanation: "If you have N categories, you only need N-1 columns. The 'missing' category is implied when all others are 0. This avoids redundancy and multicollinearity.",
      },
      {
        id: "step5",
        title: "Remember the fit_transform rule!",
        code: `# Same rule applies to encoding:
encoder = OneHotEncoder(drop='first', sparse_output=False)

# fit_transform on TRAINING data
X_train_encoded = encoder.fit_transform(X_train_categories)

# transform on TEST data (learns nothing new!)
X_test_encoded = encoder.transform(X_test_categories)`,
        explanation: "OneHotEncoder learns which categories exist from training data. Test data uses the same encoding. If test has a new category, it gets encoded as all zeros (unknown).",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.preprocessing import OneHotEncoder", label: "Import encoder" },
        { id: "b2", code: "encoder = OneHotEncoder(drop='first', sparse_output=False)", label: "Create encoder" },
        { id: "b3", code: "X_train_encoded = encoder.fit_transform(X_train[['category']])", label: "Encode train" },
        { id: "b4", code: "X_test_encoded = encoder.transform(X_test[['category']])", label: "Encode test" },
        { id: "b5", code: "model.fit(X_train_encoded, y_train)", label: "Train model" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Import before you use.",
        "Create the encoder with drop='first' to avoid multicollinearity.",
        "fit_transform on train, transform on test - categories learned from training only!",
      ],
    },
    runnableCode: `# One-Hot Encoding: Converting categories to numbers
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
import numpy as np
import pandas as pd

np.random.seed(42)

# Create sample data with a categorical feature
train_data = pd.DataFrame({
    'color': np.random.choice(['Red', 'Blue', 'Green'], 80),
    'size': np.random.randn(80) * 10 + 50
})
test_data = pd.DataFrame({
    'color': np.random.choice(['Red', 'Blue', 'Green'], 20),
    'size': np.random.randn(20) * 10 + 50
})

# Target: Blue adds 10, Green adds 20, Red is baseline
color_effect = {'Red': 0, 'Blue': 10, 'Green': 20}
y_train = train_data['size'] + train_data['color'].map(color_effect) + np.random.randn(80) * 2
y_test = test_data['size'] + test_data['color'].map(color_effect) + np.random.randn(20) * 2

print("=== Original categorical data ===")
print(train_data[['color']].head(10).T)

# One-Hot Encode
encoder = OneHotEncoder(drop='first', sparse_output=False)
train_colors_encoded = encoder.fit_transform(train_data[['color']])
test_colors_encoded = encoder.transform(test_data[['color']])

print("\\n=== After One-Hot Encoding ===")
print(f"Categories found: {encoder.categories_[0]}")
print(f"Columns created: {encoder.get_feature_names_out()}")
print(f"Shape: {train_colors_encoded.shape}")
print("\\nFirst 5 rows encoded:")
print(train_colors_encoded[:5])

# Combine with numerical features
X_train_final = np.hstack([train_colors_encoded, train_data[['size']].values])
X_test_final = np.hstack([test_colors_encoded, test_data[['size']].values])

# Train and interpret
model = LinearRegression()
model.fit(X_train_final, y_train)

print("\\n=== Model learned the color effects! ===")
print(f"Blue effect: {model.coef_[0]:.1f} (true: 10)")
print(f"Green effect: {model.coef_[1]:.1f} (true: 20)")
print("Red is the baseline (coefficient = 0, captured in intercept)")`,
    wrongCode: `# WRONG: Passing strings to model
data = pd.DataFrame({'category': ['A', 'B', 'A', 'C']})
model.fit(data, y)  # Error or nonsense!`,
    wrongExplanation: "Machine learning models need numbers. Strings like 'A', 'B', 'C' are meaningless to them.",
    rightExplanation: "One-hot encoding converts categories to binary columns (0s and 1s) that models can understand.",
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

  // Exercise 3: GridSearchCV Parameter Syntax
  {
    id: "m3-gridsearch-syntax",
    title: "GridSearchCV with Pipelines: Parameter Naming",
    description: "Master the stepname__parameter syntax for tuning pipeline hyperparameters.",
    steps: [
      {
        id: "step1",
        title: "The problem: ambiguous parameter names",
        code: `# Pipeline has multiple steps:
pipeline = Pipeline([
    ('poly', PolynomialFeatures()),
    ('scaler', StandardScaler()),
    ('model', Ridge())
])

# Which step owns 'degree'? Which owns 'alpha'?
# GridSearchCV can't guess!`,
        explanation: "A pipeline can have many steps, each with their own parameters. When you say 'degree', GridSearchCV doesn't know if you mean PolynomialFeatures degree or something else.",
      },
      {
        id: "step2",
        title: "The solution: double underscore notation",
        code: `# Use: stepname__parametername
param_grid = {
    'poly__degree': [1, 2, 3],      # poly step's degree
    'model__alpha': [0.01, 0.1, 1.0] # model step's alpha
}`,
        explanation: "The double underscore (__) connects the step name to its parameter. 'poly__degree' means 'the degree parameter of the step named poly'.",
      },
      {
        id: "step3",
        title: "Create and run GridSearchCV",
        code: `grid = GridSearchCV(
    pipeline,
    param_grid,
    cv=5,
    scoring='r2'
)
grid.fit(X_train, y_train)`,
        explanation: "GridSearchCV tests all combinations of parameters using cross-validation. With 3 degrees × 3 alphas × 5 folds = 45 model fits!",
      },
      {
        id: "step4",
        title: "Access the results",
        code: `print(f"Best params: {grid.best_params_}")
print(f"Best CV score: {grid.best_score_:.4f}")

# Use the best model directly
predictions = grid.predict(X_test)`,
        explanation: "best_params_ shows the winning combination. best_score_ is the CV score. The grid object itself acts as the best model!",
      },
      {
        id: "step5",
        title: "Access nested attributes",
        code: `# Get the best model's coefficients:
best_model = grid.best_estimator_
# Access the 'model' step inside the pipeline:
ridge_coefs = best_model.named_steps['model'].coef_
print(f"Coefficients: {ridge_coefs}")`,
        explanation: "best_estimator_ is the actual fitted pipeline. Use named_steps['stepname'] to access individual components and their attributes like coefficients.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.model_selection import GridSearchCV", label: "Import GridSearchCV" },
        { id: "b2", code: "pipeline = Pipeline([('scaler', StandardScaler()), ('model', Ridge())])", label: "Create pipeline" },
        { id: "b3", code: "param_grid = {'model__alpha': [0.01, 0.1, 1.0, 10.0]}", label: "Define param_grid" },
        { id: "b4", code: "grid = GridSearchCV(pipeline, param_grid, cv=5)", label: "Create GridSearchCV" },
        { id: "b5", code: "grid.fit(X_train, y_train)", label: "Fit grid search" },
        { id: "b6", code: "print(f'Best alpha: {grid.best_params_}')", label: "Show best params" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5", "b6"],
      hints: [
        "Import first, as always.",
        "You need a pipeline before you can search its parameters.",
        "param_grid uses stepname__param format - notice the double underscore!",
        "Create GridSearchCV, then fit it, then inspect results.",
      ],
    },
    runnableCode: `# GridSearchCV with Pipeline: Correct Parameter Syntax
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, PolynomialFeatures
from sklearn.linear_model import Ridge
from sklearn.model_selection import GridSearchCV, train_test_split
import numpy as np

np.random.seed(42)

# Create non-linear data
X = np.random.randn(100, 2)
y = X[:, 0]**2 + 0.5 * X[:, 1] + np.random.randn(100) * 0.5

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Create pipeline with named steps
pipeline = Pipeline([
    ('poly', PolynomialFeatures(include_bias=False)),
    ('scaler', StandardScaler()),
    ('model', Ridge())
])

# Parameter grid using stepname__parameter syntax
param_grid = {
    'poly__degree': [1, 2, 3],           # PolynomialFeatures parameter
    'model__alpha': [0.01, 0.1, 1.0]     # Ridge parameter
}

print("Testing", 3 * 3, "parameter combinations with 5-fold CV...")
print("Total model fits:", 3 * 3 * 5)

# Run grid search
grid = GridSearchCV(pipeline, param_grid, cv=5, scoring='r2')
grid.fit(X_train, y_train)

print(f"\\nBest parameters: {grid.best_params_}")
print(f"Best CV R² score: {grid.best_score_:.4f}")

# Test set performance
test_score = grid.score(X_test, y_test)
print(f"Test R² score: {test_score:.4f}")

# Access the best model's details
best_pipeline = grid.best_estimator_
print(f"\\nBest model coefficients: {best_pipeline.named_steps['model'].coef_.round(3)}")`,
    wrongCode: `# WRONG: Missing step name prefix
param_grid = {
    'degree': [1, 2, 3],  # Error! Which step?
    'alpha': [0.01, 0.1, 1.0]  # Error! Which model?
}`,
    wrongExplanation: "GridSearchCV doesn't know which step owns 'degree' or 'alpha'. Parameters are ambiguous.",
    rightExplanation: "Double underscore (stepname__param) tells GridSearchCV exactly which step to configure.",
  },

  // Exercise 4: GridSearchCV vs Single Split
  {
    id: "m3-gridsearch-vs-single",
    title: "Why GridSearchCV Beats Manual Tuning",
    description: "Learn why cross-validation is essential for reliable hyperparameter tuning.",
    steps: [
      {
        id: "step1",
        title: "The tempting (but wrong) approach",
        code: `# Manual tuning on a single test set
X_train, X_test, y_train, y_test = train_test_split(X, y)

best_alpha = None
best_score = 0
for alpha in [0.01, 0.1, 1.0, 10.0]:
    model = Ridge(alpha=alpha)
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)
    if score > best_score:
        best_score, best_alpha = score, alpha`,
        explanation: "This seems reasonable - try different alphas, pick the best. But there's a hidden problem: you're repeatedly peeking at the same test set!",
      },
      {
        id: "step2",
        title: "Why single-split tuning fails",
        code: `# Problem: You're overfitting to ONE specific test set
#
# Imagine the test set happens to have:
# - Mostly easy-to-predict samples
# - A lucky random split
# - Unusual distribution
#
# The "best" alpha might only work for THIS split!`,
        explanation: "By testing many alphas on the same test set, you're essentially 'fitting' to that test set. The winning alpha might be lucky for this particular split but fail on new data.",
      },
      {
        id: "step3",
        title: "The solution: cross-validation",
        code: `from sklearn.model_selection import GridSearchCV

param_grid = {'alpha': [0.01, 0.1, 1.0, 10.0]}
grid = GridSearchCV(Ridge(), param_grid, cv=5)
grid.fit(X_train, y_train)`,
        explanation: "GridSearchCV tests each alpha on 5 DIFFERENT validation sets. The winning alpha must perform well across all of them - not just one lucky split.",
      },
      {
        id: "step4",
        title: "Interpreting CV results",
        code: `print(f"Best alpha: {grid.best_params_['alpha']}")
print(f"Mean CV score: {grid.best_score_:.4f}")

# This is more reliable because:
# - Tested on 5 different validation folds
# - Not overfit to any single split
# - Generalizes better to truly unseen data`,
        explanation: "The CV score is an average across 5 folds. This gives you confidence that the parameter choice is robust, not lucky.",
      },
      {
        id: "step5",
        title: "The complete workflow",
        code: `# 1. Split off a TRUE test set (never touched during tuning)
X_train, X_test, y_train, y_test = train_test_split(X, y)

# 2. Use CV to tune on training data only
grid = GridSearchCV(Ridge(), param_grid, cv=5)
grid.fit(X_train, y_train)  # CV happens inside X_train

# 3. Final evaluation on untouched test set
final_score = grid.score(X_test, y_test)
print(f"True test score: {final_score:.4f}")`,
        explanation: "Best practice: hold out a test set that's NEVER used during tuning. Use CV only on training data. Final evaluation on the held-out test set gives an honest estimate.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "X_train, X_test, y_train, y_test = train_test_split(X, y)", label: "Hold out test set" },
        { id: "b2", code: "param_grid = {'alpha': [0.01, 0.1, 1.0, 10.0]}", label: "Define search space" },
        { id: "b3", code: "grid = GridSearchCV(Ridge(), param_grid, cv=5)", label: "Create GridSearchCV" },
        { id: "b4", code: "grid.fit(X_train, y_train)", label: "Fit (CV on train only)" },
        { id: "b5", code: "final_score = grid.score(X_test, y_test)", label: "Evaluate on test" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "First, split off a test set that will NEVER be used during tuning.",
        "Define what parameters to search before creating GridSearchCV.",
        "GridSearchCV does cross-validation internally on the training data.",
        "Final evaluation uses the held-out test set for an honest score.",
      ],
    },
    runnableCode: `# GridSearchCV vs Manual Tuning: Why CV Wins
from sklearn.linear_model import Ridge
from sklearn.model_selection import GridSearchCV, train_test_split, cross_val_score
import numpy as np

np.random.seed(42)

# Create data
X = np.random.randn(200, 5)
y = X[:, 0] * 2 + X[:, 1] * 0.5 - X[:, 2] * 1.5 + np.random.randn(200) * 0.5

# Hold out a TRUE test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

alphas = [0.001, 0.01, 0.1, 1.0, 10.0]

print("=== WRONG: Manual tuning on single split ===")
# Simulate what happens with manual single-split tuning
X_tr, X_val, y_tr, y_val = train_test_split(X_train, y_train, test_size=0.3, random_state=99)
manual_results = {}
for alpha in alphas:
    model = Ridge(alpha=alpha)
    model.fit(X_tr, y_tr)
    manual_results[alpha] = model.score(X_val, y_val)

best_manual = max(manual_results, key=manual_results.get)
print(f"Best alpha (single split): {best_manual}")
print(f"Validation score: {manual_results[best_manual]:.4f}")

print("\\n=== RIGHT: GridSearchCV with cross-validation ===")
param_grid = {'alpha': alphas}
grid = GridSearchCV(Ridge(), param_grid, cv=5, scoring='r2')
grid.fit(X_train, y_train)

print(f"Best alpha (5-fold CV): {grid.best_params_['alpha']}")
print(f"Mean CV score: {grid.best_score_:.4f}")

print("\\n=== Final Test Set Evaluation ===")
# Evaluate both approaches on the held-out test set
manual_model = Ridge(alpha=best_manual).fit(X_train, y_train)
manual_test = manual_model.score(X_test, y_test)
cv_test = grid.score(X_test, y_test)

print(f"Manual tuning test score: {manual_test:.4f}")
print(f"GridSearchCV test score:  {cv_test:.4f}")
print("\\nCV-tuned model is more reliable on new data!")`,
    wrongCode: `# WRONG: Tuning on single split
for alpha in [0.01, 0.1, 1.0]:
    model.fit(X_train, y_train)
    score = model.score(X_test, y_test)  # Same test set every time!`,
    wrongExplanation: "Tuning on a single test set can find parameters that work well on that specific split but not generally.",
    rightExplanation: "Cross-validation tests each parameter setting on multiple folds, giving reliable performance estimates.",
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

  // Exercise 2: LassoCV for automatic alpha selection
  {
    id: "m4-lassocv",
    title: "LassoCV: Finding Optimal Regularization Strength",
    description: "Learn to use cross-validation to automatically find the best alpha value.",
    steps: [
      {
        id: "step1",
        title: "The problem: guessing alpha is unreliable",
        code: `# Bad approach - guessing
model = Lasso(alpha=1.0)  # Why 1.0?
# Maybe too strong (underfits)
# Maybe too weak (overfits)
# We're just guessing!`,
        explanation: "Manually choosing alpha is like shooting in the dark. The optimal value depends on your specific data, features, and noise level.",
      },
      {
        id: "step2",
        title: "The solution: LassoCV tests multiple alphas",
        code: `from sklearn.linear_model import LassoCV

# Let CV find the best alpha
model = LassoCV(
    alphas=[0.001, 0.01, 0.1, 1.0, 10.0],
    cv=5
)`,
        explanation: "LassoCV takes a list of candidate alphas and uses k-fold cross-validation to evaluate each one. It automatically selects the best.",
      },
      {
        id: "step3",
        title: "Fit and get the optimal alpha",
        code: `model.fit(X_train_scaled, y_train)
print(f"Best alpha: {model.alpha_}")`,
        explanation: "After fitting, model.alpha_ contains the optimal value found by cross-validation. This alpha gave the best average score across all folds.",
      },
      {
        id: "step4",
        title: "Use the auto-tuned model",
        code: `# Model is already fitted with best alpha!
predictions = model.predict(X_test_scaled)
print(f"R²: {r2_score(y_test, predictions):.3f}")`,
        explanation: "LassoCV automatically refits on all training data using the best alpha. You can use it directly for predictions.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "from sklearn.linear_model import LassoCV", label: "Import LassoCV" },
        { id: "b2", code: "alphas = [0.001, 0.01, 0.1, 1.0, 10.0]", label: "Define alpha candidates" },
        { id: "b3", code: "model = LassoCV(alphas=alphas, cv=5)", label: "Create LassoCV" },
        { id: "b4", code: "model.fit(X_train_scaled, y_train)", label: "Fit (finds best alpha)" },
        { id: "b5", code: "print(f'Best alpha: {model.alpha_}')", label: "Check best alpha" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Import before using.",
        "Define your candidate alphas before creating the model.",
        "Create the model with alphas and cv, then fit it.",
        "After fitting, you can access the optimal alpha via .alpha_",
      ],
    },
    runnableCode: `# LassoCV: Automatic alpha tuning
from sklearn.linear_model import Lasso, LassoCV
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
import numpy as np

# Generate data
np.random.seed(42)
X = np.random.randn(150, 8)
y = X[:, 0] * 3 + X[:, 1] * 2 - X[:, 2] * 1.5 + np.random.randn(150) * 0.5

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scale features (important for regularization!)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Compare guessed alpha vs LassoCV
print("=== Guessing Alpha (Bad) ===")
guessed = Lasso(alpha=1.0)
guessed.fit(X_train_scaled, y_train)
print(f"Guessed alpha: 1.0")
print(f"Test R²: {r2_score(y_test, guessed.predict(X_test_scaled)):.4f}")

print("\\n=== LassoCV (Good) ===")
alphas = [0.001, 0.01, 0.1, 1.0, 10.0]
lasso_cv = LassoCV(alphas=alphas, cv=5)
lasso_cv.fit(X_train_scaled, y_train)
print(f"Best alpha found: {lasso_cv.alpha_}")
print(f"Test R²: {r2_score(y_test, lasso_cv.predict(X_test_scaled)):.4f}")

print("\\nLassoCV finds the optimal alpha automatically!")`,
  },

  // Exercise 3: Ridge vs Lasso for feature selection
  {
    id: "m4-feature-selection",
    title: "Choosing Ridge vs Lasso for Feature Selection",
    description: "Learn when to use Ridge (keep all features) vs Lasso (eliminate features).",
    steps: [
      {
        id: "step1",
        title: "The scenario: 50 features, but many might be useless",
        code: `# You have lots of features
# price, rating, reviews, category, color,
# warehouse_location, competitor_price, ...
#
# Question: Do all 50 features help?
# Or are some just noise?`,
        explanation: "In real projects, you often have many features but suspect some don't contribute to predictions. The wrong choice of regularization can hurt your model.",
      },
      {
        id: "step2",
        title: "Ridge: keeps ALL features",
        code: `ridge = Ridge(alpha=10.0)
ridge.fit(X_train, y_train)

# Count non-zero coefficients
print(np.sum(ridge.coef_ != 0))  # Always 50!`,
        explanation: "Ridge (L2) shrinks coefficients toward zero but NEVER sets them exactly to zero. If you have 50 features, Ridge keeps all 50.",
      },
      {
        id: "step3",
        title: "Lasso: eliminates unimportant features",
        code: `lasso = Lasso(alpha=0.1)
lasso.fit(X_train, y_train)

# Count non-zero coefficients
print(np.sum(lasso.coef_ != 0))  # Maybe 15!`,
        explanation: "Lasso (L1) can set coefficients exactly to zero, eliminating features entirely. It performs automatic feature selection.",
      },
      {
        id: "step4",
        title: "When to use which?",
        code: `# Use RIDGE when:
# - You believe all features might contribute
# - Features are correlated (Lasso arbitrarily picks one)

# Use LASSO when:
# - You suspect many features are noise
# - You want automatic feature selection
# - You need a simpler, more interpretable model`,
        explanation: "The choice depends on your data. Ridge is more stable with correlated features; Lasso is better for feature selection and interpretability.",
      },
    ],
    dragDropExercise: {
      blocks: [
        { id: "b1", code: "# I have 50 features but suspect many are noise", label: "Problem statement" },
        { id: "b2", code: "lasso = Lasso(alpha=0.1)  # L1 for feature selection", label: "Choose Lasso" },
        { id: "b3", code: "lasso.fit(X_train_scaled, y_train)", label: "Fit Lasso" },
        { id: "b4", code: "important_features = np.where(lasso.coef_ != 0)[0]", label: "Find surviving features" },
        { id: "b5", code: "print(f'{len(important_features)} features selected')", label: "Report selection" },
      ],
      correctOrder: ["b1", "b2", "b3", "b4", "b5"],
      hints: [
        "Start by understanding the problem - too many potential noise features.",
        "Lasso is the right choice for feature selection (L1 penalty zeros out features).",
        "Fit the model, then examine which coefficients are non-zero.",
        "Report how many features survived the selection process.",
      ],
    },
    runnableCode: `# Ridge vs Lasso: Feature Selection Comparison
from sklearn.linear_model import Ridge, Lasso
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import numpy as np

# Create data with 20 features, but only 5 are important
np.random.seed(42)
n_samples, n_features = 200, 20
X = np.random.randn(n_samples, n_features)

# True relationship: only first 5 features matter
y = (X[:, 0] * 3 + X[:, 1] * 2 + X[:, 2] * 1.5
     - X[:, 3] * 2.5 + X[:, 4] * 1
     + np.random.randn(n_samples) * 0.5)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Ridge (L2)
print("=== RIDGE (L2) ===")
ridge = Ridge(alpha=1.0)
ridge.fit(X_train_scaled, y_train)
print(f"Non-zero coefficients: {np.sum(ridge.coef_ != 0)}/20")
print("Ridge keeps ALL features (just shrinks them)")

# Lasso (L1)
print("\\n=== LASSO (L1) ===")
lasso = Lasso(alpha=0.1)
lasso.fit(X_train_scaled, y_train)
non_zero = np.sum(lasso.coef_ != 0)
print(f"Non-zero coefficients: {non_zero}/20")

important = np.where(lasso.coef_ != 0)[0]
print(f"Selected features: {important}")
print("\\nLasso correctly identified the important features!")
print("(True important features: 0, 1, 2, 3, 4)")`,
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
